

cc.Class({
    extends: cc.Component,

    properties: {
        isMove: true //是否可以移动建筑物
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.delta = {x: 0, y: 0};//建筑物移动距离的增量
        this.touchTimer = 0;//触摸计时器
        this.updateIntervar = 1000;//触摸时长（秒）
        this.isStartTiming = false;//是否开始计时
        this.node.on(cc.Node.EventType.TOUCH_START, this.startEvent.bind(this), this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveBuilding.bind(this), this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, this.endEvent.bind(this), this.node);
        this.fixedBtn = this.node.getChildByName('fixedBtn');
        cc.Utl.addClickEvent(this.fixedBtn, this.node, 'Building', 'onFixedBtnClicked');
    },

    start () {

    },

    startEvent: function (event) {
        this.isStartTiming = true;
    },

    //设置地图坐标
    setGroupCoords: function (coords) {
        //地板方砖的坐标
        this.groupCoords = coords;
    },

    //设置建筑物坐标，通过二维数组下标(n, m)来设置
    setCoord: function (n, m) {
        this.node.x = this.groupCoords[n][m].x;
        this.node.y = this.groupCoords[n][m].y;
        this.buildingCoord = {x: this.groupCoords[n][m].x, y: this.groupCoords[n][m].y};//建筑物坐标
        if (this.adjaCoords != null) {
            this.adjaCoords == null;
            this.adjaCoords = this.adjacentCoords(n, m);//相邻坐标
        }
        else {
            this.adjaCoords = this.adjacentCoords(n, m);//相邻坐标
        }
        console.log(this.adjaCoords);
    },

    //计算相邻坐标点
    adjacentCoords: function (n, m) {
        var coords = [];
        if ((n - 1) >= 0) {
            let a = n - 1;
            this.adjacentElement(coords, a, m);
        }
        this.adjacentElement(coords, n, m);
        if ((n + 1) < this.groupCoords.length) {
            let a = n + 1;
            this.adjacentElement(coords, a, m);
        }
        return coords;
    },

    adjacentElement: function (coords, a, m) {
        for (let i = 0; i < 3; ++i) {
            var b = m - 1 + i;
            if (this.groupCoords[a].length >= (b + 1)) {
                // coords.push(this.groupCoords[a][b]);
                coords.push({x: this.groupCoords[a][b].x, y: this.groupCoords[a][b].y, n: a, m: b});
            }
        }
    },

    moveBuilding: function (event) {
        if (this.isMove) {
            var delta = event.touch.getDelta();
            // this.node.x += delta.x;
            // this.node.y += delta.y;
            this.delta.x += delta.x;
            this.delta.y += delta.y;
            for (let i = 0; i < this.adjaCoords.length; ++i) {
                var distance = cc.Utl.distance(this.buildingCoord.x+this.delta.x, this.buildingCoord.y+this.delta.y, this.adjaCoords[i].x, this.adjaCoords[i].y);
                if (distance <= 10) {
                    this.setCoord(this.adjaCoords[i].n, this.adjaCoords[i].m);
                    this.delta.x = 0;
                    this.delta.y = 0;
                }
            }
        }
    },

    endEvent: function (event) {
        this.isStartTiming = false;
    },

    onFixedBtnClicked: function (event) {
        this.isMove = false;
        this.fixedBtn.active = false;
        this.updateIntervar = 1;
    },

    update (dt) {
        if (this.isStartTiming) {
            this.touchTimer += dt;
            if (this.touchTimer >= this.updateIntervar * 60) {
                this.isMove = true;
                this.isStartTiming = false;
                this.touchTimer = 0;
                this.fixedBtn.active = true;
            }
        }
        else {
            this.touchTimer = 0;
        }
    },
});
