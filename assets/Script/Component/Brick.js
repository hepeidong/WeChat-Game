

cc.Class({
    extends: cc.Component,

    properties: {
        isFurniture: false, //是否有家具
        id: 0,
        furnitureId: -1,//家具id
        beInvasion: false,//是否有另外别的家具入侵
        sysComp: {
            default: 'string',
            tooltip: '从属于哪个子系统'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent(cc.RigidBody).enabledContactListener = true;
        this.colorBlock = this.node.getChildByName('colorBlock');
        // this.colorBlock.active = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);

        // if (cc.GamePlatform.IsWechatGame()) {
        //     this.node.width = 95;
        //     this.node.height = 95;
        //     this.colorBlock.width = 95;
        //     this.colorBlock.height = 95;
        // }
    },

    // onBeginContact: function (contact, selfCollider, otherCollider) {
    //     console.log('onBeginContact 发生碰撞');
    // },

    onCollisionEnter: function (other, self) {
        // console.log('onCollisionEnter 发生碰撞' + this.id);
        //发生一个回调
        cc.Utl.addEventHandler(this.node.parent, this.sysComp, 'onEnterBrick', {furniture: other.node, id: this.id});
        cc.GameData.Set(cc.Gl.Key_BrickId, this.id);
        this.colorBlock.active = true;
    },

    // onCollisionStay: function (other, self) {
    //     // this.colorBlock.active = true;
    // },

    onCollisionExit: function (other, self) {
        // console.log('onCollisionExit 碰撞结束' + this.id);
        cc.Utl.addEventHandler(this.node.parent, this.sysComp, 'onLeaveBrick', {furniture: other.node, id: this.id});
        this.colorBlock.active = false;
    },

    start () {
        
    },

    //显示砖块色块
    showColorBlock: function (show) {
        this.colorBlock.active = show;
    },

    //是否在触摸范围内
    isTouchRegion: function () {
        // var worldPos = cc.GameData.Get(cc.Gl.Key_FWP);
        // if (worldPos != null) {
        //     var pos = this.node.convertToNodeSpaceAR(cc.GameData.Get(cc.Gl.Key_FWP));
        //     //计算整个方块的触摸范围，必须传入方块这个节点的原点，也就是锚点（0，0）
        //     var rect = cc.Utl.rectRegion(0, 0, this.node);
        //     //判断是否在触摸区域内
        //     if (pos.x > rect.x1 && pos.x < rect.x2 && pos.y > rect.y1 &&  pos.y < rect.y2) {
        //         cc.GameData.Set(cc.Gl.Key_BrickId, this.id);
        //         return true;
        //     }
        //     return false;
        // }

        var worldPos = cc.GameData.Get(cc.Gl.Key_FWP);
        if (worldPos != null) {
            var pos = this.node.convertToNodeSpaceAR(worldPos);
            var dia = cc.Utl.diamRegion(0, 0, this.node);
            var flag = cc.Utl.isInDiamRegion(pos, dia);
            // console.log('id: ' + this.id + ' ' + flag)
            if (flag == true) {
                // this.colorBlock.active = true;
                cc.GameData.Set(cc.Gl.Key_BrickId, this.id);
            }
            return flag;
        }
        return false;
    },

    onStartEvent: function (event) {
        // console.log(this.id);
        if (!this.isFurniture) {
            
            
        }
        else if (cc.GameData.Get(cc.Gl.Key_EditMode)) {//如果处于编辑模式
            cc.Utl.addEventHandler(this.node.parent, this.sysComp, 'onEdit', this.furnitureId);
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
