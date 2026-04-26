export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.highlightly.com/v1/events", {
      headers: {
        "Authorization": "Bearer b3fe3b23-ecae-4047-af6a-afca80b2dd65"
      }
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (e) {
    res.status(500).json({ error: "Highlightly API Failed" });
  }
}
