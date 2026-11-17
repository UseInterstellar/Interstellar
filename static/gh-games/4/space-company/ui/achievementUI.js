Game.achievementsUI = (function(){

    var instance = {};

    instance.categoryTemplate = null;
    instance.entryTemplate = null;

    instance.categoryElements = {};
    instance.rootElement = null;

    instance.initialise = function() {
        this.rankTemplate = Handlebars.compile(
            ['<td>',
                '<h3 class="default btn-link">Current Rank: <br><span id="rankNumber">{{number}}</span> - <span id="rankName">{{name}}</span></h3>',
                '</td>'].join('\n'));

        this.rankBarTemplate = Handlebars.compile(
            ['<td colspan="2">',
                '<div id="rankProgress" class="progress">',
                    '<div id="rankBar" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%">',
                        '0%',
                    '</div>',
                '</div>',
                '</td>'].join('\n'));

        this.categoryTemplate = Handlebars.compile(
            ['<td>',
                '<h3 class="default btn-link">{{name}} (<span id="{{id}}_unlocked">0</span>/<span id="{{id}}_total">0</span>)</h3>',
                '<table class="table" id="{{id}}"></table>',
                '</td>'].join('\n'));

        this.entryTemplate = Handlebars.compile(
            ['<td id="{{id}}" class="achievementTD" style="border:none;">',
                '<div id="{{id}}_div" data-toggle="tooltip" title="{{title}}" style="width: 64px; height: 64px; border:2px solid white;">',
                '<div id="{{id}}_bg" style="width: 50px; height: 40px; background: url({{iconPath}}{{iconName}}.{{iconExtension}}) no-repeat center; -webkit-background-size: contain;background-size: contain; margin-left: 5px;opacity: 0.2"></div>',
                '<div id="{{id}}_img" style="overflow: hidden; vertical-align: bottom;"><img src="Icons/achievementStar.png" height="11px"></div>',
                '</div>',
                '</td>'].join('\n'));

        this.rootElement = $('#achievementContent');

        this.createRank(0);

        for(var id in Game.achievements.entries) {
            this.createDisplay(id);
        }
    };

    instance.update = function(delta) {
        var categoryCounts = {};
        var updateCategories = false;
        var totalAchieved = 0;


        for(var category in this.categoryElements) {
          categoryCounts[category] = { unlocked: 0, total: 0 };
        }
        
        for(var id in Game.achievements.entries) {
            var data = Game.achievements.entries[id];
            
            totalAchieved += Game.utils.pascal(data.unlocked+1);
            categoryCounts[data.category].unlocked += data.unlocked + 1;
            categoryCounts[data.category].total += data.brackets.length;

            if(data.displayNeedsUpdate === true) {
                this.updateDisplay(id);
                updateCategories = true;
            }
        }
        
        if (updateCategories === true) {
          for(var category in this.categoryElements) {
            var id = this.categoryElements[category].id;
            $('#' + id + '_unlocked').text(categoryCounts[category].unlocked);
            $('#' + id + '_total').text(categoryCounts[category].total);
            
          }
        }

        // Calculating Ranks

        var x = Game.achievements.rank;
        var xpNeeded = Game.utils.fibonacci(x+7);
        var xpLeft = Game.utils.fibonacci(x+7) - totalAchieved;
        if(xpLeft <= 0){
            Game.achievements.rank += 1;
        }
        var percentLeft = Game.settings.format(100-(xpLeft/xpNeeded*100)) + '%';
        $('#rankBar').text(percentLeft + ' (' + (xpNeeded-xpLeft) + '/' + xpNeeded + ')');
        $('#rankBar').width(percentLeft);
        $('#rankNumber').text(x);
        $('#rankName').text(Game.constants.rank[x]);

        
    };

    instance.createDisplay = function(id) {
        var data = Game.achievements.entries[id];

        if (this.categoryElements[data.category] === undefined) {
            this.createCategory(data.category);
        }

        var html = this.entryTemplate(data);
        this.categoryElements[data.category].colc++;
        this.categoryElements[data.category].col.append($(html)).find('[data-toggle="tooltip"]').tooltip();

        if(this.categoryElements[data.category].colc >= Game.constants.achievementIconsPerRow) {
            this.createCategoryRow(data.category);
        }
    };

    instance.updateDisplay = function(id) {
        var data = Game.achievements.entries[id];
        var div = $('#' + id + "_div");
        var bg = $('#' + id + "_bg");

        div.attr('data-original-title', Game.achievements.getAchievementTitle(data, true));

        div.css('border-color', Game.constants.achievementBracketColors[data.unlocked]);
        if(data.unlocked == -1){
            div.css('border-color', '#ffffff');
            //div.fadeTo(2, 0.2);
        }

        $('#' + id + '_img').width(12 * (data.unlocked + 1));

        if(data.unlocked >= 0){
            bg.fadeTo(2, 1);
        }

        data.displayNeedsUpdate = false;
    };

    instance.createCategory = function (category) {
        var data = {id: "ach_cat_" + category, name: category};
        this.categoryElements[category] = {colc: 0, col: null, id: data.id};

        var html = $(this.categoryTemplate(data));
        this.rootElement.append(html);

        this.createCategoryRow(category);
    };

    instance.createCategoryRow = function (category) {
        var data = this.categoryElements[category];

        data.colc = 0;
        data.col = $('<tr></tr>');
        $('#'+data.id).append(data.col);
    };

    instance.createRank = function (x) {
        var data = {name: Game.constants.rank[x], number: x};
        var html = this.rankTemplate(data);
        $('#rankContent').append(html);

        var html = this.rankBarTemplate();
        $('#rankBarContent').append(html);
    };

    Game.uiComponents.push(instance);

    return instance;

}());
