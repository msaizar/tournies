define(['jquery', 'knockout', 'game/models/Match', 'game/models/Player'], function($, ko, Match, Player) {
    return function Game() {
    	var self = this;
    	self.playerQuantity = ko.observable(3);
    	self.players = ko.observableArray([]);
    	self.matches = ko.observableArray([]);
	
    	self.currentMatchPlayer1Score = ko.observable('-');
    	self.currentMatchPlayer2Score = ko.observable('-');
    
    
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
		
    	self.currentMatchPlayer1 = ko.observable('-');         
    	self.currentMatchPlayer2 = ko.observable('-'); 
        


    
        self.sortedPlayers = ko.computed(function() {
            return self.players().sort(function(l,r) {
                if (l.totalPoints() > r.totalPoints()) {
                    return -1;
                }
                else if (l.totalPoints() < r.totalPoints()) {
                    return 1;
                }
                else {
                    if (l.totalForScore() > r.totalForScore()) {
                        return -1;
                    }
                    else if (l.totalForScore() < r.totalForScore()) {
                        return 1;
                    }
                    else {
                        if (l.totalAgainstScore() > r.totalAgainstScore()) {
                            return 1;
                        }
                        else if (l.totalForScore() < r.totalForScore()) {
                            return -1;
                        }
                        else {
                            return 0;
                        }
                    }

                }
            });
        });
	
    	self.addPlayer = function() {
            var player = new Player('Player ' + (self.players().length+1));
    		self.players.push(player);
    	}
	
    	self.removePlayer = function(player) {
    		self.players.remove(player);
    	}
	
    	self.removeAllPlayers = function() {
    		self.players([]);
    	}
        
        self.resetPlayers = function() {
            ko.utils.arrayForEach(self.players(), function(player) {
                player.reset();
            });
        }
        
    	self.createEmptyPlayers = function() {	
            self.players([]);	
    		for (var i = 0; i < self.playerQuantity(); i++ ) {
    			self.addPlayer();
    		}
    	}
        
		
    	self.createLeague = function() {
    		//create all possible matches
            self.matches([]);
        	self.currentMatchPlayer1Score('-');
        	self.currentMatchPlayer2Score('-');
            
            
    		for (var i=0; i < self.players().length; i++) {
    			for (var j=i+1; j < self.players().length; j++) {
    				var home_match = new Match(self.players()[i], self.players()[j]);
    				self.matches.push(home_match);                    
    			}
    		}; 
            self.currentMatchPlayer1(self.nextMatch().player1.name())
            self.currentMatchPlayer2(self.nextMatch().player2.name())
            
    	}      
        

	    self.nextMatch = function() {
            var least_total_played_match = self.remainingMatches()[0]
            var least_total_played_matches = []
            ko.utils.arrayForEach(self.remainingMatches(), function(item) {
                if (least_total_played_match.player1.totalPlayed() == item.player1.totalPlayed() && least_total_played_match.player2.totalPlayed() == item.player2.totalPlayed()) {
                    least_total_played_matches.push(item)
                    least_total_played_match = item;                        
                }
                if (least_total_played_match.player1.totalPlayed() > item.player1.totalPlayed() && least_total_played_match.player2.totalPlayed() > item.player2.totalPlayed()) {

                    least_total_played_matches = [item]
                    least_total_played_match = item;
                    
                }
            });

            var last_player = self.sortedPlayers()[self.sortedPlayers().length - 1];
            
            ko.utils.arrayForEach(least_total_played_matches, function(item) {
                
                if (item.player1 == last_player || item.player2 == last_player) {
                    least_total_played_match = item;                        
                }
                
            })
            return least_total_played_match;
	    }



	

	
    	self.updateCurrentMatch = function() {
    		var match = self.nextMatch();
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
		
    		if (match.player1Score() > 0) {
    			player1.addForScore(match.player1Score());
    			player2.addAgainstScore(match.player1Score());
			
    		}
    		if (match.player2Score() > 0) {
    			player2.addForScore(match.player2Score());
    			player1.addAgainstScore(match.player2Score());
			
    		}
		
		    if (self.nextMatch() != undefined) {
                self.currentMatchPlayer1(self.nextMatch().player1.name())
                self.currentMatchPlayer2(self.nextMatch().player2.name())        
    		}
            self.currentMatchPlayer1Score('-');
    		self.currentMatchPlayer2Score('-');
		
		
		
    	}
		  
        
    }

});