export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/3/eventsday.php?s=Soccer"
    );

    const data = await response.json();

    if (!data.events) {
      return res.status(200).json([
        {
          title: "No matches today",
          competition: "Football",
          time: "-",
          status: "No Data",
          url: ""
        }
      ]);
    }

    const result = data.events.slice(0, 10).map(m => ({
      title: m.strEvent,
      competition: m.strLeague,
      time: m.dateEvent,
      status: "Match Scheduled",
      url: ""
    }));

    res.status(200).json(result);

  } catch (e) {
    res.status(200).json([
      {
        title: "API Error",
        competition: "Fallback",
        time: "Now",
        status: "Error",
        url: ""
      }
    ]);
  }
}
