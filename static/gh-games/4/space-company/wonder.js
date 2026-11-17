// Wonders Tab
function updateWonderCost(){
    preciousGemCost = preciousGemBaseCost * floor1Price;
    preciousSilverCost = preciousSilverBaseCost * floor1Price;
    preciousGoldCost = preciousGoldBaseCost * floor1Price;
    preciousActivateGemCost = preciousActivateGemBaseCost * floor1Price;
    preciousActivateSilverCost = preciousActivateSilverBaseCost * floor1Price;
    preciousActivateGoldCost = preciousActivateGoldBaseCost * floor1Price;
    energeticWoodCost = energeticWoodBaseCost * floor1Price;
    energeticCharcoalCost = energeticCharcoalBaseCost * floor1Price;
    energeticUraniumCost = energeticUraniumBaseCost * floor1Price;
    energeticActivateWoodCost = energeticActivateWoodBaseCost * floor1Price;
    energeticActivateCharcoalCost = energeticActivateCharcoalBaseCost * floor1Price;
    energeticActivateUraniumCost = energeticActivateUraniumBaseCost * floor1Price;
    techSiliconCost = techSiliconBaseCost * floor1Price;
    techGoldCost = techGoldBaseCost * floor1Price;
    techGemCost = techGemBaseCost * floor1Price;
    techActivateSiliconCost = techActivateSiliconBaseCost * floor1Price;
    techActivateGoldCost = techActivateGoldBaseCost * floor1Price;
    techActivateGemCost = techActivateGemBaseCost * floor1Price;
    meteoriteMeteoriteCost = meteoriteMeteoriteBaseCost * floor1Price;
    meteoriteIceCost = meteoriteIceBaseCost * floor1Price;
    meteoriteSiliconCost = meteoriteSiliconBaseCost * floor1Price;
    meteoriteActivateMeteoriteCost = meteoriteActivateMeteoriteBaseCost * floor1Price;
    meteoriteActivateIceCost = meteoriteActivateIceBaseCost * floor1Price;
    meteoriteActivateSiliconCost = meteoriteActivateSiliconBaseCost * floor1Price;

    commsWonderGoldCost = commsWonderGoldBaseCost * floor23Price;
    commsWonderSiliconCost = commsWonderSiliconBaseCost * floor23Price;
    commsWonderIceCost = commsWonderIceBaseCost * floor23Price;
    rocketWonderLunariteCost = rocketWonderLunariteBaseCost * floor23Price;
    rocketWonderTitaniumCost = rocketWonderTitaniumBaseCost * floor23Price;
    rocketWonderMetalCost = rocketWonderMetalBaseCost * floor23Price;
    antimatterWonderUraniumCost = antimatterWonderUraniumBaseCost * floor23Price;
    antimatterWonderLavaCost = antimatterWonderLavaBaseCost * floor23Price;
    antimatterWonderOilCost = antimatterWonderOilBaseCost * floor23Price;
    antimatterWonderMethaneCost = antimatterWonderMethaneBaseCost * floor23Price;
    portalMeteoriteCost = portalMeteoriteBaseCost * floor23Price;
    portalHeliumCost = portalHeliumBaseCost * floor23Price;
    portalSiliconCost = portalSiliconBaseCost * floor23Price;
    stargateWonderPlasmaCost = stargateWonderPlasmaBaseCost * floor23Price;
    stargateWonderSiliconCost = stargateWonderSiliconBaseCost * floor23Price;
    stargateWonderMeteoriteCost = stargateWonderMeteoriteBaseCost * floor23Price;
}

function updateProgressBar(elementId, percentage) {
    if(percentage <= 100){
        document.getElementById(elementId).textContent = Game.settings.format(percentage,2) + "%";
        document.getElementById(elementId).style.width = percentage + "%";
    }
    else{
        document.getElementById(elementId).textContent = "100%";
        document.getElementById(elementId).style.width = 100 + "%";
    }
}

