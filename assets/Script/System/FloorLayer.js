
cc.Class({
    extends: cc.Component,

    properties: {
        touchPoint: cc.Node,
       brick: cc.Prefab,
       isMove: true,
       component: 'String',
       _eventHandlers: [],//存放家具的回调函数
       _furnitureNum: 0//目前地板被摆放了几个家具（只记录玩家自己摆放的）
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // if (cc.GamePlatform.IsWechatGame()) {
        //     this.distanceX = 96;//方块在x轴上的间隔
        //     this.distanceY = 96;//方块在y轴上的间隔
        // }
        // else {
            // this.distanceX = 110 * cc.GamePlatform.GetScreenScaleX(); //方块在x轴上的间隔
            // this.distanceY = 110 * cc.GamePlatform.GetScreenScaleY();//方块在y轴上的间隔
        // }

        this.brickList = [];//方块列表
        this.gridList = [];//网格列表，最终是二维数组
        this.floorChildren = [];//所有子节点
        this.furniture = null; //家具
        this.furnitureList = [];
        this.touchPoint.y = cc.GamePlatform.GetScreenSize().height / 2;
        this.selectionCount = 0;//编辑模式下，同时被选中的家具数

        this.brickLaying();
        this.showDecorate();
        this.node.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);
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

    showDecorate: function () {
        var furnitures = cc.GameData.Get(cc.Gl.S_Key_Furnitures);
        this._furnitureNum = furnitures.length;
        for (let i = 0; i < furnitures.length; ++i) {
            cc.Utl.loadPrefab(furnitures[i].fileName, (newNode) => {                
                this.furniture = newNode;
                this.furniture.itemId = furnitures[i].furnitureId;
                this.furnitureList[this.furniture.itemId] = this.furniture;
                this.convertOfFurnitureAR(this.brickList[furnitures[i].brickId[0]].node, furnitures[i].brickId[0]);
                this.furniture = null;
            }, cc.find('Canvas'));
        }
    },

    //计算相邻地砖id
    adjacentBrickId: function (n, m) {
        var brickIDs = [];
        var id = this.gridList[n][m];
        if ((n - 1) >= 0) {
            let a = n - 1;
            this.adjacentElement(brickIDs, a, m, id);
        }
        this.adjacentElement(brickIDs, n, m);
        if ((n + 1) < this.gridList.length) {
            let a = n + 1;
            this.adjacentElement(brickIDs, a, m, id);
        }
        return brickIDs;
    },

    adjacentElement: function (brickIDs, a, m, id) {
        for (let i = 0; i < 3; ++i) {
            var b = m - 1 + i;
            if (this.gridList[a].length >= (b + 1)) {
                
                if (this.gridList[a][b] != id) {
                    brickIDs.push(this.gridList[a][b]);
                }
            }
        }
    },

    //缓存家具信息，参数意义：家具编号，在哪块砖上（是数组，因为有可能占用不止一块砖），是什么家具，文件名，坐标位置
    storageFurniture: function (fId, bIds, tId, fN, pos) {
        let furList = cc.GameData.Get(cc.Gl.S_Key_Furnitures);
        furList.push({furnitureId: fId, brickId: bIds, furnitureType: tId, fileName: fN, coord: pos});
        cc.GameData.Set(cc.Gl.S_Key_Furnitures, furList, true);
    },

    convertOfFurnitureAR: function (brick, id) {
        //转化为相对于砖块父节点（即地板节点）的世界坐标
        var worldPos = this.node.convertToWorldSpaceAR(brick.position);
        var pos = this.furniture.parent.convertToNodeSpaceAR(worldPos);
        
        cc.GameData.Set(cc.Gl.Key_ZIndex, brick.zIndex);
        //设置家具的回调函数，并传入相关数据
        var bricks = [];
        for (let i = 0; i < this.furniture.getComponent('Furniture').brickNum; ++i) {
            if ((id - i) >= 0) {
                bricks.push(this.brickList[id - i].node);
            }
        }
        var data = {pos: {x: pos.x, y: pos.y}, bricks: bricks};
        cc.Utl.addEventHandler(this.furniture, 'Adsorb', 'onAdsorbEvent',  data);
    },

    //增加家具
    addFurniture: function (node) {
        this._furnitureNum++;
        node.itemId = this._furnitureNum - 1;
        this.furniture = node;
        this.furniture.scaleX = cc.GamePlatform.GetScreenScaleX();
        this.furniture.scaleY = cc.GamePlatform.GetScreenScaleY();
        this.furniture.parent = cc.find('Canvas');

        //存储家具节点
        this.furnitureList.push(this.furniture);
        var pos = {x: this.furniture.x, y: this.furniture.y};
        this.storageFurniture(this._furnitureNum - 1, [], this.furniture.furnitureType, this.furniture.name, pos);

        // var n = Math.floor(cc.Gl.Coords.length / 2);
        // var m = Math.floor(cc.Gl.Coords[0].length / 2);
        // var brickIDsArr = this.adjacentBrickId(n, m);
        // var index = 0;
        
        // while(1) {
        //     if (this.brickList[this.gridList[n][m]].node.getComponent('Brick').isFurniture == false) {
        //         this.convertOfFurnitureAR(this.brickList[this.gridList[n][m]].node, true);
        //     }
        //     else {
        //         var brickIDs = this.adjacentBrickId(n, m);
        //         var flag = false;
        //         for (let i = 0; i < brickIDs.length; ++i) {
        //             if (this.brickList[brickIDs[i]].node.getComponent('Brick').isFurniture == false) {
        //                 this.convertOfFurnitureAR(this.brickList[brickIDs[i]], true);
        //                 flag = true;
        //                 break;
        //             }
        //         }
        //         if (!flag) {
        //             if (index == brickIDsArr.length) {
        //                 n = Math.floor(cc.Gl.Coords.length / 2);
        //                 m = Math.floor(cc.Gl.Coords[0].length / 2);
        //                 this.convertOfFurnitureAR(this.brickList[this.gridList[n][m]].node, true);
        //                 break;
        //             }
        //             n = this.brickList[brickIDsArr[index]].n;
        //             m = this.brickList[brickIDsArr[index]].m;
        //             index++;
        //         }
        //     }
        // }
    },

    //设置当前需要编辑的家具
    setFurniture: function (node) {
        this.furniture = node;
    },

    //设置家具位置
    setFurniturePos: function () {
        if (this.furniture == null) return;
        if (this.furniture.isFixed == true && !this.isMove) return;

        if (this.furniture.furnitureType == cc.FurnitureType.Ground) {
            var id = cc.GameData.Get(cc.Gl.Key_BrickId);
            cc.GameData.RemoveItem(cc.Gl.Key_BrickId);
            if (id == null) {
                cc.Utl.addEventHandler(this.furniture, 'Adsorb', 'onAdsorbEvent',  null);
            }
            else {
                this.convertOfFurnitureAR(this.brickList[id].node, id);
            }
        }
        else if (this.furniture.furnitureType == cc.FurnitureType.Currency) {
            var id = cc.GameData.Get(cc.Gl.Key_BrickId);
            if (id == null) {
                cc.Utl.addEventHandler(this.furniture, 'Adsorb', 'onPlaceEvent', null);
            }
            else {

            }
        }
    },
 
    //触摸区域是否在家具内
    isTouchRegionInFurniture:function (worldPos) {
        // console.log(this.furnitureList);
        // for (let i = 0; i < this.furnitureList.length; ++i) {
        //     var worldPos = this.furnitureList[i].convertToWorldSpaceAR(this.furnitureList[i].getChildByName('building').position);
        //     var pos = this.node.convertToNodeSpaceAR(worldPos);
        //     var rect = cc.Utl.rectRegion(pos.x, pos.y, this.furnitureList[i].getChildByName('building'));
        //     if (x > rect.x1 && x < rect.x2 && y > rect.y1 && y < rect.y2) {
        //         this.editFurniture(this.furnitureList[i]);
        //         console.log(pos);
        //         console.log(x + ' ' + y);
        //         console.log(rect);
        //         console.error(i);
        //         console.error(this.furnitureList[i].furnitureType);
        //         return true;
        //     }
        // }

        return false;
    },

    onEdit: function (s, d) {
        this.selectionCount++;
        if (this.selectionCount > 1) return;
        
        if (cc.GameData.Get(cc.Gl.Key_EditMode)) {//处于编辑模式
            this.furniture = d;
            d.getComponent('Adsorb').pullUp();
            this.isMove = true;
        }
        else {
            this.isMove = false;
        }
        this.touchPoint.y = cc.GamePlatform.GetScreenSize().height / 2;
    },

    //家具进入砖块时的回调
    onEnterBrick: function (s, d) {
        var bricks = [];
        for (let i = 0; i < d.furniture.getComponent('Furniture').brickNum; ++i) {
            if ((d.id - i) >= 0) {
                bricks.push(this.brickList[d.id - i].node);
            }
        }
        cc.Utl.addEventHandler(d.furniture, 'Shift', 'onEnterBrick', {bricks: bricks});
    },

    //家具离开砖块时的回调
    onLeaveBrick: function (s, d) {
        var bricks = [];
        for (let i = 0; i < d.furniture.getComponent('Furniture').brickNum; ++i) {
            if ((d.id - i) >= 0) {
                bricks.push(this.brickList[d.id - i].node);
            }
        }
        cc.Utl.addEventHandler(d.furniture, 'Shift', 'onLeaveBrick', {bricks: bricks});
    },

    onStartEvent: function (event) {
        var pos = cc.find('Canvas').convertToNodeSpaceAR(event.touch.getLocation());
        this.touchPoint.position = pos;

        // if (this.isTouchRegionInFurniture(pos)) {
        //     this.isMove = true;
        // }
        // else {
        //     this.isMove = false;
        // }
    },

    onMoveEvent: function (event) {
        // if (this.isMove == false) return;
        var delta = event.touch.getDelta();
        if (this.furniture != null) {
            if (this.isMove) {
                //移动家具位置
                this.furniture.getComponent('Shift').shiftPosition(delta.x, delta.y);
            }
        }
    },

    onEndEvent: function (event) {
        this.selectionCount = 0;
        this.setFurniturePos();
    },

    onCancelEvent: function (event) {
        this.selectionCount = 0;
        this.setFurniturePos();
    }

    // update (dt) {},
});
