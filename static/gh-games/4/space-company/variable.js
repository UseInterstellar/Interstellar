// Variables in save function

var versionNumber = "V0.5.1.2 Beta"; var companyName = "Space";

// unlocked & activated

var researchUnlocked = false; var researched = []; var available = []; var explored = [];
var tabsUnlocked = []; var resourcesUnlocked = []; var noBorder = []; var rocketLaunched = false; var buttonsHidden = [];
var activated = []; var techUnlocked = false; var meteoriteUnlocked = false;
var globalEnergyLock = false;


// Plasma
var plasma = 0; var plasmaps = 0;
var PSU = 0; var PSUSilverCost = 770000; var PSUGoldCost = 770000; var PSUUraniumCost = 550000;
var PSUT2 = 0; var PSUT2SilverCost = 9300000; var PSUT2GoldCost = 9300000; var PSUT2UraniumCost = 6800000;
var heater = 0; var heaterLunariteCost = 75000; var heaterGemCost = 68000; var heaterSiliconCost = 59000; var heaterToggled = true; var heaterEnergyInput = 1000; var heaterHydrogenInput = 10; var heaterOutput = 1;
var plasmatic = 0; var plasmaticLunariteCost = 810000; var plasmaticSiliconCost = 720000; var plasmaticMeteoriteCost = 970; var plasmaticToggled = true; var plasmaticEnergyInput = 8500; var plasmaticHeliumInput = 80; var plasmaticOutput = 10;
var bath = 0; var bathLavaCost = 6200000; var bathGoldCost = 5900000; var bathMeteoriteCost = 12100; var bathToggled = true; var bathEnergyInput = 15000; var bathHydrogenInput = 100; var bathHeliumInput = 100; var bathOutput = 140;

// Energy
var energy = 0; var energyps = 0;
var battery = 0; var batteryMetalCost = 50000; var batteryGemCost = 50000; var batteryLunariteCost = 30000;
var batteryT2 = 0; var batteryT2MetalCost = 550000; var batteryT2GemCost = 550000; var batteryT2LunariteCost = 330000;
var batteryT3 = 0; var batteryT3MetalCost = 5500000; var batteryT3GemCost = 5500000; var batteryT3LunariteCost = 3300000;
var batteryT4 = 0; var batteryT4MetalCost = 55000000; var batteryT4GemCost = 55000000; var batteryT4LunariteCost = 33000000;
var batteryT5 = 0; var batteryT5MetalCost = 490000000; var batteryT5GemCost = 490000000; var batteryT5LunariteCost = 270000000;
var charcoalEngine = 0; var charcoalEngineMetalCost = 50; var charcoalEngineGemCost = 25; var charcoalEngineCharcoalInput = 1; var charcoalEngineOutput = 2;
var solarPanel = 0; var solarPanelMetalCost = 30; var solarPanelGemCost = 35; var solarPanelOutput = 1.5;
var methaneStation = 0; var methaneStationLunariteCost = 110; var methaneStationTitaniumCost = 90; var methaneStationMethaneInput = 6; var methaneStationOutput = 23;
var nuclearStation = 0; var nuclearStationLunariteCost = 20000; var nuclearStationTitaniumCost = 10000; var nuclearStationUraniumInput = 7; var nuclearStationOutput = 153;
var magmatic = 0; var magmaticLunariteCost = 25000; var magmaticGemCost = 20000; var magmaticSilverCost = 15000; var magmaticLavaInput = 11; var magmaticOutput = 191;
var fusionReactor = 0; var fusionReactorLunariteCost = 30000; var fusionReactorTitaniumCost = 20000; var fusionReactorSiliconCost = 15000; var fusionReactorHydrogenInput = 10; var fusionReactorHeliumInput = 10; var fusionReactorOutput = 273;