function refreshWonderBars(){
	if(contains(resourcesUnlocked, "preciousWonderNav") === false){
		var preciousGem = Math.min(preciousGemCost, getResource(RESOURCE.Gem));
		var preciousSilver = Math.min(preciousSilverCost, getResource(RESOURCE.Silver));
		var preciousGold = Math.min(preciousGoldCost, getResource(RESOURCE.Gold));

		var preciousBar = (preciousGem + preciousSilver + preciousGold)
			/ (preciousGemCost + preciousSilverCost + preciousGoldCost);
        updateProgressBar("preciousBar", preciousBar * 100);
	}
	if((document.getElementById("activatePreciousWonder").className === "hidden") === false){
		var preciousActivateGem = Math.min(preciousActivateGemCost, getResource(RESOURCE.Gem));
		var preciousActivateSilver = Math.min(preciousActivateSilverCost, getResource(RESOURCE.Silver));
		var preciousActivateGold = Math.min(preciousActivateGoldCost, getResource(RESOURCE.Gold));

		var preciousActivateBar = (preciousActivateGem + preciousActivateSilver + preciousActivateGold)
			/ (preciousActivateGemCost + preciousActivateSilverCost + preciousActivateGoldCost);
        updateProgressBar("preciousActivateBar", preciousActivateBar * 100);
	}
	if(contains(resourcesUnlocked, "energeticWonderNav") === false){
		var energeticWood = Math.min(energeticWoodCost, getResource(RESOURCE.Wood));
		var energeticCharcoal = Math.min(energeticCharcoalCost, getResource(RESOURCE.Charcoal));
		var energeticUranium = Math.min(energeticUraniumCost, getResource(RESOURCE.Uranium));

		var energeticBar = (energeticWood + energeticCharcoal + energeticUranium)
			/ (energeticWoodCost + energeticCharcoalCost + energeticUraniumCost);
		updateProgressBar("energeticBar", energeticBar * 100);
	}
	if((document.getElementById("activateEnergeticWonder").className === "hidden") === false){
		var energeticActivateWood = Math.min(energeticActivateWoodCost, getResource(RESOURCE.Wood));
		var energeticActivateCharcoal = Math.min(energeticActivateCharcoalCost, getResource(RESOURCE.Charcoal));
		var energeticActivateUranium = Math.min(energeticActivateUraniumCost, getResource(RESOURCE.Uranium));

		var energeticActivateBar = (energeticActivateWood + energeticActivateCharcoal + energeticActivateUranium)
			/ (energeticActivateWoodCost + energeticActivateCharcoalCost + energeticActivateUraniumCost);
        updateProgressBar("energeticActivateBar", energeticActivateBar * 100);
	}
	if(contains(resourcesUnlocked, "techWonderNav") === false){
		var techSilicon = Math.min(techSiliconCost, getResource(RESOURCE.Silicon));
		var techGold = Math.min(techGoldCost, getResource(RESOURCE.Gold));
		var techGem = Math.min(techGemCost, getResource(RESOURCE.Gem));

		var techBar = (techSilicon + techGold + techGem)
			/ (techSiliconCost + techGoldCost + techGemCost);
        updateProgressBar("techBar", techBar * 100);
	}
	if((document.getElementById("activateTechWonder").className === "hidden") === false){
		var techActivateSilicon = Math.min(techActivateSiliconCost, getResource(RESOURCE.Silicon));
		var techActivateGold = Math.min(techActivateGoldCost, getResource(RESOURCE.Gold));
		var techActivateGem = Math.min(techActivateGemCost, getResource(RESOURCE.Gem));

		var techActivateBar = (techActivateSilicon + techActivateGold + techActivateGem)
			/ (techActivateSiliconCost + techActivateGoldCost + techActivateGemCost);
        updateProgressBar("techActivateBar", techActivateBar * 100);
	}
	if(contains(resourcesUnlocked, "meteoriteWonderNav") === false){
		var meteoriteMeteorite = Math.min(meteoriteMeteoriteCost, getResource(RESOURCE.Meteorite));
		var meteoriteIce = Math.min(meteoriteIceCost, getResource(RESOURCE.Ice));
		var meteoriteSilicon = Math.min(meteoriteSiliconCost, getResource(RESOURCE.Silicon));

		var meteoriteBar = (meteoriteMeteorite + meteoriteIce + meteoriteSilicon)
			/ (meteoriteMeteoriteCost + meteoriteIceCost + meteoriteSiliconCost);
        updateProgressBar("meteoriteBar", meteoriteBar * 100);
	}
	if((document.getElementById("activateMeteoriteWonder").className === "hidden") === false){
		var meteoriteActivateMeteorite = Math.min(meteoriteActivateMeteoriteCost, getResource(RESOURCE.Meteorite));
		var meteoriteActivateIce = Math.min(meteoriteActivateIceCost, getResource(RESOURCE.Ice));
		var meteoriteActivateSilicon = Math.min(meteoriteActivateSiliconCost, getResource(RESOURCE.Silicon));

		var meteoriteActivateBar = (meteoriteActivateMeteorite + meteoriteActivateIce + meteoriteActivateSilicon)
			/ (meteoriteActivateMeteoriteCost + meteoriteActivateIceCost + meteoriteActivateSiliconCost);
        updateProgressBar("meteoriteActivateBar", meteoriteActivateBar * 100);
	}
	if((document.getElementById("rebuildCommsWonder").className === "hidden") === false){
		var rebuildCommsGold = Math.min(commsWonderGoldCost, getResource(RESOURCE.Gold));
		var rebuildCommsSilicon = Math.min(commsWonderSiliconCost, getResource(RESOURCE.Silicon));
		var rebuildCommsIce = Math.min(commsWonderIceCost, getResource(RESOURCE.Ice));

		var commsWonderBar = (rebuildCommsGold + rebuildCommsSilicon + rebuildCommsIce)
			/ (commsWonderGoldCost + commsWonderSiliconCost + commsWonderIceCost);
        updateProgressBar("commsWonderBar", commsWonderBar * 100);
	}
	if((document.getElementById("rebuildRocketWonder").className === "hidden") === false){
		var rebuildRocketLunarite = Math.min(rocketWonderLunariteCost, getResource(RESOURCE.Lunarite));
		var rebuildRocketTitanium = Math.min(rocketWonderTitaniumCost, getResource(RESOURCE.Titanium));
		var rebuildRocketMetal = Math.min(rocketWonderMetalCost, getResource(RESOURCE.Metal));

		var rocketWonderBar = (rebuildRocketLunarite + rebuildRocketTitanium + rebuildRocketMetal)
			/ (rocketWonderLunariteCost + rocketWonderTitaniumCost + rocketWonderMetalCost);
        updateProgressBar("rocketWonderBar", rocketWonderBar * 100);
	}
	if((document.getElementById("rebuildAntimatterWonder").className === "hidden") === false){
		var rebuildAntimatterUranium = Math.min(antimatterWonderUraniumCost, getResource(RESOURCE.Uranium));
		var rebuildAntimatterLava = Math.min(antimatterWonderLavaCost, getResource(RESOURCE.Lava));
		var rebuildAntimatterOil = Math.min(antimatterWonderOilCost, getResource(RESOURCE.Oil));
		var rebuildAntimatterMethane = Math.min(antimatterWonderMethaneCost, getResource(RESOURCE.Methane));

		var antimatterWonderBar = (rebuildAntimatterUranium+rebuildAntimatterLava+rebuildAntimatterOil+rebuildAntimatterMethane)
			/ (antimatterWonderUraniumCost + antimatterWonderLavaCost + antimatterWonderOilCost + antimatterWonderMethaneCost);
        updateProgressBar("antimatterWonderBar", antimatterWonderBar * 100);
	}
	if((document.getElementById("activatePortal").className === "hidden") === false){
		var portalMeteorite = Math.min(portalMeteoriteCost, getResource(RESOURCE.Meteorite));
		var portalHelium = Math.min(portalHeliumCost, getResource(RESOURCE.Helium));
		var portalSilicon = Math.min(portalSiliconCost, getResource(RESOURCE.Silicon));

		var portalBar = (portalMeteorite+portalHelium+portalSilicon)
			/ (portalMeteoriteCost + portalHeliumCost + portalSiliconCost);
        updateProgressBar("portalBar", portalBar * 100);
	}
	if((document.getElementById("rebuildStargate").className === "hidden") === false){
        var stargatePlasma = Math.min(stargateWonderPlasmaCost, getResource(RESOURCE.Plasma));
        var stargateSilicon = Math.min(stargateWonderSiliconCost, getResource(RESOURCE.Silicon));
        var stargateMeteorite = Math.min(stargateWonderMeteoriteCost, getResource(RESOURCE.Meteorite));

		var stargateBar = (stargatePlasma + stargateSilicon + stargateMeteorite) /
			(stargateWonderPlasmaCost + stargateWonderSiliconCost + stargateWonderMeteoriteCost);
        updateProgressBar("stargateWonderBar", stargateBar * 100);
	}
}

