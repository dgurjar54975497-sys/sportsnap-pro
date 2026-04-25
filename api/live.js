export default async function handler(req, res) {
  const sport = req.query.sport || "soccer";

  try {
    const url = `https://www.scorebat.com/video-api/v3/feed/?token=demo`;

    const response = await fetch(url);
    const json = await response.json();

    let data = json.response || [];

    // filter by sport keyword (basic)
    data = data.filter(m => 
      m.title.toLowerCase().includes(sport)
    );

    const result = data.slice(0, 10).map(m => ({
      title: m.title,
      competition: m.competition,
      time: m.date,
      status: "Finished / Highlights",
      url: m.matchviewUrl
    }));

    res.status(200).json(result);

  } catch (e) {
    res.status(500).json({ error: "API Failed" });
  }
}
