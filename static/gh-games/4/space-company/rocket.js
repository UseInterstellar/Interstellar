Game.interstellar.rocket = (function(){

	var instance = {};

	instance.entries = {};
	instance.categoryEntries = {};
	instance.entries = {};

	instance.initialise = function(){
		for (var id in Game.rocketData) {
            var data = Game.rocketData[id];
            this.navCount++;
            this.entries[id] = $.extend({}, data, {
                id: id,
                htmlId: 'roc_' + id,
                count: 0,
                built: false,
                displayNeedsUpdate: true
            });
        }
	}

    instance.updateCost = function(entryName){
        var data = this.entries[entryName];
        for(var part in data.cost){
            var target = 0;
            for(var i = 0; i < Object.keys(Game.interstellarUI.rocketPartObservers[entryName]).length; i++){
                if(part == Game.interstellarUI.rocketPartObservers[entryName][i].part){
                    Game.interstellarUI.rocketPartObservers[entryName][i].value = data.cost[part.toString()];
                }
            }
        }
    }

    instance.buildRocket = function(entryName){
        var partPass = 0;
        for(var part in this.entries[entryName].cost){
            if(Game.interstellar.rocketParts.entries[part].count >= this.entries[entryName].cost[part]){
                partPass += 1;
            }
        }
        if(partPass === Object.keys(Game.interstellar.rocket.entries[entryName].cost).length){
            for(var part in this.entries[entryName].cost){
            }
            this.entries[entryName].built = true;
            this.entries[entryName].displayNeedsUpdate = true;
        }
    }

    instance.unlock = function(id) {
        this.entries[id].unlocked = true;
        this.entries[id].displayNeedsUpdate = true;
    };

	instance.getRocketData = function(id) {
        return this.entries[id];
    };

	return instance;

}());