(function(){

    var tabTemplate = Handlebars.compile(
        ['<li role="presentation" id="{{htmlId}}">',
            '<a href="#{{htmlId}}_pane" id="{{htmlId}}_link" class="{{hidden}}" aria-controls="{{id}}" role="tab" data-toggle="tab">',
            '<div id="{{id}}TabGlyph" class="glyphicon glyphicon-exclamation-sign hidden"></div>',
            '{{title}}</a></li>'].join('\n'));

    var contentTemplate = Handlebars.compile(
        ['<div role="tabpanel" class="tab-pane fade" id="{{htmlId}}_pane">',
            '<div class="container" style="width:250px; padding:0; float:left;">',
            '<table class="table table-hover text-primary no-select pointer" ><tbody id="{{htmlId}}_nav"></tbody></table>',
            '</div>',
            '<div class="tab-content" id="{{htmlId}}_content"></div>',
        '</div>'].join('\n'));

    var categoryTemplate = Handlebars.compile(
        ['<tr id="{{htmlId}}_{{id}}_collapse" style="border:none;">',
            '<td colspan="4">',
            '<span>{{title}}</span> <span class="caret"></span>',
            '</td>',
            '</tr>'].join('\n'));

    var navEntryTemplate = Handlebars.compile(
        ['<tr id="{{htmlId}}_{{id}}_ne" href="#{{htmlId}}_{{id}}_nec" class="collapse_{{htmlId}}_{{category}}" aria-controls="{{htmlId}}_{{id}}_nec" role="tab" data-toggle="tab" style="height:60px;" aria-expanded="true">',
         '</tr>'].join('\n'));

    var navEntryContentTemplate = Handlebars.compile(
        ['<div id="{{htmlId}}_{{id}}_nec" class="tab-pane fade in" style="margin-left:10px; width:100px; float:left;">',
            '<div class="container" style="max-width:800px;">',
            '<table class="table"><tbody id="{{htmlId}}_{{id}}_netc"></tbody></table>',
            '</div>',
            '</div>'].join('\n'));

    var tabRoot = $('#tabList');
    var tabContentRoot = $('#tabContent');

    var tabRegister = {};

    function GameTab(data) {
        if (tabRegister[data.id]) {
            console.error("Duplicate Tab Registered: " + data.id);
        }

        this.categories = {};
        this.categoryEntries = {};

        this.onActivate = null;
        this.onNavActivate = null;

        this.data = data;
        this.data.htmlId = data.id + "Tab";

        tabRegister[data.id] = this;
    }

    // ---------------------------------------------------------------------------
    // basic functions
    // ---------------------------------------------------------------------------
    GameTab.prototype.initialise = function() {
        var html = tabTemplate(this.data);
        if(this.data.prepend == true){
            tabRoot.prepend($(html));
        } else{
            tabRoot.append($(html));
        }

        var contentHtml = contentTemplate(this.data);
        tabContentRoot.append($(contentHtml));

        var link = $('#' + this.data.htmlId + '_link');
        link.click({id: this.data.id}, function(args) { tabRegister[args.data.id].activate(); });
    };

    GameTab.prototype.show = function() {
        $('#' + this.data.htmlId).show();
    };

    GameTab.prototype.hide = function() {
        $('#' + this.data.htmlId).hide();
    };

    GameTab.prototype.showCategory = function(id) {
        $('#' + this.data.htmlId + '_' + id + '_collapse').show();
    };

    GameTab.prototype.hideCategory = function(id) {
        $('#' + this.data.htmlId + '_' + id + '_collapse').hide();
    };

    GameTab.prototype.activate = function() {
        $('#' + this.data.id + 'TabGlyph').addClass('hidden');

        if (this.onActivate !== null) {
            this.onActivate(this.data.id);
        }
    };

    GameTab.prototype.addCategory = function(id, title) {
        var data = {id: id, title: title, htmlId: this.data.htmlId};
        var html = categoryTemplate(data);
        this.categories[id] = data;
        this.categoryEntries[id] = [];

        $('#' + this.data.htmlId + '_nav').append($(html));

        $('#' + this.data.htmlId + '_' + id + '_collapse').click({htmlId: this.data.htmlId, category: id}, function(args) {
            var htmlId = args.data.htmlId;
            var category = args.data.category;
            if($(this).hasClass("collapsed")){
                $('.collapse_' + htmlId + '_' + category).show();
                $(this).removeClass("collapsed");
            } else {
                $('.collapse_' + htmlId + '_' + category).hide();
                $(this).addClass("collapsed");
            }
        });
    };

    GameTab.prototype.addNavEntry = function(category, id) {
        if(!this.categories[category]) {
            console.error("addNavEntry called with invalid category: " + category);
            return;
        }

        var data = {id: id, htmlId: this.data.htmlId, category: category};
        var html = navEntryTemplate(data);
        var element = $(html);

        if(this.categoryEntries[category].length > 0) {
            var lastCategoryId = this.categoryEntries[category][this.categoryEntries[category].length - 1];
            $('#' + this.data.htmlId + '_' + lastCategoryId + '_ne').after(element);
        } else {
            $('#' + this.data.htmlId + '_' + this.categories[category].id + '_collapse').after(element);
        }

        $('#' + this.data.htmlId + '_' + id + '_ne').click({self: this, id: id, htmlId: this.data.htmlId, category: category}, function(args) {
            var self = args.data.self;
            for(var id in self.categoryEntries) {
                for(var i = 0; i < self.categoryEntries[id].length; i++) {
                    $('#' + args.data.htmlId + '_' + self.categoryEntries[id][i] + '_ne').removeClass('info');
                }
            }

            $(this).addClass('info');

            if(args.data.self.onNavActivate !== null) {
                args.data.self.onNavActivate(args.data.id);
            }
        });

        var contentHtml = navEntryContentTemplate(data);
        var contentElement = $(contentHtml);
        $('#' + this.data.htmlId + '_content').append(contentElement);

        this.categoryEntries[category].push(id);
    };

    GameTab.prototype.categoryHasEntries = function(category) {
        return this.categoryEntries[category].length;
    };

    GameTab.prototype.categoryHasUnlockedEntries = function(category) {
        for(var i = 0; i < this.categoryEntries[category].length; i++) {
            var res = Game.resources.getResourceData(this.categoryEntries[category][i]);
            if(res.unlocked) return true;
        }

        return false;
    };

    GameTab.prototype.getContentElementId = function(id) {
        return this.data.htmlId + '_' + id + '_netc';
    };

    GameTab.prototype.getNavElementId = function(id) {
        return this.data.htmlId + '_' + id + '_ne';
    };

    // ---------------------------------------------------------------------------
    // registration
    // ---------------------------------------------------------------------------
    Game.ui.createTab = function(data) {
        return new GameTab(data);
    }

}());