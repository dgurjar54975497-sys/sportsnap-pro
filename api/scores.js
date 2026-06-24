module.exports = (req, res) => {
  res.status(200).json([
    {
      team1: "India",
      team2: "England",
      score1: "287/6",
      score2: "41/2",
      status: "LIVE"
    }
  ]);
};
