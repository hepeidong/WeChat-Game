

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.raduis = 100;
        this.rocker = this.node.getChildByName('Rocker');
        this.rockerPosition = {x: this.rocker.x, y: this.rocker.y};

        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);

        var Utl = require('Until');
        this.utl = new Utl();
    },

    start () {

    },

    getRaduis: function (x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    },

    onStartEvent: function (event) {

    },

    onMoveEvent: function (event) {
        var delta = event.touch.getDelta();
        this.rockerPosition.x += delta.x;
        this.rockerPosition.y += delta.y;
        // if (this.utl.distance(0, 0, this.rockerPosition.x, this.rockerPosition.y) <= this.raduis) {
        //     this.rocker.x = this.rockerPosition.x;
        //     this.rocker.y = this.rockerPosition.y;
        // }
        // else {

        //     if (this.rockerPosition.y <= this.raduis && this.rockerPosition.x > this.raduis) {
        //         this.rocker.y = this.rockerPosition.y;
        //     }
        //     else if (this.rockerPosition.x <= this.raduis && this.rockerPosition.y > this.raduis) {
        //         this.rocker.x = this.rockerPosition.x;
        //     }
        //     else {
        //         var angle = this.utl.angle(Math.atan(this.rockerPosition.y / this.rockerPosition.x));
        //         console.log(angle);
        //         var L = this.utl.distance(0, 0, this.rockerPosition.x, this.rockerPosition.y) - this.raduis;
        //         var y = L * Math.sin(angle);
        //         var x = L * Math.cos(angle);

        //         this.rocker.x = this.rockerPosition.x - x;
        //         this.rocker.y = this.rockerPosition.y - y;
        //     }
        // }
        // if (Math.abs(this.rocker.y) <= this.raduis) {
        //     this.rocker.y += delta.y;
        // }
        // else {
        //     // this.rocker.y = this.raduis;
        // }

        if (this.getRaduis(this.rockerPosition.x, this.rockerPosition.y) <= this.raduis) {
            this.rocker.x = this.rockerPosition.x;
            this.rocker.y = this.rockerPosition.y;
        }
        else {
            var x = Math.cos(-Math.atan2(this.rockerPosition.x, this.rockerPosition.y)) * this.raduis;
            var y = Math.sin(-Math.atan2(this.rockerPosition.x, this.rockerPosition.y)) * this.raduis;
            this.rocker.x = x;
            this.rocker.y = y;
        }
    },

    onEndEvent: function (event) {

    },

    onCancelEvent: function (event) {

    }

    // update (dt) {},
});
