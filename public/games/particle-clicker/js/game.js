var Game = (function() {
  'use strict';

  var Game = function() {
    this.lab = new GameObjects.Lab();
    this.research = null;
    this.workers = null;
    this.upgrades = null;
    this.achievements = null;
    this.allObjects = {lab : this.lab};
    this.loaded = false;
  };

  Game.prototype.load = function() {
    if (this.loaded) {
      return;
    }

    // I know synchronous requests are bad as they will block the browser.
    // However, I don't see any other reasonable way to do this in order to
    // make it work with Angular. If you know a way, let me know, and I'll
    // give you a beer. - Kevin
    this.research = Helpers.loadFile('json/research.json');
    this.workers = Helpers.loadFile('json/workers.json');
    this.upgrades = Helpers.loadFile('json/upgrades.json');
    this.achievements = Helpers.loadFile('json/achievements.json');

    // Turn JSON files into actual game objects and fill map of all objects
    var _this = this;
    var makeGameObject = function(type, object) {
      // It's okay to define this function here since load is only called
      // once anyway...
      var o = new type(object);
      _this.allObjects[o.key] = o;
      return o;
    };
    this.research = this.research.map(
        function(r) { return makeGameObject(GameObjects.Research, r); });
    this.workers = this.workers.map(
        function(w) { return makeGameObject(GameObjects.Worker, w); });
    this.upgrades = this.upgrades.map(
        function(u) { return makeGameObject(GameObjects.Upgrade, u); });
    this.achievements = this.achievements.map(
        function(a) { return makeGameObject(GameObjects.Achievement, a); });
    // Load states from local store
    for (var key in this.allObjects) {
      var o = this.allObjects[key];
      o.loadState(ObjectStorage.load(key));
    }
    this.loaded = true;
  };

  Game.prototype.save = function() {
    // Save every object's state to local storage
    for (var key in this.allObjects) {
      ObjectStorage.save(key, this.allObjects[key].state);
    }
  };

  return {Game : Game};
}());
