

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
            newNode.getComponent('Building').setGroupCoords(this.floorLayer.getComponent('FloorLayer').getCoords());
            newNode.getComponent('Building').setCoord(1, 4);
        });
    }

    // update (dt) {},
});
