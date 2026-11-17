Game.interstellar.rocketParts = (function(){

	var instance = {};

	instance.entries = {};
	instance.categoryEntries = {};

	instance.initialise = function(){
		for (var id in Game.rocketPartsData) {
            var data = Game.rocketPartsData[id];
            
            this.navCount++;
            this.entries[id] = $.extend({}, data, {
                id: id,
                htmlId: 'rocpart_' + id,
                count: 0,
                displayNeedsUpdate: true
            });
        }
	}

    instance.calcCost = function(self, resource){
        return Math.floor(self.defaultCost[resource.toString()] * Math.pow(1.1,self.count) * rocketPrice);
    }

    instance.updateCost = function(entryName){
        for(var resource in this.entries[entryName].cost){
            var target = 0;
            for(var i = 0; i < Object.keys(Game.interstellarUI.rocketPartObservers[entryName]).length; i++){
                if(resource == Game.interstellarUI.rocketPartObservers[entryName][i].resource){
                    this.entries[entryName].cost[resource.toString()] = this.calcCost(this.entries[entryName], resource);
                    Game.interstellarUI.rocketPartObservers[entryName][i].value = this.entries[entryName].cost[resource.toString()];
                }
            }
        }
    }

    instance.buildPart = function(entryName, buyNum) {
        // Add the buildings and clamp to the maximum
        for(var i = 0; i < buyNum; i++){
            var resourcePass = 0;
            for(var resource in this.entries[entryName].cost){
                if(window[resource.toString()] >= this.entries[entryName].cost[resource.toString()]){
                    resourcePass += 1;
                }
            }
            if(resourcePass === Object.keys(Game.interstellar.rocketParts.entries[entryName].cost).length){
                var newValue = Math.floor(this.entries[entryName].count + 1);
                this.entries[entryName].count = Math.min(newValue, this.entries[entryName].max);
                for(var resource in this.entries[entryName].cost){
                    window[resource.toString()] -= this.entries[entryName].cost[resource.toString()];
                }            
                this.entries[entryName].displayNeedsUpdate = true;
            }
        }
        this.updateCost(entryName);
    };

    instance.unlock = function(id) {
        this.entries[id].unlocked = true;
        this.entries[id].displayNeedsUpdate = true;
    };

	instance.getPartData = function(id) {
        return this.entries[id];
    };

	return instance;

}());