// Uranium
var uranium = 0; var uraniumStorage = 50; var uraniumNextStorage = 100; var uraniumps = 0;
var grinder = 0; var grinderTitaniumCost = 2000; var grinderLunariteCost = 4000; var grinderGoldCost = 2000; var grinderOutput = 1;
var cubic = 0; var cubicUraniumCost = 80; var cubicLunariteCost = 10000; var cubicOilCost = 10000; var cubicEnergyInput = 40; var cubicOutput = 9;
var enricher = 0; var enricherLunariteCost = 21700; var enricherTitaniumCost = 23000; var enricherSiliconCost = 13500; var enricherEnergyInput = 180; var enricherOutput = 61;
var recycler = 0; var recyclerLunariteCost = 93100; var recyclerMethaneCost = 47000; var recyclerMeteoriteCost = 830; var recyclerEnergyInput = 463; var recyclerOutput = 235;
var planetNuke = 0; var planetNukeTitaniumCost = 486000; var planetNukeSiliconCost = 266000; var planetNukeIceCost = 364000; var planetNukeEnergyInput = 2719; var planetNukeOutput = 2412;

// Lava
var lava = 0; var lavaStorage = 50; var lavaNextStorage = 100; var lavaps = 0;
var crucible = 0; var crucibleGemCost = 8000; var crucibleLunariteCost = 4000; var crucibleOutput = 1;
var extractor = 0; var extractorLunariteCost = 16000; var extractorTitaniumCost = 12000; var extractorSiliconCost = 6000; var extractorEnergyInput = 58; var extractorOutput = 7;
var extruder = 0; var extruderLunariteCost = 69000; var extruderTitaniumCost = 57000; var extruderSiliconCost = 39000; var extruderEnergyInput = 237; var extruderOutput = 43;
var veluptuator = 0; var veluptuatorLunariteCost = 298000; var veluptuatorGoldCost = 121000; var veluptuatorMeteoriteCost = 750; var veluptuatorEnergyInput = 689; var veluptuatorOutput = 187;
var condensator = 0; var condensatorLunariteCost = 288000; var condensatorGemCost = 210000; var condensatorIceCost = 238000; var condensatorEnergyInput = 4142; var condensatorOutput = 2103;

// Oil
var oil = 0; var oilStorage = 50; var oilNextStorage = 100; var oilps = 0;
var pump = 0; var pumpMetalCost = 60; var pumpGemCost = 20; var pumpOutput = 1;
var pumpjack = 0; var pumpjackMetalCost = 250; var pumpjackGemCost = 80; var pumpjackOilCost = 50; var pumpjackEnergyInput = 4; var pumpjackOutput = 10;
var oilField = 0; var oilFieldLunariteCost = 2400; var oilFieldTitaniumCost = 2700; var oilFieldSiliconCost = 3900; var oilFieldEnergyInput = 12; var oilFieldOutput = 63;
var oilRig = 0; var oilRigLunariteCost = 19400; var oilRigTitaniumCost = 16800; var oilRigMeteoriteCost = 760; var oilRigEnergyInput = 44; var oilRigOutput = 246;
var fossilator = 0; var fossilatorUraniumCost = 110000; var fossilatorCharcoalCost = 96000; var fossilatorLavaCost = 167000; var fossilatorEnergyInput = 258; var fossilatorOutput = 2627;

// Metal
var metal = 0; var metalStorage = 50; var metalNextStorage = 100; var metalps = 0;
var miner = 0; var minerMetalCost = 10; var minerWoodCost = 5; var minerOutput = 1;
var heavyDrill = 0; var heavyDrillMetalCost = 160; var heavyDrillGemCost = 60; var heavyDrillOilCost = 50; var heavyDrillEnergyInput = 2; var heavyDrillOutput = 8;
var gigaDrill = 0; var gigaDrillLunariteCost = 2800; var gigaDrillGemCost = 3400; var gigaDrillSiliconCost = 4100; var gigaDrillEnergyInput = 9; var gigaDrillOutput = 108;
var quantumDrill = 0; var quantumDrillLunariteCost = 29000; var quantumDrillGoldCost = 18700; var quantumDrillMeteoriteCost = 900; var quantumDrillEnergyInput = 24; var quantumDrillOutput = 427;
var multiDrill = 0; var multiDrillTitaniumCost = 184000; var multiDrillGoldCost = 184000; var multiDrillOilCost = 170000; var multiDrillEnergyInput = 131; var multiDrillOutput = 4768;

