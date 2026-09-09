import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  const { userProfile, feedback } = await req.json()

  const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  })

  const prompt = `You are a travel itinerary generator for a cultural festival 
  travel app. Based on the user's profile below, generate a complete trip plan.

  User profile: ${JSON.stringify(userProfile)}

  Respond with ONLY valid JSON, no markdown formatting, no code fences, no 
  explanation text before or after — just the raw JSON object, matching this 
  EXACT structure:

{
  "destination": "string, the destination city name",
  "currency": "RM",
  "guideRequested": boolean,
  "days": [
    {
      "id": "day-1",
      "label": "Day 1",
      "theme": "short theme string, e.g. Temples & Old Town",
      "activities": [
        {
          "id": "unique-id-string",
          "time": "e.g. 9:00 AM",
          "name": "activity name",
          "icon": "one of: landmark, food, camera, nature, view, tea, craft",
          "cost": number
        }
      ],
      "warning": "optional string, only include if there's a physical 
      difficulty concern based on the user's health notes, otherwise omit this field"
    }
  ],
  "hotels": [
    { "id": "hotel-1", "name": "hotel name", "stars": number, "pricePerNight": number }
  ],
  "guide": { "name": "guide name", "stars": number, "bio": "one sentence bio", "pricePerDay": number }
}

Rules:
- Number of days in "days" array should match the user's trip duration if 
provided, otherwise default to 3.
- Respect dietary restrictions, physical limitations, and budget level from 
the user profile — reflect this in activity choices and "warning" fields.
- Only include "guide" with realistic data if guideRequested is true, 
otherwise you can still include a placeholder guide object.
- Keep total costs roughly within the user's stated budget if provided.
- All ids must be unique strings.
${feedback ? `Additional instruction: ${feedback}` : ""}
- If the user's profile shows guideRequested is false, set "guide" to null 
  in your response instead of inventing one.`


  try {
    async function generateWithRetry(model: any, prompt: string, maxRetries = 3) {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await model.generateContent(prompt)
          } catch (err: any) {
          const isOverloaded = err?.message?.includes("503") || err?.message?.includes("overloaded") || err?.message?.includes("high demand")
          if (isOverloaded && attempt < maxRetries) {
            console.log(`Model overloaded, retry ${attempt}/${maxRetries}...`)
            await new Promise((resolve) => setTimeout(resolve, 1500 * attempt)) // 越等越久
            continue
          }
          throw err
        }
      }
      throw new Error("Max retries reached")
    }

    const result = await generateWithRetry(model, prompt)
    
    const text = result.response.text().trim()
    let parsed
    try {
      parsed = JSON.parse(text)
    } catch (parseErr) {
      console.error("JSON parse failed. Raw text was:", text)
      throw parseErr
    }

    // Inject placeholder images since the AI can't generate real image URLs
    parsed.days = parsed.days.map((day: any) => ({
      ...day,
      cover: "/placeholder.svg",
      activities: day.activities.map((a: any) => ({ ...a, thumb: "/placeholder.svg" })),
    }))
    parsed.hotels = parsed.hotels.map((h: any) => ({ ...h, image: "/placeholder.svg" }))
    if (!userProfile?.guide) {
      parsed.guide = null
    } else if (parsed.guide) {
      parsed.guide.avatar = "/placeholder.svg"
    }

    return Response.json(parsed)
  } catch (err) {
    console.error("generate-trip error:", err)
    return Response.json({ error: "Failed to generate trip" }, { status: 500 })
  }
}