function newUnlock(tab){
	document.getElementById(tab + "TabGlyph").className = "glyphicon glyphicon-exclamation-sign";
	if(tab === "more"){
		document.getElementById("achievementsTabGlyph").className = "pull-right glyphicon glyphicon-exclamation-sign";
	}
}

function newNavUnlock(nav){
	document.getElementById(nav + "NavGlyph").className = "glyphicon glyphicon-exclamation-sign";
}

function tabClicked(tab){
	document.getElementById(tab + "TabGlyph").className = "pull-right glyphicon glyphicon-exclamation-sign hidden";
}

function navClicked(nav){
	document.getElementById(nav + "NavGlyph").className = "pull-right glyphicon glyphicon-exclamation-sign hidden";
}

function activeResourceTab(tab){
	var navs = ["plasma", "energy", "uranium", "lava"].concat(resources);
	for(var i = 0; i < navs.length; i++){
		var parts = document.getElementById(navs[i] + "Nav").className.split(' ');
		if(parts.indexOf('hidden') === -1) {
			if(parts.indexOf("earth") > -1) {
				document.getElementById(navs[i] + "Nav").className = "earth sideTab";
			} else if(parts.indexOf("innerPlanet") > -1) {
				document.getElementById(navs[i] + "Nav").className = "innerPlanet sideTab";
			} else if(parts.indexOf("outerPlanet") > -1) {
				document.getElementById(navs[i] + "Nav").className = "outerPlanet sideTab";
			} else {
				document.getElementById(navs[i] + "Nav").className = "sideTab";
			}
		}
	}
	document.getElementById(tab).className += " info";
}

function activeResearchTab(tab){
	document.getElementById("scienceNav").className = "sideTab";
	document.getElementById("technologiesNav").className = "sideTab";
	document.getElementById(tab).className += " info";
}

function activeSolarTab(tab){
	document.getElementById("rocketFuelNav").className = "sideTab";
	if(rocketLaunched === false){
		document.getElementById("spaceRocket").className = "sideTab";
	}
	else{
		if(document.getElementById("mercury").className != "inner sideTab hidden"){
			document.getElementById("mercury").className = "inner sideTab";
		}
		if(document.getElementById("moon").className != "inner sideTab hidden"){
			document.getElementById("moon").className = "inner sideTab";
		}
		if(document.getElementById("venus").className != "inner sideTab hidden"){
			document.getElementById("venus").className = "inner sideTab";
		}
		if(document.getElementById("mars").className != "inner sideTab hidden"){
			document.getElementById("mars").className = "inner sideTab";
		}
		if(document.getElementById("asteroidBelt").className != "inner sideTab hidden"){
			document.getElementById("asteroidBelt").className = "inner sideTab";
		}
	}
	if(contains(explored, "asteroidBelt")){
		if(document.getElementById("wonderStation").className != "inner sideTab hidden"){
			document.getElementById("wonderStation").className = "inner sideTab";
		}
		if(document.getElementById("jupiter").className != "outer sideTab hidden"){
			document.getElementById("jupiter").className = "outer sideTab";
		}
		if(document.getElementById("saturn").className != "outer sideTab hidden"){
			document.getElementById("saturn").className = "outer sideTab";
		}
		if(document.getElementById("uranus").className != "outer sideTab hidden"){
			document.getElementById("uranus").className = "outer sideTab";
		}
		if(document.getElementById("neptune").className != "outer sideTab hidden"){
			document.getElementById("neptune").className = "outer sideTab";
		}
		if(document.getElementById("pluto").className != "outer sideTab hidden"){
			document.getElementById("pluto").className = "outer sideTab";
		}
		if(document.getElementById("kuiperBelt").className != "outer sideTab hidden"){
			document.getElementById("kuiperBelt").className = "outer sideTab";
		};
	}
	if(contains(explored, "kuiperBelt")){
		if(document.getElementById("kuiperBelt").className != "outer sideTab hidden"){
			document.getElementById("solCenter").className = "outer sideTab";
		}
	}
	document.getElementById(tab).className += " info";
}

function activeWonderTab(tab){
	document.getElementById("theWonderStation").className = "sideTab";
	if(document.getElementById("preciousWonderNav").className != "sideTab hidden"){
		document.getElementById("preciousWonderNav").className = "sideTab";
	}
	if(document.getElementById("energeticWonderNav").className != "sideTab hidden"){
		document.getElementById("energeticWonderNav").className = "sideTab";
	}
	if(document.getElementById("techWonderNav").className != "sideTab hidden"){
		document.getElementById("techWonderNav").className = "sideTab";
	}
	if(document.getElementById("meteoriteWonderNav").className != "sideTab hidden"){
		document.getElementById("meteoriteWonderNav").className = "sideTab";
	}
	if(document.getElementById("communicationWonderNav").className != "sideTab hidden"){
		document.getElementById("communicationWonderNav").className = "sideTab";
	}
	if(document.getElementById("rocketWonderNav").className != "sideTab hidden"){
		document.getElementById("rocketWonderNav").className = "sideTab";
	}
	if(document.getElementById("antimatterWonderNav").className != "sideTab hidden"){
		document.getElementById("antimatterWonderNav").className = "sideTab";
	}
	if(document.getElementById("portalRoomNav").className != "sideTab hidden"){
		document.getElementById("portalRoomNav").className = "sideTab";
	}
	if(document.getElementById("stargateNav").className != "sideTab hidden"){
		document.getElementById("stargateNav").className = "sideTab";
	}
	document.getElementById(tab).className += " info";
}

function activeSolCenterTab(tab){
	document.getElementById("unlockPlasmaNav").className = "sideTab";
	document.getElementById("unlockEmcNav").className = "sideTab";
	document.getElementById("unlockDysonNav").className = "sideTab";
	document.getElementById(tab).className = "info";
}

function activeInterstellarTab(tab){
	if(document.getElementById("commsNav").className != "sideTab hidden"){
		document.getElementById("commsNav").className = "sideTab";
	}
	if(document.getElementById("interRocketNav").className != "sideTab hidden"){
		document.getElementById("interRocketNav").className = "sideTab";
	}
	if(document.getElementById("antimatterNav").className != "sideTab hidden"){
		document.getElementById("antimatterNav").className = "sideTab";
	}
	if(document.getElementById("travelNav").className != "sideTab hidden"){
		document.getElementById("travelNav").className = "sideTab";
	}	document.getElementById(tab).className = "info";
}
