// Serverless controller array function delivering static live data telemetry points
module.exports = async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json');
  
  const liveMatchTelemetryMockData = {
    sport: "Cricket",
    tournament: "TATA IPL 2026 FINAL",
    status: "LIVE",
    teams: {
      teamA: { name: "Gujarat Titans", score: "155-8", overs: "20.0" },
      teamB: { name: "Royal Challengers Bengaluru", score: "161-5", overs: "18.2" }
    },
    systemMessage: "Data channel successfully established via Vercel Edge Framework."
  };

  return response.status(200).json(liveMatchTelemetryMockData);
};
