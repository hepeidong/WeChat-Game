cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        var data = [];
        for (let i = 0; i < 30; ++i) {
            data[i] = '商品' + i;
        }

        var layer = this.node.getChildByName('turnTabelLayer');
        this.turnTabel = layer.getChildByName('turnTabel');

        this.node.getChildByName('goodsLayer').getComponent('ListViewCtrl').initialize(data);
        this.userInfo = this.node.getChildByName('userInfo');

        this.exchangeRecordsBtn = this.node.getChildByName('exchangeRecordsBtn');//兑换记录
        this.exchangeTangdouBtn = this.node.getChildByName('exchangeTangdouBtn');//兑换糖豆
        this.getTangdouBtn = this.node.getChildByName('getTangdouBtn');//获取糖豆
        this.goBtn = this.node.getChildByName('goBtn');//点击抽奖

        this.addClickEvent();

        cc.Utl.wxGetSetting();
        // cc.Utl.wxLoginCode();
        // wx.getUserInfo({
        //     success(res) {
        //         console.log(res);
        //     }
        // });
    },

    addClickEvent: function () {
        cc.Utl.addClickEvent(this.exchangeRecordsBtn, this.node, 'game', 'onExchangeRecordsBtnClicked');
        cc.Utl.addClickEvent(this.exchangeTangdouBtn, this.node, 'game', 'onExchangeTangdouBtnClicked');
        cc.Utl.addClickEvent(this.getTangdouBtn, this.node, 'game', 'onGetTangdouBtnClicked');
        cc.Utl.addClickEvent(this.goBtn, this.node, 'game', 'onGoBtnClicked');
    },

    onExchangeRecordsBtnClicked: function (event) {

    },

    onExchangeTangdouBtnClicked: function (event) {

    },

    onGetTangdouBtnClicked: function (event) {

    },

    onGoBtnClicked: function (event) {

    },

    onButtonClicked:function (event) {
        this.turnTabelComponent = this.turnTabel.getComponent('TurnTabelComponent');
        var n = Math.floor(Math.random()*11 + 1);
        this.turnTabelComponent.setRotation(12, 6, 5, n);
        this.turnTabelComponent.startRotation();
    },

    onButtonTest: function (event) {
        // cc.Utl.openView('Coupon', (viewNode) => {
        //     viewNode.getComponent('ListViewCtrl').initialize(null);
        // });
        // var testNode = this.node.getChildByName('testNode');
        // var newNode = new cc.Node();
        // var newSprite = newNode.addComponent(cc.Sprite);
        // newSprite.spriteFrame = testNode.getComponent(cc.Sprite).spriteFrame;
        // newNode.parent = this.node;
        // var positon = cc.v2(newNode.x, newNode.y);
        // newNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
        //     var delta = event.touch.getDelta();
        //     newNode.x += delta.x;
        //     newNode.y += delta.y;
        //     positon.x += delta.x;
        //     positon.y += delta.y;
        // }, newNode);
        // var that = this;
        // newNode.on(cc.Node.EventType.TOUCH_END, function (event) {
        //     var newNode2 = new cc.Node();
        //     newNode2.x = positon.x;
        //     newNode2.y = positon.y;
        //     var newSprite2 = newNode2.addComponent(cc.Sprite);
        //     newSprite2.spriteFrame = testNode.getComponent(cc.Sprite).spriteFrame;
        //     that.node.addChild(newNode2);
        //     newNode.destroy();
        // }, newNode);
        cc.Utl.loadPrefab('TestBuilding', null, this.node);
    },

    // called every frame
    // update: function (dt) {},
});
