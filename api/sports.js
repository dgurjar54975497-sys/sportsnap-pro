export default async function handler(req, res) {

  const sport = req.query.sport || "football";

  try {

    // Football + highlights (FREE)
    if (sport === "football") {
      const r = await fetch("https://www.scorebat.com/video-api/v3/");
      const d = await r.json();
      return res.status(200).json(d.response);
    }

    // Cricket (basic free)
    if (sport === "cricket") {
      return res.status(200).json([
        { title: "IPL Match", score: "Live data limited (free API)" }
      ]);
    }

    // Basketball / tennis / hockey (dummy fallback)
    return res.status(200).json([
      { title: sport + " matches coming soon", score: "-" }
    ]);

  } catch (e) {
    return res.status(500).json({ error: "API failed" });
  }
        }