// Gems
var gem = 0; var gemStorage = 50; var gemNextStorage = 100; var gemps = 0;
var gemMiner = 0; var gemMinerMetalCost = 15; var gemMinerGemCost = 10; var gemMinerOutput = 1;
var advancedDrill = 0; var advancedDrillMetalCost = 120; var advancedDrillGemCost = 200; var advancedDrillOilCost = 60; var advancedDrillEnergyInput = 2; var advancedDrillOutput = 4;
var diamondDrill = 0; var diamondDrillLunariteCost = 3400; var diamondDrillGemCost = 8000; var diamondDrillSiliconCost = 4500; var diamondDrillEnergyInput = 15; var diamondDrillOutput = 89;
var carbyneDrill = 0; var carbyneDrillLunariteCost = 21000; var carbyneDrillGemCost = 27000; var carbyneDrillMeteoriteCost = 800; var carbyneDrillEnergyInput = 40;  var carbyneDrillOutput = 358;
var diamondChamber = 0; var diamondChamberUraniumCost = 181000; var diamondChamberCharcoalCost = 185000; var diamondChamberMeteoriteCost = 12500; var diamondChamberEnergyInput = 260;  var diamondChamberOutput = 3747;

// Charcoal
var charcoal = 0; var charcoalStorage = 50; var charcoalNextStorage = 100; var charcoalps = 0; var charcoalToggled = true;
var woodburner = 0; var woodburnerMetalCost = 10; var woodburnerWoodCost = 5; var woodburnerWoodInput = 2; var woodburnerOutput = 1;
var furnace = 0; var furnaceMetalCost = 80; var furnaceWoodCost = 40; var furnaceOilCost = 100; var furnaceEnergyInput = 3; var furnaceWoodInput = 6; var furnaceOutput = 4;
var kiln = 0; var kilnLunariteCost = 3500; var kilnGemCost = 6200; var kilnSiliconCost = 3800; var kilnEnergyInput = 13; var kilnWoodInput = 56; var kilnOutput = 53;
var fryer = 0; var fryerLunariteCost = 15800; var fryerLavaCost = 12500; var fryerMeteoriteCost = 560; var fryerEnergyInput = 34; var fryerWoodInput = 148; var fryerOutput = 210;
var microPollutor = 0; var microPollutorMetalCost = 133000; var microPollutorWoodCost = 189000; var microPollutorLavaCost = 160000; var microPollutorEnergyInput = 187; var microPollutorWoodInput = 950; var microPollutorOutput = 2267;

// Wood
var wood = 0; var woodStorage = 50; var woodNextStorage = 100; var woodps = 0;
var woodcutter = 0; var woodcutterMetalCost = 10; var woodcutterWoodCost = 5; var woodcutterOutput = 1;
var laserCutter = 0; var laserCutterMetalCost = 50; var laserCutterGemCost = 90; var laserCutterOilCost = 40; var laserCutterEnergyInput = 4; var laserCutterOutput = 6;
var deforester = 0; var deforesterLunariteCost = 3000; var deforesterTitaniumCost = 2700; var deforesterSiliconCost = 2500; var deforesterEnergyInput = 16; var deforesterOutput = 74;
var infuser = 0; var infuserLunariteCost = 16000; var infuserOilCost = 31200; var infuserMeteoriteCost = 490; var infuserEnergyInput = 43; var infuserOutput = 297;
var forest = 0; var forestMetalCost = 122000; var forestGemCost = 151000; var forestHydrogenCost = 183000; var forestEnergyInput = 244;  var forestOutput = 3278;

