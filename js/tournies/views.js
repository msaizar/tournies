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
	self.visible = ko.observable(false);
	self.placeholderMatch = {player1Name: '', player2Name: ''};
	
	self.remainingMatches = ko.computed(function() {
        return ko.utils.arrayFilter(self.matches(), function(item) {
			return (item.player1Points() == '-' && item.player2Points() == '-');		
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
	
		
	
	self.createLeague = function(players) {
		//create all possible matches
		for (var i=0; i < players.length; i++) {
			for (var j=i+1; j < players.length; j++) {
				var home_match = new MatchModel(players[i], players[j]);
				var away_match = new MatchModel(players[j], players[i]);
				self.matches.push(home_match);
				self.matches.push(away_match);
			}
		}; 
	}
	
	self.display = function(value) {
		self.visible(value);
	}
	
	amplify.subscribe("LeagueVisible", self.display);
	amplify.subscribe("CreateLeague", self.createLeague);
	

	
}