function unlockTier3(){
	document.getElementById("uraniumTier3").className = "";
	document.getElementById("lavaTier3").className = "";
	document.getElementById("oilTier3").className = "";
	document.getElementById("metalTier3").className = "";
	document.getElementById("gemTier3").className = "";
	document.getElementById("charcoalTier3").className = "";
	document.getElementById("woodTier3").className = "";
	document.getElementById("siliconTier3").className = "";
	document.getElementById("lunariteTier3").className = "";
	document.getElementById("methaneTier3").className = "";
	document.getElementById("titaniumTier3").className = "";
	document.getElementById("goldTier3").className = "";
	document.getElementById("silverTier3").className = "";
	document.getElementById("hydrogenTier3").className = "";
	document.getElementById("heliumTier3").className = "";
	document.getElementById("iceTier3").className = "";
}

function unlockTier4(){
	document.getElementById("uraniumTier4").className = "";
	document.getElementById("lavaTier4").className = "";
	document.getElementById("oilTier4").className = "";
	document.getElementById("metalTier4").className = "";
	document.getElementById("gemTier4").className = "";
	document.getElementById("charcoalTier4").className = "";
	document.getElementById("woodTier4").className = "";
	document.getElementById("siliconTier4").className = "";
	document.getElementById("lunariteTier4").className = "";
	document.getElementById("methaneTier4").className = "";
	document.getElementById("titaniumTier4").className = "";
	document.getElementById("goldTier4").className = "";
	document.getElementById("silverTier4").className = "";
	document.getElementById("hydrogenTier4").className = "";
	document.getElementById("heliumTier4").className = "";
	document.getElementById("iceTier4").className = "";
}

