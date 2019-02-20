

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);
    },

    start () {

    },

    onStartEvent: function (event) {

    },

    onMoveEvent: function (event) {

    },

    onEndEvent: function (event) {

    },

    onCancelEvent: function (event) {
        
    }

    // update (dt) {},
});
