/*!
 * splash - version 3.5.46 
 * This is the Splash Screen for Orange Games
 *
 * OrangeGames
 * Build at 16-11-2018
 */

function addScript(a, b, c) {
    var d = document.createElement("script");
    d.setAttribute("src", a + "?v=" + b), "function" == typeof c && (d.onload = c), document.body.appendChild(d)
}
var __extends = this && this.__extends || function() {
        var a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a, b) { a.__proto__ = b } || function(a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) };
        return function(b, c) {
            function d() { this.constructor = b } a(b, c), b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d)
        }
    }(),
    Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, null, "splash-background") || this; return d.back = d.game.make.graphics(0, 0), d.add(d.back), d.resize(c), d }
            return __extends(b, a), b.prototype.resize = function(a) {
                var b = this.game.width < 1 ? 1 : this.game.width,
                    c = this.game.height < 1 ? 1 : this.game.height;
                this.back.clear().beginFill(4351922).drawRect(0, 0, b, c)
            }, b.prototype.destroy = function(b) { a.prototype.destroy.call(this, b), this.back.destroy(!0), this.back = null }, b
        }(Phaser.Group);
        a.Admeen = b
    }(b = a.SplashScreenBackgrounds || (a.SplashScreenBackgrounds = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, null, "splash-background") || this; return d.back = d.game.make.graphics(0, 0), d.add(d.back), d.resize(c), d }
            return __extends(b, a), b.prototype.resize = function(a) { this.back.clear().beginFill(14548992).drawRect(0, 0, this.game.width, this.game.height) }, b.prototype.update = function() {}, b.prototype.destroy = function(b) { a.prototype.destroy.call(this, b), this.back.destroy(!0), this.back = null }, b
        }(Phaser.Group);
        a.Bild = b
    }(b = a.SplashScreenBackgrounds || (a.SplashScreenBackgrounds = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, null, "splash-background") || this; return d.triangles = [], d.triangleSizes = [350, 650, 950, 1250], d.back = d.game.make.graphics(0, 0), d.t = d.game.make.graphics(0, 0), d.gradientBitmap = d.game.make.bitmapData(1, 1), d.gradient = d.game.make.sprite(0, 0, d.gradientBitmap), d.add(d.back), d.add(d.t), d.add(d.gradient), d.resize(c), d }
            return __extends(b, a), b.prototype.resize = function(a) {
                var b = this,
                    c = this.game.width < 1 ? 1 : this.game.width,
                    d = this.game.height < 1 ? 1 : this.game.height;
                this.back.clear().beginFill(3387647).drawRect(0, 0, c, d), this.updateTrinagles(a), this.t.x = c / 2, this.t.y = d / 2, this.t.clear(), this.t.lineStyle(80 * a, 16777215, .3), this.triangles.forEach(function(a) { b.t.drawPolygon(a) }), this.t.angle = 30, this.gradientBitmap.resize(c, d);
                var e = this.gradientBitmap.context.createLinearGradient(0, 0, 0, d - 200);
                e.addColorStop(0, "rgba(51, 176, 255, 0)"), e.addColorStop(1, "rgba(51, 176, 255, 1)"), this.gradientBitmap.context.fillStyle = e, this.gradientBitmap.context.clearRect(0, 0, c, d), this.gradientBitmap.context.fillRect(0, 0, c, d)
            }, b.prototype.updateTrinagles = function(a) {
                var b = this;
                new Phaser.Point(this.game.width / 2, this.game.height / 2);
                this.triangles = [], this.triangleSizes.forEach(function(c, d) { c *= a, b.triangles.push(new Phaser.Polygon([new Phaser.Point(c * Math.cos(0), c * Math.sin(0)), new Phaser.Point(c * Math.cos(1 / 3 * (2 * Math.PI)), c * Math.sin(1 / 3 * (2 * Math.PI))), new Phaser.Point(c * Math.cos(2 / 3 * (2 * Math.PI)), c * Math.sin(2 / 3 * (2 * Math.PI))), new Phaser.Point(c * Math.cos(0), c * Math.sin(0))])) })
            }, b.prototype.update = function() { this.t.angle += .3 }, b.prototype.destroy = function(b) { a.prototype.destroy.call(this, b), this.back.destroy(!0), this.gradientBitmap.destroy(), this.gradient.destroy(!0), this.t.destroy(!0), this.back = null, this.gradientBitmap = null, this.gradient = null, this.t = null, this.triangles = null, this.triangleSizes = null }, b
        }(Phaser.Group);
        a.FunnyGames = b
    }(b = a.SplashScreenBackgrounds || (a.SplashScreenBackgrounds = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, null, "splash-background") || this; return d.gradientBitmap = d.game.make.bitmapData(1, 1), d.gradient = d.game.make.sprite(0, 0, d.gradientBitmap), d.add(d.gradient), d.resize(c), d }
            return __extends(b, a), b.prototype.resize = function(a) {
                var b = this.game.width < 1 ? 1 : this.game.width,
                    c = this.game.height < 1 ? 1 : this.game.height;
                this.gradientBitmap.resize(b, c), this.gradientBitmap.context.clearRect(0, 0, b, c);
                var d = this.gradientBitmap.context.createRadialGradient(b / 2, c / 2, 0, b / 2, c / 2, c / 2);
                d.addColorStop(0, "rgb(0, 38, 84)"), d.addColorStop(1, "rgb(96, 3, 190)"), this.gradientBitmap.context.fillStyle = d, this.gradientBitmap.context.fillRect(0, 0, b, c)
            }, b.prototype.update = function() {}, b.prototype.destroy = function(b) { a.prototype.destroy.call(this, b), this.gradientBitmap.destroy(), this.gradient.destroy(!0), this.gradientBitmap = null, this.gradient = null }, b
        }(Phaser.Group);
        a.GameCell = b
    }(b = a.SplashScreenBackgrounds || (a.SplashScreenBackgrounds = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, null, "splash-background") || this; return d.back = d.game.make.graphics(0, 0), d.gradientBitmap = d.game.make.bitmapData(1, 1), d.gradient = d.game.make.sprite(0, 0, d.gradientBitmap), d.add(d.back), d.add(d.gradient), d.resize(c), d }
            return __extends(b, a), b.prototype.resize = function(a) {
                var b = this.game.width < 1 ? 1 : this.game.width,
                    c = this.game.height < 1 ? 1 : this.game.height;
                this.back.clear().beginFill(663352).drawRect(0, 0, b, c), this.gradientBitmap.resize(b, c), this.gradientBitmap.context.clearRect(0, 0, b, c);
                var d = this.gradientBitmap.context.createRadialGradient(b / 2, c / 2, 0, b / 2, c / 2, c / 2);
                d.addColorStop(0, "rgb(17, 60, 117)"), d.addColorStop(1, "rgb(10, 31, 56)"), this.gradientBitmap.context.fillStyle = d, this.gradientBitmap.context.fillRect(0, 0, b, c)
            }, b.prototype.update = function() {}, b.prototype.destroy = function(b) { a.prototype.destroy.call(this, b), this.back.destroy(!0), this.gradientBitmap.destroy(), this.gradient.destroy(!0), this.back = null, this.gradientBitmap = null, this.gradient = null }, b
        }(Phaser.Group);
        a.Kizi = b
    }(b = a.SplashScreenBackgrounds || (a.SplashScreenBackgrounds = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, null, "splash-background") || this; return d.back = d.game.make.graphics(0, 0), d.gradientBitmap = d.game.make.bitmapData(1, 1), d.gradient = d.game.make.sprite(0, 0, d.gradientBitmap), d.add(d.back), d.add(d.gradient), d.resize(c), d }
            return __extends(b, a), b.prototype.resize = function(a) {
                var b = this.game.width < 1 ? 1 : this.game.width,
                    c = this.game.height < 1 ? 1 : this.game.height;
                this.back.clear().beginFill(5415393).drawRect(0, 0, b, c), this.gradientBitmap.resize(b, c), this.gradientBitmap.context.clearRect(0, 0, b, c);
                var d = this.gradientBitmap.context.createRadialGradient(b / 2, c / 2, 0, b / 2, c / 2, 1.5 * c);
                d.addColorStop(0, "rgba(244, 250, 252, 1)"), d.addColorStop(1, "rgba(244, 250, 252, 0)"), this.gradientBitmap.context.fillStyle = d, this.gradientBitmap.context.fillRect(0, 0, b, c)
            }, b.prototype.destroy = function(b) { a.prototype.destroy.call(this, b), this.back.destroy(!0), this.gradientBitmap.destroy(), this.gradient.destroy(!0), this.back = null, this.gradientBitmap = null, this.gradient = null }, b
        }(Phaser.Group);
        a.PlayCell = b
    }(b = a.SplashScreenBackgrounds || (a.SplashScreenBackgrounds = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, null, "splash-background") || this; return d.back = d.game.make.graphics(0, 0), d.add(d.back), d.resize(c), d }
            return __extends(b, a), b.prototype.resize = function(a) {
                var b = this.game.width < 1 ? 1 : this.game.width,
                    c = this.game.height < 1 ? 1 : this.game.height;
                this.back.clear().beginFill(4879021).drawRect(0, 0, b, c)
            }, b.prototype.update = function() {}, b.prototype.destroy = function(b) { a.prototype.destroy.call(this, b), this.back.destroy(!0), this.back = null }, b
        }(Phaser.Group);
        a.Spele = b
    }(b = a.SplashScreenBackgrounds || (a.SplashScreenBackgrounds = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, null, "splash-background") || this; return d.back = d.game.make.graphics(0, 0), d.add(d.back), d.resize(c), d }
            return __extends(b, a), b.prototype.resize = function(a) {
                var b = this.game.width < 1 ? 1 : this.game.width,
                    c = this.game.height < 1 ? 1 : this.game.height;
                this.back.clear().beginFill(804972).drawRect(0, 0, b, c)
            }, b.prototype.destroy = function(b) { a.prototype.destroy.call(this, b), this.back.destroy(!0), this.back = null }, b
        }(Phaser.Group);
        a.Spil = b
    }(b = a.SplashScreenBackgrounds || (a.SplashScreenBackgrounds = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, null, "splash-background") || this; return d.back = d.game.make.graphics(0, 0), d.gradientBitmap = d.game.make.bitmapData(1, 1), d.gradient = d.game.make.sprite(0, 0, d.gradientBitmap), d.add(d.back), d.add(d.gradient), d.resize(c), d }
            return __extends(b, a), b.prototype.resize = function(a) {
                var b = this.game.width < 1 ? 1 : this.game.width,
                    c = this.game.height < 1 ? 1 : this.game.height;
                this.back.clear().beginFill(357287).drawRect(0, 0, b, c), this.gradientBitmap.resize(b, c), this.gradientBitmap.context.clearRect(0, 0, b, c);
                var d = this.gradientBitmap.context.createRadialGradient(b / 2, c / 2, 0, b / 2, c / 2, c / 2);
                d.addColorStop(0, "rgba(0, 81, 125, 0)"), d.addColorStop(1, "rgba(0, 81, 125, 1)"), this.gradientBitmap.context.fillStyle = d, this.gradientBitmap.context.fillRect(0, 0, b, c);
                var e = this.gradientBitmap.context.createRadialGradient(b / 2, c / 2, 0, b / 2, c / 2, c / 2);
                e.addColorStop(0, "rgba(4, 176, 240, 1)"), e.addColorStop(1, "rgba(4, 176, 240, 0)"), this.gradientBitmap.context.fillStyle = e, this.gradientBitmap.context.fillRect(0, 0, b, c)
            }, b.prototype.update = function() {}, b.prototype.destroy = function(b) { a.prototype.destroy.call(this, b), this.back.destroy(!0), this.gradientBitmap.destroy(), this.gradient.destroy(!0), this.back = null, this.gradientBitmap = null, this.gradient = null }, b
        }(Phaser.Group);
        a.Yepi = b
    }(b = a.SplashScreenBackgrounds || (a.SplashScreenBackgrounds = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) { a[a.splashscreen = 0] = "splashscreen", a[a.logo = 1] = "logo", a[a.facebook = 2] = "facebook", a[a.twitter = 3] = "twitter", a[a.playstore = 4] = "playstore", a[a.appstore = 5] = "appstore", a[a.more_games = 6] = "more_games", a[a.download_game = 7] = "download_game", a[a.walkthrough = 8] = "walkthrough", a[a.disclaimer = 9] = "disclaimer", a[a.highscores = 10] = "highscores" }(b = a.UtmTargets || (a.UtmTargets = {}));
    var c = function() {
        function c() {}
        return c.setSiteLock = function(a) { c.siteLocks = a }, c.preloadImages = function(b) {
            var d;
            switch (a.Utils.isOnDevice(b) || c.isAirfi() ? a.Utils.ASSET_LOCATION = "assets/" : a.Utils.isTc() ? a.Utils.ASSET_LOCATION = "/repository/download/Fabrique_FunnyGamesSplash/.lastSuccessful/build/assets/" : "fbrq.io" === a.Utils.getSourceSite(!0) && (a.Utils.ASSET_LOCATION = "https://" + window.location.host + "/orange-games-splash/assets/"), a.Utils.getBrandingDomain()) {
                case a.BrandingDomain.Spele:
                    d = "spele";
                    break;
                case a.BrandingDomain.PlayCell:
                    d = "playcell";
                    break;
                case a.BrandingDomain.GameCell:
                    d = "gamecell";
                    break;
                case a.BrandingDomain.Yepi:
                    d = "yepi";
                    break;
                case a.BrandingDomain.Spil:
                    d = "spil";
                    break;
                case a.BrandingDomain.Admeen:
                    d = "admeen";
                    break;
                case a.BrandingDomain.Bild:
                    d = "bild";
                    break;
                default:
                case a.BrandingDomain.Kizi:
                    d = "kizi";
                    break;
                case a.BrandingDomain.Funnygames:
                    d = "funnygames"
            }
            a.Utils.isTc() || (b.load.crossOrigin = "anonymous"), b.load.image(c.LOGO_KEY, a.Utils.ASSET_LOCATION + "images/branding_logo_" + d + "_small.png")
        }, c.openCampaignLink = function(d, e, f) {
            if (a.Utils.isOnDevice(d) || c.isContracted(d) || c.isSpecial(d) || !c.outGoingLinksAllowed()) return null;
            var g, h, i = a.Utils.getSourceSite(),
                j = a.Utils.isOnDevice(d) ? "https://" : "//";
            switch (a.Utils.getBrandingDomain()) {
                case a.BrandingDomain.Spele:
                    g = j + "www.spele.nl";
                    break;
                case a.BrandingDomain.Yepi:
                    g = j + "www.yepi.com";
                    break;
                case a.BrandingDomain.Admeen:
                    return g = "https://media.admeen.com/branding/link.php", h = window.open(g, "_blank"), void(h && h.focus && h.focus());
                case a.BrandingDomain.PlayCell:
                    g = j + "www.playcell.com";
                    break;
                case a.BrandingDomain.GameCell:
                    g = j + "www.gamecell.com";
                    break;
                default:
                case a.BrandingDomain.Kizi:
                    g = "http://www.kizi.com";
                    break;
                case a.BrandingDomain.Bild:
                    return h = window.open(j + "www.bildspielt.de", "_blank"), void(h && h.focus && h.focus());
                case a.BrandingDomain.Funnygames:
                    g = j + "www.funnygames.nu"
            }
            var k = "string" == typeof f ? f : b[f];
            h = window.open(g + "/?utm_source=" + i + "&utm_medium=html5&utm_term=" + e + "&utm_content=" + k + "&utm_campaign=Gamedistribution", "_blank"), h && h.focus && h.focus()
        }, c.getLogoWithLink = function(b, d) { var e = new Phaser.Image(b, 0, 0, c.LOGO_KEY); return a.Utils.isOnDevice(b) || c.isContracted(b) || c.isSpecial(b) || c.isAirfi() || (e.inputEnabled = !0, e.input.useHandCursor = !0, e.events.onInputUp.add(function() { a.Branding.openCampaignLink(b, d, a.UtmTargets.logo) }, this)), e.visible = !c.isSpecial(b), e }, c.isInternal = function(a) { return c.hostMatchesList(a.cache.getJSON(c.INTERNAL_PORTALS_KEY)) }, c.isContracted = function(a) { return c.hostMatchesList(a.cache.getJSON(c.CONTRACTED_PORTALS_KEY)) }, c.isSpecial = function(a) { return c.hostMatchesList(a.cache.getJSON(c.SPECIAL_PORTALS_KEY)) }, c.isAdmeen = function() { if (!c.siteLocks || !c.siteLocks.hasOwnProperty("admeen")) return !1; var a = c.siteLocks.admeen; return c.hostMatchesList(a) }, c.isKongregate = function() { if (!c.siteLocks || !c.siteLocks.hasOwnProperty("kongregate")) return !1; var a = c.siteLocks.kongregate; return c.hostMatchesList(a) }, c.isNewgrounds = function() { if (!c.siteLocks || !c.siteLocks.hasOwnProperty("newgrounds")) return !1; var a = c.siteLocks.newgrounds; return c.hostMatchesList(a) }, c.isBild = function() { return "bild.fbrq.io" === window.location.host || window.location.host.indexOf("contentfleet.com") !== -1 }, c.isBip = function() { return window.location.search.indexOf("bipgaming") !== -1 || "bip.fbrq.io" === window.location.host }, c.isPlaycellApp = function() { return window.location.search.indexOf("playcellApp") !== -1 }, c.isSpil = function() { return document.referrer.indexOf("gameplayer.io") !== -1 }, c.isAirfi = function() { return !!window.hasOwnProperty("airfi") && window.airfi }, c.outGoingLinksAllowed = function() { return !c.isAirfi() && (!window.hasOwnProperty("fbrqLA") || window.fbrqLA) }, c.hostMatchesList = function(b) {
            b = b || [];
            for (var c = a.Utils.getSourceSite(), d = 0; d < b.length; d++)
                if (c === b[d]) return !0;
            return !1
        }, c
    }();
    c.LOGO_KEY = "branding_logo", c.INTERNAL_PORTALS_KEY = "branding_portals", c.CONTRACTED_PORTALS_KEY = "branding_contracted", c.SPECIAL_PORTALS_KEY = "branding_special", c.SITELOCK_PORTALS = "sitelock_portals", c.GAME_ICONS_KEY = "more_games", a.Branding = c
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b = function() {
        function b() {}
        return b.loadPortalScript = function(b) { b && b.hasOwnProperty("minijuegos") && b.minijuegos.indexOf(a.Utils.getSourceSite()) !== -1 && (void 0 !== window.mpConfig ? window.mpConfig.partner = "orange-games" : window.mpConfig = { partner: "orange-games" }, addScript("https://ext.minijuegosgratis.com/external-host/main.js", Date.now() / 1e3)), b && b.hasOwnProperty("kongregate") && b.kongregate.indexOf(a.Utils.getSourceSite()) !== -1 && addScript("https://cdn1.kongregate.com/javascripts/kongregate_api.js", Date.now() / 1e3, function() { "undefined" != typeof kongregateAPI && kongregateAPI.loadAPI(function() { window.kongregate = kongregateAPI.getAPI() }) }), b && b.hasOwnProperty("newgrounds") && b.newgrounds.indexOf(a.Utils.getSourceSite()) !== -1 && addScript("cdn.fbr/orange-games-splash/assets/scripts/newgroundsio.min.js", Date.now() / 1e3) }, b
    }();
    a.PortalScripts = b
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b = function() {
        function a() {}
        return a.initialize = function(b, c, d, e) {
            var f = "string" == typeof b.parent ? document.getElementById(b.parent) : b.parent;
            a.container = f.parentNode.appendChild(document.createElement("div")), a.container.id = "phaser-vooxe-container", a.container.style.position = "absolute", a.container.style.zIndex = "9999", a.container.style.display = "none", a.container.style.top = "0", a.container.style.left = "0", a.container.style.width = "100%", a.container.style.height = "100%", a.container.style.overflow = "hidden";
            var g = a.container.appendChild(document.createElement("div"));
            g.style.width = "50px", g.style.height = "50px", g.style.position = "absolute", g.style.right = "300px", g.style.zIndex = "99", g.style.backgroundColor = "#000000";
            var h = g.appendChild(document.createElement("div"));
            h.innerHTML = "&#x274c;", h.style.color = "#ffffff", h.style.cssFloat = "right", h.style.fontSize = "40px", h.style.marginRight = "5px", h.style.cursor = "pointer", h.addEventListener("click", function() { return a.hide() });
            var i = {
                container: "phaser-vooxe-container",
                gameId: c,
                publisherId: "dc63a91fa184423482808bed4d782320",
                width: "100%",
                height: "100%",
                title: d,
                category: e,
                langCode: "en-us",
                autoplay: "no",
                onFound: function(a) {},
                onError: function(a) {},
                onReady: function(b) {
                    a.playerInstance = b;
                    var c = a.container.getElementsByTagName("iframe")[0];
                    c.width = window.innerWidth.toString(), c.height = window.innerHeight.toString()
                }
            };
            ! function(a, b, c, d, e, f, g) {
                a.VooxeVideo = e, a[e] = a[e] || function() {
                    (a[e].q = a[e].q || []).push(arguments)
                }, a[e].l = Date.now(), f = b.createElement(c), g = b.getElementsByTagName(c)[0], f.async = 1, f.src = d, g.parentNode.insertBefore(f, g)
            }(window, document, "script", "//video-static.vooxe.com/libs/gd/gd.js", "gdPlayer", void 0, void 0), gdPlayer(i)
        }, a.play = function(b) { return null !== a.playerInstance && (a.playerInstance.play(b), !0) }, a.pause = function() { return null !== a.playerInstance && (a.playerInstance.pause(), !0) }, a.show = function() { return null !== a.playerInstance && (a.container.style.display = "block", !0) }, a.hide = function() { return null !== a.playerInstance && (a.pause(), a.container.style.display = "none", a.onClose.dispatch(), !0) }, a.setVolume = function(b) { null !== a.playerInstance && (b > 1 || b < 0 || a.playerInstance.setVolume(b)) }, a.getCuePoints = function() { if (null !== a.playerInstance) return a.playerInstance.cuePoints() }, a
    }();
    b.playerInstance = null, b.onClose = new Phaser.Signal, a.Tubia = b
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) { var b;! function(a) { a[a.Neutral = 0] = "Neutral", a[a.Yepi = 1] = "Yepi", a[a.Spele = 2] = "Spele", a[a.Funnygames = 3] = "Funnygames", a[a.Kizi = 4] = "Kizi", a[a.PlayCell = 5] = "PlayCell", a[a.GameCell = 6] = "GameCell", a[a.Bild = 7] = "Bild", a[a.Spil = 8] = "Spil", a[a.Admeen = 9] = "Admeen" }(b = a.BrandingDomain || (a.BrandingDomain = {})) }(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c, d, e, f, g, h) {
                var i = a.call(this, b, d, e, "", null, null) || this;
                i.onInputUp.add(i.openGame, i), i.id = c.data.key, i.url = c.data.url, i.icon = i.game.add.image(0, 0, c.data.key), i.icon.width = f, i.icon.height = f, i.input.priorityID = 680, i.addChild(i.icon);
                var j = i.game.make.graphics(0, 0);
                j.beginFill(h).drawRect(0, 0, f, g - f).endFill(), i.titleBg = i.game.add.image(0, f, j.generateTexture()), i.addChild(i.titleBg);
                var k = c.data.title;
                return k.length > 16 && (k = k.replace(k.substring(14, k.length), "...")), i.title = i.game.add.text(f / 2, i.titleBg.y + (g - f) / 2 + 4, k.toUpperCase(), { font: "bold " + .35 * (g - f) + "px Arial", fill: "#FFF", align: "center", wordWrap: !0, wordWrapWidth: f - 10 }), i.title.anchor.set(.5, .5), i.addChild(i.title), j = i.game.make.graphics(0, 0), j.beginFill(16777215).drawCircle(0, 0, 80).beginFill(h).lineTo(-15, -25).lineTo(25, 0).lineTo(-15, 25).lineTo(-15, -25).endFill(), i.playImg = i.game.add.image(f / 2, f / 3 * 2.7, j.generateTexture()), i.playImg.anchor.set(.5, .5), i.addChild(i.playImg), i
            }
            return __extends(b, a), b.prototype.openGame = function() {
                this.game.analytics && this.game.analytics.google.sendGenericEvent("MoreGames", "Click", this.id), this.url.indexOf("http://") !== -1 && this.url.replace("http:", "");
                var a = window.open(this.url, "_self");
                a && a.focus && a.focus()
            }, b.prototype.destroy = function() { this.onInputUp.remove(this.openGame, this), a.prototype.destroy.call(this), this.removedFromWorld() }, b
        }(Phaser.Button);
        a.Item = b
    }(b = a.MoreGames || (a.MoreGames = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d(b, d) {
                var e = c.call(this, b, null, "moreGames-background") || this;
                e.size = 800, e.items = [], e.offset = 14, e.isDestroyed = !1, e.gameName = d, e.deviceRatio = b.width / e.size, e.overlay = b.add.graphics(0, 0), e.overlay.beginFill(0, .4).drawRect(0, 0, b.width, b.height).endFill(), e.overlay.pivot.set(b.width / 2, b.height / 2), e.overlay.inputEnabled = !0, e.overlay.input.priorityID = 660, e.onClose = new Phaser.Signal, e.overlay.events.onInputUp.add(function() { e.hide() }), e.add(e.overlay), e.menuGrp = new Phaser.Group(b, e, "menuGrp"), e.add(e.menuGrp);
                var f = b.make.graphics(0, 0);
                f.beginFill(2507370).drawRoundedRect(0, 0, e.size, e.size + 20, 15).endFill(), e.background = e.game.add.image(0, 0, f.generateTexture()), e.background.anchor.set(.5), e.background.inputEnabled = !0, e.background.input.priorityID = 670, e.background.input.useHandCursor = !1, e.menuGrp.add(e.background), e.logoBtn = e.game.add.button(0, -(e.background.height / 2) + e.offset, a.Branding.LOGO_KEY, function() { a.Branding.openCampaignLink(e.game, e.gameName, a.UtmTargets.more_games) }, e), e.logoBtn.scale.setTo(1), e.logoBtn.anchor.set(.5, 0), e.menuGrp.add(e.logoBtn), e.closeBtn = b.add.button(e.size / 2 - 10, -(e.size / 2) + 25, "close_btn", e.hide, e), e.closeBtn.anchor.set(1), e.closeBtn.input.priorityID = 680, e.menuGrp.add(e.closeBtn), e.createItems();
                var g = b.make.graphics(0, 0);
                g.beginFill(2507370).drawRect(0, 0, 270, 40).endFill(), e.moreGamesBtn = b.add.button(0, e.background.y + e.background.height / 2 - g.height - e.offset, "", function() { a.Branding.openCampaignLink(e.game, e.gameName, a.UtmTargets.more_games) }, e), e.moreGamesBtn.texture = g.generateTexture(), e.moreGamesBtn.input.priorityID = 680, e.moreGamesBtn.anchor.set(.5, 0), e.menuGrp.add(e.moreGamesBtn);
                var h = { font: "bold 26px Tahoma", fill: "#ffffff" };
                return e.moreGamesText = b.add.text(0, e.moreGamesBtn.height / 2 + 2, "PLAY MORE GAMES", h), e.moreGamesText.anchor.set(.5), e.moreGamesBtn.addChild(e.moreGamesText), e.visible = !1, e.resize(), e.resizeListener = function() { setTimeout(function() { e.isDestroyed || e.resize() }, 100) }, e.game.scale.onSizeChange.add(e.resizeListener, e), e
            }
            return __extends(d, c), d.prototype.createItems = function() {
                this.itemGrp = this.game.make.group(this, "items"), this.itemGrp.x = 0, this.itemGrp.y = this.size / 2 + this.logoBtn.y + this.logoBtn.height, this.menuGrp.add(this.itemGrp);
                var c, e, f, g, h = this.game.cache.getJSON(a.Branding.GAME_ICONS_KEY),
                    i = 3,
                    j = Math.floor(this.size / i - 1.25 * this.offset),
                    k = Math.floor(j + .25 * j),
                    l = 0;
                for (var m in h) h.hasOwnProperty(m) && l < 6 && !this.isCurrentGame(m) && (e = l % i * j + this.offset + l % i * this.offset, f = Math.floor(l / i) * k + this.offset + Math.floor(l / i) * this.offset, g = l % d.BG_COLORS.length, c = new b.Item(this.game, h[m], e - this.size / 2, f - this.size / 2, j, k, d.BG_COLORS[g]), this.itemGrp.add(c), this.items.push(c), l++)
            }, d.prototype.isCurrentGame = function(a) { var b = window.location.href.replace(/-/g, ""); return a = a.replace(/-/g, ""), b.indexOf(a) >= 0 }, d.prototype.show = function() { this.visible || (this.game.analytics && (this.game.analytics.google.sendScreenView("moregames"), this.game.analytics.google.sendGenericEvent("MoreGames", "Open")), this.visible = !0) }, d.prototype.hide = function() { this.visible && (this.visible = !1, this.game.analytics && this.game.analytics.google.sendGenericEvent("MoreGames", "Close"), this.onClose && this.onClose.dispatch()) }, d.preloadImages = function(b) {
                a.Utils.getSourceSite();
                a.Utils.isOnDevice(b) || a.Branding.isAirfi() ? a.Utils.ASSET_LOCATION = "assets/" : a.Utils.isTc() ? a.Utils.ASSET_LOCATION = "/repository/download/Fabrique_FunnyGamesSplash/.lastSuccessful/build/assets/" : "./fbrq.io" === a.Utils.getSourceSite(!0) && (a.Utils.ASSET_LOCATION = "//" + window.location.host + "/orange-games-splash/assets/"), a.Utils.isTc() || (b.load.crossOrigin = "anonymous"), b.load.image("close_btn", a.Utils.ASSET_LOCATION + "images/close_btn.png");
                var c = b.cache.getJSON(a.Branding.GAME_ICONS_KEY);
                for (var d in c) c.hasOwnProperty(d) && (c[d].data.key = d, b.load.image(d, a.Utils.ASSET_LOCATION + "icons/" + d + ".png"))
            }, d.prototype.getScale = function() { return this.game.height > this.game.width && this.game.width < this.size ? (this.game.width - 20) / this.size : this.game.width > this.game.height && this.game.height < this.size ? (this.game.height - 40) / this.size : 1 }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.overlay.clear().beginFill(0, .4).drawRect(0, 0, this.game.width, this.game.height).endFill(), this.overlay.pivot.set(this.game.width / 2, this.game.height / 2), this.menuGrp.scale.set(this.scaleFactor) }, d.prototype.destroy = function() { this.game.scale.onSizeChange.remove(this.resizeListener, this), this.isDestroyed || (this.overlay.destroy(!0), this.overlay = null, this.itemGrp.destroy(!0), this.itemGrp = null, this.menuGrp.destroy(!0), this.menuGrp = null, this.background.destroy(), this.background = null, this.closeBtn.destroy(), this.closeBtn = null, this.moreGamesBtn.destroy(), this.moreGamesBtn = null, this.moreGamesText.destroy(), this.moreGamesText = null, this.logoBtn.destroy(), this.logoBtn = null, this.onClose.removeAll(), this.onClose = null, this.items.forEach(function(a) { a.destroy() })), this.isDestroyed = !0, this.removeAll(!0), c.prototype.destroy.call(this) }, d
        }(Phaser.Group);
        c.BG_COLORS = [2201331, 10233776, 15936542, 15690752, 16361509, 5025616], b.Menu = c
    }(b = a.MoreGames || (a.MoreGames = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, c) || this; return d.ga = GA.getInstance(), b.hasOwnProperty("analytics") ? Object.defineProperty(b.analytics, "game", { value: d }) : b.analytics = { game: d }, d }
            return __extends(b, a), b.prototype.setup = function(a, b, c, d, e) { void 0 === e && (e = !0), this.ga.init(a, b, c, d).addEvent(new GA.Events.User), e && this.setupErrorTracking() }, b.prototype.createUser = function(a, b, c, d) { return new GA.User(a, b, c, d) }, b.prototype.addEvent = function(a) { this.ga.addEvent(a) }, b.prototype.sendEvents = function() { this.ga.sendData() }, b.prototype.setupErrorTracking = function() {
                var a = this,
                    b = [];
                window.addEventListener("error", function(c) {
                    if (b.indexOf(c.message) === -1) {
                        b.push(c.message);
                        var d = "Error: " + c.message;
                        c.filename && (d += "\nurl: " + c.filename), c.lineno && (d += "\nline: " + c.lineno), c.colno && (d += "\ncolumn: " + c.colno), c.error && (d += "\nDetails: " + c.error), a.ga.addEvent(new GA.Events.Exception(GA.Events.ErrorSeverity.critical, d)).sendData()
                    }
                }), window.addEventListener("error", function(b) {
                    var c = b.message;
                    b.hasOwnProperty("error") && b.error.hasOwnProperty("stack") && (c = b.error.stack), a.ga.addEvent(new GA.Events.Exception(GA.Events.ErrorSeverity.critical, c)).sendData()
                })
            }, b
        }(Phaser.Plugin);
        a.GameAnalytics = b
    }(b = a.Plugins || (a.Plugins = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(b) {
            function c(c, d) {
                var e = b.call(this, c, d) || this;
                c.hasOwnProperty("analytics") ? Object.defineProperty(c.analytics, "google", { value: e }) : c.analytics = { google: e };
                var f = a.Utils.isOnDevice(c) ? "https://" : "//";
                return function(a, b, c, d, e, f, g) {
                    a.GoogleAnalyticsObject = e, a[e] = a[e] ? a[e] : function() {
                        (a[e].q = a[e].q || []).push(arguments)
                    }, a[e].l = Date.now(), f = b.createElement(c), g = b.getElementsByTagName(c)[0], f.async = 1, f.src = d, g.parentNode.insertBefore(f, g)
                }(window, document, "script", f + "www.google-analytics.com/analytics.js", "ga"), e
            }
            return __extends(c, b), c.prototype.setup = function(b, c, d, e) {
                if (void 0 === e && (e = "auto"), ga("create", b, e), a.Utils.isOnDevice(this.game) && ga("set", "checkProtocolTask", null), void 0 !== c && ga("set", "appName", c), void 0 !== c && ga("set", "appVersion", d), ga("send", "pageview"), "auto" !== e) {
                    var f = { name: "fbrq" };
                    for (var g in e) e.hasOwnProperty(g) && (f[g] = e[g]);
                    ga("create", "UA-78960661-1", f)
                }
                else ga("create", "UA-78960661-1", e, "fbrq");
                if (a.Branding.isSpil()) {
                    var h = a.Utils.getReferrer(decodeURIComponent(document.referrer));
                    ga("fbrq.set", "referrer", h), ga("set", "referrer", h)
                }
                a.Utils.isOnDevice(this.game) && ga("fbrq.set", "checkProtocolTask", null);
                for (var i = "brzcrz_local=", j = document.cookie.split(";"), k = 0; k < j.length; k++) {
                    for (var l = j[k];
                        " " === l.charAt(0);) l = l.substring(1, l.length);
                    if (0 === l.indexOf(i)) {
                        var m = l.substring(i.length, l.length);
                        ga("fbrq.set", "userId", m), ga("fbrq.set", "dimension1", m);
                        break
                    }
                }
                return ga("fbrq.set", "appName", "All"), ga("fbrq.send", "pageview"), window.DS_OPTIONS = { id: "fbrq", success: function(a) { ga("fbrq.set", "userId", a), ga("fbrq.set", "dimension1", a), ga("fbrq.send", "event", "Identification", "complete") } },
                    function(a, b, c, d) {
                        var e = b.createElement(c),
                            f = b.getElementsByTagName(c)[0];
                        e.type = "text/javascript", e.async = !0, e.src = d, f.parentNode.insertBefore(e, f)
                    }(window, document, "script", "https://game.gamemonkey.org/static/main.min.js"), ga
            }, c.prototype.sendScreenView = function(a) { ga("fbrq.send", "screenview", { screenName: a }), ga("send", "screenview", { screenName: a }) }, c.prototype.sendGenericEvent = function(a, b, c) { ga("fbrq.send", "event", a, b, c), ga("send", "event", a, b, c) }, c
        }(Phaser.Plugin);
        b.GoogleAnalytics = c
    }(b = a.Plugins || (a.Plugins = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c) { var d = a.call(this, b, c) || this; return b.hasOwnProperty("events") ? console.warn("Events property already exists on game") : b.events = { onGameStart: new Phaser.Signal, onGameEnd: new Phaser.Signal, onLevelStart: new Phaser.Signal, onLevelEnd: new Phaser.Signal, onPause: new Phaser.Signal, onResume: new Phaser.Signal }, d }
            return __extends(b, a), b
        }(Phaser.Plugin);
        a.GameEvents = b
    }(b = a.Plugins || (a.Plugins = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d() { var a = c.call(this) || this; return a.name = d.Name, a.scaleFactor = 1, a }
            return __extends(d, c), d.prototype.init = function(b) {
                if (this.config = b, d.SPLASH_OVERRIDE = "number" == typeof b.splashOverride && b.splashOverride, this.game.scale.onSizeChange.add(this.resize, this), void 0 === !this.game.load.spine) throw new Error("You tried to play the Splash screen without spine support enabled!");
                a.Utils.isOnDevice(this.game) || a.Branding.isAirfi() ? a.Utils.ASSET_LOCATION = "assets/" : a.Utils.isTc() ? a.Utils.ASSET_LOCATION = "/repository/download/Fabrique_FunnyGamesSplash/.lastSuccessful/build/assets/" : "fbrq.io" === a.Utils.getSourceSite(!0) && (a.Utils.ASSET_LOCATION = "https://" + window.location.host + "/@orange-games/splash/assets/"), a.Utils.registerAudioUnlocker(this.game)
            }, d.prototype.preload = function() {
                this.scaleFactor = this.getScale(), a.Utils.isTc() || (this.game.load.crossOrigin = "anonymous");
                var b = Date.now() / 1e3 | 0;
                a.Utils.isOnDevice(this.game) || (this.game.load.json(a.Branding.INTERNAL_PORTALS_KEY, a.Utils.ASSET_LOCATION + "json/internal.json?v=" + b), this.game.load.json(a.Branding.CONTRACTED_PORTALS_KEY, a.Utils.ASSET_LOCATION + "json/contracted.json?v=" + b), this.game.load.json(a.Branding.SPECIAL_PORTALS_KEY, a.Utils.ASSET_LOCATION + "json/special.json?v=" + b), this.game.load.json(a.Branding.SITELOCK_PORTALS, a.Utils.ASSET_LOCATION + "json/sitelock.json?v=" + b), this.game.load.json(a.Branding.GAME_ICONS_KEY, a.Utils.ASSET_LOCATION + "json/games.json?v=" + b), this.game.load.json(a.Domain.KEY, a.Utils.ASSET_LOCATION + "json/domains.json"))
            }, d.prototype.getScale = function() { return this.game.device.desktop ? this.game.width < 1.5 * b.FunnyGames.IdealWidth ? this.game.width / 6 * 4 / b.FunnyGames.IdealWidth : 1 : this.game.width < this.game.height ? this.game.width / 6 * 4 / b.FunnyGames.IdealWidth : this.game.width / 6 * 3 / b.FunnyGames.IdealWidth }, d.prototype.loadUpdate = function() {}, d.prototype.update = function() { this.background && this.background.update() }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background && this.background.resize(this.scaleFactor) }, d.prototype.shutdown = function() { this.game.scale.onSizeChange.remove(this.resize, this), this.world.remove(this.background) }, d.prototype.create = function() {
                switch (a.Domain.setList(this.cache.getJSON(a.Domain.KEY, !0)), a.PortalScripts.loadPortalScript(this.cache.getJSON(a.Branding.SITELOCK_PORTALS)), a.Branding.setSiteLock(this.cache.getJSON(a.Branding.SITELOCK_PORTALS)), a.Branding.isSpecial(this.game) && (d.SPLASH_OVERRIDE = a.BrandingDomain.Neutral), a.Utils.getBrandingDomain()) {
                    case a.BrandingDomain.Spele:
                        this.background = new a.SplashScreenBackgrounds.Spele(this.game, this.scaleFactor), this.game.add.existing(this.background);
                        break;
                    case a.BrandingDomain.PlayCell:
                        this.background = new a.SplashScreenBackgrounds.PlayCell(this.game, this.scaleFactor), this.game.add.existing(this.background);
                        break;
                    case a.BrandingDomain.GameCell:
                        this.background = new a.SplashScreenBackgrounds.GameCell(this.game, this.scaleFactor), this.game.add.existing(this.background);
                        break;
                    case a.BrandingDomain.Yepi:
                        this.background = new a.SplashScreenBackgrounds.Yepi(this.game, this.scaleFactor), this.game.add.existing(this.background);
                        break;
                    case a.BrandingDomain.Neutral:
                    case a.BrandingDomain.Spil:
                        this.background = new a.SplashScreenBackgrounds.Spil(this.game, this.scaleFactor), this.game.add.existing(this.background);
                        break;
                    case a.BrandingDomain.Admeen:
                        this.background = new a.SplashScreenBackgrounds.Admeen(this.game, this.scaleFactor), this.game.add.existing(this.background);
                        break;
                    default:
                    case a.BrandingDomain.Kizi:
                        this.background = new a.SplashScreenBackgrounds.Kizi(this.game, this.scaleFactor),
                            this.game.add.existing(this.background);
                        break;
                    case a.BrandingDomain.Bild:
                        this.background = new a.SplashScreenBackgrounds.Bild(this.game, this.scaleFactor), this.game.add.existing(this.background);
                        break;
                    case a.BrandingDomain.Funnygames:
                        this.background = new a.SplashScreenBackgrounds.FunnyGames(this.game, this.scaleFactor), this.game.add.existing(this.background)
                }
                this.game.state.add(b.SplashPreloader.Name, b.SplashPreloader), this.game.state.start(b.SplashPreloader.Name, !0, !1, this.config, this.background)
            }, d
        }(Phaser.State);
        c.Name = "preloader", c.SPLASH_OVERRIDE = !1, b.Preloader = c
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d() { var a = c.call(this) || this; return a.name = d.Name, a.scaleFactor = 1, a }
            return __extends(d, c), d.prototype.init = function(a, b) { this.config = a, this.game.scale.onSizeChange.add(this.resize, this), this.background = b, this.game.add.existing(this.background) }, d.prototype.preload = function() {
                switch (this.scaleFactor = this.getScale(), a.Utils.isTc() || (this.game.load.crossOrigin = "anonymous"), a.Utils.getBrandingDomain()) {
                    case a.BrandingDomain.Spele:
                        this.game.load.atlas("spele_atlas", a.Utils.ASSET_LOCATION + "atlas/spele_atlas.png", a.Utils.ASSET_LOCATION + "atlas/spele_atlas.json"), this.game.load.spine("jelly_skeleton", a.Utils.ASSET_LOCATION + "spine/jelly_skeleton.json"), this.game.device.iOS ? this.game.load.audio("cheer", [a.Utils.ASSET_LOCATION + "sound/ss_intro.m4a"]) : this.game.load.audio("cheer", [a.Utils.ASSET_LOCATION + "sound/ss_intro.ogg", a.Utils.ASSET_LOCATION + "sound/ss_intro.mp3"]);
                        break;
                    case a.BrandingDomain.Neutral:
                    case a.BrandingDomain.Spil:
                        this.game.add.existing(this.background), this.game.load.spritesheet("fgs_play", a.Utils.ASSET_LOCATION + "images/fgs_btn_play.png", 130, 130), this.game.load.image("loader", a.Utils.ASSET_LOCATION + "images/loader_back.png"), this.game.load.image("logo", a.Utils.ASSET_LOCATION + "images/spil_logo.png");
                        break;
                    case a.BrandingDomain.PlayCell:
                        this.game.load.spine("splash_playcell", a.Utils.ASSET_LOCATION + "spine/splash_playcell.json"), this.game.load.atlas("playcell_atlas", a.Utils.ASSET_LOCATION + "atlas/playcell_atlas.png", a.Utils.ASSET_LOCATION + "atlas/playcell_atlas.json");
                        break;
                    case a.BrandingDomain.GameCell:
                        this.game.load.atlas("gamecell_atlas", a.Utils.ASSET_LOCATION + "atlas/gamecell_atlas.png", a.Utils.ASSET_LOCATION + "atlas/gamecell_atlas.json"), this.game.load.spine("splash_gamecell", a.Utils.ASSET_LOCATION + "spine/splash_gamecell.json");
                        break;
                    case a.BrandingDomain.Yepi:
                        this.game.load.spine("yp_splash", a.Utils.ASSET_LOCATION + "spine/yp_splash.json"), this.game.load.atlas("yp_atlas", a.Utils.ASSET_LOCATION + "atlas/yp_atlas.png", a.Utils.ASSET_LOCATION + "atlas/yp_atlas.json");
                        break;
                    case a.BrandingDomain.Admeen:
                        this.game.load.atlas("admeen_atlas", a.Utils.ASSET_LOCATION + "atlas/admeen_atlas.png", a.Utils.ASSET_LOCATION + "atlas/admeen_atlas.json");
                        break;
                    default:
                    case a.BrandingDomain.Kizi:
                        this.game.load.image("kizi_twist", a.Utils.ASSET_LOCATION + "images/kizi_twist.png"), this.game.load.image("kizi_button", a.Utils.ASSET_LOCATION + "images/kizi_button.png"), this.game.load.image("kizi_logo", a.Utils.ASSET_LOCATION + "images/kizi_logo.png"), this.game.load.spine("kizi_skeleton", a.Utils.ASSET_LOCATION + "spine/kizi_skeleton.json");
                        break;
                    case a.BrandingDomain.Bild:
                        this.game.load.image("bild_play", a.Utils.ASSET_LOCATION + "images/bild_btn_play.png"), this.game.load.image("bild_logo", a.Utils.ASSET_LOCATION + "images/branding_logo_bild.png"), this.game.add.existing(this.background);
                        break;
                    case a.BrandingDomain.Funnygames:
                        this.game.load.image("fgs_logo", a.Utils.ASSET_LOCATION + "images/fgs_logo.png"), this.game.load.spritesheet("fgs_play", a.Utils.ASSET_LOCATION + "images/fgs_btn_play.png", 130, 130), this.game.load.spine("fgs_monster_1", a.Utils.ASSET_LOCATION + "spine/fgs_monster_1.json"), this.game.load.spine("fgs_monster_2", a.Utils.ASSET_LOCATION + "spine/fgs_monster_2.json"), this.game.load.spine("fgs_monster_3", a.Utils.ASSET_LOCATION + "spine/fgs_monster_3.json"), this.game.device.iOS ? this.game.load.audio("fg", [a.Utils.ASSET_LOCATION + "sound/fgs_intro.m4a"]) : this.game.load.audio("fg", [a.Utils.ASSET_LOCATION + "sound/fgs_intro.ogg", a.Utils.ASSET_LOCATION + "sound/fgs_intro.mp3"])
                }
            }, d.prototype.getScale = function() { return this.game.device.desktop ? this.game.width < 1.5 * b.FunnyGames.IdealWidth ? this.game.width / 6 * 4 / b.FunnyGames.IdealWidth : 1 : this.game.width < this.game.height ? this.game.width / 6 * 4 / b.FunnyGames.IdealWidth : this.game.width / 6 * 3 / b.FunnyGames.IdealWidth }, d.prototype.loadUpdate = function() { this.background.update() }, d.prototype.update = function() { this.background.update() }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor) }, d.prototype.shutdown = function() { this.game.scale.onSizeChange.remove(this.resize, this), this.world.remove(this.background) }, d.prototype.create = function() {
                switch (a.Utils.getBrandingDomain()) {
                    case a.BrandingDomain.Spele:
                        this.game.state.add(b.Spele.Name, b.Spele), this.game.state.start(b.Spele.Name, !0, !1, this.config, this.background);
                        break;
                    case a.BrandingDomain.Neutral:
                        this.game.state.add(b.Neutral.Name, b.Neutral), this.game.state.start(b.Neutral.Name, !0, !1, this.config, this.background);
                        break;
                    case a.BrandingDomain.PlayCell:
                        this.game.state.add(b.PlayCell.Name, b.PlayCell), this.game.state.start(b.PlayCell.Name, !0, !1, this.config, this.background);
                        break;
                    case a.BrandingDomain.GameCell:
                        this.game.state.add(b.GameCell.Name, b.GameCell), this.game.state.start(b.GameCell.Name, !0, !1, this.config, this.background);
                        break;
                    case a.BrandingDomain.Spil:
                        this.game.state.add(b.Spil.Name, b.Spil), this.game.state.start(b.Spil.Name, !0, !1, this.config, this.background);
                        break;
                    case a.BrandingDomain.Admeen:
                        this.game.state.add(b.Admeen.Name, b.Admeen), this.game.state.start(b.Admeen.Name, !0, !1, this.config, this.background);
                        break;
                    case a.BrandingDomain.Yepi:
                        this.game.state.add(b.Yepi.Name, b.Yepi), this.game.state.start(b.Yepi.Name, !0, !1, this.config, this.background);
                        break;
                    default:
                    case a.BrandingDomain.Kizi:
                        this.game.state.add(b.Kizi.Name, b.Kizi), this.game.state.start(b.Kizi.Name, !0, !1, this.config, this.background);
                        break;
                    case a.BrandingDomain.Bild:
                        this.game.state.add(b.Bild.Name, b.Bild), this.game.state.start(b.Bild.Name, !0, !1, this.config, this.background);
                        break;
                    case a.BrandingDomain.Funnygames:
                        this.game.state.add(b.FunnyGames.Name, b.FunnyGames), this.game.state.start(b.FunnyGames.Name, !0, !1, this.config, this.background)
                }
            }, d
        }(Phaser.State);
        c.Name = "splashloader", b.SplashPreloader = c
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d() { var a = c.call(this) || this; return a.name = d.Name, a.scaleFactor = 1, a.created = !1, a.preloadReady = !1, a.clicked = !1, a.dotText = ".", a.ts = 0, a }
            return __extends(d, c), d.prototype.init = function(a, b) { this.config = a, this.background = b, this.game.scale.onSizeChange.add(this.resize, this) }, d.prototype.preload = function() { this.game.add.existing(this.background), this.createObjects(), this.scaleFactor = this.getScale(), this.resizeObjects(), this.startAnimation(), this.game.load.onLoadStart.add(this.onPreloadStart, this), this.game.load.onFileComplete.add(this.onPreloadedFile, this), this.game.load.onLoadComplete.add(this.onPreloadEnd, this), this.config.preloadHandler(), 0 === this.game.load.totalQueuedFiles() && this.onPreloadEnd() }, d.prototype.onPreloadStart = function() { this.preloadText.setText("Loading") }, d.prototype.onPreloadedFile = function() { this.dotText.length >= 3 ? this.dotText = "." : this.dotText += ".", this.preloadText.setText("Loading " + this.dotText) }, d.prototype.onPreloadEnd = function() { this.preloadReady = !0, this.game.input.onUp.add(this.handler, this), this.animateButton() }, d.prototype.createObjects = function() { this.bgImage = this.game.add.tileSprite(this.game.width / 2, this.game.height / 2, 853, 612, "admeen_atlas", "bg_pattern"), this.bgImage.pivot.set(426.5, 306), this.gradientBitmap = this.game.make.bitmapData(1, 1), this.bgGradientOverlay = this.game.add.sprite(0, 0, this.gradientBitmap), this.logo = this.game.add.image(0, 0, "admeen_atlas", "mascotte"), this.logo.anchor.set(.5, .7), this.playButton = this.game.add.button(this.game.width / 2, .75 * this.game.height, "admeen_atlas", this.handler, this, "btn", "btn", "btn", "btn"), this.playButton.anchor.set(.5), this.playButton.visible = !1, this.created = !0, this.preloadText = this.game.add.text(this.game.width / 2, this.game.height / 2 * .75, "", { font: "Arial", fontSize: 40, fill: "#ffffff", fontWeight: "bold" }), this.preloadText.anchor.set(.5) }, d.prototype.resizeObjects = function() {
                if (this.created) {
                    var b = this.game.width < 1 ? 1 : this.game.width,
                        c = this.game.height < 1 ? 1 : this.game.height;
                    this.logo.scale.set(this.scaleFactor), this.logo.y = .4 * this.game.height, this.logo.x = this.game.width / 2, this.bgImage.width = 853 * this.scaleFactor, this.bgImage.height = 612 * this.scaleFactor, this.bgImage.y = this.game.height / 2, this.bgImage.x = this.game.width / 2, this.bgImage.pivot.set(853 * this.scaleFactor / 2, 612 * this.scaleFactor / 2), this.gradientBitmap.resize(b, c);
                    var d = this.gradientBitmap.context.createRadialGradient(b / 2, c / 2, 0, b / 2, c / 2, .5 * c);
                    d.addColorStop(0, "rgba(66, 103, 178, 0)"), d.addColorStop(1, "rgba(66, 103, 178, 1)"), this.gradientBitmap.context.fillStyle = d, this.gradientBitmap.context.clearRect(0, 0, b, c), this.gradientBitmap.context.fillRect(0, 0, b, c), this.preloadText.x = this.game.width / 2, this.preloadText.y = .75 * this.game.height, this.preloadText.scale.set(this.scaleFactor), a.Utils.isOnDevice(this.game) || (this.playButton.scale.set(.6 * this.scaleFactor), this.playButton.x = this.game.width / 2, this.playButton.y = .75 * this.game.height)
                }
            }, d.prototype.handler = function(a, b) {
                if (!this.clicked && "mouseout" !== b.type) {
                    this.clicked = !0, this.game.tweens.remove(this.buttonTween), this.game.camera.fade(0, 250);
                    var c = this.game.add.tween(this.playButton.scale);
                    c.to({ x: 0, y: 0 }, 250, Phaser.Easing.Back.In).start(), void 0 !== this.config.mobilePlayClickhandler ? this.config.mobilePlayClickhandler() : this.game.state.start(this.config.nextState), this.game.input.onUp.remove(this.handler, this)
                }
            }, d.prototype.getScale = function() { return 1 }, d.prototype.startAnimation = function() {}, d.prototype.animateButton = function() { a.Utils.isOnDevice(this.game) || (this.preloadText.visible = !1, this.game.tweens.remove(this.buttonTween), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !0, this.buttonTween = this.game.add.tween(this.playButton.scale), this.buttonTween.to({ x: 1.14 * this.scaleFactor, y: 1.14 * this.scaleFactor }, 420, Phaser.Easing.Quadratic.InOut, !0, 500), this.buttonTween.yoyo(!0).onComplete.add(this.animateButton, this), this.buttonTween.start()) }, d.prototype.update = function() { this.background.update() }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor), this.resizeObjects(), this.created && this.preloadReady && this.animateButton() }, d.prototype.shutdown = function() { this.game.scale.onSizeChange.remove(this.resize, this), this.game.load.onLoadStart.remove(this.onPreloadStart, this), this.game.load.onFileComplete.remove(this.onPreloadedFile, this), this.game.load.onLoadComplete.remove(this.onPreloadEnd, this), this.logo.destroy(!0), this.playButton.destroy(!0), this.bgImage.destroy(!0), this.background.destroy(!0), this.logo = null, this.bgImage = null, this.playButton = null, this.background = null, this.game.state.remove(b.Preloader.Name), this.game.state.remove(b.SplashPreloader.Name), this.game.state.remove(this.name) }, d
        }(Phaser.State);
        c.Name = "admeenSplashScreen", c.IdealWidth = 400, c.MaxDots = 3, b.Admeen = c
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d() { var a = c.call(this) || this; return a.name = d.Name, a.scaleFactor = 1, a.created = !1, a.preloadReady = !1, a.clicked = !1, a.preloadTexts = [], a.tId = 0, a }
            return __extends(d, c), d.prototype.init = function(a, b) { this.config = a, this.background = b, this.game.scale.onSizeChange.add(this.resize, this) }, d.prototype.preload = function() { this.game.add.existing(this.background), this.createObjects(), this.scaleFactor = this.getScale(), this.resizeObjects(), this.startAnimation(), this.game.load.onLoadStart.add(this.onPreloadStart, this), this.game.load.onFileComplete.add(this.onPreloadedFile, this), this.game.load.onLoadComplete.add(this.onPreloadEnd, this), this.config.preloadHandler(), 0 === this.game.load.totalQueuedFiles() && this.onPreloadEnd() }, d.prototype.onPreloadStart = function() {}, d.prototype.onPreloadedFile = function() {}, d.prototype.onPreloadEnd = function() { this.preloadReady = !0, this.loadBack.visible = !1, this.loadBar.visible = !1, this.game.input.onUp.add(this.handler, this), this.animateButton() }, d.prototype.createObjects = function() {
                this.logo = this.game.add.sprite(this.game.width / 2, this.game.height / 2 - 100, "bild_logo"), this.logo.anchor.set(.5), this.logo.scale.set(.8), d.IdealWidth = this.logo.getBounds().width;
                var a = this.game.make.graphics(0, 0);
                a.beginFill(16777215, .5).drawRect(0, 0, 350, 20).endFill(), this.loadBack = this.game.add.sprite(this.game.width / 2, this.game.height / 2 + 100, a.generateTexture()), this.loadBack.anchor.set(.5);
                var b = this.game.make.graphics(0, 0);
                b.beginFill(16777215, 1).drawRect(0, 0, 350, 20).endFill(), this.loadBar = this.game.add.sprite(this.game.width / 2 - 175, this.game.height / 2 + 100, b.generateTexture()), this.loadBar.anchor.set(0, .5), this.load.setPreloadSprite(this.loadBar), this.playButton = this.game.add.button(this.game.width / 2, this.game.height / 2 + 200, "bild_play", this.handler, this), this.playButton.anchor.set(.5), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !1, this.created = !0
            }, d.prototype.resizeObjects = function() { this.created && (this.logo.scale.set(.8 * this.scaleFactor), this.logo.y = this.game.height / 2 - 100 * this.scaleFactor, this.logo.x = this.game.width / 2, a.Utils.isOnDevice(this.game) || (this.playButton.x = this.game.width / 2, this.playButton.y = this.game.height / 2 + 200 * this.scaleFactor)) }, d.prototype.handler = function(a, b) {
                if (!this.clicked && "mouseout" !== b.type) {
                    this.clicked = !0, this.game.tweens.remove(this.buttonTween), this.game.camera.fade(0, 250);
                    var c = this.game.add.tween(this.playButton.scale);
                    c.to({ x: 0, y: 0 }, 250, Phaser.Easing.Back.In).start(), void 0 !== this.config.mobilePlayClickhandler ? this.config.mobilePlayClickhandler() : this.game.state.start(this.config.nextState), this.game.input.onUp.remove(this.handler, this)
                }
            }, d.prototype.getScale = function() { return a.Utils.isOnDevice(this.game) ? this.game.width < 1.5 * d.IdealWidth ? this.game.width / 6 * 4 / d.IdealWidth : 1 : this.game.width < this.game.height ? this.game.width / 6 * 4 / d.IdealWidth : this.game.width / 6 * 3 / d.IdealWidth }, d.prototype.startAnimation = function() {}, d.prototype.animateButton = function() { a.Utils.isOnDevice(this.game) || (this.game.tweens.remove(this.buttonTween), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !0, this.buttonTween = this.game.add.tween(this.playButton.scale), this.buttonTween.to({ x: 1.14 * this.scaleFactor, y: 1.14 * this.scaleFactor }, 420, Phaser.Easing.Quadratic.InOut, !0, 500), this.buttonTween.yoyo(!0).onComplete.add(this.animateButton, this), this.buttonTween.start()) }, d.prototype.update = function() { this.background.update() }, d.prototype.loadUpdate = function() { this.background.update() }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor), this.resizeObjects(), this.created && this.preloadReady && this.animateButton() }, d.prototype.shutdown = function() { c.prototype.shutdown.call(this), this.logo.destroy(!0), this.loadBack.destroy(!0), this.loadBar.destroy(!0), this.playButton.destroy(!0), this.background.destroy(!0), this.logo = null, this.loadBack = null, this.loadBar = null, this.playButton = null, this.background = null, this.config = null, this.game.scale.onSizeChange.remove(this.resize, this), this.game.load.onLoadStart.remove(this.onPreloadStart, this), this.game.load.onFileComplete.remove(this.onPreloadedFile, this), this.game.load.onLoadComplete.remove(this.onPreloadEnd, this), this.game.state.remove(b.Preloader.Name), this.game.state.remove(b.SplashPreloader.Name), this.game.state.remove(this.name) }, d
        }(Phaser.State);
        c.Name = "bildSplashScreen", c.IdealWidth = 463, c.MaxDots = 3, b.Bild = c
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d() { var a = c.call(this) || this; return a.name = d.Name, a.scaleFactor = 1, a.created = !1, a.preloadReady = !1, a.clicked = !1, a.preloadTexts = ["Loading images", "Loading music", "Loading sound effects", "Calculating Pi"], a.dots = 1, a.dotText = ".", a.tId = 0, a }
            return __extends(d, c), d.prototype.init = function(a, b) { this.config = a, this.background = b, this.config.preloadTexts && (this.preloadTexts = this.config.preloadTexts), this.game.scale.onSizeChange.add(this.resize, this) }, d.prototype.preload = function() { this.game.add.existing(this.background), this.createObjects(), this.scaleFactor = this.getScale(), this.resizeObjects(), this.startAnimation(), this.game.load.onLoadStart.add(this.onPreloadStart, this), this.game.load.onFileComplete.add(this.onPreloadedFile, this), this.game.load.onLoadComplete.add(this.onPreloadEnd, this), this.config.preloadHandler(), 0 === this.game.load.totalQueuedFiles() && this.onPreloadEnd() }, d.prototype.onPreloadStart = function() { this.t = Date.now(), this.preloadText.setText(this.preloadTexts[this.tId]) }, d.prototype.onPreloadedFile = function() { Date.now() - this.t > 1e3 && (this.t = Date.now(), this.tId++, this.tId >= this.preloadTexts.length && (this.tId = 0)), this.dotText.length >= 3 ? this.dotText = "." : this.dotText += ".", this.preloadText.setText(this.preloadTexts[this.tId] + this.dotText) }, d.prototype.onPreloadEnd = function() { this.preloadReady = !0, this.preloadText.visible = !1, this.game.input.onUp.add(this.handler, this), this.animateButton() }, d.prototype.createObjects = function() { this.monster1 = this.game.add.spine(0, 0, "fgs_monster_1"), this.monster1.setAnimationByName(0, "idle", !0), this.monster2 = this.game.add.spine(0, 0, "fgs_monster_2"), this.monster2.setAnimationByName(0, "idle", !0), this.monster3 = this.game.add.spine(0, 0, "fgs_monster_3"), this.monster3.setAnimationByName(0, "idle", !0), this.preloadText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 230, "", { font: "Arial", fontSize: 40, fill: "#ffffff", fontWeight: "bold" }), this.preloadText.anchor.set(.5), this.logo = this.game.add.image(0, 0, "fgs_logo"), this.logo.anchor.set(.5), d.IdealWidth = 1.5 * this.logo.getBounds().width, this.playButton = this.game.add.button(this.game.width / 2, this.game.height / 2 + 230 * this.scaleFactor, "fgs_play", this.handler, this, 0, 0, 1, 0), this.playButton.anchor.set(.5), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !1, this.created = !0 }, d.prototype.handler = function(a, b) {
                if (!this.clicked && "mouseout" !== b.type) {
                    this.clicked = !0, this.game.tweens.remove(this.buttonTween), this.game.camera.fade(0, 250);
                    var c = this.game.add.tween(this.playButton.scale);
                    c.to({ x: 0, y: 0 }, 250, Phaser.Easing.Back.In).start(), void 0 !== this.config.mobilePlayClickhandler ? this.config.mobilePlayClickhandler() : this.game.state.start(this.config.nextState), this.game.input.onUp.remove(this.handler, this)
                }
            }, d.prototype.resizeObjects = function() { this.created && (this.logo.scale.set(1.5 * this.scaleFactor), this.logo.y = this.game.height / 2 + 70 * this.scaleFactor, this.logo.x = this.game.width / 2, this.monster1.x = this.game.width / 2 + 40 * this.scaleFactor, this.monster1.y = this.game.height / 2 - 10 * this.scaleFactor, this.monster1.scale.set(.4 * this.scaleFactor), this.monster2.x = this.game.width / 2 + 190 * this.scaleFactor, this.monster2.y = this.game.height / 2 - 10 * this.scaleFactor, this.monster2.scale.set(.4 * this.scaleFactor), this.monster3.x = this.game.width / 2 - 140 * this.scaleFactor, this.monster3.y = this.game.height / 2 - 10 * this.scaleFactor, this.monster3.scale.set(.4 * this.scaleFactor), this.preloadText.x = this.game.width / 2, this.preloadText.y = this.game.height / 2 + 230 * this.scaleFactor, this.preloadText.scale.set(this.scaleFactor), this.playButton.x = this.game.width / 2, this.playButton.y = this.game.height / 2 + 230 * this.scaleFactor) }, d.prototype.getScale = function() { return a.Utils.isOnDevice(this.game) ? this.game.width < 1.5 * d.IdealWidth ? this.game.width / 6 * 4 / d.IdealWidth : 1 : this.game.width < this.game.height ? this.game.width / 6 * 4 / d.IdealWidth : this.game.width / 6 * 3 / d.IdealWidth }, d.prototype.startAnimation = function() {
                this.game.sound.touchLocked || this.game.sound.play("fg");
                var a = this.game.add.tween(this.logo.scale);
                a.to({ x: 1.2 * this.scaleFactor, y: 1.2 * this.scaleFactor }, 100), a.to({ x: 1.5 * this.scaleFactor, y: 1.5 * this.scaleFactor }, 450, Phaser.Easing.Back.InOut), a.start()
            }, d.prototype.animateButton = function() { return this.config.showPlayButton === !1 ? this.handler(this.game.input.pointer1, new MouseEvent("mousedown")) : (this.game.tweens.remove(this.buttonTween), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !0, this.buttonTween = this.game.add.tween(this.playButton.scale), this.buttonTween.to({ x: 1.14 * this.scaleFactor, y: 1.14 * this.scaleFactor }, 420, Phaser.Easing.Quadratic.InOut, !0, 500), this.buttonTween.yoyo(!0).onComplete.add(this.animateButton, this), void this.buttonTween.start()) }, d.prototype.update = function() { this.background.update() }, d.prototype.loadUpdate = function() { this.background.update() }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor), this.resizeObjects(), this.created && this.preloadReady && this.animateButton() }, d.prototype.shutdown = function() { c.prototype.shutdown.call(this), this.logo.destroy(!0), this.monster1.destroy(!0), this.monster2.destroy(!0), this.monster3.destroy(!0), this.playButton.destroy(!0), this.background.destroy(!0), this.preloadText.destroy(!0), this.logo = null, this.monster1 = null, this.monster2 = null, this.monster3 = null, this.playButton = null, this.background = null, this.preloadText = null, this.config = null, this.game.scale.onSizeChange.remove(this.resize, this), this.game.load.onLoadStart.remove(this.onPreloadStart, this), this.game.load.onFileComplete.remove(this.onPreloadedFile, this), this.game.load.onLoadComplete.remove(this.onPreloadEnd, this), this.game.state.remove(b.Preloader.Name), this.game.state.remove(b.SplashPreloader.Name), this.game.state.remove(this.name) }, d
        }(Phaser.State);
        c.Name = "funnySplashScreen", c.IdealWidth = 463, c.MaxDots = 3, b.FunnyGames = c
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d() { var a = c.call(this) || this; return a.name = d.Name, a.scaleFactor = 1, a.created = !1, a.preloadReady = !1, a.clicked = !1, a.preloadTexts = ["Loading images", "Loading music", "Loading sound effects", "Calculating Pi"], a.dots = 1, a.dotText = ".", a.tId = 0, a }
            return __extends(d, c), d.prototype.init = function(a, b) { this.config = a, this.background = b, this.config.preloadTexts && (this.preloadTexts = this.config.preloadTexts), this.game.scale.onSizeChange.add(this.resize, this) }, d.prototype.preload = function() { this.game.add.existing(this.background), this.createObjects(), this.scaleFactor = this.getScale(), this.resizeObjects(), this.startAnimation(), this.game.load.onLoadStart.add(this.onPreloadStart, this), this.game.load.onFileComplete.add(this.onPreloadedFile, this), this.game.load.onLoadComplete.add(this.onPreloadEnd, this), this.config.preloadHandler(), 0 === this.game.load.totalQueuedFiles() && this.onPreloadEnd() }, d.prototype.onPreloadStart = function() { this.t = Date.now(), this.preloadText.setText(this.preloadTexts[this.tId]) }, d.prototype.onPreloadedFile = function() { Date.now() - this.t > 1e3 && (this.t = Date.now(), this.tId++, this.tId >= this.preloadTexts.length && (this.tId = 0)), this.dotText.length >= 3 ? this.dotText = "." : this.dotText += ".", this.preloadText.setText(this.preloadTexts[this.tId] + this.dotText) }, d.prototype.onPreloadEnd = function() { this.preloadReady = !0, this.preloadText.visible = !1, this.game.input.onUp.add(this.handler, this), this.animateButton() }, d.prototype.createObjects = function() { this.twirl = this.game.add.image(this.game.width / 2, this.game.height / 2, "gamecell_atlas", "gamecell_bg_pattern"), this.twirl.scale.setTo(2, 2), this.twirl.anchor.set(.5), this.createOverlay(), this.logoSpine = this.game.add.spine(0, 0, "splash_gamecell"), this.logoSpine.setAnimationByName(0, "idle", !0), this.preloadText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 230, "", { font: "Arial", fontSize: 40, fill: "#ffffff", fontWeight: "bold" }), this.preloadText.anchor.set(.5), this.logo = this.game.add.image(0, 0, "gamecell_atlas", "gamecell_logo"), this.logo.anchor.set(.5), d.IdealWidth = 1.5 * this.logo.getBounds().width, this.playButton = this.game.add.button(this.game.width / 2, .85 * this.game.height, "gamecell_atlas", this.handler, this, "gamecell_btn_play", "gamecell_btn_play", "gamecell_btn_play", "gamecell_btn_play"), this.playButton.anchor.set(.5), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !1, this.created = !0 }, d.prototype.createOverlay = function() { this.gradientBitmap = this.game.make.bitmapData(1, 1), this.gradient = this.game.make.sprite(0, 0, this.gradientBitmap), this.game.add.existing(this.gradient) }, d.prototype.handler = function(a, b) {
                if (!this.clicked && "mouseout" !== b.type) {
                    this.clicked = !0, this.game.tweens.remove(this.buttonTween), this.game.camera.fade(0, 250);
                    var c = this.game.add.tween(this.playButton.scale);
                    c.to({ x: 0, y: 0 }, 250, Phaser.Easing.Back.In).start(), void 0 !== this.config.mobilePlayClickhandler ? this.config.mobilePlayClickhandler() : this.game.state.start(this.config.nextState), this.game.input.onUp.remove(this.handler, this)
                }
            }, d.prototype.resizeObjects = function() {
                if (this.created) {
                    this.gradientBitmap.resize(this.game.width, this.game.height), this.gradientBitmap.context.clearRect(0, 0, this.game.width, this.game.height);
                    var a = this.gradientBitmap.context.createRadialGradient(this.game.width / 2, this.game.height / 2, 0, this.game.width / 2, this.game.height / 2, this.game.height / 2);
                    a.addColorStop(0, "rgb(8, 8, 54)"), a.addColorStop(1, "rgba(8, 8, 54, 0)"), this.gradientBitmap.context.fillStyle = a, this.gradientBitmap.context.fillRect(0, 0, this.game.width, this.game.height), this.logo.scale.set(.5 * this.scaleFactor), this.logo.y = .2 * this.game.height, this.logo.x = this.game.width / 2, this.logoSpine.scale.set(this.scaleFactor), this.logoSpine.autoUpdateTransform(), this.logoSpine.x = this.game.width / 2, this.logoSpine.y = this.game.height / 2, this.preloadText.x = this.game.width / 2, this.preloadText.y = .85 * this.game.height, this.preloadText.scale.set(this.scaleFactor), this.playButton.x = this.game.width / 2, this.playButton.y = .85 * this.game.height, this.twirl.position.set(this.game.width / 2, this.game.height / 2)
                }
            }, d.prototype.getScale = function() { return a.Utils.isOnDevice(this.game) ? this.game.width < 1.5 * d.IdealWidth ? this.game.width / 6 * 4 / d.IdealWidth : 1 : this.game.width < this.game.height ? this.game.width / d.IdealWidth : this.game.width / 6 * 3 / d.IdealWidth }, d.prototype.startAnimation = function() {
                var a = this.game.add.tween(this.logo.scale);
                a.to({ x: .6 * this.scaleFactor, y: .6 * this.scaleFactor }, 100), a.to({ x: .75 * this.scaleFactor, y: .75 * this.scaleFactor }, 450, Phaser.Easing.Back.InOut), a.start()
            }, d.prototype.animateButton = function() { return this.config.showPlayButton === !1 ? this.handler(this.game.input.pointer1, new MouseEvent("mousedown")) : (this.game.tweens.remove(this.buttonTween), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !0, this.buttonTween = this.game.add.tween(this.playButton.scale), this.buttonTween.to({ x: 1.14 * this.scaleFactor, y: 1.14 * this.scaleFactor }, 420, Phaser.Easing.Quadratic.InOut, !0, 500), this.buttonTween.yoyo(!0).onComplete.add(this.animateButton, this), void this.buttonTween.start()) }, d.prototype.update = function() { this.background.update(), this.twirl.scale.x += .01, this.twirl.scale.y += .01, this.twirl.scale.x > 2.8 && (this.twirl.scale.x = 2, this.twirl.scale.y = 2) }, d.prototype.loadUpdate = function() { this.background.update() }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor), this.resizeObjects(), this.created && this.preloadReady && this.animateButton() }, d.prototype.shutdown = function() { c.prototype.shutdown.call(this), this.gradientBitmap.destroy(), this.gradient.destroy(!0), this.gradientBitmap = null, this.gradient = null, this.logo.destroy(!0), this.logoSpine.destroy(!0), this.playButton.destroy(!0), this.background.destroy(!0), this.preloadText.destroy(!0), this.logo = null, this.logoSpine = null, this.playButton = null, this.background = null, this.preloadText = null, this.config = null, this.game.scale.onSizeChange.remove(this.resize, this), this.game.load.onLoadStart.remove(this.onPreloadStart, this), this.game.load.onFileComplete.remove(this.onPreloadedFile, this), this.game.load.onLoadComplete.remove(this.onPreloadEnd, this), this.game.state.remove(b.Preloader.Name), this.game.state.remove(b.SplashPreloader.Name), this.game.state.remove(this.name) }, d
        }(Phaser.State);
        c.Name = "GameCell", c.IdealWidth = 860, c.MaxDots = 3, b.GameCell = c
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d() { var a = c.call(this) || this; return a.name = d.Name, a.scaleFactor = 1, a.created = !1, a.preloadReady = !1, a.clicked = !1, a.preloadTexts = ["Loading images", "Loading music", "Loading sound effects", "Calculating Pi"], a.dotText = ".", a.tId = 0, a }
            return __extends(d, c), d.prototype.init = function(a, b) { this.config = a, this.background = b, this.config.preloadTexts && (this.preloadTexts = this.config.preloadTexts), this.game.scale.onSizeChange.add(this.resize, this) }, d.prototype.preload = function() { this.game.add.existing(this.background), this.createObjects(), this.scaleFactor = this.getScale(), this.resizeObjects(), this.startAnimation(), this.game.load.onLoadStart.add(this.onPreloadStart, this), this.game.load.onFileComplete.add(this.onPreloadedFile, this), this.game.load.onLoadComplete.add(this.onPreloadEnd, this), this.config.preloadHandler(), 0 === this.game.load.totalQueuedFiles() && this.onPreloadEnd() }, d.prototype.onPreloadStart = function() { this.t = Date.now(), this.preloadText.setText(this.preloadTexts[this.tId]) }, d.prototype.onPreloadedFile = function() { Date.now() - this.t > 1e3 && (this.t = Date.now(), this.tId++, this.tId >= this.preloadTexts.length && (this.tId = 0)), this.dotText.length >= 3 ? this.dotText = "." : this.dotText += ".", this.preloadText.setText(this.preloadTexts[this.tId] + this.dotText) }, d.prototype.onPreloadEnd = function() { this.preloadReady = !0, this.preloadText.visible = !1, this.game.input.onUp.add(this.handler, this), this.animateButton() }, d.prototype.createObjects = function() { this.twirl = this.game.add.image(this.game.width / 2, this.game.height / 2, "kizi_twist"), this.twirl.anchor.set(.5), this.twirl.width = this.twirl.height = this.game.width > this.game.height ? this.game.width : this.game.height, this.monster = this.game.add.spine(0, 0, "kizi_skeleton"), this.monster.setAnimationByName(0, "idle", !0), this.preloadText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 230, "", { font: "Arial", fontSize: 40, fill: "#ffffff", fontWeight: "bold" }), this.preloadText.anchor.set(.5), this.logo = this.game.add.image(0, 0, "kizi_logo"), this.logo.anchor.set(.5), d.IdealWidth = 1.5 * this.logo.getBounds().width, this.playButton = this.game.add.button(this.game.width / 2, .85 * this.game.height, "kizi_button", this.handler, this, 0, 0, 1, 0), this.playButton.anchor.set(.5), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !1, this.created = !0 }, d.prototype.handler = function(a, b) {
                if (!this.clicked && "mouseout" !== b.type) {
                    this.clicked = !0, this.game.tweens.remove(this.buttonTween), this.game.camera.fade(0, 250);
                    var c = this.game.add.tween(this.playButton.scale);
                    c.to({ x: 0, y: 0 }, 250, Phaser.Easing.Back.In).start(), void 0 !== this.config.mobilePlayClickhandler ? this.config.mobilePlayClickhandler() : this.game.state.start(this.config.nextState), this.game.input.onUp.remove(this.handler, this)
                }
            }, d.prototype.resizeObjects = function() { this.created && (this.logo.scale.set(.5 * this.scaleFactor), this.logo.y = .2 * this.game.height, this.logo.x = this.game.width / 2, this.monster.scale.set(this.scaleFactor), this.monster.autoUpdateTransform(), this.monster.x = this.game.width / 2, this.monster.y = this.game.height / 2 + .6 * this.monster.height, this.preloadText.x = this.game.width / 2, this.preloadText.y = .85 * this.game.height, this.preloadText.scale.set(this.scaleFactor), this.playButton.x = this.game.width / 2, this.playButton.y = .85 * this.game.height, this.twirl.position.set(this.game.width / 2, this.game.height / 2)) }, d.prototype.getScale = function() { return a.Utils.isOnDevice(this.game) ? this.game.width < 1.5 * d.IdealWidth ? this.game.width / 6 * 4 / d.IdealWidth : 1 : this.game.width < this.game.height ? this.game.width / d.IdealWidth : this.game.width / 6 * 3 / d.IdealWidth }, d.prototype.startAnimation = function() {
                var a = this.game.add.tween(this.logo.scale);
                a.to({ x: .6 * this.scaleFactor, y: .6 * this.scaleFactor }, 100), a.to({
                    x: .75 * this.scaleFactor,
                    y: .75 * this.scaleFactor
                }, 450, Phaser.Easing.Back.InOut), a.start()
            }, d.prototype.animateButton = function() { return this.config.showPlayButton === !1 ? this.handler(this.game.input.pointer1, new MouseEvent("mousedown")) : (this.game.tweens.remove(this.buttonTween), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !0, this.buttonTween = this.game.add.tween(this.playButton.scale), this.buttonTween.to({ x: 1.14 * this.scaleFactor, y: 1.14 * this.scaleFactor }, 420, Phaser.Easing.Quadratic.InOut, !0, 500), this.buttonTween.yoyo(!0).onComplete.add(this.animateButton, this), void this.buttonTween.start()) }, d.prototype.update = function() { this.background.update(), this.twirl.angle += 5 }, d.prototype.loadUpdate = function() { this.background.update() }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor), this.resizeObjects(), this.created && this.preloadReady && this.animateButton() }, d.prototype.shutdown = function() { c.prototype.shutdown.call(this), this.logo.destroy(!0), this.monster.destroy(!0), this.playButton.destroy(!0), this.background.destroy(!0), this.preloadText.destroy(!0), this.logo = null, this.monster = null, this.playButton = null, this.background = null, this.preloadText = null, this.config = null, this.game.scale.onSizeChange.remove(this.resize, this), this.game.load.onLoadStart.remove(this.onPreloadStart, this), this.game.load.onFileComplete.remove(this.onPreloadedFile, this), this.game.load.onLoadComplete.remove(this.onPreloadEnd, this), this.game.state.remove(b.Preloader.Name), this.game.state.remove(b.SplashPreloader.Name), this.game.state.remove(this.name) }, d
        }(Phaser.State);
        c.Name = "kiziSplashScreen", c.IdealWidth = 860, c.MaxDots = 3, b.Kizi = c
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d() { var a = c.call(this) || this; return a.name = d.Name, a.scaleFactor = 1, a.created = !1, a.preloadReady = !1, a.clicked = !1, a.dots = 1, a.dotText = ".", a.tId = 0, a }
            return __extends(d, c), d.prototype.init = function(a, b) { this.config = a, this.background = b, this.game.scale.onSizeChange.add(this.resize, this) }, d.prototype.preload = function() { this.game.add.existing(this.background), this.createObjects(), this.scaleFactor = this.getScale(), this.resizeObjects(), this.startAnimation(), this.game.load.onLoadStart.add(this.onPreloadStart, this), this.game.load.onFileComplete.add(this.onPreloadedFile, this), this.game.load.onLoadComplete.add(this.onPreloadEnd, this), this.config.preloadHandler(), 0 === this.game.load.totalQueuedFiles() && this.onPreloadEnd() }, d.prototype.onPreloadStart = function() {}, d.prototype.onPreloadedFile = function() {}, d.prototype.onPreloadEnd = function() { this.preloadReady = !0, this.loadBack.visible = !1, this.loadBar.visible = !1, this.game.input.onUp.add(this.handler, this), this.animateButton() }, d.prototype.createObjects = function() {
                this.loadBack = this.game.add.sprite(this.game.width / 2, this.game.height / 2, "loader"), this.loadBack.anchor.set(.5);
                var a = this.game.make.graphics(0, 0);
                a.beginFill(16777215, 1).drawRoundedRect(0, 0, 350, 20, 5).endFill(), this.loadBar = this.game.add.sprite(this.game.width / 2 - 175, this.game.height / 2 - 5, a.generateTexture()), this.loadBar.anchor.set(0, .5), this.load.setPreloadSprite(this.loadBar), this.playButton = this.game.add.button(this.game.width / 2, this.game.height / 2, "fgs_play", this.handler, this, 0, 0, 1, 0), this.playButton.anchor.set(.5), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !1, this.created = !0
            }, d.prototype.resizeObjects = function() { this.created && (a.Utils.isOnDevice(this.game) || (this.playButton.x = this.game.width / 2, this.playButton.y = this.game.height / 2)) }, d.prototype.handler = function(a, b) {
                if (!this.clicked && "mouseout" !== b.type) {
                    this.clicked = !0, this.game.tweens.remove(this.buttonTween), this.game.camera.fade(0, 250);
                    var c = this.game.add.tween(this.playButton.scale);
                    c.to({ x: 0, y: 0 }, 250, Phaser.Easing.Back.In).start(), void 0 !== this.config.mobilePlayClickhandler ? this.config.mobilePlayClickhandler() : this.game.state.start(this.config.nextState), this.game.input.onUp.remove(this.handler, this)
                }
            }, d.prototype.getScale = function() { return a.Utils.isOnDevice(this.game) ? this.game.width < 1.5 * b.FunnyGames.IdealWidth ? this.game.width / 6 * 4 / b.FunnyGames.IdealWidth : 1 : this.game.width < this.game.height ? this.game.width / 6 * 4 / b.FunnyGames.IdealWidth : this.game.width / 6 * 3 / b.FunnyGames.IdealWidth }, d.prototype.startAnimation = function() {}, d.prototype.animateButton = function() { return this.config.showPlayButton === !1 ? this.handler(this.game.input.pointer1, new MouseEvent("mousedown")) : (this.game.tweens.remove(this.buttonTween), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !0, this.buttonTween = this.game.add.tween(this.playButton.scale), this.buttonTween.to({ x: 1.14 * this.scaleFactor, y: 1.14 * this.scaleFactor }, 420, Phaser.Easing.Quadratic.InOut, !0, 500), this.buttonTween.yoyo(!0).onComplete.add(this.animateButton, this), void this.buttonTween.start()) }, d.prototype.update = function() { this.background.update() }, d.prototype.loadUpdate = function() { this.background.update() }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor), this.resizeObjects(), this.created && this.preloadReady && this.animateButton() }, d.prototype.shutdown = function() { this.game.scale.onSizeChange.remove(this.resize, this), this.game.load.onLoadStart.remove(this.onPreloadStart, this), this.game.load.onFileComplete.remove(this.onPreloadedFile, this), this.game.load.onLoadComplete.remove(this.onPreloadEnd, this), this.loadBack.destroy(!0), this.loadBar.destroy(!0), this.playButton.destroy(!0), this.background.destroy(!0), this.loadBack = null, this.loadBar = null, this.playButton = null, this.background = null, this.game.state.remove(b.Preloader.Name), this.game.state.remove(b.SplashPreloader.Name), this.game.state.remove(this.name) }, d
        }(Phaser.State);
        c.Name = "neutralSplashScreen", c.IdealWidth = 463, c.MaxDots = 3, b.Neutral = c
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b) { var c = a.call(this, b) || this; return c.graphic1 = c.create(0, 0, "kizi_atlas_new", "shine2 instance 10000"), c.graphic1.anchor.setTo(.5), c.graphic1.angle = 90, c.graphic2 = c.create(0, 0, "kizi_atlas_new", "shine2 instance 10000"), c.graphic2.anchor.setTo(.5), c.graphic3 = c.create(0, 0, "kizi_atlas_new", "shine1 instance 10000"), c.graphic3.anchor.setTo(.5), c }
            return __extends(b, a), b.prototype.start = function(a, b, c, d) { void 0 === d && (d = !1), d === !0 && this.parent.setChildIndex(this, this.parent.children.length - 1), this.x = a, this.y = b, this.scale.setTo(c), this.visible = !0, this.graphic1.alpha = 0, this.graphic1.scale.setTo(1, .4), this.graphic2.alpha = 0, this.graphic2.scale.setTo(1, .4), this.graphic3.alpha = 1, this.graphic3.scale.setTo(0), this.game.add.tween(this.graphic3.scale).to({ x: 1, y: 1 }, 400, Phaser.Easing.Linear.None, !0).onComplete.addOnce(function() { this.game.add.tween(this.graphic3.scale).to({ x: .2, y: .2 }, 200, Phaser.Easing.Linear.None, !0), this.game.add.tween(this.graphic3).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, !0) }, this), this.game.add.tween(this.graphic2).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, !0, 200), this.game.add.tween(this.graphic2.scale).to({ y: 1.4 }, 200, Phaser.Easing.Linear.None, !0, 200).onComplete.addOnce(function() { this.game.add.tween(this.graphic2.scale).to({ x: .25 }, 300, Phaser.Easing.Linear.None, !0, 200), this.game.add.tween(this.graphic2).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, !0, 200) }, this), this.game.add.tween(this.graphic1).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, !0, 200), this.game.add.tween(this.graphic1.scale).to({ y: 1.4 }, 200, Phaser.Easing.Linear.None, !0, 200).onComplete.addOnce(function() { this.game.add.tween(this.graphic1.scale).to({ x: .25 }, 300, Phaser.Easing.Linear.None, !0, 400), this.game.add.tween(this.graphic1).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, !0, 400).onComplete.addOnce(function() { this.visible = !1 }, this) }, this) }, b.prototype.destroy = function() { a.prototype.destroy.call(this), this.graphic1 = null, this.graphic2 = null, this.graphic3 = null }, b
        }(Phaser.Group);
        a.Shine = b
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(a) {
            function b(b, c, d, e, f, g, h) {
                var i = a.call(this, b, c, d, e, f) || this;
                return i.state = 0, i.counter = 0, i.skewX = 0, i.skewY = 0, i._srB = 0, i._srC = 0, i._crA = 1, i._crD = 1, i._cachedRotX = 0, i._cachedRotY = 0, i.onComplete = new Phaser.Signal, i.tweenDetails = new Array, i.floor = g, i.cell = h, i.updateTransform = function(a) {
                    if (!a && !this.parent && !this.game) return this;
                    var b = this.parent;
                    a ? b = a : this.parent || (b = this.game.world);
                    var c, d, e, f, g, h, i = b.worldTransform,
                        j = this.worldTransform,
                        k = this.rotation + this.skewY,
                        l = this.rotation + this.skewX;
                    if (k % Phaser.Math.PI2 || l % Phaser.Math.PI2 ? (l === this._cachedRotX && k === this._cachedRotY || (this._cachedRotX = l, this._cachedRotY = k, this._crA = Math.cos(k), this._srB = Math.sin(k), this._srC = Math.sin(-l), this._crD = Math.cos(l)), c = this._crA * this.scale.x, d = this._srB * this.scale.x, e = this._srC * this.scale.y, f = this._crD * this.scale.y, g = this.position.x, h = this.position.y, (this.pivot.x || this.pivot.y) && (g -= this.pivot.x * c + this.pivot.y * e, h -= this.pivot.x * d + this.pivot.y * f), j.a = c * i.a + d * i.c, j.b = c * i.b + d * i.d, j.c = e * i.a + f * i.c, j.d = e * i.b + f * i.d, j.tx = g * i.a + h * i.c + i.tx, j.ty = g * i.b + h * i.d + i.ty) : (c = this.scale.x, f = this.scale.y, g = this.position.x - this.pivot.x * c, h = this.position.y - this.pivot.y * f, j.a = c * i.a, j.b = c * i.b, j.c = f * i.c, j.d = f * i.d, j.tx = g * i.a + h * i.c + i.tx, j.ty = g * i.b + h * i.d + i.ty), this.worldAlpha = this.alpha * b.worldAlpha, this.worldPosition.set(j.tx, j.ty), this.worldScale.set(this.scale.x * Math.sqrt(j.a * j.a + j.c * j.c), this.scale.y * Math.sqrt(j.b * j.b + j.d * j.d)), this.worldRotation = Math.atan2(-j.c, j.d), this._currentBounds = null, this.transformCallback && this.transformCallback.call(this.transformCallbackContext, j, i), !this._cacheAsBitmap) { for (var m = 0; m < this.children.length; m++) this.children[m].updateTransform(); return this }
                }, i
            }
            return __extends(b, a), b.prototype.show = function(a) { this.dir = a, this.setTween(1, 14, { scaleX: 1 }) }, b.prototype.setTween = function(a, b, c) {
                if (this.tweenDetails) {
                    0 !== this.tweenDetails.length && this.tweenDetails.splice(0, this.tweenDetails.length), this.state = a;
                    var d, e;
                    this.counter = 0, this.percent = 0, this.duration = b;
                    for (var f = 0, g = Object.keys(c); f < g.length; f++) {
                        var h = g[f];
                        d = this[h], e = c[h], d !== e && this.tweenDetails.push({ propertyName: h, start: d, change: e - d })
                    }
                }
            }, b.prototype.update = function() {
                if (this.tweenDetails && !(this.state <= 0)) {
                    if (1 === this.state && 3 === this.counter) this.onComplete.dispatch(this.floor, this.cell, this.dir);
                    else if (6 === this.state) return void this.destroy();
                    this.counter += 1, this.percent = this.counter / this.duration;
                    for (var a = 0; a < this.tweenDetails.length; a++) this[this.tweenDetails[a].propertyName] = this.tweenDetails[a].start + this.tweenDetails[a].change * this.percent;
                    this.percent >= 1 && (3 === this.state ? this.setTween(4, 14, { alpha: 0 }) : 4 === this.state ? (this.onComplete.dispatch(this.floor, this.cell), this.destroy()) : 5 === this.state ? (this.onComplete.dispatch(), this.state = 6) : this.state = 0)
                }
            }, Object.defineProperty(b.prototype, "scaleX", { get: function() { return this.scale.x }, set: function(a) { this.scale.x = a }, enumerable: !0, configurable: !0 }), Object.defineProperty(b.prototype, "scaleY", { get: function() { return this.scale.y }, set: function(a) { this.scale.y = a }, enumerable: !0, configurable: !0 }), b.prototype.destroy = function() { a.prototype.destroy.call(this), this.onComplete = null, this.tweenDetails = [], this.tweenDetails = null }, b
        }(Phaser.Sprite);
        a.SmallPart = b
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(b) {
            function c() { var a = b.call(this) || this; return a.name = c.Name, a.scaleFactor = 1, a.width = 787, a.height = 494, a.created = !1, a.preloadTexts = [], a.preloadReady = !1, a.clicked = !1, a.tId = 0, a }
            return __extends(c, b), c.prototype.init = function(a, b) { this.config = a, this.background = b, this.game.scale.onSizeChange.add(this.resize, this) }, c.prototype.preload = function() { this.game.add.existing(this.background), this.scaleFactor = this.getScale(), this.createObjects(), this.resizeObjects(), this.game.load.onLoadStart.add(this.onPreloadStart, this), this.game.load.onFileComplete.add(this.onPreloadedFile, this), this.game.load.onLoadComplete.add(this.onPreloadEnd, this), this.config.preloadHandler(), 0 === this.game.load.totalQueuedFiles() && this.onPreloadEnd() }, c.prototype.onPreloadStart = function() { this.t = Date.now() }, c.prototype.onPreloadedFile = function() {}, c.prototype.onPreloadEnd = function() { this.preloadReady = !0, this.game.input.onUp.add(this.handler, this), this.animateButton() }, c.prototype.createObjects = function() { this.spine = this.game.add.spine(this.game.width / 2, this.game.height / 2, "splash_playcell"), this.spine.setMixByName("intro", "loop", .2), this.spine.setMixByName("loop", "outro", .2), this.spine.setAnimationByName(0, "intro", !1), this.spine.addAnimationByName(0, "loop", !0, 0), this.logo = this.game.add.sprite(this.game.width / 2, .4 * this.game.height, "playcell_atlas", "logo"), this.logo.scale.set(this.scaleFactor), this.logo.anchor.set(.5), this.logo.visible = !1, this.playButton = this.game.add.image(this.game.width / 2, this.game.height, "playcell_atlas", "button"), this.playButton.anchor.set(.5), this.playButton.scale.set(this.scaleFactor), this.playButton.y = this.logo.y + .75 * this.logo.height, this.playButton.inputEnabled = !0, this.playButton.events.onInputUp.add(this.handler, this), this.playButton.visible = !1, this.created = !0 }, c.prototype.resizeObjects = function() { this.created && (this.logo.position.set(this.game.width / 2, .4 * this.game.height), this.logo.scale.set(this.scaleFactor), this.playButton.x = this.game.width / 2, this.playButton.y = this.logo.y + .75 * this.logo.height) }, c.prototype.handler = function(a, b) {
                if (!this.clicked && "mouseout" !== b.type) {
                    this.clicked = !0, this.game.tweens.remove(this.buttonTween), this.game.camera.fade(0, 250);
                    var c = this.game.add.tween(this.playButton.scale);
                    c.to({ x: 0, y: 0 }, 250, Phaser.Easing.Back.In).start(), void 0 !== this.config.mobilePlayClickhandler ? this.config.mobilePlayClickhandler() : this.game.state.start(this.config.nextState), this.game.input.onUp.remove(this.handler, this)
                }
            }, c.prototype.getScale = function() { return this.game.width < this.game.height ? this.game.width / 6 * 5 / this.width : this.game.height / 6 * 5 / this.height }, c.prototype.animateButton = function() { var a = this; return this.config.showPlayButton === !1 ? this.handler(this.game.input.pointer1, new MouseEvent("mousedown")) : (this.resizeObjects(), this.spine.setAnimationByName(0, "outro", !1), this.spine.onComplete.add(function() { a.logo.visible = !0, a.playButton.visible = !0, a.buttonTween = a.game.add.tween(a.playButton.scale), a.buttonTween.to({ x: 1.14 * a.scaleFactor, y: 1.14 * a.scaleFactor }, 420, Phaser.Easing.Quadratic.InOut, !0, 500), a.buttonTween.yoyo(!0).onComplete.add(a.animateButton, a), a.buttonTween.start(), a.spine.visible = !1 }), void this.playButton.scale.set(this.scaleFactor)) }, c.prototype.update = function() { this.background.update() }, c.prototype.loadUpdate = function() { this.background.update() }, c.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor), this.resizeObjects(), this.created && this.preloadReady && this.animateButton() }, c.prototype.shutdown = function() { b.prototype.shutdown.call(this), this.playButton.destroy(!0), this.background.destroy(!0), this.spine.destroy(!0), this.playButton = null, this.logo = null, this.background = null, this.game.scale.onSizeChange.remove(this.resize, this), this.game.load.onLoadStart.remove(this.onPreloadStart, this), this.game.load.onFileComplete.remove(this.onPreloadedFile, this), this.game.load.onLoadComplete.remove(this.onPreloadEnd, this), this.game.state.remove(a.Preloader.Name), this.game.state.remove(a.SplashPreloader.Name), this.game.state.remove(this.name) }, c
        }(Phaser.State);
        b.Name = "playCellSplashScreen", a.PlayCell = b
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d() { var a = c.call(this) || this; return a.name = d.Name, a.scaleFactor = 1, a.created = !1, a.preloadReady = !1, a.clicked = !1, a.preloadTexts = ["Spelletje wordt geladen"], a.dotText = ".", a.tId = 0, a }
            return __extends(d, c), d.prototype.init = function(a, b) { this.config = a, this.background = b, this.config.preloadTexts && (this.preloadTexts = this.config.preloadTexts), this.game.scale.onSizeChange.add(this.resize, this) }, d.prototype.preload = function() { this.game.add.existing(this.background), this.createObjects(), this.scaleFactor = this.getScale(), this.resizeObjects(), this.startAnimation(), this.game.load.onLoadStart.add(this.onPreloadStart, this), this.game.load.onFileComplete.add(this.onPreloadedFile, this), this.game.load.onLoadComplete.add(this.onPreloadEnd, this), this.config.preloadHandler(), 0 === this.game.load.totalQueuedFiles() && this.onPreloadEnd() }, d.prototype.onPreloadStart = function() { this.t = Date.now(), this.preloadText.setText("Spelletje wordt geladen") }, d.prototype.onPreloadedFile = function() { Date.now() - this.t > 1e3 && (this.t = Date.now(), this.tId++, this.tId >= this.preloadTexts.length && (this.tId = 0)), this.dotText.length >= 3 ? this.dotText = "." : this.dotText += ".", this.preloadText.setText(this.preloadTexts[this.tId] + this.dotText) }, d.prototype.onPreloadEnd = function() { this.preloadReady = !0, this.preloadText.visible = !1, this.game.input.onUp.add(this.handler, this), this.animateButton() }, d.prototype.createObjects = function() {
                this.twirl = this.game.add.image(this.game.width / 2, this.game.height / 2, "spele_atlas", "spele_bg_pattern"), this.twirl.anchor.set(.5), this.twirl.width = this.twirl.height = this.game.width > this.game.height ? this.game.width : this.game.height, this.jelly = this.game.add.spine(0, 0, "jelly_skeleton"), this.jelly.setAnimationByName(0, "idle", !0), this.preloadText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 230, "", { font: "Arial", fontSize: 40, fill: "#ffffff", fontWeight: "bold" }), this.preloadText.anchor.set(.5), this.logo = this.game.add.image(0, 0, "spele_atlas", "spele_logo"), this.logo.anchor.set(.5), d.IdealWidth = 1.5 * this.logo.getBounds().width;
                var a = "spele_button";
                this.playButton = this.game.add.button(this.game.width / 2, .85 * this.game.height, "spele_atlas", this.handler, this, a, a, a, a), this.playButton.anchor.set(.5), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !1, this.created = !0
            }, d.prototype.handler = function(a, b) {
                if (!this.clicked && "mouseout" !== b.type) {
                    this.clicked = !0, this.game.tweens.remove(this.buttonTween), this.game.camera.fade(0, 250);
                    var c = this.game.add.tween(this.playButton.scale);
                    c.to({ x: 0, y: 0 }, 250, Phaser.Easing.Back.In).start(), void 0 !== this.config.mobilePlayClickhandler ? this.config.mobilePlayClickhandler() : this.game.state.start(this.config.nextState), this.game.input.onUp.remove(this.handler, this)
                }
            }, d.prototype.resizeObjects = function() { this.created && (this.logo.scale.set(.5 * this.scaleFactor), this.logo.y = .25 * this.game.height, this.logo.x = this.game.width / 2, this.jelly.scale.set(.5 * this.scaleFactor), this.jelly.autoUpdateTransform(), this.jelly.x = this.game.width / 2, this.jelly.y = this.game.height / 2 + 1.2 * this.jelly.height, this.preloadText.x = this.game.width / 2, this.preloadText.y = .85 * this.game.height, this.preloadText.scale.set(this.scaleFactor), this.playButton.x = this.game.width / 2, this.playButton.y = .84 * this.game.height, this.twirl.position.set(this.game.width / 2, this.game.height / 2)) }, d.prototype.getScale = function() { return a.Utils.isOnDevice(this.game) ? this.game.width < 1.5 * d.IdealWidth ? this.game.width / 6 * 4 / d.IdealWidth : 1 : this.game.width < this.game.height ? this.game.width / d.IdealWidth : this.game.width / 6 * 3 / d.IdealWidth }, d.prototype.startAnimation = function() {
                var a = this.game.add.tween(this.logo.scale);
                a.to({ x: .6 * this.scaleFactor, y: .6 * this.scaleFactor }, 100), a.to({ x: .75 * this.scaleFactor, y: .75 * this.scaleFactor }, 450, Phaser.Easing.Back.InOut), a.start()
            }, d.prototype.animateButton = function() { return this.config.showPlayButton === !1 ? this.handler(this.game.input.pointer1, new MouseEvent("mousedown")) : (this.game.tweens.remove(this.buttonTween), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !0, this.buttonTween = this.game.add.tween(this.playButton.scale), this.buttonTween.to({ x: 1.14 * this.scaleFactor, y: 1.14 * this.scaleFactor }, 420, Phaser.Easing.Quadratic.InOut, !0, 500), this.buttonTween.yoyo(!0).onComplete.add(this.animateButton, this), void this.buttonTween.start()) }, d.prototype.update = function() { this.background.update(), this.twirl.angle += 5 }, d.prototype.loadUpdate = function() { this.background.update() }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor), this.resizeObjects(), this.created && this.preloadReady && this.animateButton() }, d.prototype.shutdown = function() { c.prototype.shutdown.call(this), this.logo.destroy(!0), this.jelly.destroy(!0), this.playButton.destroy(!0), this.background.destroy(!0), this.preloadText.destroy(!0), this.logo = null, this.jelly = null, this.playButton = null, this.background = null, this.preloadText = null, this.config = null, this.game.scale.onSizeChange.remove(this.resize, this), this.game.load.onLoadStart.remove(this.onPreloadStart, this), this.game.load.onFileComplete.remove(this.onPreloadedFile, this), this.game.load.onLoadComplete.remove(this.onPreloadEnd, this), this.game.state.remove(b.Preloader.Name), this.game.state.remove(b.SplashPreloader.Name), this.game.state.remove(this.name) }, d
        }(Phaser.State);
        c.Name = "speleSplashScreen", c.IdealWidth = 860, c.MaxDots = 3, b.Spele = c
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(b) {
        var c = function(c) {
            function d() { var a = c.call(this) || this; return a.name = d.Name, a.scaleFactor = 1, a.created = !1, a.preloadReady = !1, a.clicked = !1, a.dots = 1, a.dotText = ".", a.tId = 0, a }
            return __extends(d, c), d.prototype.init = function(a, b) { this.config = a, this.background = b, this.game.scale.onSizeChange.add(this.resize, this) }, d.prototype.preload = function() { this.game.add.existing(this.background), this.createObjects(), this.scaleFactor = this.getScale(), this.resizeObjects(), this.startAnimation(), this.game.load.onLoadStart.add(this.onPreloadStart, this), this.game.load.onFileComplete.add(this.onPreloadedFile, this), this.game.load.onLoadComplete.add(this.onPreloadEnd, this), this.config.preloadHandler(), 0 === this.game.load.totalQueuedFiles() && this.onPreloadEnd() }, d.prototype.onPreloadStart = function() {}, d.prototype.onPreloadedFile = function() {}, d.prototype.onPreloadEnd = function() { this.preloadReady = !0, this.loadBack.visible = !1, this.loadBar.visible = !1, this.game.input.onUp.add(this.handler, this), this.animateButton() }, d.prototype.createObjects = function() {
                this.logo = this.game.add.image(0, 0, "logo"), this.logo.anchor.set(.5), d.IdealWidth = this.logo.getBounds().width, this.loadBack = this.game.add.sprite(this.game.width / 2, .75 * this.game.height, "loader"), this.loadBack.anchor.set(.5);
                var a = this.game.make.graphics(0, 0);
                a.beginFill(16777215, 1).drawRoundedRect(0, 0, 350, 20, 5).endFill(), this.loadBar = this.game.add.sprite(this.game.width / 2 - 175, .75 * this.game.height - 5, a.generateTexture()), this.loadBar.anchor.set(0, .5), this.load.setPreloadSprite(this.loadBar), this.playButton = this.game.add.button(this.game.width / 2, .75 * this.game.height, "fgs_play", this.handler, this, 0, 0, 1, 0), this.playButton.anchor.set(.5), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !1, this.created = !0
            }, d.prototype.resizeObjects = function() { this.created && (this.logo.scale.set(this.scaleFactor), this.logo.y = this.game.height / 2, this.logo.x = this.game.width / 2, a.Utils.isOnDevice(this.game) || (this.playButton.x = this.game.width / 2, this.playButton.y = .75 * this.game.height)) }, d.prototype.handler = function(a, b) {
                if (!this.clicked && "mouseout" !== b.type) {
                    this.clicked = !0, this.game.tweens.remove(this.buttonTween), this.game.camera.fade(0, 250);
                    var c = this.game.add.tween(this.playButton.scale);
                    c.to({ x: 0, y: 0 }, 250, Phaser.Easing.Back.In).start(), void 0 !== this.config.mobilePlayClickhandler ? this.config.mobilePlayClickhandler() : this.game.state.start(this.config.nextState), this.game.input.onUp.remove(this.handler, this)
                }
            }, d.prototype.getScale = function() { return a.Utils.isOnDevice(this.game) ? this.game.width < 1.5 * d.IdealWidth ? this.game.width / 6 * 4 / d.IdealWidth : 1 : this.game.width < this.game.height ? this.game.width / 6 * 4 / d.IdealWidth : this.game.width / 6 * 3 / d.IdealWidth }, d.prototype.startAnimation = function() {}, d.prototype.animateButton = function() { a.Utils.isOnDevice(this.game) || (this.game.tweens.remove(this.buttonTween), this.playButton.scale.set(this.scaleFactor), this.playButton.visible = !0, this.buttonTween = this.game.add.tween(this.playButton.scale), this.buttonTween.to({ x: 1.14 * this.scaleFactor, y: 1.14 * this.scaleFactor }, 420, Phaser.Easing.Quadratic.InOut, !0, 500), this.buttonTween.yoyo(!0).onComplete.add(this.animateButton, this), this.buttonTween.start()) }, d.prototype.update = function() { this.background.update() }, d.prototype.loadUpdate = function() { this.background.update() }, d.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor), this.resizeObjects(), this.created && this.preloadReady && this.animateButton() }, d.prototype.shutdown = function() { this.game.scale.onSizeChange.remove(this.resize, this), this.game.load.onLoadStart.remove(this.onPreloadStart, this), this.game.load.onFileComplete.remove(this.onPreloadedFile, this), this.game.load.onLoadComplete.remove(this.onPreloadEnd, this), this.loadBack.destroy(!0), this.loadBar.destroy(!0), this.playButton.destroy(!0), this.background.destroy(!0), this.loadBack = null, this.loadBar = null, this.playButton = null, this.background = null, this.game.state.remove(b.Preloader.Name), this.game.state.remove(b.SplashPreloader.Name), this.game.state.remove(this.name) }, d
        }(Phaser.State);
        c.Name = "spilSplashScreen", c.IdealWidth = 531, c.MaxDots = 3, b.Spil = c
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b;
    ! function(a) {
        var b = function(b) {
            function c() { var a = b.call(this) || this; return a.name = c.Name, a.scaleFactor = 1, a.created = !1, a.tiles = [], a.preloadReady = !1, a.balls = [], a.clicked = !1, a.tId = 0, a.dt = Date.now(), a.ddt = Date.now(), a }
            return __extends(c, b), c.prototype.init = function(a, b) { this.config = a, this.background = b, this.game.scale.onSizeChange.add(this.resize, this), this.gradientBitmap = this.game.make.bitmapData(this.game.width, this.game.height) }, c.prototype.preload = function() { this.game.add.existing(this.background), this.createObjects(), this.scaleFactor = this.getScale(), this.resizeObjects(), this.startAnimation(), this.game.load.onLoadStart.add(this.onPreloadStart, this), this.game.load.onFileComplete.add(this.onPreloadedFile, this), this.game.load.onLoadComplete.add(this.onPreloadEnd, this), this.config.preloadHandler(), 0 === this.game.load.totalQueuedFiles() && this.onPreloadEnd() }, c.prototype.onPreloadStart = function() { this.t = Date.now() }, c.prototype.onPreloadedFile = function() {}, c.prototype.onPreloadEnd = function() { this.preloadReady = !0, this.animateButton() }, c.prototype.createObjects = function() {
                for (var a = 0; a < 70; a++) {
                    var b = Math.random() < .5 ? "square_empty" : "square_game_" + ("0" + (32 * Math.random() + 1 | 0)).slice(-2),
                        c = this.game.add.image(this.game.width / 2 + (80 * (a % 10) - 400), this.game.height / 2 + (80 * Math.floor(a / 10) - 280), "yp_atlas", b + ".png");
                    c.alpha = .4, this.tiles.push(c)
                }
                this.gradient = this.game.add.sprite(0, 0, this.gradientBitmap), this.spine = this.game.add.spine(0, 0, "yp_splash"), this.spine.setMixByName("flyin", "idle", .2), this.spine.visible = !1, this.logo = this.game.add.sprite(0, 0, "yp_atlas", "yepi_logo.png"), this.logo.alignIn(this.world.bounds, Phaser.TOP_CENTER, 0, -20), this.created = !0;
                var d = this.game.make.graphics(0, 0);
                d.beginFill(16631558, 1).drawCircle(0, 0, 20).endFill();
                for (var a = 0; a < 3; a++) {
                    var e = this.game.add.sprite(0, 0, d.generateTexture());
                    e.alignIn(this.game.world.bounds, Phaser.BOTTOM_CENTER, -50 + 50 * a, -20), e.scale.set(0), e.anchor.set(.5), this.balls.push(e), this.game.add.tween(e.scale).to({ x: 1, y: 1 }, 900, "Linear", !0, 300 * a, -1).yoyo(!0).delay(300)
                }
            }, c.prototype.resizeObjects = function() {
                var a = this;
                if (this.created) {
                    this.gradientBitmap.resize(this.game.width, this.game.height), this.gradientBitmap.context.clearRect(0, 0, this.game.width, this.game.height);
                    var b = this.gradientBitmap.context.createRadialGradient(this.game.width / 2, this.game.height / 2, 0, this.game.width / 2, this.game.height / 2, this.game.height / 1.8);
                    b.addColorStop(0, "rgba(0, 81, 125, 0)"), b.addColorStop(1, "rgba(0, 81, 125, 1)"), this.gradientBitmap.context.fillStyle = b, this.gradientBitmap.context.fillRect(0, 0, this.game.width, this.game.height), this.spine.x = this.game.width / 2, this.spine.y = this.game.height / 2, this.spine.scale.set(this.scaleFactor), this.logo.scale.set(this.scaleFactor), this.logo.alignIn(this.world.bounds, Phaser.TOP_CENTER, 0, -20), this.tiles.forEach(function(b, c) { b.x = a.game.width / 2 + (80 * (c % 10) - 400), b.y = a.game.height / 2 + (80 * Math.floor(c / 10) - 280) })
                }
            }, c.prototype.handler = function(a, b) { this.clicked || "mouseout" === b.type || (this.clicked = !0, this.game.tweens.remove(this.buttonTween), this.game.camera.fade(0, 250), void 0 !== this.config.mobilePlayClickhandler ? this.config.mobilePlayClickhandler() : this.game.state.start(this.config.nextState), this.game.input.onUp.remove(this.handler, this)) }, c.prototype.getScale = function() { return this.game.width < this.game.height ? this.game.width / 6 * 4 / a.FunnyGames.IdealWidth : this.game.width / 6 * 3 / a.FunnyGames.IdealWidth }, c.prototype.startAnimation = function() {}, c.prototype.animateButton = function() { return this.config.showPlayButton === !1 ? this.handler(this.game.input.pointer1, new MouseEvent("mousedown")) : (this.spine.visible = !0, this.spine.setAnimationByName(0, "flyin", !1), this.spine.addAnimationByName(0, "idle", !0, 0), this.game.tweens.removeAll(), this.balls.forEach(function(a) { a.parent.removeChild(a), a.destroy(!0) }), void this.game.input.onUp.add(this.handler, this)) }, c.prototype.update = function() {
                var a = Date.now() - this.dt;
                a > 200 && (this.tweenRandomItem(), this.dt = Date.now())
            }, c.prototype.loadUpdate = function() {
                var a = Date.now() - this.ddt;
                a > 200 && (this.ddt = Date.now(), this.tweenRandomItem())
            }, c.prototype.tweenRandomItem = function() {
                var a = this.tiles[Math.random() * this.tiles.length | 0];
                this.game.add.tween(a).to({ alpha: 1 }, 1e3, Phaser.Easing.Linear.None, !0, 0, 0, !0)
            }, c.prototype.resize = function() { this.scaleFactor = this.getScale(), this.background.resize(this.scaleFactor), this.resizeObjects() }, c.prototype.shutdown = function() { b.prototype.shutdown.call(this), this.spine.destroy(!0), this.background.destroy(!0), this.tiles.forEach(function(a) { a.destroy(!0) }), this.gradientBitmap.destroy(), this.gradient.destroy(!0), this.logo.destroy(!0), this.balls.forEach(function(a) { a.destroy(!0) }), this.spine = null, this.playButton = null, this.background = null, this.gradientBitmap = null, this.gradient = null, this.logo = null, this.tiles = null, this.balls = null, this.game.scale.onSizeChange.remove(this.resize, this), this.game.load.onLoadStart.remove(this.onPreloadStart, this), this.game.load.onFileComplete.remove(this.onPreloadedFile, this), this.game.load.onLoadComplete.remove(this.onPreloadEnd, this), this.game.state.remove(a.Preloader.Name), this.game.state.remove(a.SplashPreloader.Name), this.game.state.remove(this.name) }, c
        }(Phaser.State);
        b.Name = "yepiSplashScreen", b.IdealWidth = 463, b.MaxDots = 3, a.Yepi = b
    }(b = a.SplashScreen || (a.SplashScreen = {}))
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b = null,
        c = function() {
            function a() {}
            return a.has = function(a) { var c = a.lastIndexOf("."); if (c <= 0 || c >= a.length - 1) return !1; var d = a.lastIndexOf(".", c - 1); if (d <= 0 || d >= c - 1) return !1; var e = b[a.slice(c + 1)]; return !!e && e.indexOf(" " + a.slice(d + 1, c) + " ") >= 0 }, a.is = function(a) { var c = a.lastIndexOf("."); if (c <= 0 || c >= a.length - 1) return !1; var d = a.lastIndexOf(".", c - 1); if (d >= 0) return !1; var e = b[a.slice(c + 1)]; return !!e && e.indexOf(" " + a.slice(0, c) + " ") >= 0 }, a.get = function(a) { var c = a.lastIndexOf("."); if (c <= 0 || c >= a.length - 1) return null; var d = a.lastIndexOf(".", c - 1); if (d <= 0 || d >= c - 1) return null; var e = b[a.slice(c + 1)]; return e ? e.indexOf(" " + a.slice(d + 1, c) + " ") < 0 ? null : a.slice(d + 1) : null }, a
        }(),
        d = function() {
            function a() {}
            return a.setList = function(a) { b = a || {} }, a.getDomain = function(a) { if (null === b) return null; var c = a.match(/\./g); if (c && c.length < 2) return a; var d = a.length - this.getTld(a).length - 1; return d = a.lastIndexOf(".", d - 1) + 1, a.substring(d) || "" }, a.getTld = function(a) {
                if (null === b) return null;
                var d = a.lastIndexOf("."),
                    e = a.substring(d + 1);
                return b[e.toLowerCase()] ? c.get(a) || e : e
            }, a
        }();
    d.KEY = "Domains", a.Domain = d
}(Fabrique || (Fabrique = {}));
var Fabrique;
! function(a) {
    var b = function() {
        function b() {}
        return b.getSourceSite = function(c) {
            void 0 === c && (c = !1);
            var d = document.referrer || window.location.host;
            if (c && (d = window.location.host), d = decodeURIComponent(d), a.Branding.isBild()) return "bildspielt.de";
            if (a.Branding.isBip()) return "bipgaming.com";
            a.Branding.isSpil() && (d = b.getReferrer(d)), d = d.indexOf("://") > -1 ? d.split("/")[2] : d.split("/")[0], d = d.split(":")[0];
            var e = a.Domain.getDomain(d);
            return null !== e ? e : (3 === d.split(".").length && (d = d.substr(d.indexOf(".") + 1)), d)
        }, b.getBrandingDomain = function() {
            if (window.hasOwnProperty("fbrqBD") && window.fbrqBD in a.BrandingDomain) return window.fbrqBD;
            if (a.SplashScreen.Preloader.SPLASH_OVERRIDE !== !1) return a.SplashScreen.Preloader.SPLASH_OVERRIDE;
            var c = b.getSourceSite();
            if (a.Branding.isAdmeen()) return a.BrandingDomain.Admeen;
            if (a.Branding.isPlaycellApp() || a.Branding.isBip()) return a.BrandingDomain.PlayCell;
            switch (c) {
                case "spele.nl":
                    return a.BrandingDomain.Spele;
                case "yepi.com":
                    return a.BrandingDomain.Yepi;
                case "oyunskor.com":
                case "barbioyunu.com.tr":
                case "bebekoyunu.com.tr":
                case "oyunkolu.com":
                case "oyungemisi.com":
                case "oyunlar1.com":
                case "oyunkuzusu.com":
                case "kraloyun.com":
                case "rekoroyun.com":
                case "oyundedem.com":
                case "oyunoyna.com":
                case "pastaoyunu.com.tr":
                case "playcell.com":
                    return a.BrandingDomain.PlayCell;
                case "gamecell.com":
                    return a.BrandingDomain.GameCell;
                case "playxl.com":
                    return a.BrandingDomain.Admeen;
                default:
                case "kizi.com":
                    return a.BrandingDomain.Kizi;
                case "bildspielt.de":
                    return a.BrandingDomain.Bild;
                case "funnygames.nl":
                    return a.BrandingDomain.Funnygames
            }
        }, b.getReferrer = function(a) { return a.indexOf("?ref=") !== -1 ? a.substr(a.indexOf("?ref=") + 5) : a }, b.inIframe = function() { try { return window.self !== window.top } catch (a) { return !0 } }, b.getDomain = function(a) { var b = document.createElement("a"); return b.href = a, b.origin }, b.isOnDevice = function(a) { return !(!a.device.cordova && !a.device.crosswalk) && !/(gamedistribution\.com)/.test(window.location.hostname) }, b.isTc = function() { return /(teamcity\.ds\.orangegames\.com)/.test(window.location.host) }, b.getRandomRange = function(a, b) { return Math.random() * (b - a) + a | 0 }, b.intTimeToString = function(a) {
            var b = Math.floor(a / 3600),
                c = Math.floor(a % 3600 / 60),
                d = a % 60,
                e = b < 10 ? "0" + b : b.toString(),
                f = c < 10 ? "0" + c : c.toString(),
                g = d < 10 ? "0" + d : d.toString();
            return e + ":" + f + ":" + g
        }, b.registerAudioUnlocker = function(a) {
            a.input.touch && "function" != typeof a.input.touch.addTouchLockCallback || a.device.android && a.device.chrome && a.device.chromeVersion >= 55 && (a.sound.touchLocked = !0, a.input.touch.addTouchLockCallback(function() {
                if (this.noAudio || !this.touchLocked || null !== this._unlockSource) return !0;
                if (this.usingWebAudio) {
                    var a = this.context.createBuffer(1, 1, 22050);
                    this._unlockSource = this.context.createBufferSource(), this._unlockSource.buffer = a, this._unlockSource.connect(this.context.destination), void 0 === this._unlockSource.start ? this._unlockSource.noteOn(0) : this._unlockSource.start(0), "suspended" === this._unlockSource.context.state && this._unlockSource.context.resume()
                }
                return !0
            }, a.sound, !0))
        }, b
    }();
    b.ASSET_LOCATION = "./cdn.fbrq/@orange-games/splash/assets/", a.Utils = b
}(Fabrique || (Fabrique = {}));
var CryptoJS = CryptoJS || function(a, b) {
    var c = {},
        d = c.lib = {},
        e = function() {},
        f = d.Base = {
            extend: function(a) { e.prototype = this; var b = new e; return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function() { b.$super.init.apply(this, arguments) }), b.init.prototype = b, b.$super = this, b },
            create: function() { var a = this.extend(); return a.init.apply(a, arguments), a },
            init: function() {},
            mixIn: function(a) {
                for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function() { return this.init.prototype.extend(this) }
        },
        g = d.WordArray = f.extend({
            init: function(a, c) { a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length },
            toString: function(a) { return (a || i).stringify(this) },
            concat: function(a) {
                var b = this.words,
                    c = a.words,
                    d = this.sigBytes;
                if (a = a.sigBytes, this.clamp(), d % 4)
                    for (var e = 0; e < a; e++) b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - e % 4 * 8 & 255) << 24 - (d + e) % 4 * 8;
                else if (65535 < c.length)
                    for (e = 0; e < a; e += 4) b[d + e >>> 2] = c[e >>> 2];
                else b.push.apply(b, c);
                return this.sigBytes += a, this
            },
            clamp: function() {
                var b = this.words,
                    c = this.sigBytes;
                b[c >>> 2] &= 4294967295 << 32 - c % 4 * 8, b.length = a.ceil(c / 4)
            },
            clone: function() { var a = f.clone.call(this); return a.words = this.words.slice(0), a },
            random: function(b) { for (var c = [], d = 0; d < b; d += 4) c.push(4294967296 * a.random() | 0); return new g.init(c, b) }
        }),
        h = c.enc = {},
        i = h.Hex = {
            stringify: function(a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], d = 0; d < a; d++) {
                    var e = b[d >>> 2] >>> 24 - d % 4 * 8 & 255;
                    c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16))
                }
                return c.join("")
            },
            parse: function(a) { for (var b = a.length, c = [], d = 0; d < b; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - d % 8 * 4; return new g.init(c, b / 2) }
        },
        j = h.Latin1 = {
            stringify: function(a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], d = 0; d < a; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - d % 4 * 8 & 255));
                return c.join("")
            },
            parse: function(a) { for (var b = a.length, c = [], d = 0; d < b; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - d % 4 * 8; return new g.init(c, b) }
        },
        k = h.Utf8 = { stringify: function(a) { try { return decodeURIComponent(escape(j.stringify(a))) } catch (a) { throw Error("Malformed UTF-8 data") } }, parse: function(a) { return j.parse(unescape(encodeURIComponent(a))) } },
        l = d.BufferedBlockAlgorithm = f.extend({
            reset: function() { this._data = new g.init, this._nDataBytes = 0 },
            _append: function(a) { "string" == typeof a && (a = k.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes },
            _process: function(b) {
                var c = this._data,
                    d = c.words,
                    e = c.sigBytes,
                    f = this.blockSize,
                    h = e / (4 * f),
                    h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);
                if (b = h * f, e = a.min(4 * b, e), b) {
                    for (var i = 0; i < b; i += f) this._doProcessBlock(d, i);
                    i = d.splice(0, b), c.sigBytes -= e
                }
                return new g.init(i, e)
            },
            clone: function() { var a = f.clone.call(this); return a._data = this._data.clone(), a },
            _minBufferSize: 0
        });
    d.Hasher = l.extend({ cfg: f.extend(), init: function(a) { this.cfg = this.cfg.extend(a), this.reset() }, reset: function() { l.reset.call(this), this._doReset() }, update: function(a) { return this._append(a), this._process(), this }, finalize: function(a) { return a && this._append(a), this._doFinalize() }, blockSize: 16, _createHelper: function(a) { return function(b, c) { return new a.init(c).finalize(b) } }, _createHmacHelper: function(a) { return function(b, c) { return new m.HMAC.init(a, c).finalize(b) } } });
    var m = c.algo = {};
    return c
}(Math);
! function(a) {
    for (var b = CryptoJS, c = b.lib, d = c.WordArray, e = c.Hasher, c = b.algo, f = [], g = [], h = function(a) { return 4294967296 * (a - (0 | a)) | 0 }, i = 2, j = 0; 64 > j;) {
        var k;
        a: {
            k = i;
            for (var l = a.sqrt(k), m = 2; m <= l; m++)
                if (!(k % m)) { k = !1; break a }
            k = !0
        }
        k && (8 > j && (f[j] = h(a.pow(i, .5))), g[j] = h(a.pow(i, 1 / 3)), j++), i++
    }
    var n = [],
        c = c.SHA256 = e.extend({
            _doReset: function() { this._hash = new d.init(f.slice(0)) },
            _doProcessBlock: function(a, b) {
                for (var c = this._hash.words, d = c[0], e = c[1], f = c[2], h = c[3], i = c[4], j = c[5], k = c[6], l = c[7], m = 0; 64 > m; m++) {
                    if (16 > m) n[m] = 0 | a[b + m];
                    else {
                        var o = n[m - 15],
                            p = n[m - 2];
                        n[m] = ((o << 25 | o >>> 7) ^ (o << 14 | o >>> 18) ^ o >>> 3) + n[m - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[m - 16]
                    }
                    o = l + ((i << 26 | i >>> 6) ^ (i << 21 | i >>> 11) ^ (i << 7 | i >>> 25)) + (i & j ^ ~i & k) + g[m] + n[m], p = ((d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22)) + (d & e ^ d & f ^ e & f), l = k, k = j, j = i, i = h + o | 0, h = f, f = e, e = d, d = o + p | 0
                }
                c[0] = c[0] + d | 0, c[1] = c[1] + e | 0, c[2] = c[2] + f | 0, c[3] = c[3] + h | 0, c[4] = c[4] + i | 0, c[5] = c[5] + j | 0, c[6] = c[6] + k | 0, c[7] = c[7] + l | 0
            },
            _doFinalize: function() {
                var b = this._data,
                    c = b.words,
                    d = 8 * this._nDataBytes,
                    e = 8 * b.sigBytes;
                return c[e >>> 5] |= 128 << 24 - e % 32, c[14 + (e + 64 >>> 9 << 4)] = a.floor(d / 4294967296), c[15 + (e + 64 >>> 9 << 4)] = d, b.sigBytes = 4 * c.length, this._process(), this._hash
            },
            clone: function() { var a = e.clone.call(this); return a._hash = this._hash.clone(), a }
        });
    b.SHA256 = e._createHelper(c), b.HmacSHA256 = e._createHmacHelper(c)
}(Math),
function() {
    var a = CryptoJS,
        b = a.enc.Utf8;
    a.algo.HMAC = a.lib.Base.extend({
        init: function(a, c) {
            a = this._hasher = new a.init, "string" == typeof c && (c = b.parse(c));
            var d = a.blockSize,
                e = 4 * d;
            c.sigBytes > e && (c = a.finalize(c)), c.clamp();
            for (var f = this._oKey = c.clone(), g = this._iKey = c.clone(), h = f.words, i = g.words, j = 0; j < d; j++) h[j] ^= 1549556828, i[j] ^= 909522486;
            f.sigBytes = g.sigBytes = e, this.reset()
        },
        reset: function() {
            var a = this._hasher;
            a.reset(), a.update(this._iKey)
        },
        update: function(a) { return this._hasher.update(a), this },
        finalize: function(a) { var b = this._hasher; return a = b.finalize(a), b.reset(), b.finalize(this._oKey.clone().concat(a)) }
    })
}(),
function() {
    var a = CryptoJS,
        b = a.lib.WordArray;
    a.enc.Base64 = {
        stringify: function(a) {
            var b = a.words,
                c = a.sigBytes,
                d = this._map;
            a.clamp(), a = [];
            for (var e = 0; e < c; e += 3)
                for (var f = (b[e >>> 2] >>> 24 - e % 4 * 8 & 255) << 16 | (b[e + 1 >>> 2] >>> 24 - (e + 1) % 4 * 8 & 255) << 8 | b[e + 2 >>> 2] >>> 24 - (e + 2) % 4 * 8 & 255, g = 0; 4 > g && e + .75 * g < c; g++) a.push(d.charAt(f >>> 6 * (3 - g) & 63));
            if (b = d.charAt(64))
                for (; a.length % 4;) a.push(b);
            return a.join("")
        },
        parse: function(a) {
            var c = a.length,
                d = this._map,
                e = d.charAt(64);
            e && -1 != (e = a.indexOf(e)) && (c = e);
            for (var e = [], f = 0, g = 0; g < c; g++)
                if (g % 4) {
                    var h = d.indexOf(a.charAt(g - 1)) << g % 4 * 2,
                        i = d.indexOf(a.charAt(g)) >>> 6 - g % 4 * 2;
                    e[f >>> 2] |= (h | i) << 24 - f % 4 * 8, f++
                }
            return b.create(e, f)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}();
var GA;
! function(a) {
    ! function(a) { a[a.ios = 0] = "ios", a[a.android = 1] = "android", a[a.windows = 2] = "windows", a[a.windows_phone = 3] = "windows_phone", a[a.blackberry = 4] = "blackberry", a[a.roku = 5] = "roku", a[a.tizen = 6] = "tizen", a[a.nacl = 7] = "nacl", a[a.mac_osx = 8] = "mac_osx", a[a.webplayer = 9] = "webplayer" }(a.Platform || (a.Platform = {})), a.Platform,
        function(a) { a[a.male = 0] = "male", a[a.female = 1] = "female" }(a.Gender || (a.Gender = {})), a.Gender
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        var b = /^[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}$/,
            c = function() {
                function a(a, c, d, e, f, g) {
                    if (this.category = 1, this.transaction_num = 0, !a || null === a.match(b)) throw new Error("Invalid event_id supplied for BusinessEvent");
                    if (this.event_id = a, this.amount = c, !d || null === d.match(/^[A-Z]{3}$/)) throw new Error("Invalid currency supplied for BusinessEvent");
                    if (this.currency = d, this.transaction_num = e, f) {
                        if (f.length > 32) throw new Error("A too long cart_type was supplied, should be max 32 characters");
                        this.cart_type = f
                    }
                    void 0 !== g && (this.receipt_info = g)
                }
                return a
            }();
        a.Business = c
    }(a.Events || (a.Events = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        var b = /^[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}(:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}){0,4}$/,
            c = function() {
                function a(a, c) {
                    if (this.category = 0, null === a.match(b)) throw new Error("Invalid event_id supplied for DesignEvent");
                    this.event_id = a, void 0 !== c && (this.value = c)
                }
                return a
            }();
        a.Design = c
    }(a.Events || (a.Events = {}))
}(GA || (GA = {}));
var GA;
! function(a) {! function(a) {! function(a) { a[a.design = 0] = "design", a[a.business = 1] = "business", a[a.error = 2] = "error", a[a.user = 3] = "user", a[a.session_end = 4] = "session_end", a[a.progression = 5] = "progression", a[a.resource = 6] = "resource" }(a.Category || (a.Category = {})), a.Category }(a.Events || (a.Events = {})) }(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        ! function(a) { a[a.debug = 0] = "debug", a[a.info = 1] = "info", a[a.warning = 2] = "warning", a[a.error = 3] = "error", a[a.critical = 4] = "critical" }(a.ErrorSeverity || (a.ErrorSeverity = {}));
        var b = a.ErrorSeverity,
            c = function() {
                function a(a, c) { this.category = 2, this.message = "", this.severity = b[a], void 0 !== c && (this.message = c.substr(0, 8192)) }
                return a
            }();
        a.Exception = c
    }(a.Events || (a.Events = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        var b = function() {
            function a() {}
            return a
        }();
        a.InitResponse = b;
        var c = function() {
            function a(a) { this.data = a }
            return a.prototype.toString = function() { return JSON.stringify(this.data) }, a
        }();
        a.Init = c
    }(a.Events || (a.Events = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        var b = /^(Start|Fail|Complete):[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}(:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}){0,2}$/,
            c = function() {
                function a(a, c, d) {
                    if (this.category = 5, null === a.match(b)) throw new Error("Invalid event_id supplied for ProgressionEvent");
                    this.event_id = a, void 0 !== c && (this.attempt_num = c), void 0 !== d && (this.score = d)
                }
                return a
            }();
        a.Progression = c
    }(a.Events || (a.Events = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        var b = /^(Sink|Source):[A-Za-z]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}:[A-Za-z0-9\\s\\-_\\.\\(\\)\\!\\?]{1,64}/,
            c = function() {
                function a(a, c) {
                    if (this.category = 6, null === a.match(b)) throw new Error("Invalid event_id supplied for ResourceEvent");
                    this.event_id = a, this.amount = c
                }
                return a
            }();
        a.Resource = c
    }(a.Events || (a.Events = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        var b = function() {
            function a(a) { this.category = 4, this.length = 0, this.length = a }
            return a
        }();
        a.SessionEnd = b
    }(a.Events || (a.Events = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        var b = function() {
            function a() { this.category = 3 }
            return a
        }();
        a.User = b
    }(a.Events || (a.Events = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    function b() { return null === c.instance && (c.instance = new c), c.instance } a.getInstance = b;
    var c = function() {
        function b() { this.sessionId = a.Utils.createUniqueId(), this.messageQueue = new a.Utils.MessageQueue, this.enabled = !1, this.initProcessed = !1, this.timeoutId = 0, this.timeOffset = 0 }
        return b.prototype.init = function(c, d, e, f) {
            var g = this;
            if (null === b.instance) throw new Error("No instance Available!");
            this.gameKey = c, this.secretKey = d, this.build = e, this.user = f, this.incrementSessionNum(f);
            var h = new a.Events.Init(a.Utils.getBaseAnnotations());
            return this.sendEvent(h.toString(), "init", function(a) { g.initProcessed = !0, !0 === a.enabled && (g.enabled = !0, g.timeOffset = (Date.now() / 1e3 | 0) - a.server_ts) }), this.scheduleSendData(b.SCHEDULE_TIME), window.addEventListener("beforeunload", function() { g.sendData() }), this
        }, b.prototype.incrementSessionNum = function(b) {
            var c = a.Utils.LocalStorage.getItem(b.user_id);
            c ? a.Utils.LocalStorage.setItem(b.user_id, (parseInt(c) + 1).toString()) : (c = "1", a.Utils.LocalStorage.setItem(b.user_id, c))
        }, b.prototype.addEvent = function(c) { if (null === b.instance) throw new Error("No instance Available!"); var d = new a.Utils.Message(c, a.Utils.getDefaultAnnotations(this.user, this.sessionId, this.build, this.timeOffset)); return this.messageQueue.push(d), this }, b.prototype.sendData = function() {
            if (!1 === this.initProcessed) return this.scheduleSendData(1e3), this;
            if (!1 === this.enabled) return this;
            if (null === b.instance) throw new Error("No instance Available!");
            for (var a = [], c = ""; this.messageQueue.length > 0;) {
                var d = this.messageQueue.pop();
                a.push(d.data)
            }
            if (0 === a.length) return this.scheduleSendData(b.SCHEDULE_TIME), this;
            try { c = JSON.stringify(a) }
            catch (a) {}
            return this.sendEvent(c, "events"), this.scheduleSendData(b.SCHEDULE_TIME), this
        }, b.prototype.scheduleSendData = function(a) {
            var b = this;
            clearTimeout(this.timeoutId), this.timeoutId = setTimeout(function() { b.sendData() }, a)
        }, b.prototype.sendEvent = function(c, d, e) {
            if (void 0 === e && (e = null), null === b.instance && null === this.gameKey) throw new Error("No instance Available!");
            if (!(c.length < 1)) {
                var f = CryptoJS.HmacSHA256(c, this.secretKey),
                    g = CryptoJS.enc.Base64.stringify(f),
                    h = b.API_URL + this.gameKey + "/" + d;
                a.Utils.postRequest(h, c, g, function(a) { if (!1 === a.success && window.console && console.log(a.message), null != e) { var b = ""; try { b = JSON.parse(a.message) } catch (a) {} e(b) } })
            }
        }, b.SCHEDULE_TIME = 15e3, b.SDK_VERSION = "rest api v2", b.API_URL = ("https:" === document.location.protocol ? "https" : "http") + "://api.gameanalytics.com/v2/", b.instance = null, b
    }();
    a.GameAnalytics = c
}(GA || (GA = {}));
var GA;
! function(a) {
    var b = function() {
        function b(b, c, d, e) {
            if (this.user_id = "", b) this.user_id = b;
            else {
                var f = a.Utils.LocalStorage.getItem("user");
                this.user_id = f || a.Utils.createUniqueUserId()
            }
            c && c.length > 0 && (this.facebook_id = c, this.user_id = c), a.Utils.LocalStorage.setItem("user", this.user_id), 1 !== d && 0 !== d || (this.gender = d), e && e.toString().match(/^[0-9]{4}$/gi) && (this.birth_year = e)
        }
        return b
    }();
    a.User = b
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(b) {
        function c(b, c, d, f) {
            var g = { sdk_version: a.GameAnalytics.SDK_VERSION, platform: a.Platform[2], os_version: a.Platform[2] + " 8", device: "unknown", v: 2, user_id: b.user_id, client_ts: (Date.now() / 1e3 | 0) + f, manufacturer: "unknown", session_id: c, session_num: e(b.user_id), build: d };
            b.facebook_id && (g.facebook_id = b.facebook_id), 0 !== b.gender && 1 !== b.gender || (g.gender = a.Gender[b.gender]), b.birth_year && (g.birth_year = b.birth_year);
            var h = navigator.userAgent;
            return h.match(/iPad|iPod|iPhone/i) ? (g.platform = a.Platform[0], g.device = h.match(/iPad|iPod|iPhone/i)[0], g.manufacturer = "Apple", g.os_version = a.Platform[0] + " " + h.match(/OS (\b[0-9]+_[0-9]+(?:_[0-9]+)?\b)/)[1].replace(/_/gi, ".")) : h.match(/Android/i) ? (g.platform = a.Platform[1], g.device = h.match(/Mobile/i) ? "Phone" : "Tablet", g.os_version = a.Platform[1], /Firefox/i.test(h) || (g.os_version += " " + h.match(/Android (\d+(?:\.\d+)*);/)[1])) : h.match(/Windows Phone/i) && (g.platform = a.Platform[2], g.device = "Windows Phone", g.os_version = a.Platform[2] + " " + h.match(/Phone (\d+(?:\.\d+)+);/)[1]), g
        }

        function d() {
            var b = { sdk_version: a.GameAnalytics.SDK_VERSION, platform: "unknown", os_version: "unknown" },
                c = navigator.userAgent;
            return c.match(/iPad|iPod|iPhone/i) ? (b.platform = a.Platform[0], b.os_version = a.Platform[0] + " " + c.match(/OS (\b[0-9]+_[0-9]+(?:_[0-9]+)?\b)/)[1].replace(/_/gi, ".")) : c.match(/Android/i) ? (b.platform = a.Platform[1], b.os_version = a.Platform[1], /Firefox/i.test(c) || (b.os_version += " " + c.match(/Android (\d+(?:\.\d+)*);/)[1])) : c.match(/Windows Phone/i) && (b.platform = a.Platform[2], b.os_version = a.Platform[2] + " " + c.match(/Phone (\d+(?:\.\d+)+);/)[1]), b
        }

        function e(a) { var c = b.LocalStorage.getItem(a); return c ? parseInt(c) : 1 } b.getDefaultAnnotations = c, b.getBaseAnnotations = d
    }(a.Utils || (a.Utils = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        var b = function() {
            function a() {}
            return a.getItem = function(b) { if (a.Available) return localStorage.getItem(a.CacheKey + b) }, a.setItem = function(b, c) { a.Available && localStorage.setItem(a.CacheKey + b, c) }, a.Available = !1, a.CacheKey = "GA:", a
        }();
        a.LocalStorage = b;
        try { "object" == typeof localStorage && (localStorage.setItem("testingLocalStorage", "yes"), localStorage.removeItem("testingLocalStorage"), b.Available = !0) }
        catch (a) {}
    }(a.Utils || (a.Utils = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(b) {
        var c = function() {
            function b(a, b) { this.event = a, this.annotations = b }
            return Object.defineProperty(b.prototype, "data", { get: function() { for (var b in this.event) this.event.hasOwnProperty(b) && (this.annotations[b] = "category" === b ? a.Events.Category[this.event[b]] : this.event[b]); return this.annotations }, enumerable: !0, configurable: !0 }), b
        }();
        b.Message = c
    }(a.Utils || (a.Utils = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        var b = function() {
            function a() { this.queue = [], this.load() }
            return a.prototype.push = function(a) { this.queue.push(a) }, a.prototype.pop = function() { return this.queue.pop() }, Object.defineProperty(a.prototype, "length", { get: function() { return this.queue.length }, enumerable: !0, configurable: !0 }), a.prototype.save = function() {}, a.prototype.load = function() {}, a
        }();
        a.MessageQueue = b
    }(a.Utils || (a.Utils = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        function b(a, b, c, d) {
            var e;
            if (!window.XMLHttpRequest) return void d({ success: !1, message: "Error: Unable to send request, XMLHttpRequest not supported" });
            e = new XMLHttpRequest, e.onreadystatechange = function() { 4 == e.readyState && (200 === e.status ? d({ success: !0, message: e.responseText }) : e.status > 0 && d({ success: !1, message: "Error: There was a problem with the request: status " + e.status })) };
            try { e.open("POST", a, !0), e.setRequestHeader("Authorization", c), e.setRequestHeader("Content-Type", "application/json"), e.send(b) }
            catch (a) { d({ success: !1, message: "Error: Unable to send request, CORS not allowed." }) }
        }
        var c = function() {
            function a() { this.success = !1, this.message = "" }
            return a
        }();
        a.Response = c, a.postRequest = b
    }(a.Utils || (a.Utils = {}))
}(GA || (GA = {}));
var GA;
! function(a) {
    ! function(a) {
        function b() { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) { var b = 16 * Math.random() | 0; return ("x" == a ? b : 3 & b | 8).toString(16) }) }

        function c() { return b() } a.createUniqueId = b, a.createUniqueUserId = c
    }(a.Utils || (a.Utils = {}))
}(GA || (GA = {}));
