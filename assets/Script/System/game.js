cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        var layer = this.node.getChildByName('turnTabelLayer');
        this.Wheel02 = layer.getChildByName('turnTabel');

        var data = [];
        for (let i = 0; i < 30; ++i) {
            data[i] = '商品' + i;
        }
        var goodsList = this.node.getChildByName('goodsList');
        goodsList.getComponent('ListViewCtrl').initialize(data);
        var friendList = this.node.getChildByName('friendList');
        friendList.getComponent('ListViewCtrl').initialize(data);
    },

    onButtonClicked:function (event) {
        this.turnTabel = this.Wheel02.getComponent('turnTabelComponent');
        var n = Math.floor(Math.random()*11 + 1);
        this.turnTabel.setRotation(12, 6, 5, n);
        this.turnTabel.startRotation();
    },

    // called every frame
    update: function (dt) {
        
    },
});