// Silicon
var silicon = 0; var siliconStorage = 50; var siliconNextStorage = 100; var siliconps = 0;
var blowtorch = 0; var blowtorchLunariteCost = 150; var blowtorchTitaniumCost = 30; var blowtorchOutput = 1;
var scorcher = 0; var scorcherLunariteCost = 500; var scorcherGemCost = 1200; var scorcherOilCost = 1600; var scorcherEnergyInput = 18; var scorcherOutput = 9;
var annihilator = 0; var annihilatorLunariteCost = 3000; var annihilatorGemCost = 8300; var annihilatorSilverCost = 2400; var annihilatorEnergyInput = 53; var annihilatorOutput = 40;
var desert = 0; var desertLunariteCost = 20000; var desertSiliconCost = 17700; var desertMeteoriteCost = 400; var desertEnergyInput = 138; var desertOutput = 157;
var tardis = 0; var tardisTitaniumCost = 204000; var tardisSiliconCost = 205000; var tardisMeteoriteCost = 17800; var tardisEnergyInput = 746; var tardisOutput = 1487;

// Lunarite
var lunarite = 0; var lunariteStorage = 50; var lunariteNextStorage = 100; var lunariteps = 0;
var moonWorker = 0; var moonWorkerGemCost = 500; var moonWorkerOutput = 1;
var moonDrill = 0; var moonDrillMetalCost = 1000; var moonDrillGemCost = 600; var moonDrillOilCost = 400; var moonDrillEnergyInput = 20; var moonDrillOutput = 10;
var moonQuarry = 0; var moonQuarryLunariteCost = 8000; var moonQuarryGemCost = 5000; var moonQuarrySiliconCost = 3500; var moonQuarryEnergyInput = 70; var moonQuarryOutput = 53;
var planetExcavator = 0; var planetExcavatorTitaniumCost = 45000; var planetExcavatorIceCost = 37000; var planetExcavatorMeteoriteCost = 500; var planetExcavatorEnergyInput = 182; var planetExcavatorOutput = 207;
var cloner = 0; var clonerTitaniumCost = 204000; var clonerGoldCost = 150000; var clonerMethaneCost = 195000; var clonerEnergyInput = 1216; var clonerOutput = 2122;

// Methane
var methane = 0; var methaneStorage = 50; var methaneNextStorage = 100; var methaneps = 0;
var vacuum = 0; var vacuumLunariteCost = 50; var vacuumGemCost = 500; var vacuumOutput = 1;
var suctionExcavator = 0; var suctionExcavatorLunariteCost = 100; var suctionExcavatorGemCost = 800; var suctionExcavatorOilCost = 600; var suctionExcavatorEnergyInput = 16; var suctionExcavatorOutput = 8;
var spaceCow = 0; var spaceCowLunariteCost = 10000; var spaceCowTitaniumCost = 9000; var spaceCowSiliconCost = 4100; var spaceCowEnergyInput = 49; var spaceCowOutput = 37;
var vent = 0; var ventLunariteCost = 52000; var ventHeliumCost = 47000; var ventMeteoriteCost = 390; var ventEnergyInput = 132; var ventOutput = 149;
var interCow = 0; var interCowLunariteCost = 14000; var interCowGoldCost = 202000; var interCowHydrogenCost = 158000; var interCowEnergyInput = 899; var interCowOutput = 1393;

