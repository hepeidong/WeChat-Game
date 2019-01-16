/**
 * 坐标方程为y = ax + b
 * 坐标方程的初始方程为y = -x，初始设a等于-1
 * */

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
        this.IntevarlY = 21;//每个板砖在y轴上的间隔
        this.coordList1 = this.coordEquation(50, 10);
        this.coordList2 = this.coordEquation(0, 10);
        this.coordList3 = this.coordEquation(-50, 10);
    },

    start () {

    },

    getCoords: function () {
        var coords = [this.coordList1, this.coordList2, this.coordList3];
        return coords;
    },

    //坐标方程函数 y = ax + b   n为坐标个数
    coordEquation: function (b, n) {
        var coordList = [];
        coordList.push(this.firstCoord);
        var a = (this.firstCoord.y - b) / this.firstCoord.x;
        var y = this.firstCoord.y;
        for (let i = 0; i < n - 1; ++i) {
            y -= this.IntevarlY;
            var x = (y - b) / a;
            coordList.push({x: x, y: y});
        }
        return coordList;
    }

    // update (dt) {},
});
