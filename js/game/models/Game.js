define(['jquery', 'knockout', 'game/models/Match', 'game/models/Player'], function($, ko, Match, Player) {
    return function Game() {
    	var self = this;
    	self.playerQuantity = ko.observable(3);
    	self.players = ko.observableArray([]);
    	self.matches = ko.observableArray([]);
	
	
    	self.currentMatchPlayer1Score = ko.observable('-');
    	self.currentMatchPlayer2Score = ko.observable('-');
    
    	self.setPlayerQuantity = function(data) {
    		self.playerQuantity(data);
    	}
	
    	self.addPlayer = function(player) {
    		self.players.push(player);
    	}
	
    	self.removePlayer = function(player) {
    		self.players.remove(player);
    	}
	
    	self.removeAllPlayers = function() {
    		self.players([]);
    	}
        
        self.resetPlayers = function() {
    		for (var i = 0; i < self.players(); i++ ) {
                self.players()[i].reset();
    		}
        }
	
    	self.getRandomInt = function(min, max) {
    		return Math.floor(Math.random() * (max - min + 1)) + min;
    	}
        
    	self.createEmptyPlayers = function() {	
            self.players([]);	
    		for (var i = 0; i < self.playerQuantity(); i++ ) {
    			var player = new Player('Player ' + (i+1));			
    			self.addPlayer(player);
    		}
    	}
        
		
    	self.createLeague = function() {
    		//create all possible matches
            self.matches([]);
            self.sortedPlayers();
        	self.currentMatchPlayer1Score('-');
        	self.currentMatchPlayer2Score('-');
            self.resetPlayers();
            
    		for (var i=0; i < self.players().length; i++) {
    			for (var j=i+1; j < self.players().length; j++) {
    				var home_match = new Match(self.players()[i], self.players()[j]);
    				var away_match = new Match(self.players()[j], self.players()[i]);
    				self.matches.push(home_match);
    				self.matches.push(away_match);
    			}
    		}; 
    	}      
        

	

	
	
    	self.sortedPlayers = ko.computed(function() {
        	var compare = function(a, b) {
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
            
    		var players = self.players();
    		players.sort(compare);
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
		  
        
    }

});