// Titanium
var titanium = 0; var titaniumStorage = 50; var titaniumNextStorage = 100; var titaniumps = 0;
var explorer = 0; var explorerGemCost = 1000; var explorerOutput = 1;
var lunariteDrill = 0; var lunariteDrillLunariteCost = 200; var lunariteDrillGemCost = 800; var lunariteDrillOilCost = 1000; var lunariteDrillEnergyInput = 13; var lunariteDrillOutput = 9;
var pentaDrill = 0; var pentaDrillLunariteCost = 14000; var pentaDrillGemCost = 11000; var pentaDrillSiliconCost = 5600; var pentaDrillEnergyInput = 46; var pentaDrillOutput = 49;
var titanDrill = 0; var titanDrillLunariteCost = 63000; var titanDrillGoldCost = 27000; var titanDrillMeteoriteCost = 600; var titanDrillEnergyInput = 123; var titanDrillOutput = 197;
var club = 0; var clubUraniumCost = 175000; var clubWoodCost = 164000; var clubHeliumCost = 156000; var clubEnergyInput = 690; var clubOutput = 2106;

// Gold
var gold = 0; var goldStorage = 50; var goldNextStorage = 100; var goldps = 0;
var droid = 0; var droidLunariteCost = 200; var droidMethaneCost = 50; var droidOutput = 1;
var destroyer = 0; var destroyerLunariteCost = 500; var destroyerGemCost = 1500; var destroyerOilCost = 1000; var destroyerEnergyInput = 19; var destroyerOutput = 8;
var deathStar = 0; var deathStarLunariteCost = 17000; var deathStarSilverCost = 11500; var deathStarSiliconCost = 8200; var deathStarEnergyInput = 81; var deathStarOutput = 51;
var actuator = 0; var actuatorLunariteCost = 61000; var actuatorHeliumCost = 15700; var actuatorMeteoriteCost = 600; var actuatorEnergyInput = 223; var actuatorOutput = 211;
var philosopher = 0; var philosopherMetalCost = 208000; var philosopherSilverCost = 167000; var philosopherMeteoriteCost = 18000; var philosopherEnergyInput = 1324; var philosopherOutput = 2422;

// Silver
var silver = 0; var silverStorage = 50; var silverNextStorage = 100; var silverps = 0;
var scout = 0; var scoutLunariteCost = 100; var scoutTitaniumCost = 20; var scoutOutput = 1;
var spaceLaser = 0; var spaceLaserLunariteCost = 350; var spaceLaserGemCost = 900; var spaceLaserOilCost = 1200; var spaceLaserEnergyInput = 24; var spaceLaserOutput = 13;
var bertha = 0; var berthaLunariteCost = 19500; var berthaTitaniumCost = 18200; var berthaSiliconCost = 11000; var berthaEnergyInput = 65; var berthaOutput = 53;
var cannon = 0; var cannonLunariteCost = 85100; var cannonOilCost = 93800; var cannonMeteoriteCost = 520; var cannonEnergyInput = 170; var cannonOutput = 208;
var werewolf = 0; var werewolfUraniumCost = 165000; var werewolfGemCost = 209000; var werewolfMethaneCost = 170000; var werewolfEnergyInput = 1008; var werewolfOutput = 2261;

// Hydrogen
var hydrogen = 0; var hydrogenStorage = 50; var hydrogenNextStorage = 100; var hydrogenps = 0;
var collector = 0; var collectorLunariteCost = 6000; var collectorTitaniumCost = 4800; var collectorOutput = 1;
var magnet = 0; var magnetLunariteCost = 10800; var magnetTitaniumCost = 9600; var magnetGoldCost = 6600; var magnetEnergyInput = 63; var magnetOutput = 5;
var eCell = 0; var eCellSilverCost = 37200; var eCellGoldCost = 34200; var eCellSiliconCost = 25800; var eCellEnergyInput = 238; var eCellOutput = 28;
var hindenburg = 0; var hindenburgLunariteCost = 172000; var hindenburgMethaneCost = 134000; var hindenburgMeteoriteCost = 710; var hindenburgEnergyInput = 613; var hindenburgOutput = 113;
var harvester = 0; var harvesterLunariteCost = 250000; var harvesterWoodCost = 184000; var harvesterOilCost = 146000; var harvesterEnergyInput = 3562; var harvesterOutput = 3562;

