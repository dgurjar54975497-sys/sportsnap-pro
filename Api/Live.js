export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/eventsday.php?s=Soccer"
    );

    const data = await response.json();

    let matches = [];

    if (data && data.events) {
      matches = data.events.map(m => ({
        title: m.strEvent,
        league: m.strLeague,
        date: m.dateEvent
      }));
    }

    res.status(200).json(matches);

  } catch (err) {
    res.status(200).json([
      { title: "Demo Match 1", league: "Test League", date: "Today" },
      { title: "Demo Match 2", league: "Test League", date: "Today" }
    ]);
  }
}
