var detector =
{
    core:
    {
        canvas: null,
        ctx: null
    },

    events:
    {
        canvas: null,
        ctx: null,
        list: [],
    },

    visible: true,

    width: 400,
    height: 400,

    ratio: 1,

    colors: 
    {
        siliconRing: '#FFF371',
        siliconRingLine: '#EAC918',
        ecal: '#C5FF82',
        ecalLine: '#9EFF28',
        hcal: '#E1FF79',
        hcalLine: '#C9FF2D',
        lightRing: '#A0B3FF',
        lightRingLine: '#A0B3FF',
        darkRing: '#7280B8',
        darkRingLine: '#7280B8',

        mucalLight: '#FFDFB7',
        mucalLightLine: '#FFDFB7',
        mucalDark: '#EA301F',
        mucalDarkLine: '#C5291A'
    },

    radius:
    {
        siliconInner: 10,
        silicon: 30,
        siliconSpace: 35,
        ecal: 50,
        hcal: 80,
        darkRing1: 83,
        darkRing1Space: 86,
        lightRing: 92,
        lightRingSpace: 94,
        darkRing2: 100,

        mucal: 107,
        mucalLight: 8,
        mucalDark: 18
    },

    tracks:
    [
        {
            name: 'electron',
            color: '#0016EA'
        },

        {
            name: 'jet',
            color: '#0B7700'
        },
        
        {
            name: 'muon',
            color: '#775400'
        }
    ],

    lastRender: 0,

    animate: function(time)
    {
        var duration = typeof time !== 'undefined' ? time - detector.lastRender : 16;
        detector.lastRender = time;

        requestAnimFrame(detector.animate);
        detector.draw(duration);
    },

    init: function(baseSize)
    {
        detector.core.canvas = document.getElementById('detector-core');
        detector.core.ctx = detector.core.canvas.getContext('2d');
        //detector.core.ctx = new C2S(400,400);

        detector.events.canvas = document.getElementById('detector-events');
        detector.events.ctx = detector.events.canvas.getContext('2d');

        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStoreRatio = detector.core.ctx.webkitBackingStorePixelRatio ||
                                detector.core.ctx.mozBackingStorePixelRatio ||
                                detector.core.ctx.msBackingStorePixelRatio ||
                                detector.core.ctx.oBackingStorePixelRatio ||
                                detector.core.ctx.backingStorePixelRatio || 1;

        var ratio = devicePixelRatio / backingStoreRatio;

        detector.ratio = baseSize / 400;

        detector.width = baseSize;
        detector.height = baseSize;

        detector.core.canvas.width = baseSize;
        detector.core.canvas.height = baseSize;

        detector.events.canvas.width = baseSize;
        detector.events.canvas.height = baseSize;

        if (devicePixelRatio !== backingStoreRatio) {
            var oldWidth = detector.core.canvas.width;
            var oldHeight = detector.core.canvas.height;

            detector.core.canvas.width = oldWidth * ratio;
            detector.core.canvas.height = oldHeight * ratio;
            detector.core.canvas.style.width = oldWidth + 'px';
            detector.core.canvas.style.height = oldHeight + 'px';

            detector.events.canvas.width = oldWidth * ratio;
            detector.events.canvas.height = oldHeight * ratio;
            detector.events.canvas.style.width = oldWidth + 'px';
            detector.events.canvas.style.height = oldHeight + 'px';

            // now scale the context to counter
            // the fact that we've manually scaled
            // our canvas element
            detector.core.ctx.scale(ratio, ratio);
            detector.events.ctx.scale(ratio, ratio);
        }

        detector.coreDraw();
        detector.animate();
    },

    coreDraw: function()
    {
        var ctx = detector.core.ctx;
        var cx = detector.width / 2;
        var cy = detector.height / 2;

        ctx.clearRect(0, 0, detector.width, detector.width);

        var muSplit = 2/12;
        for (var k = 3; k >= 1; k--) {
            ctx.strokeStyle = detector.colors.mucalDarkLine;
            ctx.fillStyle = detector.colors.mucalDark;
            
            ctx.beginPath();
            ctx.moveTo(cx + (detector.radius.mucal + k * detector.radius.mucalLight + k * detector.radius.mucalDark) * Math.cos(Math.PI * muSplit) * detector.ratio, cy + (detector.radius.mucal + k * detector.radius.mucalLight + k * detector.radius.mucalDark) * Math.sin(Math.PI * muSplit) * detector.ratio);
            for (var i = 1; i <= 13; i++) {
                ctx.lineTo(cx + (detector.radius.mucal + k * detector.radius.mucalLight + k * detector.radius.mucalDark) * Math.cos(Math.PI * i * muSplit) * detector.ratio, cy + (detector.radius.mucal + k * detector.radius.mucalLight + k * detector.radius.mucalDark) * Math.sin(Math.PI * i * muSplit) * detector.ratio);
            }
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(cx + (detector.radius.mucal + k * detector.radius.mucalLight + (k-1) * detector.radius.mucalDark) * Math.cos(Math.PI * muSplit) * detector.ratio, cy + (detector.radius.mucal + k * detector.radius.mucalLight + (k-1) * detector.radius.mucalDark) * Math.sin(Math.PI * muSplit) * detector.ratio);
            for (var i = 1; i <= 13; i++) {
                ctx.lineTo(cx + (detector.radius.mucal + k * detector.radius.mucalLight + (k-1) * detector.radius.mucalDark) * Math.cos(Math.PI * i * muSplit) * detector.ratio, cy + (detector.radius.mucal + k * detector.radius.mucalLight + (k-1) * detector.radius.mucalDark) * Math.sin(Math.PI * i * muSplit) * detector.ratio);
            }
            ctx.stroke();
            ctx.fillStyle = detector.colors.mucalLight;
            ctx.fill();
        }

        ctx.strokeStyle = detector.colors.mucalDarkLine;
        ctx.beginPath();
        ctx.moveTo(cx + detector.radius.mucal * Math.cos(Math.PI * muSplit) * detector.ratio, cy + detector.radius.mucal * Math.sin(Math.PI * muSplit) * detector.ratio);
        for (var i = 1; i <= 13; i++) {
            ctx.lineTo(cx + detector.radius.mucal * Math.cos(Math.PI * i * muSplit) * detector.ratio, cy + detector.radius.mucal * Math.sin(Math.PI * i * muSplit) * detector.ratio);
        }
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();


        ctx.beginPath();
        ctx.strokeStyle = detector.colors.darkRingLine;
        ctx.fillStyle = detector.colors.darkRing;
        ctx.arc(cx, cy, detector.radius.darkRing2 * detector.ratio, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.arc(cx, cy, detector.radius.lightRingSpace * detector.ratio, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = detector.colors.lightRingLine;
        ctx.fillStyle = detector.colors.lightRing;
        ctx.arc(cx, cy, detector.radius.lightRing * detector.ratio, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.arc(cx, cy, detector.radius.darkRing1Space * detector.ratio, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = detector.colors.darkRingLine
        ctx.fillStyle = detector.colors.darkRing;
        ctx.arc(cx, cy, detector.radius.darkRing1 * detector.ratio, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.arc(cx, cy, detector.radius.ecal * detector.ratio, 0, Math.PI * 2, true);
        ctx.fill();


        ctx.strokeStyle = detector.colors.hcalLine;
        ctx.fillStyle = detector.colors.hcal;
        var calSplit = 20/2;
        for (var i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(cx + detector.radius.ecal * Math.cos(Math.PI * i / calSplit) * detector.ratio, cy + detector.radius.ecal * Math.sin(Math.PI * i / calSplit) * detector.ratio);
            ctx.lineTo(cx + detector.radius.hcal * Math.cos(Math.PI * i / calSplit) * detector.ratio, cy + detector.radius.hcal * Math.sin(Math.PI * i / calSplit) * detector.ratio);
            ctx.arc(cx, cy, detector.radius.hcal * detector.ratio, Math.PI * i / calSplit, Math.PI * (i+1) / calSplit, false);
            ctx.lineTo(cx + detector.radius.ecal * Math.cos(Math.PI * (i+1) / calSplit) * detector.ratio, cy + detector.radius.ecal * Math.sin(Math.PI * (i+1) / calSplit) * detector.ratio);
            ctx.lineTo(cx + detector.radius.ecal * Math.cos(Math.PI * i / calSplit) * detector.ratio, cy + detector.radius.ecal * Math.sin(Math.PI * i / calSplit) * detector.ratio);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        ctx.strokeStyle = detector.colors.ecalLine;
        ctx.fillStyle = detector.colors.ecal;
        var calSplit = 20/2;
        for (var i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(cx + detector.radius.siliconSpace * Math.cos(Math.PI * i / calSplit) * detector.ratio, cy + detector.radius.siliconSpace * Math.sin(Math.PI * i / calSplit) * detector.ratio);
            ctx.lineTo(cx + detector.radius.ecal * Math.cos(Math.PI * i / calSplit) * detector.ratio, cy + detector.radius.ecal * Math.sin(Math.PI * i / calSplit) * detector.ratio);
            ctx.lineTo(cx + detector.radius.ecal * Math.cos(Math.PI * (i+1) / calSplit) * detector.ratio, cy + detector.radius.ecal * Math.sin(Math.PI * (i+1) / calSplit) * detector.ratio);
            ctx.lineTo(cx + detector.radius.siliconSpace * Math.cos(Math.PI * (i+1) / calSplit) * detector.ratio, cy + detector.radius.siliconSpace * Math.sin(Math.PI * (i+1) / calSplit) * detector.ratio);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.strokeStyle = detector.colors.siliconRingLine;
        ctx.fillStyle = detector.colors.siliconRing;
        ctx.arc(cx, cy, detector.radius.silicon * detector.ratio, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = detector.colors.siliconRingLine;
        ctx.fillStyle = detector.colors.siliconRing;
        ctx.arc(cx, cy, detector.radius.siliconInner * detector.ratio, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    },

    addEvent: function()
    {
        var num = Math.max(3, Math.ceil(15 * Math.random()));

        for (var i = 0; i < num; i++) {
            var index = Math.round(Math.random() * (detector.tracks.length - 1));
            var event = new ParticleEvent(detector.tracks[index], num);
            detector.events.list.push(event);
        }
    },

    addEventExternal: function(numWorkers)
    {
        if (!detector.visible) {
            return;
        }

        var num = Math.min(20 * numWorkers / 10, 20);

        for (var i = 0; i < num; i++) {
            var index = Math.round(Math.random() * (detector.tracks.length - 1));
            var event = new ParticleEvent(detector.tracks[index], num, true);
            detector.events.list.push(event);
        }
    },

    draw: function(duration)
    {
        detector.events.ctx.clearRect(0, 0, detector.width, detector.height);

        var del = -1;
        for (var e in detector.events.list) {
            if (detector.events.list[e].alpha > 0) {
                detector.events.list[e].draw(duration);
            } else {
                del = e;
            }
        }

        if (del > 0) {
            detector.events.list.splice(0, del);
        }
    }
};

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       || 
           window.webkitRequestAnimationFrame || 
           window.mozRequestAnimationFrame    || 
           window.oRequestAnimationFrame      || 
           window.msRequestAnimationFrame     || 
           function(/* function */ callback, /* DOMElement */ element){
               window.setTimeout(callback, 1000 / 60);
           };
})();

(function() { detector.init(400); $('#detector').width(400).height(400); })();
