

cc.Class({
    extends: cc.Component,

    properties: {
        itemID: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
    },

    init: function () {
        this.goodsImg = this.node.getChildByName('goodsImg');
        this.name = this.node.getChildByName('name');
    },

    onInitItem(sender, data) {
        this.itemID = data.itemID;
        this.name.getComponent(cc.Label).string = data.itemINFO[data.itemID];
    },

    onUpdateItem(sender, data) {
        // console.log(data.itemID);
        this.name.getComponent(cc.Label).string = data.itemINFO[data.itemID];
    },

    start () {

    },

    // update (dt) {},
});
