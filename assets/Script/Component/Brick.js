

cc.Class({
    extends: cc.Component,

    properties: {
        isFurniture: false, //是否有家具
        id: 0,
        clickStatus: false //选中状态
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.colorBlock = this.node.getChildByName('colorBlock');
        // this.colorBlock.active = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);

        if (cc.GamePlatform.IsWechatGame()) {
            this.node.width = 95;
            this.node.height = 95;
            this.colorBlock.width = 95;
            this.colorBlock.height = 95;
        }
    },

    start () {

    },

    //显示砖块色块
    showColorBlock: function (show) {
        this.colorBlock.active = show;
    },

    //是否在触摸范围内
    isTouchRegion: function () {
        var worldPos = cc.GameData.Get(cc.Gl.Key_FWP);
        if (worldPos != null) {
            var pos = this.node.convertToNodeSpaceAR(cc.GameData.Get(cc.Gl.Key_FWP));
            //计算整个方块的触摸范围，必须传入方块这个节点的原点，也就是锚点（0，0）
            var rect = cc.Utl.rectRegion(0, 0, this.node);
            //判断是否在触摸区域内
            if (pos.x > rect.x1 && pos.x < rect.x2 && pos.y > rect.y1 &&  pos.y < rect.y2) {
                cc.GameData.Set(cc.Gl.Key_BrickId, this.id);
                return true;
            }
            return false;
        }
    },

    onStartEvent: function (event) {
        // console.log('id: ' + this.id);
        // this.colorBlock.active = true;
        if (!this.isFurniture) {
            this.clickStatus = true;
            cc.GameData.Set(cc.Gl.Key_SBId, this.id);
            this.colorBlock.active = true;
        }
    },

    onMoveEvent: function (event) {
        // if (!this.isTouchRegion()) {
        //     this.colorBlock.active = false;
        // }
        // else {
        //     // console.log('不在触摸范围内');
        //     this.colorBlock.active = true;
        // }
    },

    onEndEvent: function (event) {
        // this.colorBlock.active = false;
    },

    onCancelEvent: function (event) {
        // this.colorBlock.active = false;
    }

    // update (dt) {},
});
