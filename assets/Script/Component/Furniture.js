/**
 * 家具组件
 */

 var typeId = cc.Enum({
    Refrigerator: 0,
    Hearth: 1,
    Table: 2
 });

cc.Class({
    extends: cc.Component,

    properties: {
        // itemId: 0,
        // typeId: 0,
        // isFixed: false, //家具是否被固定在砖块上
        fixedBtn: cc.Node,
        isCurrency: {
            default: false,
            tooltip: '是否是通用饰品'
        },
        brickNum: {
            default: 0,
            tooltip: '家具占据的砖块数',
            visible: function(){ return !this.isCurrency; },
            serializable: function(){ return !this.isCurrency; }
        },
        furnitureType: {
            default: typeId.Refrigerator,
            type: typeId,
            tooltip: '家具类型：Refrigerator冰箱，Hearth灶台，Table桌子'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.itemId = 0;
        this.node.furnitureType = this.furnitureType;
    },

    start () {
        this.node.zIndex = cc.Gl.OriginZIndexOfFurniture;
    },

    onButtonClicked: function (event) {
        // this.addEventHandler({});

        // this._off();
        // if (this.isFurniture == false) {
        //     this.isFixed = true;
        //     this.node.zIndex = cc.GameData.Get(cc.Gl.Key_ZIndex);
        //     this.brick.getComponent('Brick').isFurniture = true;
        //     this.isFurniture = false;
        //     this.fixedBtn.active = false;
        // }
    }

    // update (dt) {},
});
