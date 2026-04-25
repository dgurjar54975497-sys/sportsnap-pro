export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4328"
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "API failed" });
  }
}
