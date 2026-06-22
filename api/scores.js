export default async function handler(req, res) {
  const { sport } = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');

  const mockData = {
    cricket: [
      { team1: 'India', team2: 'England', score1: '287/6', score2: '41/2', status: 'Live' },
      { team1: 'Pakistan', team2: 'Australia', score1: '150', score2: '155', status: 'Live' }
    ],
    football: [
      { team1: 'Arsenal', team2: 'Chelsea', score1: '2', score2: '1', status: 'Live' },
      { team1: 'ManCity', team2: 'Liverpool', score1: '1', score2: '1', status: 'HT' }
    ],
    basketball: [
      { team1: 'Lakers', team2: 'Warriors', score1: '98', score2: '95', status: 'Q3' },
      { team1: 'Celtics', team2: 'Heat', score1: '102', score2: '98', status: 'Q4' }
    ],
    tennis: [
      { team1: 'Djokovic', team2: 'Alcaraz', score1: '6-4, 3', score2: '2', status: 'Set 3' },
      { team1: 'Sinner', team2: 'Medvedev', score1: '4-6', score2: '7-5', status: 'Set 2' }
    ]
  };

  const sportData = mockData[sport] || [];
  res.status(200).json(sportData);
       }