function unlockTier5(){
	document.getElementById("uraniumTier5").className = "";
	document.getElementById("lavaTier5").className = "";
	document.getElementById("oilTier5").className = "";
	document.getElementById("metalTier5").className = "";
	document.getElementById("gemTier5").className = "";
	document.getElementById("charcoalTier5").className = "";
	document.getElementById("woodTier5").className = "";
	document.getElementById("siliconTier5").className = "";
	document.getElementById("lunariteTier5").className = "";
	document.getElementById("methaneTier5").className = "";
	document.getElementById("titaniumTier5").className = "";
	document.getElementById("goldTier5").className = "";
	document.getElementById("silverTier5").className = "";
	document.getElementById("hydrogenTier5").className = "";
	document.getElementById("heliumTier5").className = "";
	document.getElementById("iceTier5").className = "";
}

function removeTier5(){
	document.getElementById("uraniumTier5").className = "hidden";
	document.getElementById("lavaTier5").className = "hidden";
	document.getElementById("oilTier5").className = "hidden";
	document.getElementById("metalTier5").className = "hidden";
	document.getElementById("gemTier5").className = "hidden";
	document.getElementById("charcoalTier5").className = "hidden";
	document.getElementById("woodTier5").className = "hidden";
	document.getElementById("siliconTier5").className = "hidden";
	document.getElementById("lunariteTier5").className = "hidden";
	document.getElementById("methaneTier5").className = "hidden";
	document.getElementById("titaniumTier5").className = "hidden";
	document.getElementById("goldTier5").className = "hidden";
	document.getElementById("silverTier5").className = "hidden";
	document.getElementById("hydrogenTier5").className = "hidden";
	document.getElementById("heliumTier5").className = "hidden";
	document.getElementById("iceTier5").className = "hidden";

	planetNuke = 0;
	condensator = 0;
	fossilator = 0;
	multiDrill = 0;
	diamondChamber = 0;
	microPollutor = 0;
	forest = 0;
	cloner = 0;
	interCow = 0;
	club = 0;
	philosopher = 0;
	werewolf = 0;
	tardis = 0;
	harvester = 0;
	cage = 0;
	overexchange = 0;
	updateCost();
}


