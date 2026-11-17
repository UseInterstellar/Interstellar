Game.interstellarUI = (function(){

	var instance = {};
	
	instance.entries = {};
    instance.commEntries = {};
    instance.commObservers = {};
	instance.rocketPartEntries = {};
    instance.rocketPartObservers = {};
    instance.rocketEntries = {};
    instance.rocketObservers = {};
    instance.antimatterEntries = {};
    instance.antimatterObservers = {};
    instance.starEntries = {};
    instance.starObservers = {};
    instance.militaryEntries = {};
    instance.militaryObservers = {};
    instance.titleTemplate = null;
    instance.machineTemplate = null;
    instance.navTemplate = null;

    instance.tabRoot = null;
    instance.navRoot = null;

    instance.tab = null;

    instance.categoryNames = {};

    instance.initialise = function() {

        this.tab = Game.ui.createTab({id: 'interstellar', title: 'Interstellar', hidden: 'hidden'});
        this.tab.initialise();

        instance.titleTemplate = Handlebars.compile(
            ['<tr><td colspan="2" style="border:none;">',
                '<h2 class="default btn-link">{{name}}</h2>',
                '<span>{{{desc}}}</span>',
                '<br><br>',
                '</td></tr>'].join('\n'));

        instance.militaryTitleTemplate = Handlebars.compile(
            ['<tr><td colspan="2" style="border:none;">',
                '<h2 class="default btn-link">{{name}}</h2>',
                '<h4><b>Total Fleet Attributes:</b></h4>',
                '<span class="fleetPower">0</span> Power,',
                '<span class="fleetDefense">0</span> Defense,',
                '<span class="fleetSpeed">0</span> Speed',
                '<br><br>',
                '</td></tr>'].join('\n'));

        instance.factionTitleTemplate = Handlebars.compile(
            ['<tr><td style="border:none; width:50%;">',
                '<h2 class="default btn-link">{{name}}</h2>',
                '<h4><b>Relationship: {{opinion}}</b></h4>',
                '<span>{{desc}}</span>',
                '<br><br>',
                '</td><td style="border:none; width:50%;">',
                '<br><br><br><h4><b>Your Invasion Fleet:</b></h4>',
                '<h4><span class="fleetPower">0</span> Power,',
                '<span class="fleetDefense">0</span> Defense,',
                '<span class="fleetSpeed">0</span> Speed</h4>',
                '</td></tr>'].join('\n'));

        instance.commMachineTemplate = Handlebars.compile(
            ['<tr id="{{htmlId}}"></tr><td>',
                '<h3 class="default btn-link">{{name}}: <span id="{{htmlId}}Count">0</span></h3>',
                '<span>',
                    '<p>{{desc}}</p>',
                    '<p id="{{htmlId}}_cost"></p>',
                '</span>',
                '<div id="{{htmlId}}_buy" onclick="Game.interstellar.comms.buildMachine(\'{{entryName}}\')" class="btn btn-default">Get {{name}}</div>',
                '</td></tr>'].join('\n'));

        instance.machineTemplate = Handlebars.compile(
            ['<tr id="{{htmlId}}"></tr><td>',
                '<h3 class="default btn-link">{{name}}: <span id="{{htmlId}}Count">0</span></h3>',
                '<span>',
                    '<p>{{desc}}</p>',
                    '<p id="{{htmlId}}_prod"></p>',
                    '<p id="{{htmlId}}_use"></p>',
                    '<p id="{{htmlId}}_cost"></p>',
                '</span>',
                '<div id="{{htmlId}}_buy" onclick="Game.interstellar.antimatter.buildMachine(\'{{entryName}}\')" class="btn btn-default">Get 1</div>',
                '<div id="{{htmlId}}_destroy" onclick="Game.interstellar.antimatter.destroyMachine(\'{{entryName}}\')" class="btn btn-default">Destroy 1</div>',
                '</td></tr>'].join('\n'));

        instance.rocketTemplate = Handlebars.compile(
            ['<tr id="{{htmlId}}"></tr><td>',
                '<h3 class="default btn-link">{{name}}: <span id="{{htmlId}}Built">Not Built</span></h3>',
                '<span>',
                    '<p>{{desc}}</p>',
                    '<p id="{{htmlId}}_cost"></p>',
                '</span>',
                '<div id="{{htmlId}}_buy" onclick="Game.interstellar.rocket.buildRocket(\'tier1Rocket\')" class="btn btn-default">Get {{name}}</div>',
                '</td></tr>'].join('\n'));

        instance.rocketPartTemplate = Handlebars.compile(
            ['<tr id="{{htmlId}}"><td>',
                '<h3 class="default btn-link">{{name}}: <span id="{{htmlId}}Count">0</span>/{{max}}</h3>',
                '<span>',
                    '<p>{{desc}}</p>',
                    '<p id="{{htmlId}}_cost"></p>',
                '</span>',
                '<div id="{{htmlId}}_buy" onclick="Game.interstellar.rocketParts.buildPart(\'{{entryName}}\', 1)" class="btn btn-default">Get {{name}}</div>',
                '<div id="{{htmlId}}_buy10" onclick="Game.interstellar.rocketParts.buildPart(\'{{entryName}}\', 10)" class="btn btn-default">Buy 10</div>',
                '<div id="{{htmlId}}_buy{{max}}" onclick="Game.interstellar.rocketParts.buildPart(\'{{entryName}}\', {{max}})" class="btn btn-default">Buy {{max}}</div>',
                '</td></tr>'].join('\n'));

        instance.starTemplate = Handlebars.compile(
            ['<tr id="{{htmlId}}" class="hidden"><td style="width:300px;">',
                '<h3 class="default btn-link" id="{{htmlId}}_name">{{name}}</h3>',
                '<h5>',
                    'Distance: {{distance}} (<span id="{{htmlId}}Cost">{{cost}}</span> Antimatter)<br>',
                    'Planets: {{planets}}<br>',
                '</h5>',
                '<div class="btn btn-default" id="{{htmlId}}_explore" onclick="Game.interstellar.stars.exploreSystem(\'{{id}}\');">Explore</div>',
                '</td><td><br><br><br>',
                '<p>{{desc}}</p>',
                '</td></tr>'].join('\n'));

        instance.factionStarTemplate = Handlebars.compile(
            ['<tr id="{{htmlId}}_conquer" class="hidden"><td colspan="1">',
                '<h3 class="default btn-link" id="{{htmlId}}_name">{{name}}: <span id="{{htmlId}}_owned">Protected</span></h3>',
                '<h5>',
                    'Distance: {{distance}}<br>',
                    'Planets: {{planets}}<br>',
                    'Faction: {{faction}}<br>',
                    'Resources Present: {{resource1}}, {{resource2}}',
                '</h5><hide id="{{htmlId}}_conquerButtons">',

                    // Espionage
                    '<div class="btn btn-default" data-toggle="modal" data-target="#{{htmlId}}_spy">Espionage</div>',
                    '<div id="{{htmlId}}_spy" class="modal fade" role="dialog">',
                        '<div class="modal-dialog modal-lg">',
                            '<div class="modal-content">',
                                '<div class="modal-header">',
                                    '<button type="button" class="close" data-dismiss="modal">&times;</button>',
                                    '<h2 class="modal-title">{{name}}: Espionage</h2>',
                                '</div>',
                                '<div class="modal-body">',
                                    '<span>This is where you can send ships to find information about your enemies\' fleets. At the first level, you will be able to see the number of digits in the enemy fleet statistics, with the second revealing the first digit in all three stats and each successive level will reveal the next digit.</span>',
                                '</div>',
                                '<div class="modal-body">',
                                    '<table class="table"><tr><td>',
                                        '<h4>Active Scouts: <span class="scoutActive">0</span>/<span class="scoutCount">0</span></h4>',
                                        '<div class="btn-group">',
                                        '<button style="width:40px;" class="btn btn-default" onclick="Game.interstellar.military.addShip(\'scout\', \'max\');">++</button>',
                                        '<button style="width:40px;" class="btn btn-default" onclick="Game.interstellar.military.addShip(\'scout\', 1);">+</button>',
                                        '<button style="width:40px;" class="btn btn-default" onclick="Game.interstellar.military.addShip(\'scout\', -1);">-</button>',
                                        '<button style="width:40px;" class="btn btn-default" onclick="Game.interstellar.military.addShip(\'scout\', \'none\')">--</button></div>',
                                        '<br><h4>Success Chance: <span id="{{htmlId}}_spyChance">90</span>%',
                                    '</td><td style="text-align:center;">',
                                        '<h4>System Fleet Statistics:</h4>',
                                        '<span class="{{htmlId}}_power">??</span> Power,',
                                        '<span class="{{htmlId}}_defense">??</span> Defense,',
                                        '<span class="{{htmlId}}_speed">??</span> Speed',
                                        '<br><br>',
                                        // '<h4>Fleet Breakdown</h4>',
                                        // '<span class="{{htmlId}}_ships">???</span>',
                                    '</td><td style="text-align:center;">',
                                        '<h4>Threat Level: (<span class="{{htmlId}}_threat">•</span>)<br><br>',
                                        '<button class="btn btn-default" data-dismiss="modal" onclick="Game.interstellar.military.spy(\'{{id}}\');">Send Scouts</button>',
                                    '</td></tr></table>',
                                '</div>',
                                '<div class="modal-footer">',
                                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',

                    // Invade
                    '<div class="btn btn-default" data-toggle="modal" data-target="#{{htmlId}}_invade">Invade</div>',
                    '<div id="{{htmlId}}_invade" class="modal fade" role="dialog">',
                        '<div class="modal-dialog modal-lg">',
                            '<div class="modal-content">',
                                '<div class="modal-header">',
                                    '<button type="button" class="close" data-dismiss="modal">&times;</button>',
                                    '<h2 class="modal-title">{{name}}: Invasion</h2>',
                                '</div>',
                                '<div class="modal-body">',
                                    '<span>Here, you can activate ships within your fleet and attempt to invade the faction\' star system. You reputation with them affects how prepared they are to a possible invasion. The star system\' fleet statistics take this into account already, so no extra calculation is needed. Invading has a bad effect on your reputation with the faction in question, reducing it by 10 for a successful invasion. However, due to their large ego, they take pity on failed attempts and reputation is not changed in the result of a loss.</span>',
                                '</div>',
                                '<div class="modal-body">',
                                    '<table class="table"><tr><td id="{{htmlId}}_invadeShips" style="width:33%">',
                                        '<h4>Active Ships:</h4>',
                                        /***************************
                                        ** Add Ships Procedurally **
                                        ***************************/
                                    '</td><td style="text-align:center; width:33%">',
                                        '<h4>Your Active Fleet Statistics:</h4>',
                                        '<span class="activeFleetPower">0</span> Power,',
                                        '<span class="activeFleetDefense">0</span> Defense,',
                                        '<span class="activeFleetSpeed">0</span> Speed',
                                        '<br><br>',
                                        '<h4>System Fleet Statistics:</h4>',
                                        '<span class="{{htmlId}}_power">??</span> Power,',
                                        '<span class="{{htmlId}}_defense">??</span> Defense,',
                                        '<span class="{{htmlId}}_speed">??</span> Speed',
                                        '<br><br>',
                                        '<h4>System Fleet Power/Defense Multiplier (Reputation)</h4>',
                                        'X<span class="{{factionId}}_multiplier">1</span>',
                                        '<br><br>',
                                        // '<h4>Fleet Breakdown</h4>',
                                        // '<span class="{{htmlId}}_ships">???</span>',
                                    '</td><td style="text-align:center; width:33%">',
                                        '<h4>Threat Level: (<span class="{{htmlId}}_threat">•</span>)</h4>',
                                        '<h4>Chance of Victory: <span class="{{htmlId}}_invadeChance">0</span>%</h4>',
                                        '<button class="btn btn-default" id="{{htmlId}}_invadeButton" data-dismiss="modal" onclick="Game.interstellar.military.invadeSystem(\'{{id}}\');">Attack!</button>',
                                    '</td></tr></table>',
                                '</div>',
                                '<div class="modal-footer">',
                                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',

                    // Absorb
                    '<div class="btn btn-default" data-toggle="modal" data-target="#{{htmlId}}_absorb">Absorb</div>',
                    '<div id="{{htmlId}}_absorb" class="modal fade" role="dialog">',
                        '<div class="modal-dialog modal-lg">',
                            '<div class="modal-content">',
                                '<div class="modal-header">',
                                    '<button type="button" class="close" data-dismiss="modal">&times;</button>',
                                    '<h2 class="modal-title">{{name}}: Absorption</h2>',
                                '</div>',
                                '<div class="modal-body">',
                                    '<span>Absorbing is the simplest way of conquering a star system. Unfortunately, you must be on good terms with the faction in control, with over 60 reputation with them. When Absorbing, you will lose 5 reputation in doing so, which is half the amount you would lose in an invasion.</span>',
                                '</div>',
                                '<div class="modal-body">',
                                    '<table style="height:100%" class="table"><tr><td style="text-align:center;" vertical-align="middle">',
                                        '<div class="btn btn-default disabled" data-dismiss="modal" id="{{htmlId}}_absorbButton" onclick="Game.interstellar.military.absorbSystem(\'{{id}}\');">Absorb (5 Opinion)</div>',
                                    '</td></tr></table>',
                                '</div>',
                                '<div class="modal-footer">',
                                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',


                '</hide></td><td colspan="1">',
                '<h3 class="btn-link">Resource Production:</h3>',
                '<h4>{{resource1}}:</h4>',
                '<span class="star_{{resource1}}_prod">0</span> / Second',
                '<h4>{{resource2}}:</h4>',
                '<span class="star_{{resource2}}_prod">0</span> / Second',
                '</td></tr>'].join('\n'));

        instance.invadeShipsTemplate = Handlebars.compile(
            ['<h5>{{name}}: <span class="{{entryName}}Active">0</span>/<span class="{{entryName}}Count">0</span></h5>',
                '<div class="btn-group">',
                '<button style="width:40px; text-align:center;" class="btn btn-default" onclick="Game.interstellar.military.addShip(\'{{entryName}}\', \'max\');">++</button>',
                '<button style="width:40px; text-align:center;" class="btn btn-default" onclick="Game.interstellar.military.addShip(\'{{entryName}}\', 1);">+</button>',
                '<button style="width:40px; text-align:center;" class="btn btn-default" onclick="Game.interstellar.military.addShip(\'{{entryName}}\', -1);">-</button>',
                '<button style="width:40px; text-align:center;" class="btn btn-default" onclick="Game.interstellar.military.addShip(\'{{entryName}}\', \'none\')">--</button></div><br>',].join('\n'));

        instance.militaryShipTemplate = Handlebars.compile(
            ['<tr id="{{htmlId}}"></tr><td>',
                '<h3 class="default btn-link">{{name}}: <span id="{{htmlId}}Count">0</span></h3>',
                '<span>',
                    '<p>{{desc}}</p>',
                    '<p id="{{htmlId}}_stats">Attributes: {{stats.power}} Power, {{stats.defense}} Defense, {{stats.speed}} Speed</p>',
                    '<p id="{{htmlId}}_cost"></p>',
                '</span>',
                '<div id="{{htmlId}}_buy" onclick="Game.interstellar.military.buildShip(\'{{entryName}}\')" class="btn btn-default">Get 1</div>',
                '<div id="{{htmlId}}_destroy" onclick="Game.interstellar.military.destroyShip(\'{{entryName}}\')" class="btn btn-default">Destroy 1</div>',
                '</td></tr>'].join('\n'));

        instance.navTemplate = Handlebars.compile(
            ['<td style="vertical-align:middle;" colspan="3">',
                    '<span>{{name}}</span>',
                '</td>',].join('\n'));

        instance.rocketNavTemplate = Handlebars.compile(
            ['<td style="vertical-align:middle;" colspan="1">',
                    '<span>{{name}}</span>',
                '</td><td style="vertical-align:middle; text-align:right;" colspan="2">',
                '<span id="interRocketBuilt" class="red">Not Built</span>'].join('\n'));

        instance.antimatterNavTemplate = Handlebars.compile(
            ['<td style="vertical-align:middle;">',
                    '<span>{{name}}</span>',
                '</td>',
                '<td style="vertical-align:middle; text-align:center;">',
                    '<span id="{{htmlId}}_perSecond">0</span>/Sec',
                '</td>',
                '<td style="vertical-align:middle; text-align:right;">',
                    '<span id="{{htmlId}}_current">0</span>',
                '</td>'].join('\n'));

        instance.factionNavTemplate = Handlebars.compile(
            ['<td style="vertical-align:middle;" colspan="2" onclick="navClicked(\'{{htmlId}}\')">',
                    '<div id="{{htmlId}}NavGlyph" class="glyphicon glyphicon-exclamation-sign hidden"></div>',
                    '<span>{{name}}</span>',
                '</td>',
                '<td style="vertical-align:middle; text-align:right;" colspan="1">',
                    '<span id="{{htmlId}}_opinion">{{opinion}}</span>',
                '</td>',].join('\n'));

        for(var id in Game.interstellarCategoryData){
            Game.interstellar.categoryEntries[id] = Game.interstellarCategoryData[id];
        }

        for(var id in Game.interstellar.categoryEntries) {
            this.tab.addCategory(id, Game.interstellar.categoryEntries[id].title);
        }

        for(var id in Game.interstellarData) {
            this.createDisplay(id);
        }

    };

    instance.update = function(delta) {
        
        

        for(var id in this.commEntries) {
            var data = Game.interstellar.comms.getMachineData(id);
            if(data.displayNeedsUpdate === true) {
                this.updateMachineDisplay(data);
                if(data.count >= data.max){
                    document.getElementById("comm_" + id + "_cost").className = "hidden";
                    document.getElementById("comm_" + id + "_buy").className = "hidden";
                }                
            }
        }
        

        for(var id in this.rocketEntries) {
            var data = Game.interstellar.rocket.getRocketData(id);
            if(data.displayNeedsUpdate == true) {
                this.updateRocketDisplay(data);                
            }
        }
        

        for(var id in this.rocketPartEntries) {
            var data = Game.interstellar.rocketParts.getPartData(id);
            if(data.displayNeedsUpdate === true) {
                this.updatePartDisplay(data);                
            }
        }
        

        for(var id in this.antimatterEntries) {
            var data = Game.interstellar.antimatter.getMachineData(id);
            if(data.displayNeedsUpdate === true) {
                this.updateMachineDisplay(data);                
            }
        }
        

        for(var id in this.militaryEntries) {
            var data = Game.interstellar.military.getShipData(id);
            if(data.displayNeedsUpdate === true) {
                this.updateMilitaryShipDisplay(data);                
            }
        }
        

        // Hides navs
        for(var id in Game.interstellar.entries){
            var data = Game.interstellar.getInterstellarData(id);
            if(data.displayNeedsUpdate == true){
                document.getElementById("interstellarTab_faction_collapse").className = "hidden";
                if(data.unlocked == true){
                    if(data.category == "faction"){
                        document.getElementById("interstellarTab_faction_collapse").className = "";
                    }
                    document.getElementById("interstellarTab_link").className = "";
                    document.getElementById("interstellarTab_" + id + "_ne").className = "collapse_interstellarTab_" + data.category;
                } else {
                    document.getElementById("interstellarTab_" + id + "_ne").className = "collapse_interstellarTab_" + data.category + " hidden";
                }
                data.displayNeedsUpdate = false;                
            }
        }
        

        var systemsConquered = 0;
        for(var id in this.starEntries){
            var data = Game.interstellar.stars.getStarData(id);
            if(data.owned){
                systemsConquered += 1;
            }
            if(data.explored == false){
                if(Game.interstellar.comms.entries.IRS.count + Game.interstellar.comms.entries.astroBreakthrough.count*5 >= data.distance){
                    document.getElementById('star_' + id).className = "";
                }
                $('#star_' + id + 'Cost').setText(Game.settings.format(data.distance*10000));
                continue;
            }
            if(data.displayNeedsUpdate == false){
                continue;
            }
            
            
            if(data.explored){
                // Shows the faction tabs that have explored stars - relevant to previous for loop
                var nav = Game.interstellar.entries[data.factionId]
                if(nav.unlocked != true){
                    nav.unlocked = true;
                    nav.displayNeedsUpdate = true;
                }
                //Update System Status
                if(data.owned){
                    $('#star_' + id + '_owned').text("Conquered");
                    document.getElementById('star_' + id + '_conquerButtons').className = "hidden";
                } else {
                    $('#star_' + id + '_owned').text("Protected");
                    document.getElementById('star_' + id + '_conquerButtons').className = "";

                    var multi = Game.interstellar.military.getMultiplier(data.factionId);

                    // Updates Spy Chance
                    var spyChance = Math.min(100, Game.interstellar.military.getSpyChance(data, multi));
                    $('#star_' + data.id + '_spyChance').text(Game.settings.format(spyChance,2));

                    // Updates Threat Level
                    var threat = Game.interstellar.military.getThreat(data.stats.power*multi, data.stats.speed);
                    $('.star_' + data.id + '_threat').text(threat);

                    // Updates Victory Chance
                    var chance = Game.interstellar.military.getChance(data);
                    if(chance == undefined){
                        chance = 0;
                    } else if(chance > 1){
                        chance = 100;
                    } else if(chance == "peace"){
                        chance = 100
                    } else {
                        chance *= 100;
                    }
                    $('.star_' + data.id + '_invadeChance').text(Game.settings.format(chance,2));


                    // Updates Multiplier
                    $('.' + data.factionId + '_multiplier').text(multi);

                    // Updates System Stats
                    if(data.spy != 0){
                        for(var stat in data.stats){
                            var unknown = "";
                            if(stat == "speed"){
                                var val = (data.stats[stat]).toString();
                                for(var i = 0; i < val.length - (data.spy-1); i++){
                                    unknown += "?";
                                }
                                $('.star_' + data.id + '_' + stat).text(val.substring(0,data.spy-1) + unknown);
                            } else {
                                var val = (data.stats[stat]*multi).toString();
                                for(var i = 0; i < val.length - (data.spy-1); i++){
                                    unknown += "?";
                                }
                                $('.star_' + data.id + '_' + stat).text(val.substring(0,data.spy-1) + unknown);
                            }
                        }
                    } else {
                        for(var stat in data.stats){
                            $('.star_' + data.id + '_' + stat).text("???");
                        }
                    }

                    // Enables Absorb Button
                    if(multi == 0){
                        document.getElementById('star_' + id + '_absorbButton').className = "btn btn-default";
                    } else {
                        document.getElementById('star_' + id + '_absorbButton').className = "btn btn-default disabled";
                    }
                }
            }
            data.displayNeedsUpdate = false;
        }

        // Updates Antimatter Nav
        Game.interstellar.stars.systemsConquered = systemsConquered;
        $('#sphereMax').text(systemsConquered+1)
        antimatterStorage = 100000*(systemsConquered+1);
        $('#intnav_antimatter_current').text(Game.settings.format(antimatter));
	var resourceEfficiencyTech = Game.tech.getTechData('efficiencyResearch');
	var perSecondMultiplier = (1 + (resourceEfficiencyTech.current * 0.01)) * (1 + (Game.stargaze.entries.darkMatter.count * dmBoost));
        $('#intnav_antimatter_perSecond').text((antimatterps*perSecondMultiplier).toFixed(2));
        if(antimatter >= antimatterStorage){
            document.getElementById("intnav_antimatter_current").className = "green";
        } else {
            document.getElementById("intnav_antimatter_current").className = "";
        }
        

        if (this._starProducers == null) {
            this._starProducers = {};
            for(var i = 0; i < resources.length; i++){
                var updateList = document.getElementsByClassName("star_" + Game.utils.capitaliseFirst(resources[i]) + "_prod");
                var elems = [];
                for(var j = 0; j < updateList.length; j++){
                    elems.push(updateList[j]);
                }
                this._starProducers[resources[i]] = elems;
            }
        }
        for(var i = 0; i < resources.length; i++){
            var perSec = window[resources[i] + "ps"];
            var perSecText = Game.settings.format(perSec/4);
            var elems = this._starProducers[resources[i]];
            for(var j = 0; j < elems.length; j++){
                elems[j].textContent = perSecText;
            }            
        }
        
    };

    instance.createCommsMachine = function(data, machineData) {
        var tabContentRoot = $('#' + this.tab.getContentElementId(data.id));
        var part = this.commMachineTemplate(machineData);
        tabContentRoot.append($(part));

        this.commEntries[machineData.id] = data.id;
        this.commObservers[machineData.id] = [];
        Game.ui.bindElement("comm_" + machineData.entryName + "Count", function(){ return Game.settings.format(machineData.count); });
    };

    instance.createRocket = function(data, rocketData) {
        var tabContentRoot = $('#' + this.tab.getContentElementId(data.id));
        var rocket = this.rocketTemplate(rocketData);
        tabContentRoot.append($(rocket));
        this.rocketEntries[rocketData.id] = data.id;
        this.rocketObservers[rocketData.id] = [];
    };

    instance.createRocketPart = function(data, partData) {
        var tabContentRoot = $('#' + this.tab.getContentElementId(data.id));
        var part = this.rocketPartTemplate(partData);
        tabContentRoot.append($(part));

        this.rocketPartEntries[partData.id] = data.id;
        this.rocketPartObservers[partData.id] = [];
        Game.ui.bindElement("rocpart_" + partData.entryName + "Count", function(){ return Game.settings.format(partData.count); });
    };

    instance.createMachine = function(data, machineData) {
        var tabContentRoot = $('#' + this.tab.getContentElementId(data.id));
        var part = this.machineTemplate(machineData);
        tabContentRoot.append($(part));

        this.antimatterEntries[machineData.id] = data.id;
        this.antimatterObservers[machineData.id] = [];
        Game.ui.bindElement("antimatter_" + machineData.entryName + "Count", function(){ return Game.settings.format(machineData.count); });

        var segmentsUse = [];
        var segmentsProd = [];
        for(var resource in machineData.resourcePerSecond){
            var segmentX = {n: Game.utils.capitaliseFirst(resource), p: machineData.resourcePerSecond[resource]};
            if(segmentX.p < 0){
                segmentsUse.push(segmentX);
            } else {
                segmentsProd.push(segmentX);
            }
        }
        var useHtml = "<span>Uses </span>";
        var prodHtml = "<span>Produces </span>";
        for(var i = 0; i < segmentsUse.length; i++){
            var segmentData = segmentsUse[i];
            var html = '<span id="' + segmentData.n + 'Use">' + (segmentData.p*-1) + " " + segmentData.n + '</span>';
            useHtml += html;
            if(i < segmentsUse.length - 1) {
                useHtml += '<span>, </span>';
            }
        }
        for(var i = 0; i < segmentsProd.length; i++){
            var segmentData = segmentsProd[i];
            var html = '<span id="' + segmentData.n + 'Prod">' + segmentData.p + " " + segmentData.n + '</span>';
            prodHtml += html;
            if(i < segmentsProd.length - 1) {
                prodHtml += '<span>, </span>';
            }
        }
        useHtml += '<span> per second.</span>'
        prodHtml += '<span> per second.</span>'
        var target = $('#antimatter_' + machineData.id + '_use');
        target.empty()
        target.append(useHtml);
        var target = $('#antimatter_' + machineData.id + '_prod');
        target.empty()
        target.append(prodHtml);
    };

    instance.createStar = function(data, starData) {
        
        var star = this.starTemplate(starData);

        var tabContentRoot = $('#' + this.tab.getContentElementId(data.id));
        tabContentRoot.append($(star));

        this.starEntries[starData.id] = starData.id;
        this.starObservers[starData.id] = [];
    };

    instance.createFactionStar = function(data, starData) {
        
        var factionStar = this.factionStarTemplate(starData);

        var factionTabContentRoot = $('#' + this.tab.getContentElementId(starData.factionId));
        factionTabContentRoot.append($(factionStar));

        for(ship in Game.interstellar.military.entries){
            var shipData = Game.interstellar.military.getShipData(ship);
            var target = $('#' + starData.htmlId + '_invadeShips');
            var html = this.invadeShipsTemplate(shipData);
            target.append($(html));
        }
    };

    instance.createMilitaryShip = function(data, shipData) {
        var tabContentRoot = $('#' + this.tab.getContentElementId(data.id));
        var ship = this.militaryShipTemplate(shipData);
        tabContentRoot.append($(ship));

        this.militaryEntries[shipData.id] = data.id;
        this.militaryObservers[shipData.id] = [];
        Game.ui.bindElement("milit_" + shipData.entryName + "Count", function(){ return Game.settings.format(shipData.count); });
    };

    instance.createCommsContent = function(data){
        var target = $('#' + this.tab.getContentElementId(data.id));
        var tabTitle = this.titleTemplate(data);
        target.append(tabTitle);

        for (var id in Game.interstellar.comms.entries){
            var machineData = Game.interstellar.comms.entries[id];
            this.createCommsMachine(data, machineData);
        }
    }

    instance.createRocketContent = function(data){
        var target = $('#' + this.tab.getContentElementId(data.id));
        var tabTitle = this.titleTemplate(data);
        target.append(tabTitle);

        for (var id in Game.interstellar.rocket.entries){
            var rocketData = Game.interstellar.rocket.entries[id];
            this.createRocket(data, rocketData);
        }
        for (var id in Game.interstellar.rocketParts.entries){
            var partData = Game.interstellar.rocketParts.entries[id];
            this.createRocketPart(data, partData);
        }
    }

    instance.createAntimatterContent = function(data){
        var target = $('#' + this.tab.getContentElementId(data.id));
        var tabTitle = this.titleTemplate(data);
        target.append(tabTitle);

        for (var id in Game.interstellar.antimatter.entries){
            var machineData = Game.interstellar.antimatter.entries[id];
            this.createMachine(data, machineData);
        }
    }

    instance.createTravelContent = function(data){
        var target = $('#' + this.tab.getContentElementId(data.id));
        var tabTitle = this.titleTemplate(data);
        target.append(tabTitle);

        for (var id in Game.interstellar.stars.entries){
            var starData = Game.interstellar.stars.entries[id];
            this.createStar(data, starData);
        }
    }

    instance.createMilitaryContent = function(data){
        var target = $('#' + this.tab.getContentElementId(data.id));
        var tabTitle = this.militaryTitleTemplate(data);
        target.append(tabTitle);

        for (var id in Game.interstellar.military.entries){
            var shipData = Game.interstellar.military.entries[id];
            this.createMilitaryShip(data, shipData);
        }
    }

    instance.createFactionContent = function(data){
        var target = $('#' + this.tab.getContentElementId(data.id));
        var tabTitle = this.factionTitleTemplate(data);
        target.append(tabTitle);

        for (var id in Game.interstellar.stars.entries){
            var starData = Game.interstellar.stars.entries[id];
            if(starData.factionId == data.id){
                this.createFactionStar(data, starData);
            }
        }
    }

    instance.createInterstellarNav = function(data) {
        var target = $('#' + this.tab.getNavElementId(data.id));
        var html = this.navTemplate(data);
        if(data.id == "comms"){
            this.createCommsContent(data);
        }
        else if(data.id ==="rocket"){
            var html = this.rocketNavTemplate(data);
            this.createRocketContent(data);
        }
        else if(data.id === "antimatter"){
            var html = this.antimatterNavTemplate(data);
            this.createAntimatterContent(data);
        }
        else if(data.id ==="travel"){
            this.createTravelContent(data);
        }
        else if(data.id == "military"){
            this.createMilitaryContent(data);
        }
        else if(data.category ==="faction"){
            var html = this.factionNavTemplate(data);
            this.createFactionContent(data);
        } else {
            console.log(data)
            console.error(data.id + " is not a valid nav.")
        }
        target.append($(html));
    };

    instance.createDisplay = function(id) {
        var data = Game.interstellar.getInterstellarData(id);
        this.tab.addNavEntry(data.category, id);

        
        this.createInterstellarNav(data);

        this.entries[data.htmlId] = data;
    };

    instance.updatePartDisplay = function(data) {
        var element = $('#' + data.htmlId);
        if(data.unlocked === true) {
            element.show();
        } else {
            element.hide();
        }
        // Update the cost display
        if(data.cost) {
            Game.interstellar[data.category].updateCost(data.entryName);
            var costDisplayData = this.buildCostDisplay(this.rocketPartObservers[data.id], data);
            var costElement = $('#' + data.htmlId + '_cost');
            costElement.empty();
            costElement.append($(costDisplayData));
        }

        data.displayNeedsUpdate = false;
    };

    instance.updateRocketDisplay = function(data) {
        var element = $('#' + data.htmlId);
        if(data.unlocked === true) {
            element.show();
        } else {
            element.hide();
        }
        // Update the cost display
        if(data.built == true){
            var status = document.getElementById('roc_' + data.id + 'Built');
            document.getElementById("interRocketBuilt").className = "green";
            document.getElementById("interRocketBuilt").textContent = "Built";
            for(var id in this.rocketPartEntries){
                var partData = Game.interstellar.rocketParts.entries[id];
                if(partData.entryName == "shield" || "engine" || "aero"){
                    document.getElementById("rocpart_" + partData.entryName).className = "hidden";
                }
            }
            status.textContent = "Built";
            status.className = "green";
            var costElement = $('#' + data.htmlId + '_cost');
            costElement.empty();
        } else {
            if(data.cost) {
                var costDisplayData = this.buildRocketCostDisplay(this.rocketObservers[data.id], data);
                var costElement = $('#' + data.htmlId + '_cost');
                costElement.empty();
                costElement.append($(costDisplayData));
            }
        }

        data.displayNeedsUpdate = false;
    };

    instance.updateMachineDisplay = function(data) {
        var element = $('#' + data.htmlId);
        if(data.unlocked === true) {
            element.show();
        } else {
            element.hide();
        }
        // Update the cost display
        if(data.cost) {
            Game.interstellar[data.category].updateCost(data.entryName);
            var costDisplayData = this.buildCostDisplay(this.commObservers[data.id] || this.antimatterObservers[data.id], data);
            var costElement = $('#' + data.htmlId + '_cost');
            costElement.empty();
            costElement.append($(costDisplayData));
        }

        data.displayNeedsUpdate = false;
    };

    instance.updateMilitaryShipDisplay = function(data) {
        var element = $('#' + data.htmlId);
        if(data.unlocked === true) {
            element.show();
        } else {
            element.hide();
        }
        // Update the cost display
        if(data.cost) {
            Game.interstellar[data.category].updateCost(data.entryName);
            var costDisplayData = this.buildCostDisplay(this.commObservers[data.id] || this.militaryObservers[data.id], data);
            var costElement = $('#' + data.htmlId + '_cost');
            costElement.empty();
            costElement.append($(costDisplayData));
        }
        Game.interstellar.military.updateCost(data.entryName);
        data.displayNeedsUpdate = false;
    };

    instance.buildCostDisplay = function(observerArray, data) {
        for(var i = 0; i < observerArray.length; i++) {
            observerArray[i].delete();
        }

        // Empty but keep the reference
        observerArray.length = 0;

        var segments = [];
        for(var id in data.cost) {

            var resourceData = Game.resources.getResourceData(id);
            if(!data) {
                console.error("Unknown Resource in cost: " + id);
                continue;
            }
            segments.push({i: id, h: data.htmlId + '_' + id + '_c', n: resourceData.name, c: data.cost[id]});
        }

        var resultHtml = '<span>Cost: </span>';
        for(var i = 0; i < segments.length; i++) {
            var segmentData = segments[i];
            resultHtml = resultHtml + '<span id="' + segmentData.h + '"></span> ';
            resultHtml = resultHtml + '<span> ' + segmentData.n + '</span>';
            if(i < segments.length - 1) {
                resultHtml = resultHtml + '<span>, </span>';
            }

            var observer = Game.ui.createResourceObserver({htmlId: segmentData.h, value: segmentData.c, res: segmentData.i, type: RESOURCE_OBSERVER_TYPE.SPECIFIC_VALUE});
            observerArray.push(observer);
        }

        return resultHtml;
    };

    instance.buildRocketCostDisplay = function(observerArray, data) {
        for(var i = 0; i < observerArray.length; i++) {
            observerArray[i].delete();
        }

        // Empty but keep the reference
        observerArray.length = 0;

        var segments = [];
        for(var id in data.cost) {
            var rocketPartData = Game.interstellar.rocketParts.getPartData(id);
            if(!data) {
                console.error("Unknown Part in cost: " + id);
                continue;
            }

            segments.push({i: id, h: data.htmlId + '_' + id + '_c', n: rocketPartData.name, c: data.cost[id]});
        }

        var resultHtml = '<span>Cost: </span>';
        for(var i = 0; i < segments.length; i++) {
            var segmentData = segments[i];
            resultHtml = resultHtml + '<span id="' + segmentData.h + '">' + segmentData.c + '</span> ';
            resultHtml = resultHtml + '<span> ' + segmentData.n + '</span>';
            if(i < segments.length - 1) {
                resultHtml = resultHtml + '<span>, </span>';
            }

            var observer = Game.ui.createResourceObserver({htmlId: segmentData.h, value: segmentData.c, res: segmentData.i, type: RESOURCE_OBSERVER_TYPE.SPECIFIC_VALUE});
            observerArray.push(observer);
        }

        return resultHtml;
    };

    

    Game.uiComponents.push(instance);

    return instance;

}());
