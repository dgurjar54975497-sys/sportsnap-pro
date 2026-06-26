cd ~/sportsnap_pro

cat > api/scores.js << 'EOF'
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const sport = req.query.sport || 'cricket';
  
  // CRICKET API - Real data
  if (sport === 'cricket') {
    try {
      const cricResponse = await fetch(
        'https://api.cricapi.com/v1/currentMatches?apikey=e39b71a0-9c0c-4b8a-80c6-c849f3bee991
      );
      const cricData = await cricResponse.json();
      
      if (cricData.data && cricData.data.length > 0) {
        const matches = cricData.data.slice(0, 5).map(match => ({
          team1: match.teams[0],
          team2: match.teams[1],
          score1: match.score[0]?.inning1 || match.score[0]?.runs || 'TBD',
          score2: match.score[1]?.inning1 || match.score[1]?.runs || 'TBD',
          status: match.status || 'Live'
        }));
        res.status(200).json(matches);
        return;
      }
    } catch (error) {
      console.log('Cricket API error:', error.message);
    }
  }
  
  // Fallback - Mock data
  const mockData = {
    cricket: [
      { team1: 'India', team2: 'England', score1: '287/6', score2: '41/2', status: 'Live - 35.2 ov' },
      { team1: 'Pakistan', team2: 'Australia', score1: '150', score2: '155', status: 'Live - 20.1 ov' }
    ],
    football: [
      { team1: 'Arsenal', team2: 'Chelsea', score1: '2', score2: '1', status: 'Live - 67 min' },
      { team1: 'Man City', team2: 'Liverpool', score1: '1', score2: '1', status: 'HT' }
    ],
    basketball: [
      { team1: 'Lakers', team2: 'Warriors', score1: '98', score2: '95', status: 'Q3 - 8:22' },
      { team1: 'Celtics', team2: 'Heat', score1: '102', score2: '98', status: 'Q4 - 2:15' }
    ],
    tennis: [
      { team1: 'Djokovic', team2: 'Alcaraz', score1: '6-4, 3', score2: '2', status: 'Set 3' },
      { team1: 'Sinner', team2: 'Medvedev', score1: '4-6', score2: '7-5', status: 'Set 2' }
    ]
  };
  
  res.status(200).json(mockData[sport] || []);
};
EOF
