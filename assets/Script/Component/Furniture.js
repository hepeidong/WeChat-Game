

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
        this._on();
    },

    _on: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            // this._off();
            console.log(event.touch.getLocation());
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

    //编辑家具
    editFurniture: function () {
        this.isFixed = false;//家具不再固定在砖块上，可以编辑
        this.addEventHandler({furniture: this.node});
    },

    setHandler: function (target, component, handler) {
        this.target = target;
        this.component = component;
        this.handler = handler;
    },

    addEventHandler: function (data) {
        if (!this.eventHandler) {
            this.eventHandler = new cc.Component.EventHandler();
        }
        this.eventHandler.target = this.target;
        this.eventHandler.component = this.component;
        this.eventHandler.handler = this.handler;
        this.eventHandler.customEventData = data;
        this.eventHandler.emit([this.handler]);
    },

    onFixedPosEnter: function (s, d) {
        //设置家具的位置
        this.node.x = d.pos.x;
        this.node.y = d.pos.y;
        //当前砖块是否有家具
        if (d.isFurniture == false) {
            this.isFixed = true;
            this.node.zIndex = cc.GameData.Get(cc.Gl.Key_ZIndex);
            d.brick.getComponent('Brick').isFurniture = true;//当前建筑落入的砖块
            d.brick.getComponent('Brick').furnitureId = this.itemId;//在当前砖块上的家具编号
        }
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
