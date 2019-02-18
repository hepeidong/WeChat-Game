/**
 * 家具组件
 */

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
        // originPosition: cc.Vec2,
        // originBrickId: 0,
        /**
         * 家具放在地板或者墙壁上时，是否有一部分在地板或者墙壁上，如果是，则摆放在地板上或者墙壁上的动作失效
         * 不对相关的数据进行更新，仅仅只是暂时吸附在这个位置上，并提示玩家摆放位置不合理
         */
        // _isTrans: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.itemId = 0;
        this.node.typeId = 0;
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
