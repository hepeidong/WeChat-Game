

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.Utl.popu(this.node);
        this.init();
    },

    start () {

    },

    init : function () {
        var mask = this.node.getChildByName('mask');
        mask.on(cc.Node.EventType.TOUCH_END, function () {
            cc.Utl.closeView('Card');
        }, mask);
        var layer = this.node.getChildByName('layer');
        layer.on(cc.Node.EventType.TOUCH_START, function () {}, layer);

        // var cardList = layer.getChildByName('cardList');
        // cardList.getComponent('ListViewCtrl').initialize(null);

        this.notExcBtn = layer.getChildByName('notExcBtn');//未兑换按钮
        this.alreadyExcBtn = layer.getChildByName('alreadyExcBtn');//以兑换按钮
        this.alreadyOvdBtn = layer.getChildByName('alreadyOvdBtn');//已过期按钮

        cc.Utl.addClickEvent(this.notExcBtn, this.node, 'Card', 'onNotExcBtnClicked');
        cc.Utl.addClickEvent(this.alreadyExcBtn, this.node, 'Card', 'onAlreadyExBtnClicked');
        cc.Utl.addClickEvent(this.alreadyOvdBtn, this.node, 'Card', 'onAlreadyOvdBtnClicked');
    },

    onNotExcBtnClicked: function (event) {

    },

    onAlreadyExBtnClicked: function (event) {

    },

    onAlreadyOvdBtnClicked: function (event) {
        
    }

    // update (dt) {},
});
