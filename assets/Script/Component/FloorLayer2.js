

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent, this);
        this.node.on(CC.Node.EventType.TOUCH_MOVE, this.onMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent, this);
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
