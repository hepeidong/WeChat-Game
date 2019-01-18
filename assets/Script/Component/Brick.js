

cc.Class({
    extends: cc.Component,

    properties: {
        isFurniture: false, //是否有家具
        id: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.colorBlock = this.node.getChildByName('colorBlock');
        this.colorBlock.active = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);
    },

    start () {

    },

    //显示砖块色块
    showColorBlock: function (show) {
        this.colorBlock.active = show;
    },

    //触摸区域
    touchRegion: function () {
        // var X1 = this.node.x - this.node.getContentSize().width / 2;
        // var X2 = this.node.getContentSize().width / 2 - this.node.x;
        // var Y1 = this.node.y - this.node.getContentSize().height / 2;
        // var Y2 = this.node.getContentSize().height / 2 - this.node.y;

        var X1 = 0 - this.node.getContentSize().width / 2;
        var X2 = this.node.getContentSize().width / 2;
        var Y1 = 0 - this.node.getContentSize().height / 2;
        var Y2 = this.node.getContentSize().height / 2;
        return {x1: X1, x2: X2, y1: Y1, y2: Y2};
    },

    //是否在触摸范围内
    isTouchRegion: function () {
        var worldPos = cc.GameData.Get(cc.Gl.Key_FWP);
        if (worldPos != null) {
            var pos = this.node.convertToNodeSpaceAR(cc.GameData.Get(cc.Gl.Key_FWP));
            var tr = this.touchRegion();
            //判断是否在触摸区域内
            if (pos.x > tr.x1 && pos.x < tr.x2 && pos.y > tr.y1 &&  pos.y < tr.y2) {
                // console.log('在触摸区域内');
                cc.GameData.Set(cc.Gl.Key_BrickId, this.id);
                return true;
            }
            return false;
        }
    },

    onStartEvent: function (event) {
        // console.log('id: ' + this.id);
        // this.colorBlock.active = true;
        this.isTouchRegion();
    },

    onMoveEvent: function (event) {
        if (!this.isTouchRegion()) {
            this.colorBlock.active = false;
        }
        else {
            // console.log('不在触摸范围内');
        }
    },

    onEndEvent: function (event) {
        this.colorBlock.active = false;
    },

    onCancelEvent: function (event) {
        this.colorBlock.active = false;
    }

    // update (dt) {},
});
