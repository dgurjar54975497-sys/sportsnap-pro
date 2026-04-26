// api/matches.js
export default async function handler(req, res) {
  const { sport = 'football' } = req.query;

  try {
    // Scorebat Free Feed (no key required for demo/free access)
    const response = await fetch('https://www.scorebat.com/video-api/v3/feed/');
    
    if (!response.ok) {
      throw new Error('Scorebat API error');
    }

    const data = await response.json();

    // Filter for requested sport (Scorebat is mainly football, others get fallback)
    let matches = data.response || [];

    if (sport !== 'football') {
      matches = matches.slice(0, 6); // Limit for other sports
    }

    const formatted = matches.map(item => ({
      title: item.title || "Match Highlight",
      competition: item.competition || "Football League",
      thumbnail: item.thumbnail || item.videos?.[0]?.thumbnail,
      embed: item.videos?.[0]?.embed || null
    }));

    res.status(200).json({
      success: true,
      sport: sport,
      matches: formatted.length > 0 ? formatted : getDemoData(sport)
    });

  } catch (error) {
    console.error(error);
    res.status(200).json({
      success: false,
      sport: sport,
      matches: getDemoData(sport),
      message: "Using demo data (API temporarily unavailable)"
    });
  }
}

function getDemoData(sport) {
  return [
    {
      title: `${sport.charAt(0).toUpperCase() + sport.slice(1)} Highlight - Demo Match`,
      competition: "Demo League 2026",
      thumbnail: "https://via.placeholder.com/600x300/22c55e/ffffff?text=Sportsnap+PRO",
      embed: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/dQw4w9wgxcq" title="Demo Highlight" frameborder="0" allowfullscreen></iframe>`
    }
  ];
      }
