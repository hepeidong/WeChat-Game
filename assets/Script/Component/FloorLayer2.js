//第一行砖块的坐标
var coordList = [
    // {x: -339, y: 320}, {x: -229, y: 320}, {x: -119, y: 320}, {x: -9, y: 320}, {x: 101, y: 320}, {x: 211, y: 320}, {x: 321, y: 320}
]

var originCoord = {x: 321, y: 320}

cc.Class({
    extends: cc.Component,

    properties: {
       brick: cc.Prefab,
       isMove: true
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.row = 7;//行
        this.rank = 7;//列

        if (cc.GamePlatform.IsWechatGame()) {
            this.distanceX = 96;//方块在x轴上的间隔
            this.distanceY = 96;//方块在y轴上的间隔
        }
        else {
            this.distanceX = 110//方块在x轴上的间隔
            this.distanceY = 110;//方块在y轴上的间隔
        }

        this.brickList = [];//方块列表
        this.gridList = [];//网格列表，最终是二维数组
        this.floorChildren = [];//所有子节点

        // this.scaleFloor();
        this.coordList();
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

    coordList: function () {
        for (let i = this.rank - 1; i >= 0; --i) {
            originCoord.x = i == (this.rank - 1) ? originCoord.x : originCoord.x - this.distanceX;
            coordList[i] = {x: originCoord.x, y: originCoord.y};
        }
    },

    //把墙旋转成倾斜状态
    rotationFloor: function () {
        if (cc.GamePlatform.IsWechatGame()) {
            this.node.x = 79;
            this.node.y = -258;
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

    scaleFloor: function () {
        console.log(cc.GamePlatform.GetScreenSize());
        console.log('scaleX: ' + cc.GamePlatform.GetScreenScaleX() + ' scaleY: ' + cc.GamePlatform.GetScreenScaleY());
        this.node.scaleX = cc.GamePlatform.GetScreenScaleX();
        this.node.scaleY = cc.GamePlatform.GetScreenScaleY();
    },

    //铺设砖块
    brickLaying: function () {
        var y = coordList[0].y;
        for (let i = 0; i < this.row; ++i) {
            y = i == 0 ? y : y - this.distanceY;
            this.gridList[i] = [];
            for (let j = this.rank - 1; j >= 0; --j) {
                var x = coordList[j].x;
                var newBrick = cc.instantiate(this.brick);
                newBrick.x = x;
                newBrick.y = y;
                this.node.addChild(newBrick);
                //id是从右向左数，也就是说 coordList[coordList.lenght - 1]的id为0
                var id = this.rank - j - 1 + this.row * i;
                newBrick.getComponent('Brick').id = id;
                //存储二维数组的下标n,m
                this.brickList[id] = {n: i, m: j, node: newBrick};
                //把线性存储的地砖变成网格状存储，存储id
                this.gridList[i][j] = id;
            }
        }
        this.floorChildren = this.node.getChildren();
    },

    //计算相邻地砖id
    adjacentBrickId: function (n, m) {
        var brickIDs = [];
        if ((n - 1) >= 0) {
            let a = n - 1;
            this.adjacentElement(brickIDs, a, m);
        }
        this.adjacentElement(brickIDs, n, m);
        if ((n + 1) < this.gridList.length) {
            let a = n + 1;
            this.adjacentElement(brickIDs, a, m);
        }
        return brickIDs;
    },

    adjacentElement: function (brickIDs, a, m) {
        var id = cc.GameData.Get(cc.Gl.Key_BrickId);
        for (let i = 0; i < 3; ++i) {
            var b = m - 1 + i;
            if (this.gridList[a].length >= (b + 1)) {
                
                if (this.gridList[a][b] != id) {
                    brickIDs.push(this.gridList[a][b]);
                }
            }
        }
    },

    //设置家具
    setFurniture: function (node) {
        this.furniture = node;
        this.furniture.parent = cc.find('Canvas');
        if (cc.GameData.Get(cc.Gl.Key_SBId) != null) {
            this.setFurniturePos(cc.GameData.Get(cc.Gl.Key_SBId));
            cc.GameData.Set(cc.Gl.Key_BrickId, cc.GameData.Get(cc.Gl.Key_SBId));
            cc.GameData.RemoveItem(cc.Gl.Key_SBId);
        }
        else {
            var brickIDs = [8, 9, 10, 15, 16, 17, 22, 23, 24];//初始放置家具的方块,存储的是方块的id
            var flag = false;//是否存在空闲的方块
            for (let i = 0; i < brickIDs.length; ++i) {
                var brick = this.floorChildren[brickIDs[i]].getComponent('Brick');
                //如果方块上面没有家具没有
                if (!brick.isFurniture) {
                    flag = true;
                    this.setFurniturePos(brick.id);
                    cc.GameData.Set(cc.Gl.Key_BrickId, brick.id);
                    break;
                }
            }
            if (!flag) {
                var brick = this.floorChildren[brickIDs[0]].getComponent('Brick');
                this.setFurniturePos(brick.id);
                cc.GameData.Set(cc.Gl.Key_BrickId, brick.id);
            }
        }
        
        // this.row = Math.ceil(this.node.getContentSize().height / this.furniture.getContentSize().height);
        // this.rank = Math.ceil(this.node.getContentSize().width / this.furniture.getContentSize);

    },

    //设置家具位置
    setFurniturePos: function (id) {
        if (id == null) return;
        if (this.furniture == null) return;
        //转化为相对于砖块父节点（即地板节点）的世界坐标
        var worldPos = this.node.convertToWorldSpaceAR(this.brickList[id].node.position);
        var pos = this.furniture.parent.convertToNodeSpaceAR(worldPos);
        //设置家具的位置
        this.furniture.x = pos.x;
        this.furniture.y = pos.y;
    },

    //触摸区域是否在家具内
    isTouchRegionInFurniture:function (x, y) {
        var worldPos = this.furniture.parent.convertToWorldSpaceAR(this.furniture.position);
        var pos = this.node.convertToNodeSpaceAR(worldPos);
        var rect = cc.Utl.rectRegion(pos.x, pos.y, this.furniture);
        if (x > rect.x1 && x < rect.x2 && y > rect.y1 && y < rect.y2) {
            return true;
        }
        return false;
    },

    onStartEvent: function (event) {
        // console.log(cc.GameData.Get(cc.Gl.Key_BrickId));
        // console.log('a');
        // console.log(this.node.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(event.touch.getLocation())));
        if (this.furniture != null) {
            var pos = this.node.convertToNodeSpaceAR(event.touch.getLocation());
            if (this.isTouchRegionInFurniture(pos.x, pos.y)) {
                this.isMove = true;
            }
            else {
                this.isMove = false;
            }
        }
    },

    onMoveEvent: function (event) {
        if (this.isMove == false) return;
        var delta = event.touch.getDelta();
        if (this.furniture != null) {
            //移动家具位置
            this.furniture.x += delta.x;
            this.furniture.y += delta.y;
            //转化为相对于父节点世界坐标
            cc.GameData.Set(cc.Gl.Key_FWP, this.furniture.parent.convertToWorldSpaceAR(this.furniture.position));

            var id = cc.GameData.Get(cc.Gl.Key_BrickId);
            var adjacId = this.adjacentBrickId(this.brickList[id].n, this.brickList[id].m);
            for (let i = 0; i < adjacId.length; ++i) {
                var brick = this.floorChildren[adjacId[i]].getComponent('Brick');
                if (!brick.isTouchRegion()) {
                    brick.showColorBlock(false);
                }
                else {
                    brick.showColorBlock(true);
                    break;
                }
            }
        }
    },

    onEndEvent: function (event) {
        var id = cc.GameData.Get(cc.Gl.Key_BrickId);
        this.setFurniturePos(id);
    },

    onCancelEvent: function (event) {
        var id = cc.GameData.Get(cc.Gl.Key_BrickId);
        this.setFurniturePos(id);
    }

    // update (dt) {},
});