function achievePreciousWonder(){
	if(getResource(RESOURCE.Gem) >= preciousGemCost && getResource(RESOURCE.Silver) >= preciousSilverCost && getResource(RESOURCE.Gold) >= preciousGoldCost){
		Game.resources.takeResource(RESOURCE.Gem, preciousGemCost);
		Game.resources.takeResource(RESOURCE.Silver, preciousSilverCost);
		Game.resources.takeResource(RESOURCE.Gold, preciousGoldCost);
		document.getElementById("preciousWonderButton").className = "hidden";
		document.getElementById("preciousProgress").className = "hidden";
		document.getElementById("preciousWonderNav").className = "";
		document.getElementById("wonderFloor1Nav").className = "";
		buttonsHidden.push("preciousProgress", "preciousWonderButton");
		resourcesUnlocked.push("preciousWonderNav", "wonderFloor1Nav");
        Game.statistics.add('wondersBuilt');
	}
}

function activatePreciousWonder(){
	if(getResource(RESOURCE.Gem) >= preciousActivateGemCost && getResource(RESOURCE.Silver) >= preciousActivateSilverCost && getResource(RESOURCE.Gold) >= preciousActivateGoldCost){
		Game.resources.takeResource(RESOURCE.Gem, preciousActivateGemCost);
		Game.resources.takeResource(RESOURCE.Silver, preciousActivateSilverCost);
		Game.resources.takeResource(RESOURCE.Gold, preciousActivateGoldCost);
		document.getElementById("nuclearPower").className = "";
		document.getElementById("activatePreciousWonder").className = "hidden";
		document.getElementById("uraniumNav").className = "innerPlanet";
		document.getElementById("preciousActivation").textContent = "Activated";
		document.getElementById("preciousActivation").className = "green";
		resourcesUnlocked.push("uraniumNav", "nuclearPower");
		buttonsHidden.push("activatePreciousWonder");
		activated.push("precious");
        Game.statistics.add('wondersActivated');
		newUnlock("resources");
	}
}

function achieveEnergeticWonder(){
	if(getResource(RESOURCE.Wood) >= energeticWoodCost && getResource(RESOURCE.Charcoal) >= energeticCharcoalCost && getResource(RESOURCE.Uranium) >= energeticUraniumCost){
		Game.resources.takeResource(RESOURCE.Wood, energeticWoodCost);
		Game.resources.takeResource(RESOURCE.Charcoal, energeticCharcoalCost);
		Game.resources.takeResource(RESOURCE.Uranium, energeticUraniumCost);
		document.getElementById("energeticWonderButton").className = "hidden";
		document.getElementById("energeticProgress").className = "hidden";
		document.getElementById("energeticWonderNav").className = "";
		buttonsHidden.push("energeticProgress", "energeticWonderButton");
		resourcesUnlocked.push("energeticWonderNav");
        Game.statistics.add('wondersBuilt');
	}
}

