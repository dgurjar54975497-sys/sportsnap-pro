cd ~/sportsnap_pro

cat > api/scores.js << 'EOF'
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const sport = req.query.sport || 'cricket';

  // Mock data (Real API se replace karenge)
  const mockData = {
    cricket: [
      { team1: 'India', team2: 'England', score1: '287/6', score2: '41/2', status: 'Live - 35.2 ov' },
      { team1: 'Pakistan', team2: 'Australia', score1: '150', score2: '155', status: 'Live - 20.1 ov' },
      { team1: 'South Africa', team2: 'New Zealand', score1: '198/4', score2: '45/1', status: 'Live - 12.3 ov' }
    ],
    football: [
      { team1: 'Arsenal', team2: 'Chelsea', score1: '2', score2: '1', status: 'Live - 67 min' },
      { team1: 'Manchester City', team2: 'Liverpool', score1: '1', score2: '1', status: 'HT' },
      { team1: 'Real Madrid', team2: 'Barcelona', score1: '0', score2: '0', status: 'Live - 20 min' }
    ],
    basketball: [
      { team1: 'Lakers', team2: 'Warriors', score1: '98', score2: '95', status: 'Q3 - 8:22' },
      { team1: 'Celtics', team2: 'Heat', score1: '102', score2: '98', status: 'Q4 - 2:15' },
      { team1: 'Bulls', team2: 'Nets', score1: '87', score2: '91', status: 'Q2 - 5:30' }
    ],
    tennis: [
      { team1: 'Djokovic', team2: 'Alcaraz', score1: '6-4, 3', score2: '2', status: 'Set 3' },
      { team1: 'Sinner', team2: 'Medvedev', score1: '4-6', score2: '7-5', status: 'Set 2' },
      { team1: 'Swiatek', team2: 'Sabalenka', score1: '6-3', score2: '4-6', status: 'Set 3' }
    ]
  };

  try {
    const data = mockData[sport] || [];
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
EOF

echo "✅ api/scores.js updated!"
