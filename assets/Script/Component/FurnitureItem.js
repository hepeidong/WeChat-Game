

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
        this.deltaY = 0;//装饰物移动的距离
        this.fingerDeltaY = 0;//手指移动的垂直距离
        this.updateTimer = 0;//
        this.updateIntervar = 0.5;//这在真回调中，为0.5秒
        this.touchStart = false;//触摸开始
        this.furnishable = false;//是否可以摆设家具
        this.touchCancelNum = 0;//touch_cancel触摸回调执行次数
    },

    _on: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            this.touchStart = true;
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            var delta = event.touch.getDelta();
            //如果手指是向上移动的，并且手指左右移动的范围比较小，则认为玩家需要拖动家具放到房间里
            this.fingerDeltaY += (delta.y > 0 && Math.abs(delta.x) < 10) ? delta.y : 0;
            //玩家手指向上拖动，达到摆设家具的条件
            if (this.fingerDeltaY >= 5) {
                this.fingerDeltaY = 0;
                //让滑动视图停止滑动
                cc.find('Canvas').getChildByName('decorateList').getComponent(cc.ScrollView).horizontal = false;
                this.furnishable = true;
            }
            if (!this.furnishable) return;
            this.furnishable = false;
            if (!this.newNode) {
                this.newNode = cc.instantiate(this.furniture);
                this.newNode.parent = cc.find('Canvas');
                var worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
                this.newNode.position = cc.find('Canvas').convertToNodeSpaceAR(worldPos);
                this.newNode.x = this.newNode.x + this.node.getContentSize().width / 2;
                this.originPos.x = this.newNode.x;
                this.originPos.y = this.newNode.y;
            }
            
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
            console.log('touch_end');
            // if (this.updateTimer < this.updateIntervar) {
            //     this.touchStart = false;
            //     this.updateTimer = 0;
            // }
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event){
            console.log('touch_cancel');
            this.touchCancelNum++;
            if (this._isAdd) {
                this.deltaY = 0;
                this.newNode = null;
                this._isAdd = false;
                this.furnishable = false;
                this.setFurniturePos();
                cc.find('Canvas').getChildByName('decorateList').getComponent(cc.ScrollView).horizontal = true;
            }
            //家具没有被移出工具栏，手指就释放了，则让家具单回原位，并删除
            else if (this.deltaY < (this.node.parent.getContentSize().height / 2 - this.node.y)) {
                if (this.touchCancelNum == 2) {
                    this.touchCancelNum = 0;
                    console.log('没有移出工具栏');
                }
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
        this.newNode.getComponent('Furniture').setHandler(cc.find('Canvas'), 'Room', 'onEdit');
        cc.find('Canvas').getChildByName('floorLayer').getComponent('FloorLayer').addFurniture(this.newNode);
    },

    setFurniturePos: function () {
        cc.find('Canvas').getChildByName('floorLayer').getComponent('FloorLayer').setFurniturePos();
    },

    start () {

    },

    update (dt) {
        // if (this.touchStart) {
        //     this.updateTimer += dt;
        //     if (this.updateTimer >= this.updateIntervar) {
        //         this.updateTimer = 0;
        //         this.furnishable = true;
        //         this.touchStart = false;
        //     }
        // }
    },
});
