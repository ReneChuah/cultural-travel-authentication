import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { message, userProfile, tripContext } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  const prompt = `You are a travel concierge AI for a cultural festival
  travel app. User profile: ${JSON.stringify(userProfile)}.
  Current trip context: ${JSON.stringify(tripContext)}.

  User asks: "${message}"

  If this question needs live weather or nearby-place data that you don't
  have, respond with exactly: NEEDS_DATA:weather or NEEDS_DATA:places
  followed by what to search for. Otherwise just answer helpfully and
  warmly, staying in character as a knowledgeable local concierge.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return Response.json({ reply: text });
}