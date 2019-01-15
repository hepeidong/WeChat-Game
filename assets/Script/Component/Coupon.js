

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

    init: function () {
        var mask = this.node.getChildByName('mask');
        mask.on(cc.Node.EventType.TOUCH_END, function () {
            cc.Utl.closeView('Coupon');
        }, mask);
        var layer = this.node.getChildByName('layer');
        layer.on(cc.Node.EventType.TOUCH_START, function () {}, layer);

        this.notUseBtn = layer.getChildByName('notUseBtn');//未使用按钮
        this.alreadyUseBtn = layer.getChildByName('alreadyUseBtn');//已使用按钮
        this.alreadyOvdBtn = layer.getChildByName('alreadyOvdBtn');//已过期按钮
        this.alreadyHXBtn = layer.getChildByName('alreadyHXBtn');//已核销按钮

        cc.Utl.addClickEvent(this.notUseBtn, this.node, 'Coupon', 'onNotUseBtnClicked');
        cc.Utl.addClickEvent(this.alreadyUseBtn, this.node, 'Coupon', 'onAlreadyUseBtnClicked');
        cc.Utl.addClickEvent(this.alreadyOvdBtn, this.node, 'Coupon', 'onAlreadyOvedBtnClicked');
        cc.Utl.addClickEvent(this.alreadyHXBtn, this.node, 'Coupon', 'onAlreadyHXBtnClicked');
    },

    onNotUseBtnClicked: function (event) {

    },

    onAlreadyUseBtnClicked: function (event) {

    },

    onAlreadyOvedBtnClicked: function (event) {

    },

    onAlreadyHXBtnClicked: function (event) {
        
    }

    // update (dt) {},
});
