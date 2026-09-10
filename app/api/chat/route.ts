import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

async function generateWithRetry(prompt: string, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      })
    } catch (err: any) {
      const isTransient =
        err?.message?.includes("503") ||
        err?.message?.includes("overloaded") ||
        err?.message?.includes("high demand") ||
        err?.message?.includes("404")
      if (isTransient && attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1500 * attempt))
        continue
      }
      throw err
    }
  }
  throw new Error("Max retries reached")
}

export async function POST(req: Request) {
  const { message, userProfile, tripContext } = await req.json()

  const prompt = `You are a travel concierge AI for a cultural festival travel app.

User profile: ${JSON.stringify(userProfile)}
Current trip context: ${JSON.stringify(tripContext)}
User asks: "${message}"

Respond with ONLY valid JSON (no markdown fences), matching this exact shape:

{
  "reply": "your conversational text response",
  "itinerary": null
}

If the user's message needs live weather or nearby-place data you don't
have, set "reply" to exactly "NEEDS_DATA:weather <location>" or
"NEEDS_DATA:places <query>" and leave "itinerary" as null.

If the user is asking you to replan, adjust, or show a specific itinerary
change (e.g. "replan for rain", "change today's plan", "suggest an
alternative"), fill "itinerary" with this shape instead of null:

{
  "title": "short title, e.g. Revised Day 2",
  "subtitle": "one line summary, e.g. Indoor-friendly alternative",
  "lines": [
    { "time": "e.g. 10:00 AM", "name": "activity name", "icon": "one of: landmark, food, camera, nature, view, tea, craft", "note": "optional short tag" }
  ]
}

For all other normal questions, just fill "reply" with a helpful conversational
answer and leave "itinerary" as null.`

  try {
    const result = await generateWithRetry(prompt)
    const text = (result.text ?? "").trim()
      if (!text) {
      return Response.json({ reply: "Sorry, I didn't get a response — please try again.", itinerary: null })
    }

    try {
      const parsed = JSON.parse(text)
      return Response.json(parsed)
    } catch (parseErr) {
      console.error("Chat JSON parse failed. Raw text was:", text)
      return Response.json({ reply: text, itinerary: null })
    }
  } catch (err) {
    console.error("Chat API error:", err)
    return Response.json(
      { reply: "Sorry, I'm having trouble right now — please try again.", itinerary: null },
      { status: 500 }
    )
  }
}