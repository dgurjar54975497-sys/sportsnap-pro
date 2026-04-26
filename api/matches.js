export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.scorebat.com/video-api/v3/feed/?token=demo");
    const data = await response.json();

    const matches = data.response.map(match => ({
      title: match.title,
      competition: match.competition,
      date: match.date,
      thumbnail: match.thumbnail,
      video: match.videos[0]?.embed
    }));

    res.status(200).json(matches);

  } catch (err) {
    res.status(200).json({ error: "API failed" });
  }
}
