function PlayerModel(name) {
	var self = this;
	self.name = ko.observable(name);
}

function MatchModel(player1, player2) {
	var self = this;
	self.player1 = player1;
	self.player2 = player2;
	self.player1Points = ko.observable('-');
	self.player2Points = ko.observable('-');
}
