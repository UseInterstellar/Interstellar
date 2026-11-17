Game.stargazeUI = (function(){

	var instance = {};
	
	instance.entries = {};
    instance.introEntries = {};
	instance.darkMatterEntries = {};
    instance.carnelianEntries = {};
    instance.prasnianEntries = {};
    instance.hyaciniteEntries = {};
    instance.kitrinosEntries = {};
    instance.movitonEntries = {};
    instance.overlordEntries = {};
    instance.titleTemplate = null;
    instance.navTemplate = null;

    instance.tabRoot = null;
    instance.navRoot = null;

    instance.tab = null;

    instance.categoryNames = {};

    instance.initialise = function() {

        this.tab = Game.ui.createTab({id: 'stargaze', title: 'Stargaze'});
        this.tab.initialise();

        if(sphere == 0) {
            document.getElementById("stargazeTab").className = "hidden";
        }

        instance.introTitleTemplate = Handlebars.compile(
            ['<tr><td style="border:none;">',
                '<h2 class="default btn-link">{{name}}</h2>',
                '<span>{{para1}}</span>',
                '<br><br>',
                '<span>{{para2}}</span>',
                '<br><br>',
                '<span>{{para3}}</span>',
                '<br><br>',
                '<span>{{para4}}</span>',
                '<br><br>',
                '<span>{{para5}}</span>',
                '<br><br>',
                '</td></tr>'].join('\n'));

        instance.dmTitleTemplate = Handlebars.compile(
            ['<tr><td style="border:none;">',
                '<h2 class="default btn-link">{{name}}</h2>',
                '<span>{{desc}}</span>',
                '<br><br>',
                '</td></tr>'].join('\n'));

        instance.titleTemplate = Handlebars.compile(
            ['<tr><td style="border:none;">',
                '<h2 class="default btn-link">{{name}}</h2>',
                '<h4><b>Relationship: <span id="{{htmlId}}_pageOpinion">{{opinion}}</span></b></h4>',
                '<span>{{{desc}}}</span>',
                '<br><br>',
                '</td></tr>'].join('\n'));

        instance.navTemplate = Handlebars.compile(
            ['<td style="vertical-align:middle;" colspan="2">',
                    '<span>{{name}}</span>',
                '</td>',
                '<td style="vertical-align:middle; text-align:right;" colspan="1">',
                    '<span id="{{htmlId}}_opinion">{{opinion}}</span>',
                '</td>',].join('\n'));

        instance.dmNavTemplate = Handlebars.compile(
            ['<td style="vertical-align:middle;" colspan="2">',
                    '<span>{{name}}</span>',
                '</td>',
                '<td style="vertical-align:middle; text-align:right;" colspan="1">',
                    '<span id="{{htmlId}}_count">{{count}}</span> (<span id="{{htmlId}}_current">{{current}}</span>)',
                '</td>',].join('\n'));

        instance.dmInfoTemplate = Handlebars.compile(
            ['<tr><td>',
                '<h3 class="default btn-link">{{name}}: <span id="{{id}}_dmGain">0</span></h3>',
                '<p>{{desc}}</p>',
                '</td></tr>'].join('\n'));

        instance.rebirthTemplate = Handlebars.compile(
            ['<tr id="{{htmlId}}"><td>',
                '<h3 class="default btn-link">{{name}}</h3>',
                '<span>',
                    '<p>{{{desc}}}</p>',
                    '<p id="{{htmlId}}_cost">Costs: {{cost}} Dark Matter</p>',,
                '</span>',
                '<div id="{{htmlId}}_buy" onclick="Game.stargaze.upgrade(\'{{id}}\')" class="btn btn-warning">Rebirth</div>',
                '<br><br>',
                '</td></tr>'].join('\n'));

        instance.respecTemplate = Handlebars.compile(
            ['<tr id="{{htmlId}}"><td>',
                '<h3 class="default btn-link">{{name}}: <span id=\'respecCount\'>3</span></h3>',
                '<span>',
                    '<p>{{{desc}}}</p>',
                    '<p id="{{htmlId}}_cost">Costs: {{cost}} Dark Matter</p>',,
                '</span>',
                '<div id="{{htmlId}}_buy" onclick="Game.stargaze.upgrade(\'{{id}}\')" class="btn btn-warning">Respec</div>',
                '<br><br>',
                '</td></tr>'].join('\n'));

        instance.upgradeTemplate = Handlebars.compile(
            ['<tr id="{{htmlId}}"><td>',
                '<h3 class="default btn-link">{{name}}: <span id="{{htmlId}}Achieved">Dormant</span></h3>',
                '<span>',
                    '<p>{{{desc}}}</p>',
                    '<p id="{{htmlId}}_cost">Costs: {{cost}} Dark Matter</p>',
                    '<p id="{{htmlId}}_opinion">Improves relationship by {{opinion}}</p>',
                '</span>',
                '<div id="{{htmlId}}_buy" onclick="Game.stargaze.upgrade(\'{{id}}\')" class="btn btn-default">Activate</div>',
                '<br><br>',
                '</td></tr>'].join('\n'));

        for(var id in Game.stargazeCategoryData){
            Game.stargaze.categoryEntries[id] = Game.stargazeCategoryData[id];
        }

        for(var id in Game.stargaze.categoryEntries) {
            this.tab.addCategory(id, Game.stargaze.categoryEntries[id].title);
        }

        for(var id in Game.stargaze.entries) {
            this.createDisplay(id);
        }
    };

    instance.update = function(delta) {

        if(Game.stargaze.unlocked == true){
            document.getElementById("stargazeTab").className = "";
        }

        this.updateDM();

        for(var id in Game.stargaze.entries){
            var data = Game.stargaze.getStargazeData(id);
            if(data.displayNeedsUpdate == true){
                if(data.category == "faction"){
                    $('#stargazeNav' + id + '_opinion').text(data.opinion);
                    $('#stargazeNav' + id + '_pageOpinion').text(data.opinion);
                    $('#intnav_' + id + '_opinion').text(data.opinion);
                    if(data.unlocked == true){
                        document.getElementById('stargazeTab_' + id + '_ne').className = "collapse_stargazeTab_faction";
                    } else {
                        document.getElementById('stargazeTab_' + id + '_ne').className = "collapse_stargazeTab_faction hidden";
                    }
                }
                data.displayNeedsUpdate = false;
            }
        }

        if(Game.stargaze.rebirthNeedsUpdate === true){
            var stargaze = Game.stargaze;
            // Unhides relevant elements
            for(var i = 0; i < stargaze.rebirthUnlocked.length; i++){
                var string = document.getElementById(stargaze.rebirthUnlocked[i]).className;
                document.getElementById(stargaze.rebirthUnlocked[i]).className = string.substring(0, string.indexOf("hidden"));
            }
            for(var i = 0; i < stargaze.rebirthChildUnlocked.length; i++){
                var children = $('#'+ stargaze.rebirthChildUnlocked[i]).children();
                for(var j = 0; j < children.length; j++){
                    children[j].className = "";
                }
            }
            // Hides achieved upgrades // (for later)
            // for(var id in Game.stargaze.upgradeEntries){
            //     var data = Game.stargaze.upgradeEntries[id];
            //     if(data.achieved == true){
            //         document.getElementById("stargazeUpg" + id).className = "hidden";
            //     }
            // }

            // Marks achieved upgrades as 'Activated'
            for(var id in Game.stargaze.upgradeEntries){
                var data = Game.stargaze.upgradeEntries[id];
                if(id != 'rebirth' && id != 'respec'){
                    if(data.achieved == true){
                        document.getElementById("stargazeUpg" + id + 'Achieved').textContent = "Activated";
                        document.getElementById("stargazeUpg" + id + '_buy').className = "btn btn-default disabled";
                    } else{
                        document.getElementById("stargazeUpg" + id + 'Achieved').textContent = "Dormant";
                        document.getElementById("stargazeUpg" + id + '_buy').className = "btn btn-default";
                    }
                }
                if((data.category == "intro" || data.category == "darkMatter") && (data.htmlId != "stargazeUpgrebirth" && data.htmlId != "stargazeUpgrespec")){
                    document.getElementById(data.htmlId + "_opinion").className = "hidden";
                }
            }
            stargaze.rebirthNeedsUpdate = false;
        }
    };

    instance.createDMInfo = function(data, dmInfoData){
        var tabContentRoot = $('#' + this.tab.getContentElementId(data.id));
        var dmInfo = this.dmInfoTemplate(dmInfoData);
        tabContentRoot.append($(dmInfo));
    };

    instance.createUpgrade = function(data, upgradeData) {
        var tabContentRoot = $('#' + this.tab.getContentElementId(data.id));
        if(upgradeData.id == "rebirth"){
            var upgrade = this.rebirthTemplate(upgradeData);
        } else if(upgradeData.id == "respec"){
            var upgrade = this.respecTemplate(upgradeData);
        } else {
            var upgrade = this.upgradeTemplate(upgradeData);
        }
        tabContentRoot.append($(upgrade));
        this[upgradeData.category + "Entries"][upgradeData.id] = upgradeData;
        //this.upgradeObservers[upgradeData.id] = [];
    };

    instance.createContent = function(data) {
        var target = $('#' + this.tab.getContentElementId(data.id));
        if(data.id == "intro"){
            var tabTitle = this.introTitleTemplate(data);
        } else if (data.id == "darkMatter"){
            var tabTitle = this.dmTitleTemplate(data);
        }
        else{
            var tabTitle = this.titleTemplate(data);
        }
        target.append(tabTitle);
        if(data.id == "darkMatter"){
            for (var id in Game.darkMatter) {
                var infoData = Game.darkMatter[id];
                this.createDMInfo(data, $.extend({}, {id: id}, infoData));
            }
        }
        for (var id in Game.stargaze.upgradeEntries) {
            var upgradeData = Game.stargaze.upgradeEntries[id];
            if(data.id == upgradeData.category){
                this.createUpgrade(data, upgradeData);
            }
        }
    };

    instance.createStargazeNav = function(data) {
        var target = $('#' + this.tab.getNavElementId(data.id));
        this.createContent(data);
        if(data.id == "darkMatter"){
            var html = this.dmNavTemplate(data);
        }
        else{
            var html = this.navTemplate(data);
        }
        target.append($(html));
    };

    instance.createDisplay = function(id) {
        var data = Game.stargaze.getStargazeData(id);
        this.tab.addNavEntry(data.category, id);

        
        this.createStargazeNav(data);

        this.entries[data.htmlId] = data;
    };

    instance.updateDM = function(){
        var DM = 0;
        //Wonders
        var wonderDM = 0;
        if(contains(activated, "precious"&&"energetic"&&"tech"&&"meteorite")){
            wonderDM += 4;
        }
        if(contains(activated, "comms"&&"rocket"&&"antimatter"&&"portalRoom")){
            wonderDM += 4;
        }
        if(contains(activated, "stargate")){
            wonderDM += 2;
        }
        //Sphere
        var sphereDM = 0;
        if(sphere != 0)sphereDM += 10
        sphereDM += sphere*5;
        //Research
        var researchDM = Math.floor((Game.tech.entries.efficiencyResearch.current + Game.tech.entries.energyEfficiencyResearch.current + Game.tech.entries.scienceEfficiencyResearch.current + Game.tech.entries.batteryEfficiencyResearch.current)/25)*2; //25 = 2;
        //Rank
        var rankDM = Game.achievements.rank * 2;
        //Swarms
        var swarmDM = 0;
        var x = 1;
        while (swarm >= Game.utils.pascal(x)){
            x += 1;
            swarmDM += 1;
        }

        $('#wonder_dmGain').text(wonderDM);
        $('#sphere_dmGain').text(sphereDM);
        $('#research_dmGain').text(researchDM);
        $('#rank_dmGain').text(rankDM);
        $('#swarm_dmGain').text(swarmDM);

        DM += wonderDM + sphereDM + researchDM + rankDM + swarmDM;
        if(Game.stargaze.entries.darkMatter){
            Game.stargaze.entries.darkMatter.current = DM;
            $('#stargazeNavdarkMatter_current').text(DM);
        }

        $('#stargazeNavdarkMatter_count').text(Game.stargaze.entries.darkMatter.count);
    }

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
            resultHtml = resultHtml + '<span id="' + segmentData.h + '">ERR</span> ';
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
            resultHtml = resultHtml + '<span id="' + segmentData.h + '">ERR</span> ';
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
