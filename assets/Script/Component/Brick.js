

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

        // if (cc.GamePlatform.IsWechatGame()) {
        //     this.node.width = 95;
        //     this.node.height = 95;
        //     this.colorBlock.width = 95;
        //     this.colorBlock.height = 95;
        // }
    },


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

    // update (dt) {},
});
