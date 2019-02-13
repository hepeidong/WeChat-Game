

cc.Class({
    extends: cc.Component,

    properties: {
        editMode: false//编辑模式
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.floorLayer = this.node.getChildByName('floorLayer');
        //初始化存储房间里家具信息的表
        cc.GameData.Set(cc.Gl.S_Key_Furnitures, [], true);
    },

    start () {

    },

    //编辑家具的回调
    onEdit: function (s, d) {
        this.editMode = true;
        this.floorLayer.getComponent('FloorLayer').setFurniture(d.furniture);
    },

    onButton: function (event) {
        cc.Utl.loadPrefab('Table', this.floorLayer, (newNode) => {
            // newNode.getComponent('Furniture').setGroupCoords(this.floorLayer.getComponent('FloorLayer').getCoords());
            // newNode.getComponent('Furniture').setFloor(this.floorLayer);
            // newNode.getComponent('Furniture').setCoord(1, 4);
            newNode.getComponent('Furniture').setHandler(this.node, 'room', 'onEdit');
            this.floorLayer.getComponent('FloorLayer').addFurniture(newNode);
        });
    }

    // update (dt) {},
});
