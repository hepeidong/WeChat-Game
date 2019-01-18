

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.floorLayer = this.node.getChildByName('floorLayer');
    },

    start () {

    },

    onButton: function (event) {
        cc.Utl.loadPrefab('TestBuilding', this.floorLayer, (newNode) => {
            // newNode.getComponent('Furniture').setGroupCoords(this.floorLayer.getComponent('FloorLayer').getCoords());
            // newNode.getComponent('Furniture').setFloor(this.floorLayer);
            // newNode.getComponent('Furniture').setCoord(1, 4);

            this.floorLayer.getComponent('FloorLayer2').setFurniture(newNode);
        });
    }

    // update (dt) {},
});
