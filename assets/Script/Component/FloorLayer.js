
cc.Class({
    extends: cc.Component,

    properties: {
       brick: cc.Prefab,
       isMove: true,
       component: 'String',
       _eventHandlers: [],//存放家具的回调函数
       _furnitureNum: 0//目前地板被摆放了几个家具（只记录玩家自己摆放的）
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.GameData.Set(cc.Gl.Key_FurNode, []);

        // if (cc.GamePlatform.IsWechatGame()) {
        //     this.distanceX = 96;//方块在x轴上的间隔
        //     this.distanceY = 96;//方块在y轴上的间隔
        // }
        // else {
            this.distanceX = 110 * cc.GamePlatform.GetScreenScaleX(); //方块在x轴上的间隔
            this.distanceY = 110 * cc.GamePlatform.GetScreenScaleY();//方块在y轴上的间隔
        // }

        this.brickList = [];//方块列表
        this.gridList = [];//网格列表，最终是二维数组
        this.floorChildren = [];//所有子节点

        // this.scaleFloor();
        // this.coordList();
        // this.rotationFloor();
        this.brickLaying();

        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);
    
        this.furniture = null; //家具
    },

    start () {

    },

    //计算coordList坐标
    coordList: function () {
        for (let i = this.rank - 1; i >= 0; --i) {
            cc.Gl.OriginCoord.x = i == (this.rank - 1) ? cc.Gl.OriginCoord.x : cc.Gl.OriginCoord.x - this.distanceX;
            cc.Gl.Coords[i] = {x: cc.Gl.OriginCoord.x, y: cc.Gl.OriginCoord.y};
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

    scaleFloor: function (brick) {
        // console.log(cc.GamePlatform.GetScreenSize());
        // console.log('scaleX: ' + cc.GamePlatform.GetScreenScaleX() + ' scaleY: ' + cc.GamePlatform.GetScreenScaleY());
        brick.scaleX = cc.GamePlatform.GetScreenScaleX() * cc.Gl.Brick_ScaleX;
        brick.scaleY = cc.GamePlatform.GetScreenScaleY() * cc.Gl.Brick_ScaleY;
    },

    //铺设砖块
    brickLaying: function () {
        
        for (let i = 0; i < cc.Gl.Coords.length; ++i) {
            this.gridList[i] = [];
            for (let j = cc.Gl.Coords[i].length - 1; j >= 0; --j) {
                var newNode = cc.instantiate(this.brick);
                this.scaleFloor(newNode);
                newNode.x = cc.Gl.Coords[i][j].x;
                newNode.y = cc.Gl.Coords[i][j].y;
                newNode.zIndex = cc.Gl.OriginZIndexOfFloor + j + i;
                this.node.addChild(newNode);
                var id = cc.Gl.Coords[i].length - j - 1 + cc.Gl.Coords.length * i;
                newNode.getComponent('Brick').id = id;
                //存储二维数组的下标n,m
                this.brickList[id] = {n: i, m: j, node: newNode};
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

    //设置回调函数
    itemEventHandler: function (item, itemID, customED) {
        // console.log('itemEventHandler')

        if (!this._eventHandlers[itemID]) {
            this._eventHandlers[itemID] = new cc.Component.EventHandler();
        }
        this._eventHandlers[itemID].target = item;
        this._eventHandlers[itemID].component = this.component;
        this._eventHandlers[itemID].customEventData = customED;
        this._eventHandlers[itemID].handler = 'onFixedPosEnter';
        this._eventHandlers[itemID].emit(['onFixedPosEnter']);
    },

    //缓存家具信息，参数意义：家具编号，在哪块砖上，是什么家具
    storageFurniture: function (fId, bId, tId) {
        let furList = cc.GameData.Get(cc.Gl.S_Key_Furnitures);
        furList.push({furnitureId: fId, brickId: bId, typeId: tId});
        cc.GameData.Set(cc.Gl.S_Key_Furnitures, furList, true);
    },

    //增加家具
    addFurniture: function (node) {
        this._furnitureNum++;
        node.getComponent('Furniture').itemId = this._furnitureNum - 1;
        this.furniture = node;
        this.furniture.scaleX = cc.GamePlatform.GetScreenScaleX();
        this.furniture.scaleY = cc.GamePlatform.GetScreenScaleY();
        this.furniture.parent = cc.find('Canvas');

        //存储家具节点
        var furNode = cc.GameData.Get(cc.Gl.Key_FurNode);
        furNode.push(this.furniture);
        cc.GameData.Set(cc.Gl.Key_FurNode, furNode);

        //手指选中了一块空闲的砖块
        if (cc.GameData.Get(cc.Gl.Key_SBId) != null) {
            this.storageFurniture(this._furnitureNum - 1, cc.GameData.Get(cc.Gl.Key_SBId), 0);
            //转化为相对于砖块父节点（即地板节点）的世界坐标
            var worldPos = this.node.convertToWorldSpaceAR(this.floorChildren[cc.GameData.Get(cc.Gl.Key_SBId)].position);
            var pos = this.furniture.parent.convertToNodeSpaceAR(worldPos);
            //设置位置
            this.furniture.x = pos.x;
            this.furniture.y = pos.y;
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
                    this.storageFurniture(this._furnitureNum - 1, brick.id, 0);
                    //转化为相对于砖块父节点（即地板节点）的世界坐标
                    var worldPos = this.node.convertToWorldSpaceAR(this.floorChildren[brickIDs[i]].position);
                    var pos = this.furniture.parent.convertToNodeSpaceAR(worldPos);
                    //设置位置
                    this.furniture.x = pos.x;
                    this.furniture.y = pos.y;
                    cc.GameData.Set(cc.Gl.Key_BrickId, brick.id);
                    // cc.GameData.Set(cc.Gl.Key_fCollisionId, brick.id);
                    break;
                }
            }
            if (!flag) {
                var brick = this.floorChildren[brickIDs[0]].getComponent('Brick');
                this.storageFurniture(this._furnitureNum - 1, brick.id, 0);
                //转化为相对于砖块父节点（即地板节点）的世界坐标
                var worldPos = this.node.convertToWorldSpaceAR(this.floorChildren[brickIDs[0]].position);
                var pos = this.furniture.parent.convertToNodeSpaceAR(worldPos);
                //设置位置
                this.furniture.x = pos.x;
                this.furniture.y = pos.y;
                cc.GameData.Set(cc.Gl.Key_BrickId, brick.id);
                // cc.GameData.Set(cc.Gl.Key_fCollisionId, brick.id);
            }
        }
    },

    //设置当前需要编辑的家具
    setFurniture: function (node) {
        this.furniture = node;
    },

    //设置家具位置
    setFurniturePos: function (id) {
        if (id == null) return;
        if (this.furniture == null) return;
        if (this.furniture.getComponent('Furniture').isFixed == true && !this.isMove) return;

        //转化为相对于砖块父节点（即地板节点）的世界坐标
        var worldPos = this.node.convertToWorldSpaceAR(this.brickList[id].node.position);
        var pos = this.furniture.parent.convertToNodeSpaceAR(worldPos);
        
        cc.GameData.Set(cc.Gl.Key_ZIndex, this.brickList[id].node.zIndex);
        //设置家具的回调函数，并传入相关数据
        var data = {brick: this.brickList[id].node, isFurniture: this.brickList[id].node.getComponent('Brick').isFurniture, pos: {x: pos.x, y: pos.y}};
        this.itemEventHandler(this.furniture, this.furniture.getComponent('Furniture').itemId, data);
    },
 
    //触摸区域是否在家具内
    isTouchRegionInFurniture:function (x, y) {
        var worldPos = this.furniture.parent.convertToWorldSpaceAR(this.furniture.position);
        var pos = this.node.convertToNodeSpaceAR(worldPos);
        var rect = cc.Utl.rectRegion(pos.x, pos.y, this.furniture.getChildByName('building'));
        if (x > rect.x1 && x < rect.x2 && y > rect.y1 && y < rect.y2) {
            return true;
        }
        return false;
    },

    onStartEvent: function (event) {
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
            if (!this.furniture.getComponent('Furniture').isFixed) {
                //移动家具位置
                this.furniture.x += delta.x;
                this.furniture.y += delta.y;
            }
            
            //转化为相对于父节点世界坐标
            cc.GameData.Set(cc.Gl.Key_FWP, this.furniture.parent.convertToWorldSpaceAR(this.furniture.position));

            // var id = cc.GameData.Get(cc.Gl.Key_BrickId);
            // console.log('id: ' + id);
            // if (!this.brickList[id].node.getComponent('Brick').isTouchRegion()) {
            //     var adjacId = this.adjacentBrickId(this.brickList[id].n, this.brickList[id].m);
            //     // console.log(adjacId);
            //     for (let i = 0; i < adjacId.length; ++i) {
            //         var brick = this.floorChildren[adjacId[i]].getComponent('Brick');
            //         if (!brick.isTouchRegion()) {
            //             brick.showColorBlock(false);
            //         }
            //         else {
            //             brick.showColorBlock(true);
            //             break;
            //         }
            //     }
            // }
            // else {
            //     console.log('1111');
            // }
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
