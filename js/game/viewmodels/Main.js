define(['knockout', 'pager', 'game/models/Game'], function(ko, pager, Game) {
    return function MainViewModel() {
    	var self = this;
    	self.game = new Game();
        self.game.createEmptyPlayers();
        	
    	self.playerNamesSelected = function() {
            pager.navigate('#!/league');
    		self.game.createLeague();
    	}
        
    	self.quantitySelected = function() {
            pager.navigate('#!/playernames');
            self.game.createEmptyPlayers();
            
    	}
        
	
        self.updateCurrentMatch = function() {
            self.game.updateCurrentMatch();
        }

	
        
        
	
    }
});
