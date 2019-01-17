/**
 * 坐标方程为y = ax + b
 * 坐标方程的初始方程为y = -x，初始设a等于-1
 * */

 //地板坐标
 var coordList = [
     [{x: 263, y: 713}, {x: 220, y: 689}, {x: 177, y: 667}, {x: 134, y: 643}, {x: 89, y: 621}],
     [{x: 305, y: 692}, {x: 264, y: 670}, {x: 222, y: 646}, {x: 179, y: 623}, {x: 135, y: 600}],
     [{x: 347, y: 667}, {x: 306, y: 644}, {x: 263, y: 622}, {x: 220, y: 598}, {x: 175, y: 576}],
     [{x: 391, y: 647}, {x: 350, y: 625}, {x: 311, y: 600}, {x: 265, y: 578}, {x: 221, y: 555}],
 ]

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始坐标
        this.firstCoord = {
            x: -200,
            y: 200
        };
        
        this.floor = this.node.getChildByName('floor');

        this.IntevarlY = 50;//每个板砖在y轴上的间隔
        this.coordList1 = this.coordEquation(-1, this.coord(this.firstCoord, -1, 50), 10);
        this.coordList2 = this.coordEquation(-1, this.coord(this.firstCoord, -1, 0), 10);
        this.coordList3 = this.coordEquation(-1, this.coord(this.firstCoord, -1, -50), 10);
    },

    start () {

    },

    coord: function (firstCoord, a, b) {
        var y = firstCoord.y + b;
        var x = b - y;
        return {x: x, y: y};
    },
    //点亮砖块
    lightBricks: function (x, y) {
        var coords = this.getCoords();
        this.floor.active = true;
        this.floor.x = coords[x][y].x;
        this.floor.y = coords[x][y].y;
    },

    hideBricks: function () {
        this.floor.active = false;
    },

    getCoords: function () {
        var coords = [this.coordList1, this.coordList2, this.coordList3];
        // var r = Math.asin(22 / cc.Utl.distance(189, 621, 134, 643));
        // var angle = cc.Utl.angle(r);
        // console.log('angle: ' + angle);
        // var coords = [];
        // for (let i = 0; i < coordList.length; ++i) {
        //     coords[i] = [];
        //     for (let j = 0; j < coordList[i].length; ++j) {
        //         coords[i][j] = cc.Utl.rotationCoordinate(coordList[i][j], angle);
        //     }
        // }
        // return coordList;
        return coords;
    },

    addSprite: function (x, y) {
        var node = cc.instantiate(this.floor);
        node.x = x;
        node.y = y;
        node.active = true;
        this.node.addChild(node);
    },

    //坐标方程函数 y = ax + b   n为坐标个数
    coordEquation: function (a, coord, n) {
        var coordList = [];
        coordList.push(coord);
        var b = coord.y - a*coord.x;
        var y = coord.y;
        for (let i = 0; i < n - 1; ++i) {
            y -= this.IntevarlY;
            var x = (y - b) / a;
            coordList.push({x: x, y: y});
            this.addSprite(x, y);
        }
        return coordList;
    }

    // update (dt) {},
});