// Helium
var helium = 0; var heliumStorage = 50; var heliumNextStorage = 100; var heliumStorageCost = 100; var heliumps = 0;
var drone = 0; var droneLunariteCost = 8400; var droneSiliconCost = 6000; var droneOutput = 1;
var tanker = 0; var tankerLunariteCost = 12600; var tankerTitaniumCost = 10200; var tankerSiliconCost = 8400; var tankerEnergyInput = 72; var tankerOutput = 11;
var compressor = 0; var compressorLunariteCost = 63000; var compressorTitaniumCost = 43800; var compressorSiliconCost = 35400; var compressorEnergyInput = 248; var compressorOutput = 57;
var skimmer = 0; var skimmerLunariteCost = 255000; var skimmerTitaniumCost = 173000; var skimmerMeteoriteCost = 770; var skimmerEnergyInput = 670; var skimmerOutput = 232;
var cage = 0; var cageLunariteCost = 171000; var cageSiliconCost = 165000; var cageMeteoriteCost = 18600; var cageEnergyInput = 4075; var cageOutput = 2369;

// Ice
var ice = 0; var iceStorage = 50; var iceNextStorage = 100; var iceStorageCost = 100; var iceps = 0;
var icePick = 0; var icePickLunariteCost = 17800; var icePickGemCost = 19300; var icePickOutput = 1;
var iceDrill = 0; var iceDrillLunariteCost = 23900; var iceDrillTitaniumCost = 21200; var iceDrillSiliconCost = 19600; var iceDrillEnergyInput = 83; var iceDrillOutput = 9;
var freezer = 0; var freezerLunariteCost = 117000; var freezerTitaniumCost = 86000; var freezerSiliconCost = 73000; var freezerEnergyInput = 397; var freezerOutput = 65;
var mrFreeze = 0; var mrFreezeWoodCost = 379000; var mrFreezeHeliumCost = 14000; var mrFreezeMeteoriteCost = 1500; var mrFreezeEnergyInput = 1135; var mrFreezeOutput = 278;
var overexchange = 0; var overexchangeMetalCost = 210000; var overexchangeSilverCost = 188000; var overexchangeHeliumCost = 204000; var overexchangeEnergyInput = 7397; var overexchangeOutput = 2973;

// Meteorite
var meteorite = 0; var meteoriteStorage = 50; var meteoriteNextStorage = 100; var meteoriteStorageCost = 100; var meteoriteps = 0; var meteoriteToggled = true;
var printer = 0; var printerLunariteCost = 100000; var printerSiliconCost = 50000; var printerPlasmaInput = 3; var printerOutput = 1;
var web = 0; var webLunariteCost = 930000; var webUraniumCost = 490000; var webSiliconCost = 510000; var webPlasmaInput = 21; var webOutput = 8;
var smasher = 0; var smasherSiliconCost = 3230000; var smasherSilverCost = 5890000; var smasherGemCost = 8340000; var smasherPlasmaInput = 111; var smasherOutput = 72;
var nebulous = 0; var nebulousLunariteCost = 25800000; var nebulousLavaCost = 19700000; var nebulousGoldCost = 21900000; var nebulousPlasmaInput = 142; var nebulousOutput = 135;

// Science
var science = 0; var scienceps = 0;
var lab = 0; var labMetalCost = 20; var labGemCost = 15; var labWoodCost = 10; var labOutput = 0.1;
var labT2 = 0; var labT2MetalCost = 1000; var labT2GemCost = 200; var labT2WoodCost = 500; var labT2Output = 1;
var labT3 = 0; var labT3MetalCost = 17000; var labT3GemCost = 4700; var labT3WoodCost = 9600; var labT3Output = 10;
var labT4 = 0; var labT4MetalCost = 610000; var labT4GemCost = 370000; var labT4WoodCost = 926000; var labT4Output = 100;
var labT5 = 0; var labT5MetalCost = 12400000; var labT5GemCost = 7300000; var labT5WoodCost = 15900000; var labT5Output = 1000;

