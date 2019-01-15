

cc.Class({
    extends: cc.Component,

    properties: {
        itemID:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
    },

    start () {

    },

    init: function () {
        this.cardLabel = this.node.getChildByName('cardLabel');
    },

    onInitItem(sender, data) {
        // console.log(this.node.y);
        this.itemID = data.itemID;
        this.cardLabel.getComponent(cc.Label).string = '美食卡' + data.itemID;
    },

    onUpdateItem(sender, data) {
        this.cardLabel.getComponent(cc.Label).string = '美食卡' + data.itemID;
    },

    // update (dt) {},
});
