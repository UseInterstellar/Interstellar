Game.stargaze = (function(){

	var instance = {};

	instance.entries = {};
	instance.categoryEntries = {};
	instance.navCount = 0;

	instance.upgradeEntries = {};
	
	instance.rebirthStart = [];				// Things you start with
	instance.rebirthUnlocked = [];			// Things that start unhidden
	instance.rebirthChildUnlocked = [];		// Things that have children that start unhidden

	instance.respecCount = 3;				// Respecs available

	instance.rebirthNeedsUpdate = true;

	instance.unlocked = false;

	instance.initialise = function(){
		for (var id in Game.stargazeData) {
			var data = Game.stargazeData[id];
			
			this.navCount++;
			this.entries[id] = $.extend({}, data, {
				id: id,
				htmlId: 'stargazeNav' + id,
				displayNeedsUpdate: true
			});
		}
		console.debug("Loaded " + this.navCount + " Stargaze Navs");

		for (var id in Game.prestigeData) {
			var data = Game.prestigeData[id];
			
			this.navCount++;
			this.upgradeEntries[id] = $.extend({}, {
				id: id,
				htmlId: 'stargazeUpg' + id,
				unlocked: true,
				displayNeedsUpdate: true,
				onApply: null,
				rebirthUnlocked: [],
				rebirthChildUnlocked: [],
				rebirthStart: {}
			}, data);
		}
	};

	instance.resetVars = function(){
		researchUnlocked=!1,researched=[],available=[],explored=[],tabsUnlocked=[],resourcesUnlocked=[],noBorder=[],rocketLaunched=!1,buttonsHidden=[],activated=[],techUnlocked=!1,meteoriteUnlocked=!1,globalEnergyLock=!1,plasma=0,plasmaps=0,PSU=0,PSUSilverCost=77e4,PSUGoldCost=77e4,PSUUraniumCost=55e4,PSUT2=0,PSUT2SilverCost=93e5,PSUT2GoldCost=93e5,PSUT2UraniumCost=68e5,heater=0,heaterLunariteCost=75e3,heaterGemCost=68e3,heaterSiliconCost=59e3,heaterToggled=!0,heaterEnergyInput=1e3,heaterHydrogenInput=10,heaterOutput=1,plasmatic=0,plasmaticLunariteCost=81e4,plasmaticSiliconCost=72e4,plasmaticMeteoriteCost=970,plasmaticToggled=!0,plasmaticEnergyInput=8500,plasmaticHeliumInput=80,plasmaticOutput=10,bath=0,bathLavaCost=62e5,bathGoldCost=59e5,bathMeteoriteCost=12100,bathToggled=!0,bathEnergyInput=15e3,bathHydrogenInput=100,bathHeliumInput=100,bathOutput=140,energy=0,energyps=0,battery=0,batteryMetalCost=5e4,batteryGemCost=5e4,batteryLunariteCost=3e4,batteryT2=0,batteryT2MetalCost=55e4,batteryT2GemCost=55e4,batteryT2LunariteCost=33e4,batteryT3=0,batteryT3MetalCost=55e5,batteryT3GemCost=55e5,batteryT3LunariteCost=33e5,batteryT4=0,batteryT4MetalCost=55e6,batteryT4GemCost=55e6,batteryT4LunariteCost=33e6,batteryT5=0,batteryT5MetalCost=49e7,batteryT5GemCost=49e7,batteryT5LunariteCost=27e7,charcoalEngine=0,charcoalEngineMetalCost=50,charcoalEngineGemCost=25,charcoalEngineCharcoalInput=1,charcoalEngineOutput=2,solarPanel=0,solarPanelMetalCost=30,solarPanelGemCost=35,solarPanelOutput=1.5,methaneStation=0,methaneStationLunariteCost=110,methaneStationTitaniumCost=90,methaneStationMethaneInput=6,methaneStationOutput=23,nuclearStation=0,nuclearStationLunariteCost=2e4,nuclearStationTitaniumCost=1e4,nuclearStationUraniumInput=7,nuclearStationOutput=153,magmatic=0,magmaticLunariteCost=25e3,magmaticGemCost=2e4,magmaticSilverCost=15e3,magmaticLavaInput=11,magmaticOutput=191,fusionReactor=0,fusionReactorLunariteCost=3e4,fusionReactorTitaniumCost=2e4,fusionReactorSiliconCost=15e3,fusionReactorHydrogenInput=10,fusionReactorHeliumInput=10,fusionReactorOutput=273,uranium=0,uraniumStorage=50,uraniumNextStorage=100,uraniumps=0,grinder=0,grinderTitaniumCost=2e3,grinderLunariteCost=4e3,grinderGoldCost=2e3,grinderOutput=1,cubic=0,cubicUraniumCost=80,cubicLunariteCost=1e4,cubicOilCost=1e4,cubicEnergyInput=40,cubicOutput=9,enricher=0,enricherLunariteCost=21700,enricherTitaniumCost=23e3,enricherSiliconCost=13500,enricherEnergyInput=180,enricherOutput=61,recycler=0,recyclerLunariteCost=93100,recyclerMethaneCost=47e3,recyclerMeteoriteCost=830,recyclerEnergyInput=463,recyclerOutput=235,planetNuke=0,planetNukeTitaniumCost=486e3,planetNukeSiliconCost=266e3,planetNukeIceCost=364e3,planetNukeEnergyInput=2719,planetNukeOutput=2412,lava=0,lavaStorage=50,lavaNextStorage=100,lavaps=0,crucible=0,crucibleGemCost=8e3,crucibleLunariteCost=4e3,crucibleOutput=1,extractor=0,extractorLunariteCost=16e3,extractorTitaniumCost=12e3,extractorSiliconCost=6e3,extractorEnergyInput=58,extractorOutput=7,extruder=0,extruderLunariteCost=69e3,extruderTitaniumCost=57e3,extruderSiliconCost=39e3,extruderEnergyInput=237,extruderOutput=43,veluptuator=0,veluptuatorLunariteCost=298e3,veluptuatorGoldCost=121e3,veluptuatorMeteoriteCost=750,veluptuatorEnergyInput=689,veluptuatorOutput=187,condensator=0,condensatorLunariteCost=288e3,condensatorGemCost=21e4,condensatorIceCost=238e3,condensatorEnergyInput=4142,condensatorOutput=2103,oil=0,oilStorage=50,oilNextStorage=100,oilps=0,pump=0,pumpMetalCost=60,pumpGemCost=20,pumpOutput=1,pumpjack=0,pumpjackMetalCost=250,pumpjackGemCost=80,pumpjackOilCost=50,pumpjackEnergyInput=4,pumpjackOutput=10,oilField=0,oilFieldLunariteCost=2400,oilFieldTitaniumCost=2700,oilFieldSiliconCost=3900,oilFieldEnergyInput=17,oilFieldOutput=63,oilRig=0,oilRigLunariteCost=19400,oilRigTitaniumCost=16800,oilRigMeteoriteCost=760,oilRigEnergyInput=44,oilRigOutput=246,fossilator=0,fossilatorUraniumCost=11e4,fossilatorCharcoalCost=96e3,fossilatorLavaCost=167e3,fossilatorEnergyInput=258,fossilatorOutput=2627,metal=0,metalStorage=50,metalNextStorage=100,metalps=0,miner=0,minerMetalCost=10,minerWoodCost=5,minerOutput=1,heavyDrill=0,heavyDrillMetalCost=160,heavyDrillGemCost=60,heavyDrillOilCost=50,heavyDrillEnergyInput=2,heavyDrillOutput=8,gigaDrill=0,gigaDrillLunariteCost=2800,gigaDrillGemCost=3400,gigaDrillSiliconCost=4100,gigaDrillEnergyInput=9,gigaDrillOutput=108,quantumDrill=0,quantumDrillLunariteCost=29e3,quantumDrillGoldCost=18700,quantumDrillMeteoriteCost=900,quantumDrillEnergyInput=24,quantumDrillOutput=427,multiDrill=0,multiDrillTitaniumCost=184e3,multiDrillGoldCost=184e3,multiDrillOilCost=17e4,multiDrillEnergyInput=131,multiDrillOutput=4768,gem=0,gemStorage=50,gemNextStorage=100,gemps=0,gemMiner=0,gemMinerMetalCost=15,gemMinerGemCost=10,gemMinerOutput=1,advancedDrill=0,advancedDrillMetalCost=120,advancedDrillGemCost=200,advancedDrillOilCost=60,advancedDrillEnergyInput=2,advancedDrillOutput=4,diamondDrill=0,diamondDrillLunariteCost=3400,diamondDrillGemCost=8e3,diamondDrillSiliconCost=4500,diamondDrillEnergyInput=15,diamondDrillOutput=89,carbyneDrill=0,carbyneDrillLunariteCost=21e3,carbyneDrillGemCost=27e3,carbyneDrillMeteoriteCost=800,carbyneDrillEnergyInput=40,carbyneDrillOutput=358,diamondChamber=0,diamondChamberUraniumCost=181e3,diamondChamberCharcoalCost=185e3,diamondChamberMeteoriteCost=12500,diamondChamberEnergyInput=260,diamondChamberOutput=3747,charcoal=0,charcoalStorage=50,charcoalNextStorage=100,charcoalps=0,charcoalToggled=!0,woodburner=0,woodburnerMetalCost=10,woodburnerWoodCost=5,woodburnerWoodInput=2,woodburnerOutput=1,furnace=0,furnaceMetalCost=80,furnaceWoodCost=40,furnaceOilCost=100,furnaceEnergyInput=3,furnaceWoodInput=6,furnaceOutput=4,kiln=0,kilnLunariteCost=3500,kilnGemCost=6200,kilnSiliconCost=3800,kilnEnergyInput=13,kilnWoodInput=56,kilnOutput=53,fryer=0,fryerLunariteCost=15800,fryerLavaCost=12500,fryerMeteoriteCost=560,fryerEnergyInput=34,fryerWoodInput=148,fryerOutput=210,microPollutor=0,microPollutorMetalCost=133e3,microPollutorWoodCost=189e3,microPollutorLavaCost=16e4,microPollutorEnergyInput=187,microPollutorWoodInput=950,microPollutorOutput=2267,wood=0,woodStorage=50,woodNextStorage=100,woodps=0,woodcutter=0,woodcutterMetalCost=10,woodcutterWoodCost=5,woodcutterOutput=1,laserCutter=0,laserCutterMetalCost=50,laserCutterGemCost=90,laserCutterOilCost=40,laserCutterEnergyInput=4,laserCutterOutput=6,deforester=0,deforesterLunariteCost=3e3,deforesterTitaniumCost=2700,deforesterSiliconCost=2500,deforesterEnergyInput=16,deforesterOutput=74,infuser=0,infuserLunariteCost=16e3,infuserOilCost=31200,infuserMeteoriteCost=490,infuserEnergyInput=43,infuserOutput=297,forest=0,forestMetalCost=122e3,forestGemCost=151e3,forestHydrogenCost=183e3,forestEnergyInput=244,forestOutput=3278,silicon=0,siliconStorage=50,siliconNextStorage=100,siliconps=0,blowtorch=0,blowtorchLunariteCost=150,blowtorchTitaniumCost=30,blowtorchOutput=1,scorcher=0,scorcherLunariteCost=500,scorcherGemCost=1200,scorcherOilCost=1600,scorcherEnergyInput=18,scorcherOutput=9,annihilator=0,annihilatorLunariteCost=3e3,annihilatorGemCost=8300,annihilatorSilverCost=2400,annihilatorEnergyInput=53,annihilatorOutput=40,desert=0,desertLunariteCost=2e4,desertSiliconCost=17700,desertMeteoriteCost=400,desertEnergyInput=138,desertOutput=157,tardis=0,tardisTitaniumCost=204e3,tardisSiliconCost=205e3,tardisMeteoriteCost=17800,tardisEnergyInput=746,tardisOutput=1487,lunarite=0,lunariteStorage=50,lunariteNextStorage=100,lunariteps=0,moonWorker=0,moonWorkerGemCost=500,moonWorkerOutput=1,moonDrill=0,moonDrillMetalCost=1e3,moonDrillGemCost=600,moonDrillOilCost=400,moonDrillEnergyInput=20,moonDrillOutput=10,moonQuarry=0,moonQuarryLunariteCost=8e3,moonQuarryGemCost=5e3,moonQuarrySiliconCost=3500,moonQuarryEnergyInput=70,moonQuarryOutput=53,planetExcavator=0,planetExcavatorTitaniumCost=45e3,planetExcavatorIceCost=37e3,planetExcavatorMeteoriteCost=500,planetExcavatorEnergyInput=182,planetExcavatorOutput=207,cloner=0,clonerTitaniumCost=204e3,clonerGoldCost=15e4,clonerMethaneCost=195e3,clonerEnergyInput=1216,clonerOutput=2122,methane=0,methaneStorage=50,methaneNextStorage=100,methaneps=0,vacuum=0,vacuumLunariteCost=50,vacuumGemCost=500,vacuumOutput=1,suctionExcavator=0,suctionExcavatorLunariteCost=100,suctionExcavatorGemCost=800,suctionExcavatorOilCost=600,suctionExcavatorEnergyInput=16,suctionExcavatorOutput=8,spaceCow=0,spaceCowLunariteCost=1e4,spaceCowTitaniumCost=9e3,spaceCowSiliconCost=4100,spaceCowEnergyInput=49,spaceCowOutput=37,vent=0,ventLunariteCost=52e3,ventHeliumCost=47e3,ventMeteoriteCost=390,ventEnergyInput=132,ventOutput=149,interCow=0,interCowLunariteCost=14e3,interCowGoldCost=202e3,interCowHydrogenCost=158e3,interCowEnergyInput=899,interCowOutput=1393,titanium=0,titaniumStorage=50,titaniumNextStorage=100,titaniumps=0,explorer=0,explorerGemCost=1e3,explorerOutput=1,lunariteDrill=0,lunariteDrillLunariteCost=200,lunariteDrillGemCost=800,lunariteDrillOilCost=1e3,lunariteDrillEnergyInput=13,lunariteDrillOutput=9,pentaDrill=0,pentaDrillLunariteCost=14e3,pentaDrillGemCost=11e3,pentaDrillSiliconCost=5600,pentaDrillEnergyInput=46,pentaDrillOutput=49,titanDrill=0,titanDrillLunariteCost=63e3,titanDrillGoldCost=27e3,titanDrillMeteoriteCost=600,titanDrillEnergyInput=123,titanDrillOutput=197,club=0,clubUraniumCost=175e3,clubWoodCost=164e3,clubHeliumCost=156e3,clubEnergyInput=690,clubOutput=2106,gold=0,goldStorage=50,goldNextStorage=100,goldps=0,droid=0,droidLunariteCost=200,droidMethaneCost=50,droidOutput=1,destroyer=0,destroyerLunariteCost=500,destroyerGemCost=1500,destroyerOilCost=1e3,destroyerEnergyInput=19,destroyerOutput=8,deathStar=0,deathStarLunariteCost=17e3,deathStarSilverCost=11500,deathStarSiliconCost=8200,deathStarEnergyInput=81,deathStarOutput=51,actuator=0,actuatorLunariteCost=61e3,actuatorHeliumCost=15700,actuatorMeteoriteCost=600,actuatorEnergyInput=223,actuatorOutput=211,philosopher=0,philosopherMetalCost=208e3,philosopherSilverCost=167e3,philosopherMeteoriteCost=18e3,philosopherEnergyInput=1324,philosopherOutput=2422,silver=0,silverStorage=50,silverNextStorage=100,silverps=0,scout=0,scoutLunariteCost=100,scoutTitaniumCost=20,scoutOutput=1,spaceLaser=0,spaceLaserLunariteCost=350,spaceLaserGemCost=900,spaceLaserOilCost=1200,spaceLaserEnergyInput=24,spaceLaserOutput=13,bertha=0,berthaLunariteCost=19500,berthaTitaniumCost=18200,berthaSiliconCost=11e3,berthaEnergyInput=65,berthaOutput=53,cannon=0,cannonLunariteCost=85100,cannonOilCost=93800,cannonMeteoriteCost=520,cannonEnergyInput=170,cannonOutput=208,werewolf=0,werewolfUraniumCost=165e3,werewolfGemCost=209e3,werewolfMethaneCost=17e4,werewolfEnergyInput=1008,werewolfOutput=2261,hydrogen=0,hydrogenStorage=50,hydrogenNextStorage=100,hydrogenps=0,collector=0,collectorLunariteCost=6e3,collectorTitaniumCost=4800,collectorOutput=1,magnet=0,magnetLunariteCost=10800,magnetTitaniumCost=9600,magnetGoldCost=6600,magnetEnergyInput=63,magnetOutput=5,eCell=0,eCellSilverCost=37200,eCellGoldCost=34200,eCellSiliconCost=25800,eCellEnergyInput=238,eCellOutput=28,hindenburg=0,hindenburgLunariteCost=172e3,hindenburgMethaneCost=134e3,hindenburgMeteoriteCost=710,hindenburgEnergyInput=613,hindenburgOutput=113,harvester=0,harvesterLunariteCost=25e4,harvesterWoodCost=184e3,harvesterOilCost=146e3,harvesterEnergyInput=3562,harvesterOutput=3562,helium=0,heliumStorage=50,heliumNextStorage=100,heliumStorageCost=100,heliumps=0,drone=0,droneLunariteCost=8400,droneSiliconCost=6e3,droneOutput=1,tanker=0,tankerLunariteCost=12600,tankerTitaniumCost=10200,tankerSiliconCost=8400,tankerEnergyInput=72,tankerOutput=11,compressor=0,compressorLunariteCost=63e3,compressorTitaniumCost=43800,compressorSiliconCost=35400,compressorEnergyInput=248,compressorOutput=57,skimmer=0,skimmerLunariteCost=255e3,skimmerTitaniumCost=173e3,skimmerMeteoriteCost=770,skimmerEnergyInput=670,skimmerOutput=232,cage=0,cageLunariteCost=171e3,cageSiliconCost=165e3,cageMeteoriteCost=18600,cageEnergyInput=4075,cageOutput=2369,ice=0,iceStorage=50,iceNextStorage=100,iceStorageCost=100,iceps=0,icePick=0,icePickLunariteCost=17800,icePickGemCost=19300,icePickOutput=1,iceDrill=0,iceDrillLunariteCost=23900,iceDrillTitaniumCost=21200,iceDrillSiliconCost=19600,iceDrillEnergyInput=83,iceDrillOutput=9,freezer=0,freezerLunariteCost=117e3,freezerTitaniumCost=86e3,freezerSiliconCost=73e3,freezerEnergyInput=397,freezerOutput=65,mrFreeze=0,mrFreezeWoodCost=379e3,mrFreezeHeliumCost=14e3,mrFreezeMeteoriteCost=1500,mrFreezeEnergyInput=1135,mrFreezeOutput=278,overexchange=0,overexchangeMetalCost=21e4,overexchangeSilverCost=188e3,overexchangeHeliumCost=205e3,overexchangeEnergyInput=7397,overexchangeOutput=2973,meteorite=0,meteoriteStorage=50,meteoriteNextStorage=100,meteoriteStorageCost=100,meteoriteps=0,meteoriteToggled=!0,printer=0,printerLunariteCost=1e5,printerSiliconCost=5e4,printerPlasmaInput=3,printerOutput=1,web=0,webLunariteCost=93e4,webUraniumCost=49e4,webSiliconCost=51e4,webPlasmaInput=21,webOutput=8,smasher=0,smasherSiliconCost=323e4,smasherSilverCost=589e4,smasherGemCost=834e4,smasherPlasmaInput=111,smasherOutput=72,nebulous=0,nebulousLunariteCost=258e5,nebulousLavaCost=197e5,nebulousGoldCost=219e5,nebulousPlasmaInput=142,nebulousOutput=135,science=0,scienceps=0,lab=0,labMetalCost=20,labGemCost=15,labWoodCost=10,labOutput=.1,labT2=0,labT2MetalCost=1e3,labT2GemCost=200,labT2WoodCost=500,labT2Output=1,labT3=0,labT3MetalCost=17e3,labT3GemCost=4700,labT3WoodCost=9600,labT3Output=10,labT4=0,labT4MetalCost=61e4,labT4GemCost=37e4,labT4WoodCost=926e3,labT4Output=100,labT5=0,labT5MetalCost=124e5,labT5GemCost=73e5,labT5WoodCost=159e5,labT5Output=1e3,rocket=0,rocketFuel=0,rocketFuelps=0,rocketFuelToggled=!0,chemicalPlant=0,chemicalPlantMetalCost=1e3,chemicalPlantGemCost=750,chemicalPlantOilCost=500,chemicalPlantOilInput=20,chemicalPlantCharcoalInput=20,chemicalPlantOutput=.2,oxidisation=0,oxidisationMetalCost=12e3,oxidisationGemCost=8300,oxidisationOilCost=6800,oxidisationOilInput=100,oxidisationCharcoalInput=100,oxidisationOutput=1.5,hydrazine=0,hydrazineTitaniumCost=14e4,hydrazineSiliconCost=96300,hydrazineGoldCost=78600,hydrazineMethaneInput=520,hydrazineOutput=20,autoResource=null,dyson=0,dysonTitaniumCost=3e5,dysonGoldCost=1e5,dysonSiliconCost=2e5,dysonMeteoriteCost=1e3,dysonIceCost=1e5,ring=0,ringOutput=5e3,swarm=0,swarmOutput=25e3,sphere=0,sphereOutput=1e6,antimatter=0,antimatterps=0,antimatterStorage=1e5,antimatterToggled=!0;
	};

	instance.hideMachines = function(){
		document.getElementById("labTier2").className="hidden",document.getElementById("labTier3").className="hidden",document.getElementById("labTier4").className="hidden",document.getElementById("labTier5").className="hidden",document.getElementById("oilTier2").className="hidden",document.getElementById("metalTier2").className="hidden",document.getElementById("gemTier2").className="hidden",document.getElementById("charcoalTier2").className="hidden",document.getElementById("woodTier2").className="hidden";for(var i=3;i<=4;i++)document.getElementById("uraniumTier"+i).className="hidden",document.getElementById("lavaTier"+i).className="hidden",document.getElementById("oilTier"+i).className="hidden",document.getElementById("metalTier"+i).className="hidden",document.getElementById("gemTier"+i).className="hidden",document.getElementById("charcoalTier"+i).className="hidden",document.getElementById("woodTier"+i).className="hidden",document.getElementById("siliconTier"+i).className="hidden",document.getElementById("lunariteTier"+i).className="hidden",document.getElementById("methaneTier"+i).className="hidden",document.getElementById("titaniumTier"+i).className="hidden",document.getElementById("goldTier"+i).className="hidden",document.getElementById("silverTier"+i).className="hidden",document.getElementById("hydrogenTier"+i).className="hidden",document.getElementById("heliumTier"+i).className="hidden",document.getElementById("iceTier"+i).className="hidden";
	};

	instance.rebirth = function(){
		if(sphere < 1)return;
		var check = confirm("Are you sure? This is non-reversible after you reset and save.");
		if(check){
			this.entries.darkMatter.count += this.entries.darkMatter.current;
			Game.notifySuccess("Dark Matter!", "You have gained " + this.entries.darkMatter.current + " Dark Matter from rebirthing into your new life!");

			for(var i = 0; i < resourcesUnlocked.length; i++){
				document.getElementById(resourcesUnlocked[i]).className = "hidden";
				if(resourcesUnlocked[i].indexOf("Nav") != -1)document.getElementById(resourcesUnlocked[i]).className = "sideTab hidden";
			}
			for(var i = 0; i < buttonsHidden.length; i++){
				if(buttonsHidden[i].indexOf("Progress") != -1){
					document.getElementById(buttonsHidden[i]).className = "progress";
				} else {
					document.getElementById(buttonsHidden[i]).className = "btn btn-default";
				}
			}
			for(var i = 0; i < explored.length; i++){
				document.getElementById(explored[i]).className = "inner sideTab hidden";
				if(explored[i] != "moon", explored[i] != "venus", explored[i] != "mars", explored[i] != "asteroidBelt")document.getElementById(explored[i]).className = "outer sideTab hidden";
			}
			document.getElementById("rocket").textContent = "Not Built";
			document.getElementById("rocketRocketCost").className = "red";
			document.getElementById("solarRocket").className = "";
			document.getElementById("spaceRocket").className = "sideTab";
			document.getElementById("mercury").className = "sideTab hidden";
			document.getElementById("collapseInner").className = "collapseInner sideTab hidden";
			document.getElementById("collapseOuter").className = "collapseOuter sideTab hidden";
			for(var i = 0; i < tabsUnlocked.length; i++){
				document.getElementById(tabsUnlocked[i]).className = "hidden";
			}
			for(var i = 0; i < activated.length; i++){
				$(document.getElementById(activated[i] + "Activation")).text("Dormant");
				document.getElementById(activated[i] + "Activation").className = "red";
			}
			Game.tech.reset();
			Game.interstellar.initialise();
			Game.interstellar.comms.entries.astroBreakthrough.completed = false;
      		Game.statistics.add("rebirthCount", 1);

			this.resetVars();
			this.hideMachines();
      
			updateCost();
			updateDysonCost();
			updateFuelProductionCost();
			updateLabCost();
			updateWonderCost();

			Game.settings.entries.gainButtonsHidden = false;
			for(var i = 0; i < document.getElementsByClassName("gainButton").length; i ++){
                document.getElementsByClassName("gainButton")[i].className = "gainButton";
            }
            $('#gainButtonsHidden').prop('checked', false);

			// Refreshing Interstellar Tab
			var objects = ["comms", "rocket", "rocketParts", "antimatter", "military"];
			for(var i = 0; i < objects.length; i++){
				var object = Game.interstellar[objects[i]];
				for(var entry in object.entries){
					$('#' + object.entries[entry].htmlId + 'Count').text(object.entries[entry].count);
				}
			}
			for(var star in Game.interstellar.stars.entries){
				Game.interstellar.stars.entries[star].unlocked = false;
				Game.interstellar.stars.entries[star].explored = false;
				document.getElementById('star_' + star).className = "";
				document.getElementById('star_' + star + '_conquer').className = "hidden";
			}
			for(var achiev in Game.achievements.entries){
				var data = Game.achievements.entries[achiev]
				data.unlocked = -1;
				data.displayNeedsUpdate = true;
				document.getElementById(data.id + '_bg').style = "width: 50px; height: 40px; background: url(" + data.iconPath + data.iconName + "." + data.iconExtension + ") no-repeat center; -webkit-background-size: contain;background-size: contain; margin-left: 5px;opacity: 0.2";
			}
			Game.achievements.rank = 0;
			for(nav in this.entries){
				if(this.entries[nav].opinion){
					this.entries[nav].opinion = 0;
					this.entries[nav].displayNeedsUpdate = true;
				}
			}

			// Adding starting things
			for(var upgrade in this.upgradeEntries){
				var upgradeData = this.upgradeEntries[upgrade];
				if(upgradeData.achieved == true){
					upgradeData.remove();
					upgradeData.onApply();
					if(upgradeData.category != "intro" && upgradeData.category != "darkMatter")this.entries[upgradeData.category].opinion += upgradeData.opinion;
				}
				upgradeData.displayNeedsUpdate = true;
			}
			for(var i = 0; i < this.rebirthStart.length; i++){
    			for(var object in this.rebirthStart[i]){
					window[object] += this.rebirthStart[i][object];
				}
			}
		}
	};

	instance.upgrade = function(id){
		if(id == 'rebirth'){
			this.rebirth();
		}
		if(id == 'respec'){
			this.respec();
			return;
		}
		var upgradeData = this.upgradeEntries[id];
		if(!upgradeData) {
			console.log('"' + id + '" is not a recognised upgrade.');
			return;
		}
		if(upgradeData.achieved == false){
			if(this.entries.darkMatter.count >= upgradeData.cost){
				this.entries.darkMatter.count -= upgradeData.cost;
				this.applyUpgradeEffect(id);
				if(upgradeData.category != "intro" || "darkMatter")this.entries[upgradeData.category].opinion += upgradeData.opinion;
				this.entries[upgradeData.category].displayNeedsUpdate = true;
				upgradeData.achieved = true;
			}
		}
	};

	instance.applyUpgradeEffect = function(id) {
		var data = this.upgradeEntries[id];
		for(var i = 0; i < data.rebirthUnlocked.length; i++){
			this.rebirthUnlocked.push(data.rebirthUnlocked[i]);
		}
		for(var i = 0; i < data.rebirthChildUnlocked.length; i++){
			this.rebirthChildUnlocked.push(data.rebirthChildUnlocked[i]);
		}
		for(var object in data.rebirthStart){
			this.rebirthStart.push(data.rebirthStart);
		}
		if(data.onApply !== null) {
			data.onApply();
		}
		this.rebirthNeedsUpdate = true;
	};

	instance.respec = function(){
		if(this.respecCount <= 0){
			return;
		}
		if(confirm('Warning! You will still lose the respec if you have no upgrades.') == false){
			return;
		}
		this.respecCount -= 1;
		$('#respecCount').text(this.respecCount);
		for(var upgrade in this.upgradeEntries){
			var upgradeData = this.upgradeEntries[upgrade];
			if(upgradeData.achieved == true){
				this.entries.darkMatter.count += upgradeData.cost;
				if(upgradeData.category != "intro" && upgradeData.category != "darkMatter"){
					if(upgradeData.achieved == true)this.entries[upgradeData.category].opinion -= upgradeData.opinion;this.entries[upgradeData.category].displayNeedsUpdate = true;
				}
				upgradeData.remove();
				upgradeData.achieved = false;
			}
			this.rebirthNeedsUpdate = true;
		}
		for(var i = 0; i < this.rebirthUnlocked.length; i++){
			// Unused So Far
		}
		for(var i = 0; i < this.rebirthChildUnlocked.length; i++){
			// Unused So Far
		}
		for(var i = 0; i < this.rebirthStart; i++){
			for(var object in this.rebirthStart[i]){
				window[object] -= this.rebirthStart[i][object];
			}
		}
		this.rebirthUnlocked = {};
		this.rebirthChildUnlocked = {};
		this.rebirthStart = {};
	}

	instance.save = function(data){
		data.stargaze = {entries: {}, upgradeEntries: {}, rebirthStart: {}, rebirthUnlocked: {}, rebirthChildUnlocked: {}, unlocked: this.unlocked};
		for(var id in this.entries){
			data.stargaze.entries[id] = this.entries[id];
		}
		for(var id in this.upgradeEntries){
			data.stargaze.upgradeEntries[id] = {achiev: this.upgradeEntries[id].achieved};
		}
		for(var id in this.rebirthStart){
			data.stargaze.rebirthStart[id] = this.rebirthStart[id];
		}
		for(var id in this.rebirthUnlocked){
			data.stargaze.rebirthUnlocked[id] = this.rebirthUnlocked[id];
		}
		for(var id in this.rebirthChildUnlocked){
			data.stargaze.rebirthChildUnlocked[id] = this.rebirthChildUnlocked[id];
		}
	};

	instance.load = function(data){
		if(data.stargaze){
			if(typeof data.stargaze.entries !== 'undefined'){
                for(id in data.stargaze.entries){
                    this.entries[id] = data.stargaze.entries[id];
                    this.entries[id].unlocked = true;
                    this.entries[id].displayNeedsUpdate = true;
                }
            }
            if(typeof data.stargaze.upgradeEntries !== 'undefined'){
                for(id in data.stargaze.upgradeEntries){
                	if(this.upgradeEntries[id]){
	                    this.upgradeEntries[id].achieved = data.stargaze.upgradeEntries[id].achiev;
	                    this.upgradeEntries[id].displayNeedsUpdate = true;
	                }
                }
            }
            if(typeof data.stargaze.rebirthStart !== 'undefined'){
                for(id in data.stargaze.rebirthStart){
                    this.rebirthStart[id] = data.stargaze.rebirthStart[id];
                }
            }
            if(typeof data.stargaze.rebirthUnlocked !== 'undefined'){
                for(id in data.stargaze.rebirthUnlocked){
                    this.rebirthUnlocked[id] = data.stargaze.rebirthUnlocked[id];
                }
            }
            if(typeof data.stargaze.rebirthChildUnlocked !== 'undefined'){
                for(id in data.stargaze.rebirthChildUnlocked){
                    this.rebirthChildUnlocked[id] = data.stargaze.rebirthChildUnlocked[id];
                }
            }
            this.unlocked = data.stargaze.unlocked;
		}
		for(var id in this.upgradeEntries){
			var data = this.upgradeEntries[id];
			if(data.achieved == true){
				if(data.onApply)data.onApply();
			}
		}
	};

	instance.getStargazeData = function(id) {
		return this.entries[id];
	};

	return instance;

}());