// Rocket & Rocket Fuel
var rocket = 0; var rocketFuel = 0; var rocketFuelps = 0; var rocketFuelToggled = true;
var chemicalPlant = 0; var chemicalPlantMetalCost = 1000; var chemicalPlantGemCost = 750; var chemicalPlantOilCost = 500; var chemicalPlantOilInput = 20; var chemicalPlantCharcoalInput = 20; var chemicalPlantOutput = 0.2;
var oxidisation = 0; var oxidisationMetalCost = 12000; var oxidisationGemCost = 8300; var oxidisationOilCost = 6800; var oxidisationOilInput = 100; var oxidisationCharcoalInput = 100; var oxidisationOutput = 1.5;
var hydrazine = 0; var hydrazineTitaniumCost = 140000; var hydrazineSiliconCost = 96300; var hydrazineGoldCost = 78600; var hydrazineMethaneInput = 520; var hydrazineOutput = 20;

// Sol Centre
var autoResource = null;
var dyson = 0; var dysonTitaniumCost = 300000; var dysonGoldCost = 100000; var dysonSiliconCost = 200000; var dysonMeteoriteCost = 1000; var dysonIceCost = 100000;
var ring = 0; var ringOutput = 5000;
var swarm = 0; var swarmOutput = 25000;
var sphere = 0; var sphereOutput = 1000000;

// Antimatter
var antimatter = 0; var antimatterps = 0; var antimatterStorage = 100000; var antimatterToggled = true;

// Variables not being saved

var preciousGemBaseCost = 10000; var preciousSilverBaseCost = 7500; var preciousGoldBaseCost = 5000;
var preciousActivateGemBaseCost = 30000; var preciousActivateSilverBaseCost = 20000; var preciousActivateGoldBaseCost = 10000;
var energeticWoodBaseCost =  10000; var energeticCharcoalBaseCost = 5000; var energeticUraniumBaseCost = 200;
var energeticActivateWoodBaseCost = 30000; var energeticActivateCharcoalBaseCost = 15000; var energeticActivateUraniumBaseCost = 500;
var techSiliconBaseCost =  30000; var techGoldBaseCost = 18000; var techGemBaseCost = 40000;
var techActivateSiliconBaseCost = 50000; var techActivateGoldBaseCost = 30000; var techActivateGemBaseCost = 60000;
var meteoriteMeteoriteBaseCost = 5000; var meteoriteIceBaseCost = 600000; var meteoriteSiliconBaseCost = 1200000;
var meteoriteActivateMeteoriteBaseCost = 10000; var meteoriteActivateIceBaseCost = 2000000; var meteoriteActivateSiliconBaseCost = 4000000;

var commsWonderGoldBaseCost = 6000000; var commsWonderSiliconBaseCost = 10000000; var commsWonderIceBaseCost = 6000000;
var rocketWonderLunariteBaseCost = 8000000; var rocketWonderTitaniumBaseCost = 6000000; var rocketWonderMetalBaseCost = 12000000;
var antimatterWonderUraniumBaseCost = 6000000; var antimatterWonderLavaBaseCost = 10000000; var antimatterWonderOilBaseCost = 8000000; var antimatterWonderMethaneBaseCost = 6000000;
var portalMeteoriteBaseCost = 500000; var portalHeliumBaseCost = 8000000; var portalSiliconBaseCost = 6000000;

var stargateWonderPlasmaBaseCost = 500000; var stargateWonderSiliconBaseCost = 920000000; var stargateWonderMeteoriteBaseCost = 17000000;

