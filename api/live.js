export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/eventsday.php?s=Soccer"
    );

    const data = await response.json();

    if (!data.events) {
      return res.status(200).json({ events: [] });
    }

    const matches = data.events.map(m => ({
      title: m.strEvent,
      sport: "Football",
      date: m.dateEvent
    }));

    res.status(200).json({ events: matches });

  } catch (e) {
    res.status(500).json({ events: [] });
  }
}
