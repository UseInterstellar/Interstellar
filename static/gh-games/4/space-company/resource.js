Game.resources = (function(){

    var instance = {};

    instance.dataVersion = 5;
    instance.entries = {};
    instance.categoryEntries = {};
    instance.storageUpgrades = {};
    instance.resourceTypeCount = 0;
    instance.resourceCategoryCount = 0;
    instance.storageUpgradeCount = 0;

    instance.initialise = function() {
        for (var id in Game.resourceData) {
            var data = Game.resourceData[id];
            this.resourceTypeCount++;
            this.entries[id] = $.extend({}, data, {
                id: id,
                htmlId: 'res_' + id,
                current: 0,
                perSecond: 0,
                perClick: 1,
                iconPath: Game.constants.iconPath,
                iconExtension: Game.constants.iconExtension,
                displayNeedsUpdate: true,
                hidden: false
            });

            this.entries[id].capacity = data.baseCapacity;
        }

        for (var id in Game.resourceCategoryData) {
            var data = Game.resourceCategoryData[id];
            this.resourceCategoryCount++;
            this.categoryEntries[id] = $.extend({}, data, {
                id: id
            });
        }

        for (var id in Game.storageData) {
            var data = Game.storageData[id];
            this.storageUpgradeCount++;
            this.storageUpgrades[id] = $.extend({}, data, {
                id: id,
                htmlId: "store_" + id
            });
        }

        console.debug("Loaded " + this.resourceCategoryCount + " Resource Categories");
        console.debug("Loaded " + this.resourceTypeCount + " Resource Types");
    };

    instance.update = function(delta) {
        for(var id in this.entries) {
            var addValue = this.entries[id].perSecond * delta;
            this.addResource(id, addValue);
        }
    };

    instance.save = function(data) {
        data.resources = { v: this.dataVersion, r: {}};
        for(var key in this.entries) {
            data.resources.r[key] = {
                n: this.entries[key].current,
                u: this.entries[key].unlocked
            }
        }
    };

    instance.load = function(data) {
        if(data.resources) {
            if(data.resources.v && data.resources.v === this.dataVersion) {
                for(var id in data.resources.i) {
                    if(this.entries[id]) {
                        this.addResource(id, data.resources.r[id].n);
                        this.entries[id].unlocked = data.resources.r[id].u;
                    }
                }
            }
        }
    };

	// TODO: change to data-driven resources when available
	instance.getResource = function(id) {
		if (typeof window[id] === 'undefined') {
			return 0;
		}
		return window[id];
	};

	// TODO: change to data-driven resources when available
	instance.getStorage = function(id) {
		if (id === RESOURCE.Energy) {
			return getMaxEnergy();
		} else if (id === RESOURCE.Plasma) {
			return getMaxPlasma();
		} else if (id === RESOURCE.Science) {
			// -1 for unlimited storage
			return -1;
		} else if (id === RESOURCE.RocketFuel) {
			return -1;
		} else if (typeof window[id + 'Storage'] === 'undefined') {
			return 0;
		}
		return window[id + 'Storage'];
	};

	// TODO: change to data-driven resources when available
	instance.getProduction = function(id) {
		if (typeof window[id + 'ps'] === 'undefined') {
			return 0;
		}
		return window[id + 'ps'];
	};

	// TODO: change to data-driven resources when available
	instance.addResource = function(id, count) {
		if(isNaN(count) || count === null || Math.abs(count) <= 0) {
			return;
		}

		if (typeof window[id] === 'undefined') {
			return;
		}

		// Add the resource and clamp
		var newValue = window[id] + count;
		var storage = this.getStorage(id);
		if (storage >= 0) {
			window[id] = Math.max(0, Math.min(newValue, storage));
		} else {
			window[id] = Math.max(0, newValue);
		}
	};

	// TODO: change to data-driven resources when available
	instance.takeResource = function(id, count) {
		if(isNaN(count) || count === null || Math.abs(count) <= 0) {
			return;
		}

		if (typeof window[id] === 'undefined') {
			return;
		}

		// Subtract the resource and clamp
		var newValue = window[id] - count;
		var storage = this.getStorage(id);
		if (storage >= 0) {
			window[id] = Math.max(0, Math.min(newValue, storage));
		} else {
			window[id] = Math.max(0, newValue);
		}
	};

	// TODO: change to data-driven resources when available
	instance.maxResource = function(id) {
		if (typeof window[id] === 'undefined') {
			return;
		}

		// resources without a storage cap will return -1 so do nothing
		if (getStorage(id) < 0) {
			return;
		}

		window[id] = getStorage(id);
	};

    instance.setPerSecondProduction = function(id, value) {
        if(!this.entries[id]) {
            console.error("Unknown Resource: " + id);
            return;
        }

        if (value < 0 || isNaN(value) || value === undefined) {
            console.error("Invalid per second value: " + value + " for " + id);
            return;
        }

        this.entries[id].perSecond = value;
    };

    instance.upgradeStorage = function(id){
        var upgradeData = this.storageUpgrades[id];
        var res = this.getResourceData(upgradeData.resource);
        if(res.current >= res.capacity*storagePrice){
            res.current -= res.capacity*storagePrice;
            res.capacity *= 2;
            res.displayNeedsUpdate = true;

            for(var r in upgradeData.cost){
                upgradeData.cost[r] *= 2;
            }
            upgradeData.displayNeedsUpdate = true;
        }
    };

    instance.calcCost = function(self, resource){
        return Math.floor(Game.buildingData[self.id].cost[resource.toString()] * Math.pow(1.1,self.current));
    };

    instance.updateCost = function(data){
        // TODO
    };

    instance.buyMachine = function(id, count){
        var data = Game.buildings.getBuildingData(id);
        var resourcePass = 0;
        for(var resource in data.cost){
            var res = Game.resources.getResourceData(resource);
            if(res.current >= data.cost[resource]){
                resourcePass += 1;
            }
        }
        if(resourcePass === Object.keys(data.cost).length){
            data.current += 1;
            for(var resource in data.cost){
                var res = Game.resources.getResourceData(resource);
                res.current -= data.cost[resource];
            }
            this.updateCost(data);
            this.updateResourcesPerSecond();
            data.displayNeedsUpdate = true;
        }
    };

    instance.destroyMachine = function(id, count){
        var data = Game.buildings.getBuildingData(id);
        if(data.current >= count){
            data.current -= count;
            this.updateCost(data);
            data.displayNeedsUpdate = true;
        }
    };

    instance.updateResourcesPerSecond = function(){
        for(var resource in this.entries){
            var res = this.entries[resource];
            var ps = 0;
            for(var id in Game.buildings.entries){
                var building = Game.buildings.entries[id];
                for(var value in building.resourcePerSecond){
                    if(value == res){
                        var val = building.resourcePerSecond[value];
                        ps += val * building.current;
                    }
                }
            }
            res.perSecond = ps;
        }
    };

    instance.unlock = function(id) {
        this.entries[id].unlocked = true;
        this.entries[id].displayNeedsUpdate = true;
    };

    instance.getResourceData = function(id) {
        return this.entries[id];
    };

    instance.getCategoryData = function(id) {
        return this.categoryEntries[id];
    };

    instance.showByCategory = function(category) {
        for(var id in this.entries) {
            var data = this.entries[id];
            if(data.category === category) {
                data.hidden = false;
            }
        }
    };

    instance.hideByCategory = function(category) {
        for(var id in this.entries) {
            var data = this.entries[id];
            if(data.category === category) {
                data.hidden = true;
            }
        }
    };

    return instance;
}());