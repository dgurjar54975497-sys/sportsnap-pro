```
```javascript:Dynamic Serverless API Logic:api/scores.js
// Runtime Global State Variables to track simulated real-time ticks
let currentRunA = 155;
let currentWicketA = 8;
let currentRunB = 120;
let currentWicketB = 4;
let currentBallsB = 92; // 15.2 overs default starting points

module.exports = async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json');
  
  // Real-time calculation loop logic simulation to emulate live updates on refresh
  // Every request slightly changes the live game scenario dynamically
  const randomTrigger = Math.random();
  if (randomTrigger > 0.6 && currentRunB < 161) {
    // Add runs to RCB
    const runAdd = Math.floor(Math.random() * 4) + 1; // Add 1, 2, 3, or 4 runs
    currentRunB += runAdd;
    currentBallsB += 1;
  } else if (randomTrigger < 0.1 && currentWicketB < 9 && currentRunB < 161) {
    // Take a wicket!
    currentWicketB += 1;
    currentBallsB += 1;
  } else if (currentRunB < 161) {
    // Just a dot ball or single
    currentBallsB += 1;
  }

  // Calculate overs from ball counters
  const completedOvers = Math.floor(currentBallsB / 6);
  const remainingBalls = currentBallsB % 6;
  const formattedOversB = `${completedOvers}.${remainingBalls}`;

  let matchStatusNoteText = "RCB needs 36 runs to win from 28 balls.";
  if (currentRunB >= 161) {
    matchStatusNoteText = "Match finished! RCB won by 5 wickets!";
  } else {
    const runsNeeded = 161 - currentRunB;
    const ballsRemaining = 120 - currentBallsB;
    matchStatusNoteText = `RCB needs ${runsNeeded} runs to win from ${ballsRemaining} balls.`;
  }

  const liveMatchTelemetryMockData = {
    sport: "Cricket",
    tournament: "TATA IPL 2026 FINAL",
    status: "LIVE",
    teams: {
      teamA: { 
        name: "Gujarat Titans", 
        score: `${currentRunA}-${currentWicketA}`, 
        overs: "20.0" 
      },
      teamB: { 
        name: "Royal Challengers Bengaluru", 
        score: `${currentRunB}-${currentWicketB}`, 
        overs: formattedOversB 
      }
    },
    systemMessage: matchStatusNoteText
  };

  return response.status(200).json(liveMatchTelemetryMockData);
};
```

---

