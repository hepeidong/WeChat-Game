

cc.Class({
    extends: cc.Component,

    properties: {
        itemId: 0,
        isFixed: false, //家具是否被固定在砖块上
        fixedBtn: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.node.rotationY = 0;
        // this.node.rotationX = 0;
        // this._on();
        
    },

    _on: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            // this._off();
            // console.log(event.touch.getLocation());
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(){}.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, function(){}.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(){}.bind(this), this);
    },

    _off: function () {
        this.node.off(cc.Node.EventType.TOUCH_START, function(){}.bind(this), this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, function(){}.bind(this), this);
        this.node.off(cc.Node.EventType.TOUCH_END, function(){}.bind(this), this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, function(){}.bind(this), this);
    },

    start () {
        this.node.zIndex = cc.Gl.OriginZIndexOfFurniture;
    },

    onFixed: function (s, d) {
        this.isFurniture = d.isFurniture;//当前砖块是否有家具
        this.brick = d.brick;//当前建筑落入的砖块（还没有点击确定是否要把家具固定在上面）
    },

    onButtonClicked: function (event) {
        this._off();
        if (this.isFurniture == false) {
            this.isFixed = true;
            this.node.zIndex = cc.GameData.Get(cc.Gl.Key_ZIndex);
            this.brick.getComponent('Brick').isFurniture = true;
            this.isFurniture = false;
            this.fixedBtn.active = false;
        }
    }

    // update (dt) {},
});
