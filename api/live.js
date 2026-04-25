export default async function handler(req, res) {
  try {
    const url = `https://www.scorebat.com/video-api/v3/feed/?token=demo`;

    const response = await fetch(url);
    const json = await response.json();

    let data = json.response || [];

    // ❌ filter हटाया (यही main fix है)

    const result = data.slice(0, 15).map(m => ({
      title: m.title,
      competition: m.competition,
      time: new Date(m.date).toLocaleString(),
      status: "Highlights Available",
      url: m.matchviewUrl
    }));

    res.status(200).json(result);

  } catch (e) {
    res.status(500).json({ error: "API Failed" });
  }
      }
