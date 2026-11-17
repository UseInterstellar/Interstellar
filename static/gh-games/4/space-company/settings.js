Game.settings = (function(){

    var autoSaveMapping = {
        '30secs': 30 * 1000,
        '2mins': 2 * 60 * 1000,
        '10mins': 10 * 60 * 1000,
        'off': 10000000000000000000
    };

    var instance = {
        dataVersion: 1,
        entries: {
            formatter: 'shortName',
            boldEnabled: false,
            sidebarCompressed: false,
            notificationsEnabled: true,
            saveNotifsEnabled: true,
            gainButtonsHidden: false,
            redDestroyButtons: false,
            hideCompleted: false,
            theme: 'base',
            autoSaveInterval: 30 * 1000
        },
        elementCache: {},
        reapplyTheme: true
    };

    instance.format = function(value, digit) {
        var format = this.entries.formatter || 'shortName';
        return Game.utils.formatters[format](value.toFixed(digit || 0));
    };

    instance.getEl = function(id) {
        var element = this.elementCache[id];
        if(!element) {
            element = $('#' + id);
            if(element.length > 0) {
                this.elementCache[id] = element;
            }
        }
        return element;
    };

    instance.turnRedOnNegative = function(value, id) {
        var element = this.getEl(id);
        if(element.length === 0) {
            console.error("Element not found: " + id);
            return;
        }

        if(value < 0){
            if(this.entries.boldEnabled === true){
                element.addClass('red bold');
            } else {
                element.addClass('red');
                element.removeClass('bold');
            }

            return true;
        }
        else{
            element.removeClass('red bold');
            return false;
        }
    };

    instance.turnRed = function(value, target, id) {
        var element = this.getEl(id);
        if(element.length === 0) {
            console.error("Element not found: " + id);
            return;
        }

        if(value < target){
            if(this.entries.boldEnabled === true){
                element.addClass('red bold');
            } else {
                element.addClass('red');
                element.removeClass('bold');
            }
        }
        else{
            element.removeClass('red bold');
        }
    };

    instance.turnRedOrGreen = function(value, target, id) {
        var element = this.getEl(id);
        if(element.length === 0) {
            console.error("Element not found: " + id);
            return;
        }

        if(value === 0){
            if(this.entries.boldEnabled === true){
                element.addClass('red bold');
            } else {
                element.addClass('red');
                element.removeClass('bold');
            }
        }
        else{
            element.removeClass('red bold');
        }

        if(value >= target && target >= 0) {
            element.addClass('green');
        } else {
            element.removeClass('green');
        }
    };

    instance.save = function(data) {
        data.settings = {version: this.dataVersion, entries: {}};
        for(var id in this.entries) {
            data.settings.entries[id] = this.entries[id];
        }
    };

    instance.load = function(data) {
        this.loadLegacy(data);

        console.log(this.entries.hideCompleted)

        if(data.settings) {
            if(data.settings.version && data.settings.version === this.dataVersion) {
                for(var id in data.settings.entries) {
                    this.entries[id] = data.settings.entries[id];
                }
            }
        }

        console.log(this.entries.hideCompleted)

        $('#formatSelector').val(this.entries.formatter);
        $('#themeSelector').val(this.entries.theme);
        $('#boldEnabled').prop('checked', this.entries.boldEnabled);
        $('#sidebarCompressed').prop('checked', this.entries.sidebarCompressed);
        $('#notificationsEnabled').prop('checked', this.entries.notificationsEnabled);
        $('#saveNotifsEnabled').prop('checked', this.entries.saveNotifsEnabled);
        $('#gainButtonsHidden').prop('checked', this.entries.gainButtonsHidden);
        $('#redDestroyButtons').prop('checked', this.entries.redDestroyButtons);
        $('#hideCompleted').prop('checked', this.entries.hideCompleted);

        if(Game.settings.entries.sidebarCompressed === true){
            for(var i = 0; i < document.getElementsByClassName("sideTab").length; i ++){
                document.getElementsByClassName("sideTab")[i].style.height = "30px";
            }
        }
        else{
            for(var i = 0; i < document.getElementsByClassName("sideTab").length; i ++){
                document.getElementsByClassName("sideTab")[i].style.height = "60px";
            }
        }

        if(Game.settings.entries.gainButtonsHidden === true){
            for(var i = 0; i < document.getElementsByClassName("gainButton").length; i ++){
                document.getElementsByClassName("gainButton")[i].className = "gainButton hidden";
            }
        }
        else{
            for(var i = 0; i < document.getElementsByClassName("gainButton").length; i ++){
                document.getElementsByClassName("gainButton")[i].className = "gainButton";
            }
        }

        if(Game.settings.entries.hideCompleted === true){
            for(var i = 0; i < document.getElementsByClassName("completed").length; i ++){
                document.getElementsByClassName("completed")[i].className = "completed hidden";
            }
        }
        else{
            for(var i = 0; i < document.getElementsByClassName("completed").length; i ++){
                document.getElementsByClassName("completed")[i].className = "completed";
            }
        }
        
        for(var id in autoSaveMapping) {
            var element = $('#' + id);
            if(this.entries.autoSaveInterval === autoSaveMapping[id]) {
                element.val('on');
            } else {
                element.val('off');
            }
        }

        this.reapplyTheme = true;
    };

    // backwards compatibility with the old stats
    instance.loadLegacy = function(data) {
        if(data.currentTheme) { this.set('theme', data.currentTheme); }
    };

    instance.set = function(key, value) {
        this.entries[key] = value;
    };

    instance.initialise = function() {
        $('#formatSelector').change(function(){
            Game.settings.set('formatter', $(this).val());
        });

        $('#themeSelector').change(function(){
            Game.settings.set('theme', $(this).val());
            Game.settings.reapplyTheme = true;
        });

        $('#boldEnabled').change(function(){
            Game.settings.set('boldEnabled', $(this).is(':checked'));
        });

        $('#sidebarCompressed').change(function(){
            Game.settings.set('sidebarCompressed', $(this).is(':checked'));
            if(Game.settings.entries.sidebarCompressed === true){
                for(var i = 0; i < document.getElementsByClassName("sideTab").length; i ++){
                    document.getElementsByClassName("sideTab")[i].style.height = "30px";
                }
            }
            else{
                for(var i = 0; i < document.getElementsByClassName("sideTab").length; i ++){
                    document.getElementsByClassName("sideTab")[i].style.height = "60px";
                }
            }
        });

        $('#notificationsEnabled').change(function(){
            Game.settings.set('notificationsEnabled', $(this).is(':checked'));
        });

        $('#saveNotifsEnabled').change(function(){
            Game.settings.set('saveNotifsEnabled', $(this).is(':checked'));
        });

        $('#gainButtonsHidden').change(function(){
            Game.settings.set('gainButtonsHidden', $(this).is(':checked'));
            if(Game.settings.entries.gainButtonsHidden === true){
                for(var i = 0; i < document.getElementsByClassName("gainButton").length; i ++){
                    document.getElementsByClassName("gainButton")[i].className = "gainButton hidden";
                }
            }
            else{
                for(var i = 0; i < document.getElementsByClassName("gainButton").length; i ++){
                    document.getElementsByClassName("gainButton")[i].className = "gainButton";
                }
            }
        });

        $('#redDestroyButtons').change(function(){
            Game.settings.set('redDestroyButtons', $(this).is(':checked'));
            if (Game.tech.isPurchased('unlockDestruction')) {
                if(Game.settings.entries.redDestroyButtons === true){
                    for(var i = 0; i < document.getElementsByClassName("destroy").length; i ++){
                        document.getElementsByClassName("destroy")[i].className = "btn btn-danger destroy";
                    }
                }
                else{
                    for(var i = 0; i < document.getElementsByClassName("destroy").length; i ++){
                        document.getElementsByClassName("destroy")[i].className = "btn btn-default destroy";
                    }
                }
            }
        });

        if (Game.tech.isUnlocked('unlockDestruction')) {
            if(Game.settings.entries.redDestroyButtons === true){
                for(var i = 0; i < document.getElementsByClassName("destroy").length; i ++){
                    document.getElementsByClassName("destroy")[i].className = "btn btn-danger destroy";
                }
                
            }
            else{
                for(var i = 0; i < document.getElementsByClassName("destroy").length; i ++){
                    document.getElementsByClassName("destroy")[i].className = "btn btn-default destroy";
                }
            }
        }

        $('#hideCompleted').change(function(){
            Game.settings.set('hideCompleted', $(this).is(':checked'));
            if(Game.settings.entries.hideCompleted === true){
                for(var i = 0; i < document.getElementsByClassName("completed").length; i ++){
                    document.getElementsByClassName("completed")[i].className = "completed hidden";
                }
            }
            else{
                for(var i = 0; i < document.getElementsByClassName("completed").length; i ++){
                    document.getElementsByClassName("completed")[i].className = "completed";
                }
            }
        });

        for (var id in autoSaveMapping) {
            var element = $('#' + id);
            element.change({val: autoSaveMapping[id]}, function(args){
                Game.settings.set('autoSaveInterval', args.data.val);
            });
        }
    };

    instance.update = function(delta) {
        if(this.reapplyTheme === true) {
            this.reapplyTheme = false;
            this.updateTheme();
        }
    };

    instance.updateTheme = function() {
        var element = $('#theme_css');

        if(element.length === 0) {
            console.warn("Theme CSS Element does not exist!");
            return;
        }

        if(this.entries.theme === "base") {
            element.attr('href', 'lib/bootstrap.min.css');
        } else {
            element.attr('href', 'styles/' + this.entries.theme + '-bootstrap.min.css');
        }
    };

    instance.updateCompanyName = function(){
      document.getElementById("companyName").textContent = companyName;
    }

    return instance;

}());
