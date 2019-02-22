/**
 * 家具组件
 */

cc.FurnitureType = cc.Enum({
    Ground: 0,
    Wall: 1,
    Currency: 2
 });

cc.Class({
    extends: cc.Component,

    properties: {
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
        collisionNodeNum: {
            default: 0,
            tooltip: '碰撞节点数量',
            visible: function(){ return this.isCurrency; },
            serializable: function(){ return this.isCurrency; }
        },
        furnitureType: {
            default: cc.FurnitureType.Ground,
            type: cc.FurnitureType,
            tooltip: '家具类型：Ground地面物，Wall墙饰，Currency通用物'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.itemId = 0;
        this.node.furnitureType = this.furnitureType;
        this.node.isFixed = false;//家具是否被固定在砖块上
        if (this.isCurrency) {
            this.node.overstep = true;//家具是否越界
        }
    },

    start () {
        this.node.zIndex = cc.Gl.OriginZIndexOfFurniture;
    },

    onButtonClicked: function (event) {
        
    }

    // update (dt) {},
});
