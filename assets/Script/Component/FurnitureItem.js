

cc.Class({
    extends: cc.Component,

    properties: {
        furniture: cc.Prefab,
        _isAdd: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initialize();
        this._on();
    },

    initialize () {
        this.originPos = {x: 0, y: 0};//家具在菜单栏上的原始位置
        this.deltaY = 0;
        this.updateTimer = 0;//
        this.updateIntervar = 0.5;//这在真回调中，为0.5秒
        this.touchStart = false;//触摸开始
        this.furnishable = false;//是否可以摆设家具
    },

    _on: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            this.touchStart = true;
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            this.touchStart = false;
            this.updateTimer = 0;
            if (this.furnishable == false) return;
            
            if (!this.newNode) {
                this.newNode = cc.instantiate(this.furniture);
                this.newNode.parent = cc.find('Canvas');
                var worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
                this.newNode.position = cc.find('Canvas').convertToNodeSpaceAR(worldPos);
                this.newNode.x = this.newNode.x + this.node.getContentSize().width / 2;
                this.originPos.x = this.newNode.x;
                this.originPos.y = this.newNode.y;
            }
            
            var delta = event.touch.getDelta();
            //家具移动的垂直距离
            this.deltaY += delta.y;
            //家具被移出工具栏
            if (this.deltaY >= (this.node.parent.getContentSize().height / 2 - this.node.y)) {
                this.newNode.x += delta.x;
                this.newNode.y += delta.y;
                if (!this._isAdd) {
                    this._isAdd = true;
                    this.addFurniture();
                }
            }
            else {
                this.newNode.y += delta.y;
            }
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
            
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event){
            this.deltaY = 0;
           if (this._isAdd) {
               this.newNode = null;
               this._isAdd = false;
               this.furnishable = false;
               this.setFurniturePos();
           }
           //家具没有被移出工具栏，手指就释放了，则让家具单回原位，并删除
           else {
            //    if (this.furnishable) {
            //        var moveTo = cc.moveTo(0.2, this.originPos.x, this.originPos.y);
            //        var callFunc = cc.callFunc(() => {
            //            this.initialize();
            //        }, this);
            //        var seq = cc.sequence(moveTo, callFunc);
            //        if (this.newNode) {
            //            this.newNode.runAction(seq);
            //        }
            //    }
           }
        }.bind(this), this);
    },

    addFurniture: function () {
        this.newNode.getComponent('Furniture').setHandler(cc.find('Canvas'), 'room', 'onEdit');
        cc.find('Canvas').getChildByName('floorLayer').getComponent('FloorLayer').addFurniture(this.newNode);
    },

    setFurniturePos: function () {
        cc.find('Canvas').getChildByName('floorLayer').getComponent('FloorLayer').setFurniturePos();
    },

    start () {

    },

    update (dt) {
        if (this.touchStart) {
            this.updateTimer += dt;
            if (this.updateTimer >= this.updateIntervar) {
                this.updateTimer = 0;
                this.furnishable = true;
                this.touchStart = false;
            }
        }
    },
});
