

cc.Class({
    extends: cc.Component,

    properties: {
        isCover: {
            default: false,
            tooltip: '全部覆盖墙壁或者地板'
        } //是否全部覆盖
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (this.isCover) {
            this.skinContentSize();
        }
    },

    start () {

    },

    skinContentSize: function () {
        var size = this.node.parent.getContentSize();
        this.node.setContentSize(size);
    },

    //设置壁纸贴图
    setSkinTexture: function (texture) {
        this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        if (!this.isCover) {
            this.node.width = texture.width;
            this.node.height = texture.height;
        }
    }

    // update (dt) {},
});
