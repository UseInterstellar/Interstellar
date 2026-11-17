/*!
 * phaser-ads - version 2.2.7 
 * A Phaser plugin for providing nice ads integration in your phaser.io game
 *
 * OrangeGames
 * Build at 07-08-2018
 * Released under MIT License 
 */

var __extends = this && this.__extends || function() {
        var a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a, b) { a.__proto__ = b } || function(a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) };
        return function(b, c) {
            function d() { this.constructor = b } a(b, c), b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d)
        }
    }(),
    PhaserAds;
! function(a) {
    var b;
    ! function(a) { a[a.start = 0] = "start", a[a.firstQuartile = 1] = "firstQuartile", a[a.midPoint = 2] = "midPoint", a[a.thirdQuartile = 3] = "thirdQuartile", a[a.complete = 4] = "complete" }(b = a.AdEvent || (a.AdEvent = {}));
    var c;
    ! function(a) { a[a.interstitial = 0] = "interstitial", a[a.rewarded = 1] = "rewarded", a[a.banner = 2] = "banner", a[a.video = 3] = "video" }(c = a.AdType || (a.AdType = {}));
    var d = function(a) {
        function b(b, c) { var d = a.call(this, b, c) || this; return d.onContentPaused = new Phaser.Signal, d.onContentResumed = new Phaser.Signal, d.onAdProgression = new Phaser.Signal, d.onAdsDisabled = new Phaser.Signal, d.onAdClicked = new Phaser.Signal, d.onAdRewardGranted = new Phaser.Signal, d.onBannerShown = new Phaser.Signal, d.onBannerHidden = new Phaser.Signal, d.bannerActive = !1, d.provider = null, d.wasMuted = !1, Object.defineProperty(b, "ads", { value: d }), d }
        return __extends(b, a), b.prototype.setAdProvider = function(a) { this.provider = a, this.provider.setManager(this) }, b.prototype.showAd = function() {
            for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
            if (null === this.provider) throw new Error("Can not request an ad without an provider, please attach an ad provider!");
            a[0] !== c.banner && (this.wasMuted = this.game.sound.mute, this.game.sound.mute = !0), this.provider.showAd.apply(this.provider, a)
        }, b.prototype.preloadAd = function() {
            for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
            if (null === this.provider) throw new Error("Can not preload an ad without an provider, please attach an ad provider!");
            this.provider.preloadAd.apply(this.provider, a)
        }, b.prototype.destroyAd = function() {
            for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
            if (null === this.provider) throw new Error("Can not destroy an ad without an provider, please attach an ad provider!");
            this.provider.destroyAd.apply(this.provider, a)
        }, b.prototype.hideAd = function() {
            for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
            if (null === this.provider) throw new Error("Can not hide an ad without an provider, please attach an ad provider!");
            this.unMuteAfterAd(), this.provider.hideAd.apply(this.provider, a)
        }, b.prototype.adsEnabled = function() { return this.provider.adsEnabled }, b.prototype.unMuteAfterAd = function() { this.wasMuted || (this.game.sound.mute = !1) }, b
    }(Phaser.Plugin);
    a.AdManager = d
}(PhaserAds || (PhaserAds = {}));
var PhaserAds;
! function(a) {
    var b;
    ! function(b) {
        var c;
        ! function(a) { a[a.AdMob = 0] = "AdMob", a[a.MoPub = 1] = "MoPub", a[a.Chartboost = 2] = "Chartboost", a[a.Heyzap = 3] = "Heyzap" }(c = b.CocoonProvider || (b.CocoonProvider = {}));
        var d = function() {
            function b(a, b, d) {
                if (this.adsEnabled = !1, this.banner = null, this.bannerShowable = !1, this.interstitial = null, this.interstitialShowable = !1, this.rewarded = null, this.rewardedShowable = !1, (a.device.cordova || a.device.crosswalk) && Cocoon && Cocoon.Ad) {
                    switch (this.adsEnabled = !0, b) {
                        default:
                            case c.AdMob:
                            this.cocoonProvider = Cocoon.Ad.AdMob;
                        break;
                        case c.Chartboost:
                                this.cocoonProvider = Cocoon.Ad.Chartboost;
                            break;
                        case c.Heyzap:
                                this.cocoonProvider = Cocoon.Ad.Heyzap;
                            break;
                        case c.MoPub:
                                this.cocoonProvider = Cocoon.Ad.MoPub
                    }
                    this.cocoonProvider.configure(d)
                }
            }
            return b.prototype.setManager = function(a) { this.adManager = a }, b.prototype.showAd = function(b) {
                if (!this.adsEnabled) return this.adManager.unMuteAfterAd(), void(b !== a.AdType.banner && this.adManager.onContentResumed.dispatch());
                if (b === a.AdType.banner) {
                    if (!this.bannerShowable || null === this.banner) return void this.adManager.unMuteAfterAd();
                    this.adManager.onBannerShown.dispatch(this.banner.width, this.banner.height), this.adManager.bannerActive = !0, this.banner.show()
                }
                if (b === a.AdType.interstitial) {
                    if (!this.interstitialShowable || null === this.interstitial) return this.adManager.unMuteAfterAd(), void this.adManager.onContentResumed.dispatch(a.AdType.interstitial);
                    this.interstitial.show()
                }
                if (b === a.AdType.rewarded) {
                    if (!this.rewardedShowable || null === this.rewarded) return this.adManager.unMuteAfterAd(), void this.adManager.onContentResumed.dispatch(a.AdType.rewarded);
                    this.rewarded.show()
                }
            }, b.prototype.preloadAd = function(b, c, d) {
                var e = this;
                this.adsEnabled && (this.destroyAd(b), b === a.AdType.banner && (this.banner = this.cocoonProvider.createBanner(c), d && this.banner.setLayout(d), this.banner.on("load", function() { e.bannerShowable = !0 }), this.banner.on("fail", function() { e.bannerShowable = !1, e.banner = null }), this.banner.on("click", function() { e.adManager.onAdClicked.dispatch(a.AdType.banner) }), this.banner.on("show", function() {}), this.banner.on("dismiss", function() {}), this.banner.load()), b === a.AdType.interstitial && (this.interstitial = this.cocoonProvider.createInterstitial(c), this.interstitial.on("load", function() { e.interstitialShowable = !0 }), this.interstitial.on("fail", function() { e.interstitialShowable = !1, e.interstitial = null }), this.interstitial.on("click", function() { e.adManager.onAdClicked.dispatch(a.AdType.interstitial) }), this.interstitial.on("show", function() { e.adManager.onContentPaused.dispatch(a.AdType.interstitial) }), this.interstitial.on("dismiss", function() { e.adManager.unMuteAfterAd(), e.adManager.onContentResumed.dispatch(a.AdType.interstitial), e.interstitialShowable = !1, e.interstitial = null }), this.interstitial.load()), b === a.AdType.rewarded && (this.rewarded = this.cocoonProvider.createRewardedVideo(c), this.rewarded.on("load", function() { e.rewardedShowable = !0 }), this.rewarded.on("fail", function() { e.rewardedShowable = !1, e.rewarded = null }), this.rewarded.on("click", function() { e.adManager.onAdClicked.dispatch(a.AdType.rewarded) }), this.rewarded.on("show", function() { e.adManager.onContentPaused.dispatch(a.AdType.rewarded) }), this.rewarded.on("dismiss", function() { e.adManager.unMuteAfterAd(), e.adManager.onContentResumed.dispatch(a.AdType.rewarded), e.rewardedShowable = !1, e.rewarded = null }), this.rewarded.on("reward", function() { e.adManager.unMuteAfterAd(), e.adManager.onAdRewardGranted.dispatch(a.AdType.rewarded), e.rewardedShowable = !1, e.rewarded = null }), this.rewarded.load()))
            }, b.prototype.destroyAd = function(b) { if (this.adsEnabled) { if (b === a.AdType.banner && null !== this.banner) { try { this.cocoonProvider.releaseBanner(this.banner) } catch (a) {} this.banner = null, this.bannerShowable = !1 } b === a.AdType.interstitial && null !== this.interstitial && (this.cocoonProvider.releaseInterstitial(this.interstitial), this.interstitial = null, this.interstitialShowable = !1) } }, b.prototype.hideAd = function(b) { this.adsEnabled && (b === a.AdType.interstitial && null !== this.interstitial && this.interstitial.hide(), b === a.AdType.banner && null !== this.banner && (this.adManager.bannerActive && (this.adManager.bannerActive = !1, this.adManager.onBannerHidden.dispatch(this.banner.width, this.banner.height)), this.banner.hide()), b === a.AdType.rewarded && null !== this.rewarded && this.rewarded.hide()) }, b
        }();
        b.CocoonAds = d
    }(b = a.AdProvider || (a.AdProvider = {}))
}(PhaserAds || (PhaserAds = {}));
var PhaserAds;
! function(a) {
    var b;
    ! function(a) {
        var b = function() {
            function a(a, b, c, d) { void 0 === d && (d = !1), this.adsEnabled = !1, void 0 === cordova.plugins || void 0 !== cordova.plugins && void 0 === cordova.plugins.gdApi || (d && cordova.plugins.gdApi.enableTestAds(), this.setAdListeners(), cordova.plugins.gdApi.init([b, c], function(a) {}, function(a) {})) }
            return a.prototype.setAdListeners = function() {
                var a = this;
                cordova.plugins.gdApi.setAdListener(function(b) {
                    switch (b.event) {
                        case "BANNER_STARTED":
                            a.adManager.onContentPaused.dispatch();
                            break;
                        case "API_IS_READY":
                            a.adsEnabled = !0;
                            break;
                        case "API_ALREADY_INITIALIZED":
                            break;
                        case "BANNER_CLOSED":
                        case "API_NOT_READY":
                        case "BANNER_FAILED":
                            a.adManager.onContentResumed.dispatch()
                    }
                }, function(b) { a.adsEnabled = !1 })
            }, a.prototype.setManager = function(a) { this.adManager = a }, a.prototype.showAd = function(a) {
                var b = this;
                this.adsEnabled ? cordova.plugins.gdApi.showBanner(function(a) {}, function(a) { b.adManager.onContentResumed.dispatch() }) : this.adManager.onContentResumed.dispatch()
            }, a.prototype.preloadAd = function() {}, a.prototype.destroyAd = function() {}, a.prototype.hideAd = function() {}, a
        }();
        a.CordovaGameDistribution = b
    }(b = a.AdProvider || (a.AdProvider = {}))
}(PhaserAds || (PhaserAds = {}));
var PhaserAds;
! function(a) {
    var b;
    ! function(a) {
        var b;
        ! function(a) { a[a.Interstitial = 0] = "Interstitial", a[a.Video = 1] = "Video", a[a.Rewarded = 2] = "Rewarded", a[a.Banner = 3] = "Banner" }(b = a.HeyzapAdTypes || (a.HeyzapAdTypes = {}));
        var c = function() {
            function a(a, b) {
                var c = this;
                this.adsEnabled = !1, (a.device.cordova || a.device.crosswalk) && (this.adsEnabled = !0, HeyzapAds.start(b).then(function() {}, function(a) { c.adsEnabled = !1 }))
            }
            return a.prototype.setManager = function(a) { this.adManager = a }, a.prototype.showAd = function(a, c) {
                var d = this;
                switch (this.adsEnabled || (this.adManager.unMuteAfterAd(), this.adManager.onContentResumed.dispatch()), a) {
                    case b.Interstitial:
                        HeyzapAds.InterstitialAd.addEventListener(HeyzapAds.InterstitialAd.Events.HIDE, function() { d.adManager.unMuteAfterAd(), d.adManager.onContentResumed.dispatch(HeyzapAds.InterstitialAd.Events.HIDE) }), HeyzapAds.InterstitialAd.addEventListener(HeyzapAds.InterstitialAd.Events.SHOW_FAILED, function() { d.adManager.unMuteAfterAd(), d.adManager.onContentResumed.dispatch(HeyzapAds.InterstitialAd.Events.SHOW_FAILED) }), HeyzapAds.InterstitialAd.addEventListener(HeyzapAds.InterstitialAd.Events.CLICKED, function() { d.adManager.onAdClicked.dispatch(HeyzapAds.InterstitialAd.Events.CLICKED) }), HeyzapAds.InterstitialAd.show().then(function() { d.adManager.onContentPaused.dispatch() }, function(a) { d.adManager.unMuteAfterAd(), d.adManager.onContentResumed.dispatch() });
                        break;
                    case b.Video:
                        HeyzapAds.VideoAd.addEventListener(HeyzapAds.VideoAd.Events.HIDE, function() { d.adManager.unMuteAfterAd(), d.adManager.onContentResumed.dispatch(HeyzapAds.VideoAd.Events.HIDE) }), HeyzapAds.VideoAd.addEventListener(HeyzapAds.VideoAd.Events.SHOW_FAILED, function() { d.adManager.unMuteAfterAd(), d.adManager.onContentResumed.dispatch(HeyzapAds.VideoAd.Events.SHOW_FAILED) }), HeyzapAds.VideoAd.addEventListener(HeyzapAds.VideoAd.Events.CLICKED, function() { d.adManager.onAdClicked.dispatch(HeyzapAds.VideoAd.Events.CLICKED) }), HeyzapAds.VideoAd.show().then(function() { d.adManager.onContentPaused.dispatch() }, function(a) { d.adManager.unMuteAfterAd(), d.adManager.onContentResumed.dispatch() });
                        break;
                    case b.Rewarded:
                        HeyzapAds.IncentivizedAd.addEventListener(HeyzapAds.IncentivizedAd.Events.HIDE, function() { d.adManager.unMuteAfterAd(), d.adManager.onContentResumed.dispatch(HeyzapAds.IncentivizedAd.Events.HIDE) }), HeyzapAds.IncentivizedAd.addEventListener(HeyzapAds.IncentivizedAd.Events.SHOW_FAILED, function() { d.adManager.unMuteAfterAd(), d.adManager.onContentResumed.dispatch(HeyzapAds.IncentivizedAd.Events.SHOW_FAILED) }), HeyzapAds.IncentivizedAd.addEventListener(HeyzapAds.IncentivizedAd.Events.CLICKED, function() { d.adManager.onAdClicked.dispatch(HeyzapAds.IncentivizedAd.Events.CLICKED) }), HeyzapAds.IncentivizedAd.show().then(function() { d.adManager.onContentPaused.dispatch() }, function(a) { d.adManager.unMuteAfterAd(), d.adManager.onContentResumed.dispatch() });
                        break;
                    case b.Banner:
                        HeyzapAds.BannerAd.show(c).then(function() {}, function(a) {})
                }
            }, a.prototype.preloadAd = function(a) { this.adsEnabled && a === b.Rewarded && HeyzapAds.IncentivizedAd.fetch().then(function() {}, function(a) {}) }, a.prototype.destroyAd = function(a) { this.adsEnabled && a === b.Banner && HeyzapAds.BannerAd.destroy().then(function() {}, function(a) {}) }, a.prototype.hideAd = function(a) { this.adsEnabled && a === b.Banner && HeyzapAds.BannerAd.hide().then(function() {}, function(a) {}) }, a
        }();
        a.CordovaHeyzap = c
    }(b = a.AdProvider || (a.AdProvider = {}))
}(PhaserAds || (PhaserAds = {}));
var PhaserAds;
! function(a) {
    var b;
    ! function(a) {
        var b;
        ! function(a) { a[a.preroll = 0] = "preroll", a[a.midroll = 1] = "midroll" }(b = a.GameDistributionAdType || (a.GameDistributionAdType = {}));
        var c = function() {
            function a(a, b, c) {
                void 0 === c && (c = "");
                var d = this;
                this.adsEnabled = !0, this.areAdsEnabled(), GD_OPTIONS = {
                        gameId: b,
                        userId: c,
                        advertisementSettings: { autoplay: !1 },
                        onEvent: function(a) {
                            switch (a.name) {
                                case "SDK_GAME_START":
                                    "undefined" != typeof gdApi && gdApi.play(), d.adManager.unMuteAfterAd(), d.adManager.onContentResumed.dispatch();
                                    break;
                                case "SDK_GAME_PAUSE":
                                    d.adManager.onContentPaused.dispatch();
                                    break;
                                case "SDK_READY":
                                    break;
                                case "SDK_ERROR":
                            }
                        }
                    },
                    function(a, b, c) {
                        var d, e = a.getElementsByTagName(b)[0];
                        a.getElementById(c) || (d = a.createElement(b), d.id = c, d.src = "//htmi.api.gamedistribution.com/main.min.js", e.parentNode.insertBefore(d, e))
                    }(document, "script", "gamedistribution-jssdk")
            }
            return a.prototype.setManager = function(a) { this.adManager = a }, a.prototype.showAd = function() {
                if (this.adsEnabled) {
                    if ("undefined" == typeof gdApi || gdApi && "undefined" == typeof gdApi.showBanner) return this.adsEnabled = !1, this.adManager.unMuteAfterAd(), void this.adManager.onContentResumed.dispatch();
                    gdApi.showBanner()
                }
                else this.adManager.unMuteAfterAd(), this.adManager.onContentResumed.dispatch()
            }, a.prototype.preloadAd = function() {}, a.prototype.destroyAd = function() {}, a.prototype.hideAd = function() {}, a.prototype.areAdsEnabled = function() {
                var a = this,
                    b = document.createElement("div");
                b.innerHTML = "&nbsp;", b.className = "adsbox", b.style.position = "absolute", b.style.fontSize = "10px", document.body.appendChild(b);
                var c = function() { var a = !0; return 0 === b.offsetHeight && (a = !1), b.parentNode.removeChild(b), a };
                window.setTimeout(function() { a.adsEnabled = c() }, 100)
            }, a
        }();
        a.GameDistributionAds = c
    }(b = a.AdProvider || (a.AdProvider = {}))
}(PhaserAds || (PhaserAds = {}));
var PhaserAds;
! function(a) {
    var b;
    ! function(b) {
        var c = function() {
            function b(a, b) { this.adsManager = null, this.googleEnabled = !1, this.adsEnabled = !0, this.adTagUrl = "", this.adRequested = !1, this.adManager = null, this.resizeListener = null, this.areAdsEnabled(), "undefined" != typeof google && (this.googleEnabled = !0, this.gameContent = "string" == typeof a.parent ? document.getElementById(a.parent) : a.parent, this.gameContent.style.position = "absolute", this.gameContent.style.width = "100%", this.adContent = this.gameContent.parentNode.appendChild(document.createElement("div")), this.adContent.id = "phaser-ad-container", this.adContent.style.position = "absolute", this.adContent.style.zIndex = "9999", this.adContent.style.display = "none", this.adContent.style.top = "0", this.adContent.style.left = "0", this.adContent.style.width = "100%", this.adContent.style.height = "100%", this.adContent.style.overflow = "hidden", this.adTagUrl = b, this.game = a, this.adDisplay = new google.ima.AdDisplayContainer(this.adContent), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale("nl"), this.adLoader = new google.ima.AdsLoader(this.adDisplay), this.adLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdManagerLoader, !1, this), this.adLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, !1, this)) }
            return b.prototype.setManager = function(a) { this.adManager = a }, b.prototype.showAd = function(a) {
                if (!this.adRequested) {
                    if (this.adsEnabled || this.adManager.onAdsDisabled.dispatch(!0), !this.googleEnabled) return void this.onContentResumeRequested();
                    this.adDisplay.initialize();
                    var b = new google.ima.AdsRequest;
                    b.adTagUrl = this.adTagUrl + this.parseCustomParams(a);
                    var c = window.innerWidth,
                        d = window.innerHeight;
                    this.game.scale.isFullScreen && document.body.clientHeight < window.innerHeight && (d = document.body.clientHeight, c = document.body.clientWidth), b.linearAdSlotWidth = c, b.linearAdSlotHeight = d, b.nonLinearAdSlotWidth = c, b.nonLinearAdSlotHeight = d, b.forceNonLinearFullSlot = !0;
                    try { this.adRequested = !0, this.adLoader.requestAds(b) }
                    catch (a) { this.onContentResumeRequested() }
                }
            }, b.prototype.preloadAd = function() {}, b.prototype.destroyAd = function() {}, b.prototype.hideAd = function() {}, b.prototype.onAdManagerLoader = function(a) {
                var b = this,
                    c = new google.ima.AdsRenderingSettings;
                c.restoreCustomPlaybackStateOnAdBreakComplete = !0;
                var d = a.getAdsManager(this.gameContent, c);
                this.adsManager = d, d.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested, !1, this), d.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested, !1, this), d.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, !1, this), [google.ima.AdEvent.Type.ALL_ADS_COMPLETED, google.ima.AdEvent.Type.CLICK, google.ima.AdEvent.Type.COMPLETE, google.ima.AdEvent.Type.FIRST_QUARTILE, google.ima.AdEvent.Type.LOADED, google.ima.AdEvent.Type.MIDPOINT, google.ima.AdEvent.Type.PAUSED, google.ima.AdEvent.Type.STARTED, google.ima.AdEvent.Type.THIRD_QUARTILE].forEach(function(a) { d.addEventListener(a, b.onAdEvent, !1, b) });
                try {
                    this.adContent.style.display = "block";
                    var e = window.innerWidth,
                        f = window.innerHeight;
                    this.adsManager.init(e, f, google.ima.ViewMode.NORMAL), this.adsManager.start(), this.resizeListener = function() { null !== b.adsManager && b.adsManager.resize(window.innerWidth, window.innerHeight, google.ima.ViewMode.NORMAL) }, window.addEventListener("resize", this.resizeListener)
                }
                catch (a) { this.onAdError(a) }
            }, b.prototype.onAdEvent = function(b) {
                switch (b.type) {
                    case google.ima.AdEvent.Type.CLICK:
                        this.adManager.onAdClicked.dispatch();
                        break;
                    case google.ima.AdEvent.Type.LOADED:
                        this.adRequested = !1;
                        var c = b.getAd();
                        c.isLinear() || this.onContentResumeRequested();
                        break;
                    case google.ima.AdEvent.Type.STARTED:
                        this.adManager.onAdProgression.dispatch(a.AdEvent.start);
                        break;
                    case google.ima.AdEvent.Type.FIRST_QUARTILE:
                        this.adManager.onAdProgression.dispatch(a.AdEvent.firstQuartile);
                        break;
                    case google.ima.AdEvent.Type.MIDPOINT:
                        this.adManager.onAdProgression.dispatch(a.AdEvent.midPoint);
                        break;
                    case google.ima.AdEvent.Type.THIRD_QUARTILE:
                        this.adManager.onAdProgression.dispatch(a.AdEvent.thirdQuartile);
                        break;
                    case google.ima.AdEvent.Type.COMPLETE:
                        this.adManager.onAdProgression.dispatch(a.AdEvent.complete);
                        break;
                    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                        this.onContentResumeRequested()
                }
            }, b.prototype.onAdError = function(a) { null !== this.adsManager && (this.adsManager.destroy(), this.adsManager = null, null !== this.resizeListener && (window.removeEventListener("resize", this.resizeListener), this.resizeListener = null)), this.adRequested && (this.adRequested = !1), this.onContentResumeRequested() }, b.prototype.onContentPauseRequested = function() { this.adManager.onContentPaused.dispatch() }, b.prototype.onContentResumeRequested = function() { return "undefined" == typeof google ? (this.adManager.unMuteAfterAd(), void this.adManager.onContentResumed.dispatch()) : (this.adContent.style.display = "none", this.adManager.unMuteAfterAd(), void this.adManager.onContentResumed.dispatch()) }, b.prototype.parseCustomParams = function(a) {
                if (void 0 !== a) {
                    var b = "";
                    for (var c in a)
                        if (a.hasOwnProperty(c)) {
                            b.length > 0 && (b += "&");
                            var d = Array.isArray(a[c]) ? a[c].join(",") : a[c];
                            b += c + "=" + d
                        }
                    return "&cust_params=" + encodeURIComponent(b)
                }
                return ""
            }, b.prototype.areAdsEnabled = function() {
                var a = this,
                    b = document.createElement("div");
                b.innerHTML = "&nbsp;", b.className = "adsbox", b.style.position = "absolute", b.style.fontSize = "10px", document.body.appendChild(b);
                var c = function() { var a = !0; return 0 === b.offsetHeight && (a = !1), b.parentNode.removeChild(b), a };
                window.setTimeout(function() { a.adsEnabled = c() }, 100)
            }, b
        }();
        b.Ima3 = c
    }(b = a.AdProvider || (a.AdProvider = {}))
}(PhaserAds || (PhaserAds = {}));
