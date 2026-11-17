Game.interstellar = (function(){

	var instance = {};

	instance.dataVersion = 1;
    instance.entries = {};
    instance.categoryEntries = {};
    instance.navCount = 0;

	instance.initialise = function (){
		for (var id in Game.interstellarData) {
            var data = Game.interstellarData[id];
            
            this.navCount++;
            this.entries[id] = $.extend({}, data, {
                id: id,
                htmlId: 'intnav_' + id,
                current: 0,
                displayNeedsUpdate: true
            });
            
        }

        console.debug("Loaded " + this.navCount + " Interstellar Navs");
        this.comms.initialise();
        this.rocketParts.initialise();
        this.rocket.initialise();
        this.antimatter.initialise();
        this.military.initialise();
        this.stars.initialise();
	}

	instance.getInterstellarData = function(id) {
        return this.entries[id];
    };

    instance.save = function(data){
        data.interstellar = {comms: {}, rocket: {}, rocketParts: {}, antimatter: {}, stars: {}, military: {}};
        for(id in this.comms.entries){
            data.interstellar.comms[id] = this.comms.entries[id];
        }
        for(id in this.rocket.entries){
            data.interstellar.rocket[id] = this.rocket.entries[id];
        }
        for(id in this.rocketParts.entries){
            data.interstellar.rocketParts[id] = this.rocketParts.entries[id];
        }
        for(id in this.antimatter.entries){
            data.interstellar.antimatter[id] = this.antimatter.entries[id];
        }
        for(id in this.military.entries){
            data.interstellar.military[id] = this.military.entries[id];
        }
        for(id in this.stars.entries){
            data.interstellar.stars[id] = this.stars.entries[id];
        }
    };

    instance.load = function(data){
        if(data.interstellar){
            if(typeof data.interstellar.comms !== 'undefined'){
                for(id in data.interstellar.comms){
                    this.comms.entries[id].count = data.interstellar.comms[id].count;
                }
            }
            if(typeof data.interstellar.rocket !== 'undefined'){
                for(id in data.interstellar.rocket){
                    this.rocket.entries[id].built = data.interstellar.rocket[id].built;
                }
            }
            if(typeof data.interstellar.rocketParts !== 'undefined'){
                for(id in data.interstellar.rocketParts){
                    this.rocketParts.entries[id].count = data.interstellar.rocketParts[id].count;
                }
            }
            if(typeof data.interstellar.antimatter !== 'undefined'){
                for(id in data.interstellar.antimatter){
                    this.antimatter.entries[id].count = data.interstellar.antimatter[id].count;
                }
            }
            if(typeof data.interstellar.military !== 'undefined'){
                for(id in data.interstellar.military){
                    this.military.entries[id].count = data.interstellar.military[id].count;
                }
            }
            if(typeof data.interstellar.stars !== 'undefined'){
                for(id in data.interstellar.stars){
                    if(this.stars.entries[id]){
                        this.stars.entries[id].explored = data.interstellar.stars[id].explored;
                        this.stars.entries[id].owned = data.interstellar.stars[id].owned;
                        this.stars.entries[id].spy = data.interstellar.stars[id].spy;
                    }
                }
            }
        }
    };

    instance.redundantChecking = function(){
        this.military.updateShips();
        this.military.updateFleetStats();
        var objects = ["comms", "rocket", "antimatter", "stargate"];
        for(var i = 0; i < objects.length; i++){
            if(contains(activated, objects[i]) == true){
                if(objects[i] == 'stargate'){
                    this.entries['travel'].unlocked = true;
                    this.entries['travel'].displayNeedsUpdate = true;
                    this.entries['military'].unlocked = true;
                    this.entries['military'].displayNeedsUpdate = true;
                } else {
                    this.entries[objects[i]].unlocked = true;
                    this.entries[objects[i]].displayNeedsUpdate = true;
                }
                document.getElementById("interstellarTab").className = "";
            }
        }
        for(var id in this.stars.entries){
            var data = this.stars.getStarData(id);
            if(data.explored == true){
                data.displayNeedsUpdate = true;
                document.getElementById('star_' + id + '_conquer').className = "";
            }
        }
        for(var id in this.entries){
            if(id == "rocket" || "travel")continue;
            console.log(id)
            for(var entry in Game.interstellar[id].entries){
                Game.interstellar[id].updateCost[entry];
            }
        }

        // stargaze
        if(sphere != 0){
            Game.stargaze.unlocked = true;
        }
    };

	return instance;


}());

