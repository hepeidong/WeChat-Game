

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.FloorLayer = this.node.getChildByName('FloorLayer');
    },

    start () {

    },

    // update (dt) {},
});
