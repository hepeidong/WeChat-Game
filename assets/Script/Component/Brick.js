

cc.Class({
    extends: cc.Component,

    properties: {
        isFurniture: false, //是否有家具
        id: 0,
        furnitureId: -1,//家具id
        isInvasion: false//是否有另外别的家具入侵
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
        this.colorBlock.active = true;
        cc.GameData.Set(cc.Gl.Key_BrickId, this.id);
        //如果发生碰撞时，砖块上已经有家具，则在结束碰撞时，不应该改变isFurniture
        if (this.isFurniture) {
            this.flag = true;
        }
    },

    onCollisionStay: function (other, self) {
        // this.colorBlock.active = true;
    },

    onCollisionExit: function (other, self) {
        // console.log('onCollisionExit 碰撞结束' + this.id);
        this.colorBlock.active = false;
        if (!this.flag) {
            this.isFurniture = false;
        }
        else {
            this.isInvasion = false;
            this.flag = false;
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
        if (!this.isFurniture) {
            
            
        }
        else if (cc.GameData.Get(cc.Gl.Key_EditMode)) {//如果处于编辑模式
            if (!this.isInvasion) {
                var furNode = cc.GameData.Get(cc.Gl.Key_FurNode);
                furNode[this.furnitureId].getComponent('Furniture').editFurniture();//开启单个家具的编辑模式
            }
            else {

            }
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
