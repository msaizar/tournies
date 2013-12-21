function PlayerModel(name) {
	var self = this;
	self.name = ko.observable(name);
	
	self.totalForScore = ko.observable(0);
	self.totalAgainstScore = ko.observable(0);
	self.totalPlayed = ko.observable(0);
	self.totalTied = ko.observable(0);
	self.totalWon = ko.observable(0);
	self.totalLost = ko.observable(0);
	self.totalPoints = ko.observable(0);
	
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

function MatchModel(player1, player2) {
	var self = this;
	self.player1 = player1;
	self.player2 = player2;
	self.player1Score = ko.observable('-');
	self.player2Score = ko.observable('-');
	
	self.tied = ko.computed(function () {
		return self.player1Score() == self.player2Score();
	});
	
	self.player1Won = ko.computed(function () {
		return self.player1Score() > self.player2Score();
	});
	

	
		
	
	
	
	
}
