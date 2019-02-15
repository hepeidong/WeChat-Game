/**
 * 家具组件
 */

cc.Class({
    extends: cc.Component,

    properties: {
        itemId: 0,
        typeId: 0,
        isFixed: false, //家具是否被固定在砖块上
        fixedBtn: cc.Node,
        brickNum: {
            default: 0,
            tooltip: '家具占据的砖块数'
        },
        originPosition: cc.Vec2,
        originBrickId: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.building = this.node.getChildByName('building');
    },

    start () {
        this.node.zIndex = cc.Gl.OriginZIndexOfFurniture;
    },

    //编辑家具
    editFurniture: function () {
        this.isFixed = false;//家具不再固定在砖块上，可以编辑
        cc.Utl.addEventHandler(this.target, this.component, this.handler, {furniture: this.node});
    },

    setHandler: function (target, component, handler) {
        this.target = target;
        this.component = component;
        this.handler = handler;
    },

    //入侵到了别的家具所占用的砖块
    isInvasion: function (brick) {
        for (let i = 0; i < brick.length; ++i) {
            if ((brick[i].getComponent('Brick').furnitureId != this.itemId && brick[i].getComponent('Brick').furnitureId != -1) ? true : false) return true;
        }
        return false;
    },

    //家具进入砖块时的回调
    onEnterBrick: function (s, d) {
        this.brickData = d.bricks;
        for (let i = 0; i < d.bricks.length; ++i) {
            if (d.bricks[i].getComponent('Brick').isFurniture == false) {
                d.bricks[i].getComponent('Brick').isFurniture = true;//当前建筑落入的砖块
                d.bricks[i].getComponent('Brick').furnitureId = this.itemId;//在当前砖块上的家具编号
            }

            // cc.Utl.WriteLog('brick id and isFurniture:' + d.bricks[i].getComponent('Brick').id + ', ' + d.bricks[i].getComponent('Brick').isFurniture);
        }
    },

    //家具离开砖块时的回调
    onLeaveBrick: function (s, d) {
        for (let i = 0; i < d.bricks.length; ++i) {
            if (d.bricks[i].getComponent('Brick').furnitureId == this.itemId) {
                d.bricks[i].getComponent('Brick').isFurniture = false;
                d.bricks[i].getComponent('Brick').furnitureId = -1;
            }
        }
    },

    //释放手指，让家具吸附在砖块上的回调
    onFixedPosEnter: function (s, d) {
        //家具移动超出了地板范围，让它回到原位
        if (d == null) {
            //设置家具的位置
            this.node.x = this.originPosition.x;
            this.node.y = this.originPosition.y;

            this.isFixed = true;
            this.node.zIndex = cc.GameData.Get(cc.Gl.Key_ZIndex);
            return;
        }
        
        if (this.isInvasion(this.brickData)) {//当前有家具，把砖块设置为有外来家具入侵
            //家具别的家具上面，让家具回到原位
            this.node.x = this.originPosition.x;
            this.node.y = this.originPosition.y;

            this.isFixed = true;
            this.node.zIndex = cc.GameData.Get(cc.Gl.Key_ZIndex);

            for (let i = 0; i < this.brickData.length; ++i) {
                // this.brickData[i].getComponent('Brick').beInvasion = (this.brickData[i].getComponent('Brick').furnitureId != this.itemId && this.brickData[i].getComponent('Brick').furnitureId != -1) ? true : false
                cc.Utl.WriteLog('brick ' + this.brickData[i].getComponent('Brick').id + ' isFurniture: ' + this.brickData[i].getComponent('Brick').isFurniture);
            }
            this.brickData[0].getComponent('Brick').showColorBlock(false);
        }
        else {//当前没有家具，把家具附着在砖块上
            //设置家具的位置
            this.node.x = d.pos.x;
            this.node.y = d.pos.y;
            this.originPosition.x = d.pos.x;
            this.originPosition.y = d.pos.y;

            this.isFixed = true;
            this.node.zIndex = cc.GameData.Get(cc.Gl.Key_ZIndex);
            var IDs = [];
            for (let i = 0; i < this.brickData.length; ++i) {
                IDs.push(this.brickData[i].getComponent('Brick').id)
                cc.Utl.WriteLog('brick ' + this.brickData[i].getComponent('Brick').id + ' isFurniture: ' + this.brickData[i].getComponent('Brick').isFurniture);
            }
            this.brickData[0].getComponent('Brick').showColorBlock(false);

            //移动了家具位置，更新家具列表数据
            var furList = cc.GameData.Get(cc.Gl.S_Key_Furnitures);
            furList[this.itemId].brickId = IDs;
            cc.GameData.Set(cc.Gl.S_Key_Furnitures, furList, true);
        }
    },

    onButtonClicked: function (event) {
        // this.addEventHandler({});

        // this._off();
        // if (this.isFurniture == false) {
        //     this.isFixed = true;
        //     this.node.zIndex = cc.GameData.Get(cc.Gl.Key_ZIndex);
        //     this.brick.getComponent('Brick').isFurniture = true;
        //     this.isFurniture = false;
        //     this.fixedBtn.active = false;
        // }
    }

    // update (dt) {},
});
