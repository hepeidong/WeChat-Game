

cc.Class({
    extends: cc.Component,

    properties: {
        itemId: 0,
        isFixed: false, //家具是否被固定在砖块上
        fixedBtn: cc.Node,
        brickNum: {
            default: 0,
            tooltip: '家具占据的砖块数'
        }
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
        this.addEventHandler({furniture: this.node});
    },

    setHandler: function (target, component, handler) {
        this.target = target;
        this.component = component;
        this.handler = handler;
    },

    addEventHandler: function (data) {
        if (!this.eventHandler) {
            this.eventHandler = new cc.Component.EventHandler();
        }
        this.eventHandler.target = this.target;
        this.eventHandler.component = this.component;
        this.eventHandler.handler = this.handler;
        this.eventHandler.customEventData = data;
        this.eventHandler.emit([this.handler]);
    },

    onFixedPosEnter: function (s, d) {
        //设置家具的位置
        this.node.x = d.pos.x;
        this.node.y = d.pos.y;
        //当前砖块是否有家具
        if (d.isFurniture == false) {//当前没有家具，把家具附着在砖块上
            this.isFixed = true;
            this.node.zIndex = cc.GameData.Get(cc.Gl.Key_ZIndex);
            var IDs = [];
            for (let i = 0; i < d.brick.length; ++i) {
                d.brick[i].getComponent('Brick').isFurniture = true;//当前建筑落入的砖块
                d.brick[i].getComponent('Brick').furnitureId = this.itemId;//在当前砖块上的家具编号
                IDs.push(d.brick[i].getComponent('Brick').id)
            }

            var furList = cc.GameData.Get(cc.Gl.S_Key_Furnitures);
            furList[this.itemId].brickId = IDs;
            cc.GameData.Set(cc.Gl.S_Key_Furnitures, furList, true);
        }
        else {//当前有家具，把砖块设置为有外来家具入侵
            for (let i = 0; i < d.brick.length; ++i) {
                d.brick[i].getComponent('Brick').isInvasion = true;
            }
        }
        d.brick[0].getComponent('Brick').showColorBlock(false);
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
