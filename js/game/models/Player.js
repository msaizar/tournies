define(['knockout'], function(ko) {

    return function Player(name) {
    	var self = this;
    	self.name = ko.observable(name);
	
    	self.totalForScore = ko.observable(0);
    	self.totalAgainstScore = ko.observable(0);
    	self.totalPlayed = ko.observable(0);
    	self.totalTied = ko.observable(0);
    	self.totalWon = ko.observable(0);
    	self.totalLost = ko.observable(0);
    	self.totalPoints = ko.observable(0);
	
    
        self.reset = function() {
            self.totalWon(0);
            self.totalPoints(0);
            self.totalLost(0);
            self.totalTied(0);
            self.totalPlayed(0);
            self.totalAgainstScore(0);
            self.totalForScore(0);
        }
    
    	self.addWin = function() {
    		self.totalWon(self.totalWon() + 1);
    		self.totalPoints(self.totalPoints() + 3);
    	}
    	self.addLoss = function() {
    		self.totalLost(self.totalLost() + 1);
    		self.totalPoints(self.totalPoints() + 0);
		
    	}
    	self.addTie = function() {
    		self.totalTied(self.totalTied() + 1);
    		self.totalPoints(self.totalPoints() + 1);
		
    	}
	
    	self.addPlayed = function() {
    		self.totalPlayed(self.totalPlayed() + 1);
		
    	}
    	self.addForScore = function(value) {
    		self.totalForScore(self.totalForScore() + parseInt(value));
    	}
    	self.addAgainstScore = function(value) {
    		self.totalAgainstScore(self.totalAgainstScore() + parseInt(value));
    	}
	
	
    }
});

		
	