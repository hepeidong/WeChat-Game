//第一行砖块的坐标
var coordList = [
    {x: -339, y: 320}, {x: -229, y: 320}, {x: -119, y: 320}, {x: -9, y: 320}, {x: 101, y: 320}, {x: 211, y: 320}, {x: 321, y: 320}
]

cc.Class({
    extends: cc.Component,

    properties: {
       brick: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.row = 7;//行
        this.rank = 7;//列
        this.distanceY = 110;//坐标点在y轴上的距离
        this.brickList = [];//方块列表
        this.scaleFloor();
        this.rotationFloor();
        this.brickLaying();
        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);
    
        this.furniture = null; //家具
    },

    start () {

    },

    scaleFloor: function () {
        console.log(cc.GamePlatform.GetScreenSize());
        console.log('scaleX: ' + cc.GamePlatform.GetScreenScaleX() + ' scaleY: ' + cc.GamePlatform.GetScreenScaleY());
        this.node.scaleX = cc.GamePlatform.GetScreenScaleX();
        this.node.scaleY = cc.GamePlatform.GetScreenScaleY();
    },

    //铺设砖块
    brickLaying: function () {
        var y = coordList[0].y;
        for (let i = 0; i < this.rank; ++i) {
            y = i == 0 ? y : y - this.distanceY;
            for (let j = 0; j < this.row; ++j) {
                var x = coordList[j].x;
                var newBrick = cc.instantiate(this.brick);
                newBrick.x = x;
                newBrick.y = y;
                // this.node.addChild(newBrick);
                newBrick.parent = this.node;
                //id是从右向左数，也就是说coordList[coordList.lenght - 1]的id为0
                var id = this.row - j - 1 + this.rank * i;
                newBrick.getComponent('Brick').id = id;
                this.brickList[id] = newBrick;
            }
        }
    },

    //把墙旋转成倾斜状态
    rotationFloor: function () {
        if (cc.GamePlatform.IsWechatGame()) {
            this.node.x = 60;
            this.node.y = -280;
            //角度为负数，方向为逆时针旋转
            this.node.rotationY = -35.8;
            this.node.rotationX = -54.3;
            return;
        }
        this.node.x = 0;
        this.node.y = -268;
        this.node.rotationY = -30.8;
        this.node.rotationX = -59.5;
    },

    //设置家具
    setFurniture: function (node) {
        this.furniture = node;
        this.furniture.parent = cc.find('Canvas');
        // this.row = Math.ceil(this.node.getContentSize().height / this.furniture.getContentSize().height);
        // this.rank = Math.ceil(this.node.getContentSize().width / this.furniture.getContentSize);

    },

    //设置家具位置
    setFurniturePos: function () {
        var id = cc.GameData.Get(cc.Gl.Key_BrickId);
        if (id == null) return;
        //转化为相对于砖块父节点（即地板节点）的世界坐标
        var worldPos = this.node.convertToWorldSpaceAR(this.brickList[id].position);
        var pos = this.furniture.parent.convertToNodeSpaceAR(worldPos);
        //设置家具的位置
        this.furniture.x = pos.x;
        this.furniture.y = pos.y;
        console.log(pos);
    },

    onStartEvent: function (event) {
        // console.log(cc.GameData.Get(cc.Gl.Key_BrickId));
        // console.log('a');
    },

    onMoveEvent: function (event) {
        var delta = event.touch.getDelta();
        if (this.furniture != null) {
            //移动家具位置
            this.furniture.x += delta.x;
            this.furniture.y += delta.y;
            //转化为相对于父节点世界坐标
            cc.GameData.Set(cc.Gl.Key_FWP, this.furniture.parent.convertToWorldSpaceAR(this.furniture.position));
            for (let key in this.node.children) {
                var brick = this.node.children[key].getComponent('Brick');
                if (!brick.isTouchRegion()) {
                    brick.showColorBlock(false);
                }
                else {
                    brick.getComponent('Brick').showColorBlock(true);
                    break;
                }
            }
        }
    },

    onEndEvent: function (event) {
        this.setFurniturePos();
    },

    onCancelEvent: function (event) {
        this.setFurniturePos();
    }

    // update (dt) {},
});
