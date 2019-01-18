

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.node.rotationY = 0;
        // this.node.rotationX = 0;
    },

    _on: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(){
            this._off();
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(){}.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, function(){}.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(){}.bind(this), this);
    },

    _off: function () {
        this.node.off(cc.Node.EventType.TOUCH_START, function(){}.bind(this), this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, function(){}.bind(this), this);
        this.node.off(cc.Node.EventType.TOUCH_END, function(){}.bind(this), this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, function(){}.bind(this), this);
    },

    start () {

    },

    onButtonClicked: function (event) {
        this._on();
    }

    // update (dt) {},
});
