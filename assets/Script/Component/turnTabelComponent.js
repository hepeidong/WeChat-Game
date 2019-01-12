

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.start = false;
        this.rotation = 0;
        this.goodsNum = 0;
        this.inclAngular = 0;//夹角
        this.angulerRate = 0;//角速率（取0~1）
        this.cycleNum = 5;//圈数
        this.seleItem = 0;//选中的物品
    },

    // start () {

    // },

    setRotation: function (goodsNum, angularRate, cycleNum, seleItem) {
        this.goodsNum = goodsNum;
        this.inclAngular = 360 / goodsNum;
        this.angularRate = angularRate * 100;
        this.cycleNum = cycleNum;
        this.seleItem = seleItem;
        this.rotation = this.node.rotation%360 / this.angularRate;
    },

    anguler: function () {
        return this.node.rotation;
    },

    startRotation: function () {
        this.start = true;
    },

    stopRotation: function () {
        this.start = false;
    },

    update (dt) {
        this.rotation += dt;
        if (this.start) {
            this.node.rotation = this.rotation * this.angularRate;
            if ((this.rotation * this.angularRate) >= (360 * this.cycleNum + this.inclAngular * this.seleItem)) {
                this.start = false;
            }
        }
    },
});
