Game.resourcesUI = (function(){

	var instance = {};

	instance.initialise = function() {
		for (var id in RESOURCE) {
			if ($('#' + RESOURCE[id]).length > 0) {
				Game.ui.bindElement(RESOURCE[id], this.createResourceDelegate(RESOURCE[id]));
			}
			if ($('#' + RESOURCE[id] + 'ps').length > 0) {
				Game.ui.bindElement(RESOURCE[id] + 'ps', this.createProductionDelegate(RESOURCE[id]));
			}
			if ($('#' + RESOURCE[id] + 'Storage').length > 0) {
				Game.ui.bindElement(RESOURCE[id] + 'Storage', this.createStorageDelegate(RESOURCE[id]));
			}
			if ($('#' + RESOURCE[id] + 'NextStorage').length > 0) {
				Game.ui.bindElement(RESOURCE[id] + 'NextStorage', this.createNextStorageDelegate(RESOURCE[id]));
			}
		}

		// the auto bindings need to be updated after this is done
		Game.ui.updateAutoDataBindings();
	};

	instance.update = function(delta) {

	};

	instance.createResourceDelegate = function(id) {
		var func;
		if (id === RESOURCE.Science) {
			func = (function() {
				var current = getResource(id);
				if (current < 100) {
					return Game.settings.format(current, 1);
				}
				else {
					return Game.settings.format(current);
				}
			});
		}
		else if (id === RESOURCE.RocketFuel) {
			func = (function() {
				var current = getResource(id);
				if (current < 100) {
					return Game.settings.format(current, 1);
				} else {
					return Game.settings.format(current);
				}
			});
		}
		else {
			func = (function() {
				return Game.settings.format(getResource(id));
			});
		}
		return func;
	};

	instance.createProductionDelegate = function(id) {
		var func;
		if (id === RESOURCE.Energy) {
			func = (function() {
				var production = getProduction(id);
				if (production >= 0) {
					if (production > 250) {
						return Game.settings.format(production);
					}
					else {
						return Game.settings.format(production * 2) / 2;
					}
				}
				else {
					if (production < -250) {
						return Math.round(production);
					}
					else {
						return Math.round(production * 2) / 2;
					}
				}
			});
		}
		else if (id === RESOURCE.Science) {
			func = (function() {
				return Game.settings.format(getProduction(id), 1);
			});
		}
		else if (id === RESOURCE.RocketFuel) {
			func = (function() {
				return Game.settings.format(getProduction(id), 1);
			});
		}
		else {
			func = (function() {
				return Game.settings.format(getProduction(id));
			});
		}

		return func;
	};

	instance.createStorageDelegate = function(id) {
		return (function() {
			return Game.settings.format(getStorage(id));
		});
	};

	instance.createNextStorageDelegate = function(id) {
		return (function() {
			return Game.settings.format(getStorage(id) * 2);
		});
	};

	Game.uiComponents.push(instance);

	return instance;

}());