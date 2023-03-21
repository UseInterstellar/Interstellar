/** Allows to save objects to HTML5 local storage.
 * However, it can only save properties, not functions.
 */
var ObjectStorage = (function() {
  'use strict';
  try {
    var _s = localStorage;
    return {
      save :
          function(key, item) {
            _s.setItem(key, JSON.stringify(item, function(key, val) {
                              if (key == '$$hashKey') {
                                return undefined;
                              }
                              return val;
                            }));
          },
      load : function(key) { return JSON.parse(_s.getItem(key)); },
      clear : function() { _s.clear(); }
    };
  } catch (e) {
    alert('There is no local storage for you.' +
          ' If you refresh the page, all progress will be lost');
    return {
      save : function(key, item) {},
      load : function(key) { return null; },
      clear : function() {}
    };
  };
}());
