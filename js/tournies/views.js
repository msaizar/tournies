function NavigationView() {
	var self = this;
	


	self.displayLeague = function() {
		amplify.publish('PlayerNamesVisible', false);
		amplify.publish('LeagueVisible', true);
		
	}

	
	amplify.subscribe("PlayerNamesSelected", self.displayLeague);
}

function PlayerNamesView() {
	var self = this;
	
	self.visible = ko.observable(true);
	self.players = ko.observableArray([]);



	
	for (var i = 1; i <= max_players; i++) {
		self.players.push(new PlayerModel(''));
	}
	

	
	self.playerNamesSelected = function() {
		
		amplify.publish('PlayerNamesSelected');
		amplify.publish('CreateLeague', self.players());
		
	}
	
	self.display = function(value) {
		self.visible(value);
	}
	
	
	amplify.subscribe("PlayerNamesVisible", self.display);
	

}

function LeagueView() {
	var self = this;
	
	
	self.matches = ko.observableArray([]);
	self.players = ko.observableArray([]);
	
	self.visible = ko.observable(false);
	
	self.currentMatchPlayer1Score = ko.observable('-');
	self.currentMatchPlayer2Score = ko.observable('-');
	
	self.compare = function(a, b) {
		if (a.totalPoints() == b.totalPoints()) {
			return 0;
		}
		else if (a.totalPoints() < b.totalPoints()) {
			return 1;
		}
		else {
			return -1;
		}
		
	}
	
	
	self.sortedPlayers = ko.computed(function() {
		var players = self.players();
		players.sort(self.compare);
		return players;
	});
	
	self.playedMatches = ko.computed(function() {
        return ko.utils.arrayFilter(self.matches(), function(item) {
			return (item.player1Score() != '-' && item.player2Score() != '-');		
        });
	});
	
	self.remainingMatches = ko.computed(function() {
        return ko.utils.arrayFilter(self.matches(), function(item) {
			return (item.player1Score() == '-' && item.player2Score() == '-');		
        });
	});
		
	self.currentMatchPlayer1 = ko.computed(function() {
		
		if (self.remainingMatches().length == 0) {
			return '';
		}
		else {
			return self.remainingMatches()[0].player1.name();
		}
	});
	
	self.currentMatchPlayer2 = ko.computed(function() {
		
		if (self.remainingMatches().length == 0) {
			return '';
		}
		else {
			return self.remainingMatches()[0].player2.name();
		}
	});
	

	self.nextMatchPlayer1 = ko.computed(function() {
		if (self.remainingMatches().length <= 1) {
			return '';
		}
		else {
			return self.remainingMatches()[1].player1.name();
		}
		
	});

	
	self.nextMatchPlayer2 = ko.computed(function() {
		if (self.remainingMatches().length <= 1) {
			return '';
		}
		else {
			return self.remainingMatches()[1].player2.name();
		}
		
	});
	
	self.updateCurrentMatch = function() {
		var match = self.remainingMatches()[0];
		match.player1Score(self.currentMatchPlayer1Score());
		match.player2Score(self.currentMatchPlayer2Score());
		var player1 = match.player1;
		var player2 = match.player2;
		
		if (match.tied()) {
			player1.addTie();
			player2.addTie();
		}
		else if (match.player1Won()) {
			player1.addWin();
			player2.addLoss();
		}
		else {
			player1.addLoss();
			player2.addWin();
		}
		player1.addPlayed();
		player2.addPlayed();
		
		if (match.player1Score() > 0) {
			player1.addForScore(match.player1Score());
			player2.addAgainstScore(match.player1Score());
			
		}
		if (match.player2Score() > 0) {
			player2.addForScore(match.player2Score());
			player1.addAgainstScore(match.player2Score());
			
		}
		
		
		self.currentMatchPlayer1Score('-');
		self.currentMatchPlayer2Score('-');
		
		
		
	}
		
	
	self.createLeague = function(players) {
		//create all possible matches
		for (var i=0; i < players.length; i++) {
			for (var j=i+1; j < players.length; j++) {
				var home_match = new MatchModel(players[i], players[j]);
				var away_match = new MatchModel(players[j], players[i]);
				self.matches.push(home_match);
				self.matches.push(away_match);
			}
			self.players.push(players[i]);
		}; 
	}
	
	self.display = function(value) {
		self.visible(value);
	}
	
	amplify.subscribe("LeagueVisible", self.display);
	amplify.subscribe("CreateLeague", self.createLeague);
	

	
}