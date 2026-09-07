export async function POST(req: Request) {
  const { query, lat, lon } = await req.json();

  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
        "X-Goog-FieldMask":
          "places.displayName,places.location,places.formattedAddress",
      },
      body: JSON.stringify({
        textQuery: query,
        locationBias: {
          circle: {
            center: { latitude: Number(lat), longitude: Number(lon) },
            radius: 2000,
          },
        },
      }),
    }
  );
  const data = await res.json();
  return Response.json(data);
}