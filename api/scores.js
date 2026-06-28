module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const sport = req.query.sport || 'cricket';

  // REAL DATA - CRICKET
  if (sport === 'cricket') {
    try {
      const response = await fetch(
        'https://api.cricapi.com/v1/currentMatches?apikey=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6&offset=0'
      );
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const matches = data.data.slice(0, 10).map(match => ({
          team1: match.teams[0] || 'Team A',
          team2: match.teams[1] || 'Team B',
          score1: match.score?.[0]?.runs || 'Live',
          score2: match.score?.[1]?.runs || 'Live',
          status: match.status || 'Live',
          venue: match.venue || 'TBD',
          league: 'Cricket'
        }));
        res.status(200).json(matches);
        return;
      }
    } catch (error) {
      console.log('Cricket API error:', error.message);
    }
  }

  // FOOTBALL
  if (sport === 'football') {
    try {
      const response = await fetch('https://api.football-data.org/v4/matches?status=LIVE', {
        headers: { 'X-Auth-Token': 'YOUR_FOOTBALL_DATA_KEY' }
      });
      const data = await response.json();

      if (data.matches && data.matches.length > 0) {
        const matches = data.matches.slice(0, 10).map(match => ({
          team1: match.homeTeam.name,
          team2: match.awayTeam.name,
          score1: match.score.fullTime.home || '0',
          score2: match.score.fullTime.away || '0',
          status: match.status,
          venue: match.venue || 'Stadium',
          league: match.competition.name
        }));
        res.status(200).json(matches);
        return;
      }
    } catch (error) {
      console.log('Football API error:', error.message);
    }
  }

  // MOCK DATA (FALLBACK)
  const mockData = {
    cricket: [
      { team1: 'India', team2: 'England', score1: '287/6', score2: '41/2', status: 'Live - 35.2 ov', venue: 'Lords', league: 'ODI' },
      { team1: 'Pakistan', team2: 'Australia', score1: '150', score2: '155', status: 'Live - 20.1 ov', venue: 'MCG', league: 'ODI' },
      { team1: 'South Africa', team2: 'New Zealand', score1: '198/4', score2: '45/1', status: 'Live - 12.3 ov', venue: 'Wanderers', league: 'T20' },
      { team1: 'Sri Lanka', team2: 'Bangladesh', score1: '245/5', score2: '87/2', status: 'Live - 18.3 ov', venue: 'Colombo', league: 'ODI' },
      { team1: 'West Indies', team2: 'Ireland', score1: '156', score2: '98', status: 'Live - 15.2 ov', venue: 'Dublin', league: 'T20' }
    ],
    football: [
      { team1: 'Arsenal', team2: 'Chelsea', score1: '2', score2: '1', status: 'Live - 67 min', venue: 'Emirates', league: 'Premier League' },
      { team1: 'Man City', team2: 'Liverpool', score1: '1', score2: '1', status: 'Live - 45 min', venue: 'Etihad', league: 'Premier League' },
      { team1: 'Real Madrid', team2: 'Barcelona', score1: '0', score2: '0', status: 'Live - 20 min', venue: 'Bernabéu', league: 'La Liga' },
      { team1: 'PSG', team2: 'Marseille', score1: '3', score2: '2', status: 'Live - 78 min', venue: 'Parc OL', league: 'Ligue 1' },
      { team1: 'Bayern Munich', team2: 'Dortmund', score1: '2', score2: '0', status: 'Live - 56 min', venue: 'Allianz', league: 'Bundesliga' }
    ],
    basketball: [
      { team1: 'Lakers', team2: 'Warriors', score1: '98', score2: '95', status: 'Q3 - 8:22', venue: 'Crypto.com Arena', league: 'NBA' },
      { team1: 'Celtics', team2: 'Heat', score1: '102', score2: '98', status: 'Q4 - 2:15', venue: 'TD Garden', league: 'NBA' },
      { team1: 'Bulls', team2: 'Nets', score1: '87', score2: '91', status: 'Q2 - 5:30', venue: 'Barclays', league: 'NBA' },
      { team1: 'Suns', team2: 'Mavericks', score1: '105', score2: '100', status: 'Q4 - 4:45', venue: 'Footprint', league: 'NBA' },
      { team1: 'Bucks', team2: 'Pacers', score1: '78', score2: '75', status: 'Q3 - 3:10', venue: 'Fiserv', league: 'NBA' }
    ],
    tennis: [
      { team1: 'Djokovic', team2: 'Alcaraz', score1: '6-4, 3', score2: '2', status: 'Set 3', venue: 'Wimbledon', league: 'Grand Slam' },
      { team1: 'Sinner', team2: 'Medvedev', score1: '4-6', score2: '7-5', status: 'Set 2', venue: 'US Open', league: 'Grand Slam' },
      { team1: 'Swiatek', team2: 'Sabalenka', score1: '6-3', score2: '4-6', status: 'Set 3', venue: 'Roland Garros', league: 'Grand Slam' },
      { team1: 'Rublev', team2: 'De Minaur', score1: '5-4', score2: '3-5', status: 'Set 2', venue: 'ATP Masters', league: 'Masters 1000' },
      { team1: 'Gauff', team2: 'Kasatkina', score1: '6-2', score2: '1-4', status: 'Set 2', venue: 'WTA Finals', league: 'WTA' }
    ],
    volleyball: [
      { team1: 'Poland', team2: 'Brazil', score1: '25-21', score2: '18-16', status: 'Set 2', venue: 'Paris', league: 'Olympics' },
      { team1: 'Italy', team2: 'France', score1: '25-23', score2: '20-22', status: 'Set 2', venue: 'Tokyo', league: 'Volleyball' },
      { team1: 'Serbia', team2: 'USA', score1: '21-25', score2: '25-20', status: 'Set 2', venue: 'World Cup', league: 'Volleyball' }
    ],
    hockey: [
      { team1: 'Canada', team2: 'USA', score1: '3', score2: '2', status: 'Live - 18:45', venue: 'Olympic Stadium', league: 'Hockey' },
      { team1: 'Sweden', team2: 'Finland', score1: '2', score2: '1', status: 'Live - 15:30', venue: 'Helsinki', league: 'Hockey' },
      { team1: 'Russia', team2: 'Czech Republic', score1: '4', score2: '3', status: 'Live - 19:20', venue: 'Moscow', league: 'Hockey' }
    ]
  };

  res.status(200).json(mockData[sport] || mockData.cricket);
};