Game.interstellar.comms = (function(){

    var instance = {};

    instance.entries = {};
    instance.categoryEntries = {};
    instance.entries = {};

    instance.initialise = function(){
        for (var id in Game.commsData) {
            var data = Game.commsData[id];
            this.navCount++;
            this.entries[id] = $.extend({}, data, {
                id: id,
                htmlId: 'comm_' + id,
                count: 0,
                displayNeedsUpdate: true
            });
        }
    };

    instance.calcCost = function(self, resource){
        return Math.floor(self.defaultCost[resource.toString()] * Math.pow(1.1,self.count));
    };

    instance.updateCost = function(entryName){
        for(var resource in this.entries[entryName].cost){
            var target = 0;
            for(var i = 0; i < Object.keys(Game.interstellarUI.commObservers[entryName]).length; i++){
                if(resource == Game.interstellarUI.commObservers[entryName][i].resource){
                    this.entries[entryName].cost[resource.toString()] = this.calcCost(this.entries[entryName], resource);
                    Game.interstellarUI.commObservers[entryName][i].value = this.entries[entryName].cost[resource.toString()];
                }
            }
        }
    };

    instance.buildMachine = function(entryName) {
        // Add the buildings and clamp to the maximum
        var data = this.entries[entryName];
        if(data.count >= data.max){
            return;
        }
        var resourcePass = 0;
        for(var resource in data.cost){
            if(window[resource.toString()] >= data.cost[resource.toString()]){
                resourcePass += 1;
            }
        }
        if(resourcePass === Object.keys(data.cost).length){
            data.count += 1;
            for(var resource in data.cost){
                window[resource.toString()] -= data.cost[resource.toString()];
            }            
            data.displayNeedsUpdate = true;
        }
        this.updateCost(entryName);
    };

    instance.unlock = function(id) {
        this.entries[id].unlocked = true;
        this.entries[id].displayNeedsUpdate = true;
    };

    instance.getMachineData = function(id) {
        return this.entries[id];
    };

    return instance;

}());

Game.interstellar.antimatter = (function(){

    var instance = {};

    instance.entries = {};
    instance.categoryEntries = {};
    instance.entries = {};

    instance.initialise = function(){
        for (var id in Game.antimatterData) {
            var data = Game.antimatterData[id];
            this.navCount++;
            this.entries[id] = $.extend({}, data, {
                id: id,
                htmlId: 'antimatter_' + id,
                count: 0,
                displayNeedsUpdate: true
            });
        }
    };

    instance.calcCost = function(self, resource){
        return Math.floor(self.defaultCost[resource.toString()] * Math.pow(1.1,self.count));
    };

    instance.updateCost = function(entryName){
        for(var resource in this.entries[entryName].cost){
            var target = 0;
            for(var i = 0; i < Object.keys(Game.interstellarUI.antimatterObservers[entryName]).length; i++){
                if(resource == Game.interstellarUI.antimatterObservers[entryName][i].resource){
                    this.entries[entryName].cost[resource.toString()] = this.calcCost(this.entries[entryName], resource);
                    Game.interstellarUI.antimatterObservers[entryName][i].value = this.entries[entryName].cost[resource.toString()];
                }
            }
        }
    };

    instance.buildMachine = function(entryName) {
        // Add the buildings and clamp to the maximum
        var data = this.entries[entryName];
        var resourcePass = 0;
        for(var resource in data.cost){
            if(window[resource.toString()] >= data.cost[resource.toString()]){
                resourcePass += 1;
            }
        }
        if(resourcePass === Object.keys(data.cost).length){
            data.count += 1;
            for(var resource in data.cost){
                window[resource.toString()] -= data.cost[resource.toString()];
            }            
            data.displayNeedsUpdate = true;
        }
        this.updateCost(entryName);
    };

    instance.destroyMachine = function(entryName){
        if(this.entries[entryName].count > 0){
            this.entries[entryName].count -= 1;
            this.updateCost(entryName);
        }
    };

    instance.unlock = function(id) {
        this.entries[id].unlocked = true;
        this.entries[id].displayNeedsUpdate = true;
    };

    instance.getMachineData = function(id) {
        return this.entries[id];
    };

    return instance;

}());

