export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=2026-04-26&s=Soccer"
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "API failed" });
  }
}