function activateEnergeticWonder(){
	if(getResource(RESOURCE.Wood) >= energeticActivateWoodCost && getResource(RESOURCE.Charcoal) >= energeticActivateCharcoalCost && getResource(RESOURCE.Uranium) >= energeticActivateUraniumCost){
		Game.resources.takeResource(RESOURCE.Wood, energeticActivateWoodCost);
		Game.resources.takeResource(RESOURCE.Charcoal, energeticActivateCharcoalCost);
		Game.resources.takeResource(RESOURCE.Uranium, energeticActivateUraniumCost);
		document.getElementById("magmaticPower").className = "";
		document.getElementById("activateEnergeticWonder").className = "hidden";
		document.getElementById("lavaNav").className = "innerPlanet";
		document.getElementById("energeticActivation").textContent = "Activated";
		document.getElementById("energeticActivation").className = "green";
		resourcesUnlocked.push("lavaNav", "magmaticPower");
		buttonsHidden.push("activateEnergeticWonder");
		activated.push("energetic");
        Game.statistics.add('wondersActivated');
		newUnlock("resources");
	}
}

function achieveTechWonder(){
	if(getResource(RESOURCE.Silicon) >= techSiliconCost && getResource(RESOURCE.Gold) >= techGoldCost && getResource(RESOURCE.Gem) >= techGemCost){
		Game.resources.takeResource(RESOURCE.Silicon, techSiliconCost);
		Game.resources.takeResource(RESOURCE.Gold, techGoldCost);
		Game.resources.takeResource(RESOURCE.Gem, techGemCost);
		document.getElementById("techWonderButton").className = "hidden";
		document.getElementById("techProgress").className = "hidden";
		document.getElementById("techWonderNav").className = "";
		buttonsHidden.push("techProgress", "techWonderButton");
		resourcesUnlocked.push("techWonderNav");
        Game.statistics.add('wondersBuilt');
	}
}

function activateTechWonder(){
	if(getResource(RESOURCE.Silicon) >= techActivateSiliconCost && getResource(RESOURCE.Gold) >= techActivateGoldCost && getResource(RESOURCE.Gem) >= techActivateGemCost){
		Game.resources.takeResource(RESOURCE.Silicon, techActivateSiliconCost);
		Game.resources.takeResource(RESOURCE.Gold, techActivateGoldCost);
		Game.resources.takeResource(RESOURCE.Gem, techActivateGemCost);
		unlockTier3();
		document.getElementById("activateTechWonder").className = "hidden";
		document.getElementById("techActivation").textContent = "Activated";
		document.getElementById("techActivation").className = "green";
		techUnlocked = true;
		buttonsHidden.push("activateTechWonder");
		activated.push("tech");
        Game.statistics.add('wondersActivated');
		newUnlock("resources");
	}
}

function achieveMeteoriteWonder(){
	if(getResource(RESOURCE.Meteorite) >= meteoriteMeteoriteCost && getResource(RESOURCE.Ice) >= meteoriteIceCost && getResource(RESOURCE.Silicon) >= meteoriteSiliconCost){
		Game.resources.takeResource(RESOURCE.Meteorite, meteoriteMeteoriteCost);
		Game.resources.takeResource(RESOURCE.Ice, meteoriteIceCost);
		Game.resources.takeResource(RESOURCE.Silicon, meteoriteSiliconCost);
		document.getElementById("meteoriteWonderButton").className = "hidden";
		document.getElementById("meteoriteProgress").className = "hidden";
		document.getElementById("meteoriteWonderNav").className = "";
		buttonsHidden.push("meteoriteProgress", "meteoriteWonderButton");
		resourcesUnlocked.push("meteoriteWonderNav");
        Game.statistics.add('wondersBuilt');
	}
}

