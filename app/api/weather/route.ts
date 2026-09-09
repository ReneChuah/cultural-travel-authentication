export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const location = searchParams.get("location")

  if (!location) {
    return Response.json({ error: "Missing location" }, { status: 400 })
  }

  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
  )
  const geoData = await geoRes.json()

  if (!geoData.results || geoData.results.length === 0) {
    return Response.json({ error: "Location not found" }, { status: 404 })
  }

  const { latitude, longitude, name } = geoData.results[0]

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,weather_code`
  )
  const weatherData = await weatherRes.json()

  return Response.json({ location: name, ...weatherData })
}