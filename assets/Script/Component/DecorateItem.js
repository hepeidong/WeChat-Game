

cc.Class({
    extends: cc.Component,

    properties: {
        itemId: 0,
        _isAdd: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initialize();
        this._on();
    },

    initialize () {
        this.originPos = {x: this.node.x, y: this.node.y};//家具在菜单栏上的原始位置
        this.deltaY = 0;//装饰物移动的距离
        this.fingerDeltaY = 0;//手指移动的垂直距离
        this.updateTimer = 0;//
        this.updateIntervar = 0.2;//这在真回调中，为0.5秒
        this.touchStart = false;//触摸开始
        this.furnishable = false;//是否可以摆设家具
        this.touchCancelNum = 0;//touch_cancel触摸回调执行次数
        this.touchMove = false;
    },

    setContentSize() {
        this.sprt_item = this.node.getChildByName('sprt_item');
        this.node.setContentSize(this.sprt_item.getContentSize());
    },

    _on: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            this.touchStart = true;
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            this.touchMove = true;
            var delta = event.touch.getDelta();
            //如果手指是向上移动的，并且手指左右移动的范围比较小，则认为玩家需要拖动家具放到房间里
            this.fingerDeltaY += (delta.y > 0 && Math.abs(delta.x) < 10) ? delta.y : 0;
            //玩家手指向上拖动，达到摆设家具的条件
            if (this.fingerDeltaY >= 5) {
                this.fingerDeltaY = 0;
                this.node.parent.parent.getComponent(cc.Mask).enabled = false;
                //让滑动视图停止滑动
                cc.find('Canvas').getChildByName('DecorateList').getComponent(cc.ScrollView).horizontal = false;
                this.furnishable = true;
            }
            if (!this.furnishable) return;
            
            //家具移动的垂直距离
            this.deltaY += delta.y;
            //家具被移出工具栏
            if (this.isTransboundary()) {
                
                //新建菜单
                if (!this._isAdd) {
                    this.node.parent.parent.getComponent(cc.Mask).enabled = true;
                    this._isAdd = true;
                    //让家具菜单不可见
                    this.sprt_item.opacity = 0;

                    this.newNode = cc.instantiate(this.decNode);
                    this.newNode.parent = cc.find('Canvas');
                    var worldPos = this.node.convertToWorldSpaceAR(this.sprt_item.position);
                    this.newNode.position = cc.find('Canvas').convertToNodeSpaceAR(worldPos);
                    this.newNode.x = this.newNode.x + this.node.getContentSize().width / 2;
                    this.addFurniture();

                    //让家具菜单回到原位
                    this.sprt_item.x = this.originPos.x;
                    this.sprt_item.y = this.originPos.y;
                }
                else {
                    this.newNode.x += delta.x;
                    this.newNode.y += delta.y;
                }
            }
            else {
                this.sprt_item.y += delta.y;
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function(event){
            
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event){
            if (this._isAdd) {
                this.deltaY = 0;
                this.newNode = null;
                this._isAdd = false;
                this.furnishable = false;
                this.setFurniturePos();
                cc.find('Canvas').getChildByName('DecorateList').getComponent(cc.ScrollView).horizontal = true;
                var fadeTo = cc.fadeTo(0.3, 255);
                this.sprt_item.runAction(fadeTo);
            }
        }, this);
    },

    onInitItem: function (s, d) {
        cc.Utl.loadPrefab(cc.GameFile.readJS_DecorateMap('Furniture')[d].type, (node) => {
            this.decNode = node;//装饰物节点
        });
    },

    isTransboundary: function () {
        return this.deltaY >= (this.node.parent.getContentSize().height / 2 - this.node.y + this.node.getContentSize().height / 2);
    },

    addFurniture: function () {
        cc.find('Canvas').getChildByName('Room').getChildByName('FloorLayer').getComponent('FloorLayer').addFurniture(this.newNode);
    },

    setFurniturePos: function () {
        cc.find('Canvas').getChildByName('Room').getChildByName('FloorLayer').getComponent('FloorLayer').setFurniturePos();
    },

    start () {

    },

    update (dt) {
        if (this.touchStart) {
            this.updateTimer += dt;
            if (this.updateTimer >= this.updateIntervar) {
                this.updateTimer = 0;
                if (!this.isTransboundary()) {
                    if (!this.touchMove) {
                        this.touchStart = false;
                        this.furnishable = false;
                        this.deltaY = 0;
                        var moveTo = cc.moveTo(0.2, this.originPos.x, this.originPos.y);
                        this.sprt_item.runAction(moveTo);
                    }
                    else {
                        this.touchMove = false;
                    }
                }
            }
        }
    },
});
