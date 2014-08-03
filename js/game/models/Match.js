define(['knockout'], function(ko) {
    return function Match(player1, player2) {
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
});
	

	