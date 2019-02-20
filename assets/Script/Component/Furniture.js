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

        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);
    },

    start () {
        this.node.zIndex = cc.Gl.OriginZIndexOfFurniture;
    },

    onStartEvent: function (event) {

    },

    onMoveEvent: function (event) {

    },

    onEndEvent: function (event) {

    },

    onCancelEvent: function (event) {
        
    },

    onButtonClicked: function (event) {
        
    }

    // update (dt) {},
});
