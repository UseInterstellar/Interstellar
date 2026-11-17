STATISTIC_TYPE = {
    NUMBER: 1,
    TIME: 2
};

Game.statistics = (function(){

    var instance = {};

    instance.dataVersion = 1;
    instance.entries = {};
    instance.statisticTypeCount = 0;

    instance.initialise = function() {
        this.createStatistic("manualResources", Game.constants.statisticCategoryGeneral, "Resources Mined By Hand");

        for(var i = 1; i <= Game.constants.maxTier; i++) {
            this.createStatistic("tierOwned" + i, Game.constants.statisticCategoryGeneral, "Tier " + i + " Machines Owned");
        }

        this.createStatistic("tabsUnlocked", Game.constants.statisticCategoryUnlockable, "Tabs Unlocked", 7);
        this.createStatistic("resourcesUnlocked", Game.constants.statisticCategoryUnlockable, "Resources Unlocked", 16);
        this.createStatistic("techResearched", Game.constants.statisticCategoryUnlockable, "Technologies Researched", 26);
        this.createStatistic("placesExplored", Game.constants.statisticCategoryUnlockable, "Places Explored", 10);
        this.createStatistic("wondersBuilt", Game.constants.statisticCategoryUnlockable, "Wonders Built", 4);
        this.createStatistic("wondersActivated", Game.constants.statisticCategoryUnlockable, "Wonders Activated", 9);
        this.createStatistic("rebirthCount", Game.constants.statisticCategoryUnlockable, "Times rebirthed", 0);  

        this.createStatistic("sessionTime", Game.constants.statisticCategoryTiming, "Session time", 0, STATISTIC_TYPE.TIME);
        this.createStatistic("timePlayed", Game.constants.statisticCategoryTiming, "Time Played", 0, STATISTIC_TYPE.TIME);
        
        // Set some defaults
        this.add('resourcesUnlocked', 3);

        console.debug("Loaded " + this.statisticTypeCount + " Statistics");
    };

    instance.update = function(delta) {
        this.updateUnlockedTabs();
    };

    instance.updateUnlockedTabs = function() {
        // start at 1 for the resources tab
        var tabCount = 1 + tabsUnlocked.length;
        tabCount += $.inArray("solCenterTopTab", resourcesUnlocked) >= 0 ? 1 : 0;

        this.setValue('tabsUnlocked', tabCount);
    };

    instance.setValue = function(id, value, valueAlltime) {
        this.entries[id].value = value;
        this.entries[id].valueAlltime = valueAlltime;
        this.entries[id].displayNeedsUpdate = true;
    };

    instance.add = function(id, value) {
        if (!this.entries[id]) {
            console.warn("Statistic not defined: " + id);
            return;
        }

        this.entries[id].value += value || 1;
        this.entries[id].valueAlltime += value || 1;
        this.entries[id].displayNeedsUpdate = true;
    };

    instance.get = function(id, getAlltime) {
        if (getAlltime === true) {
            return this.entries[id].valueAlltime;
        }

        return this.entries[id].value;
    };

    instance.createStatistic = function(id, category, title, maxValue, type) {
        var data = {
            id: id,
            category: category,
            title: title,
            value: 0,
            valueAlltime: 0,
            max: maxValue || 0,
            type: type || STATISTIC_TYPE.NUMBER,
            displayNeedsUpdate: true
        };

        this.statisticTypeCount++;
        this.entries[data.id] = data;
    };

    instance.save = function(data) {
        data.statistics = {version: this.dataVersion, entries: {}};
        for(var id in this.entries) {
            if(this.entries[id].value > 0) {
                data.statistics.entries[id] = {v: this.entries[id].value, va: this.entries[id].valueAlltime};
            }
        }
    };

    instance.load = function(data) {
        this.loadLegacy(data);

        if(data.statistics) {
            if(data.statistics.version && data.statistics.version === this.dataVersion) {
                for(var id in data.statistics.entries) {
                    if(this.entries[id]){
                        this.setValue(id, data.statistics.entries[id].v, data.statistics.entries[id].va);
                    }
                }
            }
        }

        // Reset some statistics that we don't care about being persistent, might have to add a flag for em later
        this.setValue('sessionTime', 0, 0);
    };

    // backwards compatibility with the old stats
    instance.loadLegacy = function(data) {
        if(data.handMined) {this.setValue('manualResources', data.handMined, data.handMined)}
        if(data.tier1) {this.setValue('tierOwned1', data.tier1, data.tier1)}
        if(data.tier2) {this.setValue('tierOwned2', data.tier2, data.tier2)}
        if(data.tier3) {this.setValue('tierOwned3', data.tier3, data.tier3)}
        if(data.tier4) {this.setValue('tierOwned4', data.tier4, data.tier4)}
        if(data.tier5) {this.setValue('tierOwned5', data.tier5, data.tier5)}
        if(data.tier6) {this.setValue('tierOwned6', data.tier6, data.tier6)}
        if(data.tabsUnlockedNum) {this.setValue('tabsUnlocked', data.tabsUnlockedNum, data.tabsUnlockedNum)}
        if(data.resourcesUnlockedNum) {this.setValue('resourcesUnlocked', data.resourcesUnlockedNum, data.resourcesUnlockedNum)}
        if(data.techsResearchedNum) {this.setValue('techResearched', data.techsResearchedNum, data.techsResearchedNum)}
        if(data.placesExploredNum) {this.setValue('placesExplored', data.placesExploredNum, data.placesExploredNum)}
        if(data.wondersBuiltNum) {this.setValue('wondersBuilt', data.wondersBuiltNum, data.wondersBuiltNum)}
        if(data.wondersActivatedNum) {this.setValue('wondersActivated', data.wondersActivatedNum, data.wondersActivatedNum)}
        if(data.secondsTotal) {this.setValue('timePlayed', data.secondsTotal, data.secondsTotal)}
    };

    return instance;
}());
