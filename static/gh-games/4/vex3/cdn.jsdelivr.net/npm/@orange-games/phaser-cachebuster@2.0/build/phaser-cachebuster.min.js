/*!
 * phaser-cachebuster - version 2.0.0 
 * Simple Phaser plugin for adding a query parameter to assets URL's so that they can be 'cache busted'
 *
 * OrangeGames
 * Build at 20-12-2016
 * Released under MIT License 
 */

var __extends=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},PhaserCachebuster;!function(a){var b=function(a){function b(b,c){var d=a.call(this,b,c)||this;return d.patchLoader(),d}return __extends(b,a),b.prototype.patchLoader=function(){Object.defineProperty(Phaser.Loader,"cacheBuster",{value:null}),Phaser.Loader.prototype.transformUrl=function(a,b){return a?(null!==this.cacheBuster&&null===a.match(/^(data:)/)&&(a+="?v="+this.cacheBuster),a.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/)?a:this.baseURL+b.path+a):""}},b}(Phaser.Plugin);a.CacheBuster=b}(PhaserCachebuster||(PhaserCachebuster={}));