function activateMeteoriteWonder(){
	if(getResource(RESOURCE.Meteorite) >= meteoriteActivateMeteoriteCost && getResource(RESOURCE.Ice) >= meteoriteActivateIceCost && getResource(RESOURCE.Silicon) >= meteoriteActivateSiliconCost){
		Game.resources.takeResource(RESOURCE.Meteorite, meteoriteActivateMeteoriteCost);
		Game.resources.takeResource(RESOURCE.Ice, meteoriteActivateIceCost);
		Game.resources.takeResource(RESOURCE.Silicon, meteoriteActivateSiliconCost);
		unlockTier4();
		document.getElementById("activateMeteoriteWonder").className = "hidden";
		document.getElementById("meteoriteActivation").textContent = "Activated";
		document.getElementById("meteoriteActivation").className = "green";
		meteoriteUnlocked = true;
		buttonsHidden.push("activateMeteoriteWonder");
		activated.push("meteorite");
        Game.statistics.add('wondersActivated');
		newUnlock("resources");

		document.getElementById("wonderFloor2Nav").className = "sideTab";
		document.getElementById("communicationWonderNav").className = "sideTab";
		document.getElementById("rocketWonderNav").className = "sideTab";
		document.getElementById("antimatterWonderNav").className = "sideTab";
		document.getElementById("portalRoomNav").className = "sideTab";
		resourcesUnlocked.push("wonderFloor2Nav", "communicationWonderNav", "rocketWonderNav", "antimatterWonderNav", "portalRoomNav");
	}
}

function rebuildCommsWonder(){
	if(getResource(RESOURCE.Gold) >= commsWonderGoldCost && getResource(RESOURCE.Silicon) >= commsWonderSiliconCost && getResource(RESOURCE.Ice) >= commsWonderIceCost){
		Game.resources.takeResource(RESOURCE.Gold, commsWonderGoldCost);
		Game.resources.takeResource(RESOURCE.Silicon, commsWonderSiliconCost);
		Game.resources.takeResource(RESOURCE.Ice, commsWonderIceCost);
		document.getElementById("rebuildCommsWonder").className = "hidden";
		document.getElementById("commsActivation").textContent = "Activated";
		document.getElementById("commsActivation").className = "green";
		document.getElementById("interstellarTab_comms_ne").className = "collapse_interstellarTab_general";
		buttonsHidden.push("rebuildCommsWonder");
		activated.push("comms");
        Game.statistics.add('wondersActivated');
        document.getElementById("interstellarTab").className = "";
		if(document.getElementById("interstellarTab").className != ""){
        	tabsUnlocked.push("interstellarTab");
        	Game.notifySuccess("New Tab!", "You've unlocked the Interstellar Tab!");
        }
		newUnlock("interstellar");
		Game.removeExcess(tabsUnlocked, "interstellarTab");

		Game.interstellar.getInterstellarData('comms').unlocked = true;
		Game.interstellar.getInterstellarData('comms').displayNeedsUpdate = true;
	}
}

function rebuildRocketWonder(){
	if(getResource(RESOURCE.Lunarite) >= rocketWonderLunariteCost && getResource(RESOURCE.Titanium) >= rocketWonderTitaniumCost && getResource(RESOURCE.Metal) >= rocketWonderMetalCost){
		Game.resources.takeResource(RESOURCE.Lunarite, rocketWonderLunariteCost);
		Game.resources.takeResource(RESOURCE.Titanium, rocketWonderTitaniumCost);
		Game.resources.takeResource(RESOURCE.Metal, rocketWonderMetalCost);
		document.getElementById("rebuildRocketWonder").className = "hidden";
		document.getElementById("rocketActivation").textContent = "Activated";
		document.getElementById("rocketActivation").className = "green";
		buttonsHidden.push("rebuildRocketWonder");
		activated.push("rocket");
        Game.statistics.add('wondersActivated');
        if(document.getElementById("interstellarTab").className != ""){
        	document.getElementById("interstellarTab").className = "";
        	tabsUnlocked.push("interstellarTab");
        	Game.notifySuccess("New Tab!", "You've unlocked the Interstellar Tab!");
        }
		document.getElementById("interstellarTab_rocket_ne").className = "collapse_interstellarTab_general";
		newUnlock("interstellar");
		Game.removeExcess(tabsUnlocked, "interstellarTab");

		Game.interstellar.getInterstellarData('rocket').unlocked = true;
		Game.interstellar.getInterstellarData('rocket').displayNeedsUpdate = true;
	}
}

