

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.floorLayer = this.node.getChildByName('floorLayer');
        this.decorateList = this.node.getChildByName('decorateList');
        //初始化存储房间里家具信息的表
        cc.GameData.Set(cc.Gl.S_Key_Furnitures, [], true);
        //初始化编辑模式为false
        cc.GameData.Set(cc.Gl.Key_EditMode, false);
    },

    start () {

    },

    //编辑家具的回调
    onEdit: function (s, d) {
        this.floorLayer.getComponent('FloorLayer').setFurniture(d.furniture);
    },

    onButton: function (event) {
        // console.log('Room onButton');
        cc.GameData.Set(cc.Gl.Key_EditMode, !cc.GameData.Get(cc.Gl.Key_EditMode));
        this.decorateList.active = !this.decorateList.active;
    }

    // update (dt) {},
});
