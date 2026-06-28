module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const sport = req.query.sport || 'cricket';
  
  const data = {
    cricket: [
      { team1: 'India', team2: 'England', score1: '287/6', score2: '41/2', status: 'Live - 35.2 ov' },
      { team1: 'Pakistan', team2: 'Australia', score1: '150', score2: '155', status: 'Live - 20.1 ov' },
      { team1: 'South Africa', team2: 'New Zealand', score1: '198/4', score2: '45/1', status: 'Live - 12.3 ov' }
    ],
    football: [
      { team1: 'Arsenal', team2: 'Chelsea', score1: '2', score2: '1', status: 'Live - 67 min' },
      { team1: 'Man City', team2: 'Liverpool', score1: '1', score2: '1', status: 'Live - 45 min' },
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
    ],
    volleyball: [
      { team1: 'Poland', team2: 'Brazil', score1: '25-21', score2: '18-16', status: 'Set 2' },
      { team1: 'Italy', team2: 'France', score1: '25-23', score2: '20-22', status: 'Set 2' }
    ],
    hockey: [
      { team1: 'Canada', team2: 'USA', score1: '3', score2: '2', status: 'Live - 18:45' },
      { team1: 'Sweden', team2: 'Finland', score1: '2', score2: '1', status: 'Live - 15:30' }
    ],
    badminton: [
      { team1: 'Lin Dan', team2: 'Viktor Axelsen', score1: '21-19', score2: '15-18', status: 'Set 2' },
      { team1: 'Saina Nehwal', team2: 'Tai Tzu-ying', score1: '18-21', score2: '19-15', status: 'Set 2' }
    ],
    chess: [
      { team1: 'Magnus Carlsen', team2: 'Fabiano Caruana', score1: 'Move 25', score2: 'Move 25', status: 'Game ongoing' },
      { team1: 'Ding Liren', team2: 'Ian Nepomniachtchi', score1: 'Move 18', score2: 'Move 18', status: 'Game ongoing' }
    ],
    athletics: [
      { team1: '100m Race', team2: 'Usain Bolt', score1: '9.58s', score2: 'Record', status: 'Completed' },
      { team1: '400m Race', team2: 'Wayde van Niekerk', score1: '43.03s', score2: 'Record', status: 'Completed' }
    ]
  };
  
  res.status(200).json(data[sport] || data.cricket);
};