function rebuildAntimatterWonder(){
	if(getResource(RESOURCE.Uranium) >= antimatterWonderUraniumCost && getResource(RESOURCE.Lava) >= antimatterWonderLavaCost
		&& getResource(RESOURCE.Oil) >= antimatterWonderOilCost && getResource(RESOURCE.Methane) >= antimatterWonderMethaneCost){
		Game.resources.takeResource(RESOURCE.Uranium, antimatterWonderUraniumCost);
		Game.resources.takeResource(RESOURCE.Lava, antimatterWonderLavaCost);
		Game.resources.takeResource(RESOURCE.Oil, antimatterWonderOilCost);
		Game.resources.takeResource(RESOURCE.Methane, antimatterWonderMethaneCost);
		document.getElementById("rebuildAntimatterWonder").className = "hidden";
		document.getElementById("antimatterActivation").textContent = "Activated";
		document.getElementById("antimatterActivation").className = "green";
		buttonsHidden.push("rebuildAntimatterWonder");
		activated.push("antimatter");
        Game.statistics.add('wondersActivated');
        if(document.getElementById("interstellarTab").className != ""){
        	document.getElementById("interstellarTab").className = "";
        	tabsUnlocked.push("interstellarTab");
        	Game.notifySuccess("New Tab!", "You've unlocked the Interstellar Tab!");
        }
		document.getElementById("interstellarTab_antimatter_ne").className = "collapse_interstellarTab_general";
		newUnlock("interstellar");
		Game.removeExcess(tabsUnlocked, "interstellarTab");

		Game.interstellar.getInterstellarData('antimatter').unlocked = true;
		Game.interstellar.getInterstellarData('antimatter').displayNeedsUpdate = true;
	}
}

function activatePortal(){
	if(getResource(RESOURCE.Meteorite) >= portalMeteoriteCost && getResource(RESOURCE.Helium) >= portalHeliumCost && getResource(RESOURCE.Silicon) >= portalSiliconCost){
		Game.resources.takeResource(RESOURCE.Meteorite, portalMeteoriteCost);
		Game.resources.takeResource(RESOURCE.Helium, portalHeliumCost);
		Game.resources.takeResource(RESOURCE.Silicon, portalSiliconCost);
		document.getElementById("activatePortal").className = "hidden";
		document.getElementById("portalRoomActivation").textContent = "Activated";
		document.getElementById("portalRoomActivation").className = "green";
		document.getElementById("wonderFloor3Nav").className = "sideTab";
		document.getElementById("stargateNav").className = "sideTab";
		resourcesUnlocked.push("wonderFloor3Nav", "stargateNav");
		buttonsHidden.push("activatePortal");
		activated.push("portalRoom");
		newUnlock("wonder");
	}
}

function rebuildStargate(){
	if(getResource(RESOURCE.Plasma) >= stargateWonderPlasmaCost && getResource(RESOURCE.Silicon) >= stargateWonderSiliconCost && getResource(RESOURCE.Meteorite) >= stargateWonderMeteoriteCost){
		Game.resources.takeResource(RESOURCE.Plasma, stargateWonderPlasmaCost);
		Game.resources.takeResource(RESOURCE.Silicon, stargateWonderSiliconCost);
		Game.resources.takeResource(RESOURCE.Meteorite, stargateWonderMeteoriteCost);
		document.getElementById("rebuildStargate").className = "hidden";
		document.getElementById("stargateActivation").textContent = "Activated";
		document.getElementById("stargateActivation").className = "green";
		document.getElementById("interstellarTab_travel_ne").className = "collapse_interstellarTab_general";
		document.getElementById("interstellarTab_military_ne").className = "collapse_interstellarTab_general";
		buttonsHidden.push("rebuildStargate");
		activated.push("stargate");
		Game.statistics.add('wondersActivated');
		if(document.getElementById("interstellarTab").className != ""){
			document.getElementById("interstellarTab").className = "";
			tabsUnlocked.push("interstellarTab");
			Game.notifySuccess("New Tab!", "You've unlocked the Interstellar Tab!");
		}
		newUnlock("interstellar");

		Game.interstellar.getInterstellarData('stargate').unlocked = true;
		Game.interstellar.getInterstellarData('stargate').displayNeedsUpdate = true;
	}
}