Game.interstellar.military = (function(){

    var instance = {};

    instance.entries = {};
    instance.categoryEntries = {};
    instance.entries = {};

    instance.power = 0;
    instance.defense = 0;
    instance.speed = 0;

    instance.activePower = 0;
    instance.activeDefense = 0;
    instance.activeSpeed = 0;

    instance.initialise = function(){
        for (var id in Game.militaryData) {
            var data = Game.militaryData[id];
            this.navCount++;
            this.entries[id] = $.extend({}, data, {
                id: id,
                htmlId: 'milit_' + id,
                count: 0,
                active: 0,
                displayNeedsUpdate: true
            });
        }
    };

    instance.calcCost = function(self, resource){
        return Math.floor(self.defaultCost[resource.toString()] * Math.pow(1.1,self.count));
    };

    instance.updateCost = function(entryName){
        for(var resource in this.entries[entryName].cost){
            var target = 0;
            for(var i = 0; i < Object.keys(Game.interstellarUI.militaryObservers[entryName]).length; i++){
                if(resource == Game.interstellarUI.militaryObservers[entryName][i].resource){
                    this.entries[entryName].cost[resource.toString()] = this.calcCost(this.entries[entryName], resource);
                    Game.interstellarUI.militaryObservers[entryName][i].value = this.entries[entryName].cost[resource.toString()];
                }
            }
        }
    };

    instance.buildShip = function(entryName) {
        // Add the ships and clamp to the maximum
        var resourcePass = 0;
        var ship = this.entries[entryName];
        for(var resource in ship.cost){
            if(window[resource.toString()] >= ship.cost[resource.toString()]){
                resourcePass += 1;
            }
        }
        if(resourcePass === Object.keys(ship.cost).length){
            ship.count += 1;
            for(var resource in ship.cost){
                window[resource.toString()] -= ship.cost[resource.toString()];
            }            
            ship.displayNeedsUpdate = true;
        }
        this.updateCost(entryName);
        this.updateFleetStats();
        this.updateShips();
    };

    instance.updateFleetStats = function(){
        // Total Ships
        var number = 0;
        var stats = {power: 0, defense: 0, speed: 0};
        for(var shipClass in this.entries){
            var data = this.entries[shipClass];
            var count = data.count;
            stats.power += data.stats.power*count;
            stats.defense += data.stats.defense*count;
            stats.speed += data.stats.speed*count;
            number += count;
        }
        if(number != 0){
            stats.speed = Math.floor(stats.speed/number);
            for(var stat in stats){
                var updateList = document.getElementsByClassName("fleet" + Game.utils.capitaliseFirst(stat));
                for(var j = 0; j < updateList.length; j++){
                    updateList[j].textContent = stats[stat];
                }
            }
            this.power = stats.power;
            this.defense = stats.defense;
            this.speed = stats.speed;
        }

        //Active Ships
        var number = 0;
        stats = {power: 0, defense: 0, speed: 0};
        for(var shipClass in this.entries){
            var data = this.entries[shipClass];
            var count = data.active;
            stats.power += data.stats.power*count;
            stats.defense += data.stats.defense*count;
            stats.speed += data.stats.speed*count;
            number += count;
        }
        stats.speed = Math.floor(stats.speed/number);
        if(number == 0)stats.speed = 0;
        for(var stat in stats){
            var updateList = document.getElementsByClassName("activeFleet" + Game.utils.capitaliseFirst(stat));
            for(var j = 0; j < updateList.length; j++){
                updateList[j].textContent = stats[stat];
            }
        }
        this.activePower = stats.power;
        this.activeDefense = stats.defense;
        this.activeSpeed = stats.speed;
    };

    instance.updateShips = function(){
        for(var ship in this.entries){
            if(this.entries[ship].displayNeedsUpdate == true){
                var updateList = document.getElementsByClassName(ship + "Count");
                for(var i = 0; i < updateList.length; i++){
                    updateList[i].textContent = this.entries[ship].count;
                }
                var activeUpdateList = document.getElementsByClassName(ship + "Active");
                for(var i = 0; i < activeUpdateList.length; i++){
                    activeUpdateList[i].textContent = this.entries[ship].active;
                }
                ship.displayNeedsUpdate = false;
            }
        }
    };

    instance.updateActiveShips = function(){
        for(var ship in this.entries){
            if(this.entries[ship].displayNeedsUpdate == true){
                var activeUpdateList = document.getElementsByClassName(ship + "Active");
                for(var i = 0; i < activeUpdateList.length; i++){
                    activeUpdateList[i].textContent = this.entries[ship].active;
                }
                ship.displayNeedsUpdate = false;
            }
        }
    }

    instance.addShip = function(shipName, num){
        var ship = this.entries[shipName];
        if(num == "max"){
            ship.active = ship.count;
        } else if(num == "none"){
            ship.active = 0;
        } else if(ship.active + num <= ship.count && ship.active + num >= 0){
            ship.active += num;
        }
        ship.displayNeedsUpdate = true;
        this.updateFleetStats();
        this.updateActiveShips();
        for(var star in Game.interstellar.stars.entries){
            var data = Game.interstellar.stars.entries[star];
            if(data.explored == true && data.owned == false){
                data.displayNeedsUpdate = true;
            }
        }
    };

    instance.getThreat = function(power, speed, num){
        var threatLevels = ["•", "••", "•••", "I", "II", "III", "X", "XX", "XXX", "XXXX", "XXXXX", "XXXXXX"];
        var threshholds = [320,800,1440,2240,3200,4320,5600,7040,8640,10400,12320,14400];
        var level = 0;
        for(var i = 0; i < threshholds.length; i++){
            if(power*speed >= threshholds[i]){
                level += 1;
            } else {
                continue;
            }
        }
        if(num){
            return level;
        } else {
            return threatLevels[level];
        }
    };

    instance.getSpyChance = function(star, multi){
        var threat = this.getThreat(star.stats.power*(multi||1), star.stats.speed, true)+1;
        return chance = this.entries.scout.active/threat*(20/(star.spy+1));
    }

    instance.spy = function(starName){
        console.log("Spying on " + starName);
        var star = Game.interstellar.stars.getStarData(starName);
        var chance = this.getSpyChance(star)/100;
        var roll = Math.random();
        if(chance >= roll){
            star.spy += 1;
            Game.notifyInfo("Successful Espionage!", "You have found out more about the star system!");
        } else {
            var scout = this.entries.scout;
            scout.count -= scout.active;
            scout.active = 0;
            Game.notifyInfo("Espionage Failed!", "You lost all of your active scouts.");
        }
        star.displayNeedsUpdate = true;
        this.updateFleetStats();
        this.updateShips();
    };

    instance.getMultiplier = function(factionId){
        var op=Game.stargaze.getStargazeData(factionId).opinion;
        if(op>=20&&op<60){
            return 0.5;
        } else if(op>=-20&&op<20){
            return 1;
        } else if(op>=-60&&op<-20){
            return 2;
        } else if(op<-60){
            return 3;
        } else{
            return 0;
        }
    };


    instance.getChance = function(star){
        if(this.power!=0){
            var multi = this.getMultiplier(star.factionId);
            if(multi == 0){
                return "peace";
            }
            var damage = (this.activePower/(star.stats.defense*multi))*this.activeSpeed;
            var starDamage = (star.stats.power*multi/Math.max(this.activeDefense,1))*star.stats.speed;
            if(damage > starDamage){
                return (damage/starDamage)-0.5;
            } else {
                if(damage != 0)return Math.max(0, 1.5-(starDamage/damage));
            }
        }
    }

    instance.invadeSystem = function(starName){
        if(this.power!=0){
            var star = Game.interstellar.stars.getStarData(starName);
            var chance = this.getChance(star);
            if(chance == "peace"){
                instance.absorbSystem(starName);
                return;
            }
            var roll = Math.random();
            if(chance >= roll){
                star.owned = true;
                newUnlock('solCenter');
                var losses = false;
                for(var ship in this.entries){
                    var shipData = this.getShipData(ship);
                    for(var i = 0; i < shipData.active; i++){
                        // Chance to keep the ship
                        var destroyChance = Math.random();
                        if(destroyChance > chance){
                            losses = true;
                            shipData.active -= 1;
                            shipData.count -= 1;
                        }
                    }
                    shipData.displayNeedsUpdate = true;
                }
                if(losses){
                    Game.notifyInfo("Successful Invasion!", "You have conquered " + star.name + " and now gain production boosts from it in " + star.resource1 + " and " + star.resource2 + ". Despite your victory, you may have lost some ships in battle.");
                } else {
                    Game.notifyInfo("Successful Invasion!", "You have conquered " + star.name + " without any losses and now gain production boosts from it in " + star.resource1 + " and " + star.resource2 + "!");                    
                }
                var faction = Game.stargaze.getStargazeData(star.factionId);
                faction.opinion -= 10;
                faction.displayNeedsUpdate = true;
            } else {
                for(var ship in this.entries){
                    var shipData = this.getShipData(ship);
                    for(var i = shipData.active; i > 0; i--){
                        // Destroy all active ships
                        shipData.active -= 1;
                        shipData.count -= 1;
                    }
                    shipData.displayNeedsUpdate = true;
                }
                Game.notifyInfo("Failed Invasion!", "Unfortunately, the enemy forces were too strong for you. They have destroyed all of your active ships.");
            }
            star.displayNeedsUpdate = true;
            this.updateFleetStats();
            this.updateShips();
        }
    };

    instance.absorbSystem = function(id){
        var data = Game.interstellar.stars.entries[id];
        var faction = Game.stargaze.getStargazeData(data.factionId);
        if(faction.opinion >= 60){
            faction.opinion -= 5;
            data.owned = true;
            data.displayNeedsUpdate = true;
            faction.displayNeedsUpdate = true;
            Game.notifyInfo("Successful Absorbtion!", "You have conquered " + data.name + " peacefully and now gain production boosts from it in " + data.resource1 + " and " + data.resource2 + ". Congratulations!");
        }
    };

    instance.unlock = function(id) {
        this.entries[id].unlocked = true;
        this.entries[id].displayNeedsUpdate = true;
    };

    instance.getShipData = function(id) {
        return this.entries[id];
    };

    return instance;

}());
