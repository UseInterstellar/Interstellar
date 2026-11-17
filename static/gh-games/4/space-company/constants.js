COST_TYPE = {
    FIXED: 0
};

TECH_TYPE = {
    UPGRADE: 0,
    UNLOCK: 1
};

BUILDING_TYPE = {
    PRODUCER: 0
};

RESOURCE_OBSERVER_TYPE = {
    CURRENT_VALUE: 0,
    SPECIFIC_VALUE: 1,
    CAPACITY: 2,
    PER_SECOND: 3
};

RESOURCE = {
	Energy: 'energy',
	Plasma: 'plasma',
	Uranium: 'uranium',
	Lava: 'lava',
	Oil: 'oil',
	Metal: 'metal',
	Gem: 'gem',
	Charcoal: 'charcoal',
	Wood: 'wood',
	Silicon: 'silicon',
	Lunarite: 'lunarite',
	Methane: 'methane',
	Titanium: 'titanium',
	Gold: 'gold',
	Silver: 'silver',
	Hydrogen: 'hydrogen',
	Helium: 'helium',
	Ice: 'ice',
	Meteorite: 'meteorite',
	Science: 'science',
	RocketFuel: 'rocketFuel'
};

INDEX_NONE = -1;

Game.constants = (function(){

    var instance = {};
    instance.iconPath = "Icons/";
    instance.iconExtension = "png";

    instance.rank = ["Space Noob", "Space Explorer", "Solar Traveler", "Spaceship Pilot", "Dyson Sphere Technician", "Wonder Builder", "Overlord Associate", "Antimatter Tester", "Rocket Engineer", "Interstellar Space Farer", "Fleet Commander", "Faction Diplomat", "Console Cheater", "Save File Editor", "Source Code Hacker", "The Prestiged"]
    instance.achievementMax = 1000;
    instance.achievementIconsPerRow = 4;
    instance.achievementResourceBrackets = [50, 50000, 50000000, 50000000000, 50000000000000];
    instance.achievementProducerBrackets = [5, 25, 75, 150, 250];
    instance.achievementBracketColors = ["#9d9d9d", "#1eff00", "#0070dd", "#a335ee", "#ff8000"];

    instance.achievementCategoryResources = "Resources";
    instance.achievementCategoryProducers = "Producers";

    instance.statisticCategoryGeneral = "General";
    instance.statisticCategoryUnlockable = "Unlockables";
    instance.statisticCategoryTiming = "Timing";

    instance.maxTier = 6;

    instance.enableStorageNotifications = false;
    instance.enableMachineTab = false;

    return instance;
}());
