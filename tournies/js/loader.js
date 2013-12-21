$(document).ready(function () {


	
	var leagueView = new LeagueView();
	ko.applyBindings(leagueView, document.getElementById(league_view_id));	

	var playerNamesView = new PlayerNamesView();
	ko.applyBindings(playerNamesView, document.getElementById(player_names_view_id));	

	var navigationView = new NavigationView();
	
})