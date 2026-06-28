cat > api/scores.js << 'APIEOF'
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const sport = req.query.sport || 'cricket';

  // 1. CRICKET - Real API
  if (sport === 'cricket') {
    try {
      const response = await fetch(
        'https://api.cricapi.com/v1/currentMatches?apikey=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6&offset=0'
      );
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const matches = data.data.map(match => ({
          team1: match.teams[0],
          team2: match.teams[1],
          score1: match.score?.[0]?.runs || 'Live',
          score2: match.score?.[1]?.runs || 'Live',
          status: match.status,
          matchType: match.matchType,
          venue: match.venue
        }));
        res.status(200).json(matches.slice(0, 5));
        return;
      }
    } catch (error) {
      console.log('Cricket API error:', error.message);
    }
  }

  // 2. FOOTBALL - Free API
  if (sport === 'football') {
    try {
      const response = await fetch(
        'https://api.football-data.org/v4/matches?status=LIVE',
        {
          headers: { 'X-Auth-Token': 'YOUR_FOOTBALL_DATA_KEY' }
        }
      );
      const data = await response.json();

      if (data.matches && data.matches.length > 0) {
        const matches = data.matches.map(match => ({
          team1: match.homeTeam.name,
          team2: match.awayTeam.name,
          score1: match.score.fullTime.home,
          score2: match.score.fullTime.away,
          status: match.status,
          competition: match.competition.name,
          venue: match.venue
        }));
        res.status(200).json(matches.slice(0, 5));
        return;
      }
    } catch (error) {
      console.log('Football API error:', error.message);
    }
  }

  // 3. BASKETBALL - Mock (Real API आएगा)
  if (sport === 'basketball') {
    const basketballData = [
      { team1: 'Lakers', team2: 'Warriors', score1: '98', score2: '95', status: 'Q3 - 8:22', league: 'NBA' },
      { team1: 'Celtics', team2: 'Heat', score1: '102', score2: '98', status: 'Q4 - 2:15', league: 'NBA' },
      { team1: 'Bulls', team2: 'Nets', score1: '87', score2: '91', status: 'Q2 - 5:30', league: 'NBA' }
    ];
    res.status(200).json(basketballData);
    return;
  }

  // 4. TENNIS - Mock
  if (sport === 'tennis') {
    const tennisData = [
      { team1: 'Djokovic', team2: 'Alcaraz', score1: '6-4, 3', score2: '2', status: 'Set 3', tournament: 'Wimbledon' },
      { team1: 'Sinner', team2: 'Medvedev', score1: '4-6', score2: '7-5', status: 'Set 2', tournament: 'US Open' },
      { team1: 'Swiatek', team2: 'Sabalenka', score1: '6-3', score2: '4-6', status: 'Set 3', tournament: 'Wimbledon' }
    ];
    res.status(200).json(tennisData);
    return;
  }

  // Fallback
  res.status(200).json([]);
};
APIEOF

cat api/scores.js | head -10