var preciousGemCost = preciousGemBaseCost; var preciousSilverCost = preciousSilverBaseCost; var preciousGoldCost = preciousGoldBaseCost;
var preciousActivateGemCost = preciousActivateGemBaseCost; var preciousActivateSilverCost = preciousActivateSilverBaseCost; var preciousActivateGoldCost = preciousActivateGoldBaseCost;
var energeticWoodCost = energeticWoodBaseCost; var energeticCharcoalCost = energeticCharcoalBaseCost; var energeticUraniumCost = energeticUraniumBaseCost;
var energeticActivateWoodCost = energeticActivateWoodBaseCost; var energeticActivateCharcoalCost = energeticActivateCharcoalBaseCost; var energeticActivateUraniumCost = energeticActivateUraniumBaseCost;
var techSiliconCost = techSiliconBaseCost; var techGoldCost = techGoldBaseCost; var techGemCost = techGemBaseCost;
var techActivateSiliconCost = techActivateSiliconBaseCost; var techActivateGoldCost = techActivateGoldBaseCost; var techActivateGemCost = techActivateGemBaseCost;
var meteoriteMeteoriteCost = meteoriteMeteoriteBaseCost; var meteoriteIceCost = meteoriteIceBaseCost; var meteoriteSiliconCost = meteoriteSiliconBaseCost;
var meteoriteActivateMeteoriteCost = meteoriteActivateMeteoriteBaseCost; var meteoriteActivateIceCost = meteoriteActivateIceBaseCost; var meteoriteActivateSiliconCost = meteoriteActivateSiliconBaseCost;

var commsWonderGoldCost = commsWonderGoldBaseCost; var commsWonderSiliconCost = commsWonderSiliconBaseCost; var commsWonderIceCost = commsWonderIceBaseCost;
var rocketWonderLunariteCost = rocketWonderLunariteBaseCost; var rocketWonderTitaniumCost = rocketWonderTitaniumBaseCost; var rocketWonderMetalCost = rocketWonderMetalBaseCost;
var antimatterWonderUraniumCost = antimatterWonderUraniumBaseCost; var antimatterWonderLavaCost = antimatterWonderLavaBaseCost; var antimatterWonderOilCost = antimatterWonderOilBaseCost; var antimatterWonderMethaneCost = antimatterWonderMethaneBaseCost;
var portalMeteoriteCost = portalMeteoriteBaseCost; var portalHeliumCost = portalHeliumBaseCost; var portalSiliconCost = portalSiliconBaseCost;

var stargateWonderPlasmaCost = stargateWonderPlasmaBaseCost; var stargateWonderSiliconCost = stargateWonderSiliconBaseCost; var stargateWonderMeteoriteCost = stargateWonderMeteoriteBaseCost;

var timer = 0; var timer2 = 0; var statsTimer = 0; var saveTimer = 10; var secondsLeft = 0; var saved = false; var loaded = false;
var emcAmount = "Max";

var energyLow = false;
var resources = ["uranium", "lava", "oil", "metal", "gem", "charcoal", "wood", "lunarite", "methane", "titanium", "gold", "silver", "silicon", "hydrogen", "helium", "ice", "meteorite"]
var uraniumEmcVal = 37; var lavaEmcVal = 42;
var oilEmcVal = 3; var metalEmcVal = 1; var gemEmcVal = 3; var charcoalEmcVal = 2; var woodEmcVal = 1;
var lunariteEmcVal = 15; var methaneEmcVal = 12; var titaniumEmcVal = 17; var goldEmcVal = 14; var silverEmcVal = 16; var siliconEmcVal = 23;
var hydrogenEmcVal = 33; var heliumEmcVal = 39; var iceEmcVal = 44; var meteoriteEmcVal = 3;

var windowLoaded = false;

// Rebirth Variables

var dmBoost = 0;
var gainNum = 1; var labT1Multi = 1; var labT2PlusMulti = 1; var T1Price = 1; var chemicalBoost = 1; var rocketPrice = 1; var floor1Price = 1; var floor23Price = 1; var storagePrice = 1;
