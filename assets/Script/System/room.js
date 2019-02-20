

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.FloorLayer = this.node.getChildByName('FloorLayer');
        this.DecorateList = this.node.getChildByName('DecorateList');
        //初始化存储房间里家具信息的表
        if (!cc.GameData.isExist(cc.Gl.S_Key_Furnitures)) {
            cc.GameData.Set(cc.Gl.S_Key_Furnitures, [], true);
        }
        //初始化编辑模式为false
        cc.GameData.Set(cc.Gl.Key_EditMode, false);
    },

    start () {

    },

    onButton: function (event) {
        // console.log('Room onButton');
        cc.GameData.Set(cc.Gl.Key_EditMode, !cc.GameData.Get(cc.Gl.Key_EditMode));
        this.DecorateList.active = !this.DecorateList.active;
    }

    // update (dt) {},
});
