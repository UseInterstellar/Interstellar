function ParticleEvent(type, count, external)
{
    this.work = typeof external !== 'undefined' ? external : false;
    this.type = type;
    this.length = 0;
    this.radius = 0;
    this.direction = 0;
    this.sign = (Math.random() - 0.5 >= 0) ? 1 : -1;
    this.alpha = this.work ? 0.5 : 1;
    this.count = count;

    switch (this.type.name)
    {
        case 'electron':
            this.length = detector.radius.siliconSpace * detector.ratio + Math.round((detector.radius.ecal * detector.ratio + 10 - detector.radius.siliconSpace * detector.ratio) * Math.random());
            this.direction = Math.random() * Math.PI * 2;
            this.radius = 20 + Math.round((100 - 20) * Math.random());
            break;
        case 'jet':
            this.length = detector.radius.ecal * detector.ratio + Math.round((detector.radius.mucal * detector.ratio - detector.radius.ecal * detector.ratio) * Math.random());
            this.direction = Math.random() * Math.PI * 2;
            this.radius = 40 + Math.round((200 - 40) * Math.random());
            break;
        case 'muon':
            this.length = detector.radius.mucal * detector.ratio + 3 * detector.radius.mucalDark * detector.ratio + Math.round((4 * detector.radius.mucalLight * detector.ratio + 2 * detector.radius.mucalDark * detector.ratio) * Math.random());
            this.direction = Math.random() * Math.PI * 2;
            this.radius = 200 + Math.round((600 - 200) * Math.random());
            break;
    }

    this.draw(16, true);
};

ParticleEvent.prototype.draw = function(duration, init)
{
    init = typeof init !== 'undefined' ? init : false;

    var ctx = detector.events.ctx;
    var cx = detector.width / 2;
    var cy = detector.height / 2;

    ctx.save();

    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = this.type.color;
    ctx.fillStyle = this.type.color;
    ctx.lineWidth = 2;

    ctx.translate(cx, cy);
    ctx.rotate(this.direction);
    ctx.translate(-cx, -cy);

    ctx.beginPath();
    ctx.arc(cx + this.length / 2, cy + this.sign * Math.round(Math.sqrt(Math.abs(this.radius * this.radius - this.length * this.length / 4))), this.radius, - this.sign * Math.PI / 2 - Math.asin(this.length / (2 * this.radius)), - this.sign * Math.PI / 2 +  Math.asin(this.length / (2 * this.radius)), false);
    ctx.stroke();

    ctx.restore();

    if (!init) {
        this.alpha -= 0.03 / 16 * duration;
    }
};

