/**吸附动作组件 */

cc.Class({
    extends: cc.Component,

    properties: {
        isFixed: false, //家具是否被固定在砖块上
        originPosition: cc.Vec2,
        originBrickId: 0,
        /**
         * 家具放在地板或者墙壁上时，是否有一部分在地板或者墙壁上，如果是，则摆放在地板上或者墙壁上的动作失效
         * 不对相关的数据进行更新，仅仅只是暂时吸附在这个位置上，并提示玩家摆放位置不合理
         */
        _isTrans: false
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    //把家具从地板里拔起，编辑家具位置
    pullUp: function () {
        this.isFixed = false;//家具不再固定在砖块上，可以编辑
        this.node.zIndex = cc.Gl.OriginZIndexOfFurniture;
    },

    //入侵到了别的家具所占用的砖块
    isInvasion: function (brick) {
        for (let i = 0; i < brick.length; ++i) {
            if ((brick[i].getComponent('Brick').furnitureId != this.node.itemId && brick[i].getComponent('Brick').furnitureId != -1) ? true : false) return true;
        }
        return false;
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

        this.brickData = d.bricks;
        if (this.brickData.length < this.brickNum) {
            this._isTrans = true;
        }
        
        if (this.isInvasion(this.brickData)) {//当前有家具，把砖块设置为有外来家具入侵
            //家具在别的家具上面，让家具回到原位
            this.node.x = this.originPosition.x;
            this.node.y = this.originPosition.y;

            this.isFixed = true;
            this.node.zIndex = cc.GameData.Get(cc.Gl.Key_ZIndex);

            for (let i = 0; i < this.brickData.length; ++i) {
                // this.brickData[i].getComponent('Brick').beInvasion = (this.brickData[i].getComponent('Brick').furnitureId != this.node.itemId && this.brickData[i].getComponent('Brick').furnitureId != -1) ? true : false
                cc.Utl.WriteLog('brick ' + this.brickData[i].getComponent('Brick').id + ' isFurniture: ' + this.brickData[i].getComponent('Brick').isFurniture);
            }
            this.brickData[0].getComponent('Brick').showColorBlock(false);
        }
        else {//当前没有家具，把家具附着在砖块上
            //设置家具的位置
            this.node.x = d.pos.x;
            this.node.y = d.pos.y;

            if (!this._isTrans) {
                this.originPosition.x = d.pos.x;
                this.originPosition.y = d.pos.y;

                this.isFixed = true;
                this.node.zIndex = cc.GameData.Get(cc.Gl.Key_ZIndex);
                var IDs = [];
                for (let i = 0; i < this.brickData.length; ++i) {
                    IDs.push(this.brickData[i].getComponent('Brick').id)
                    // cc.Utl.WriteLog('brick ' + this.brickData[i].getComponent('Brick').id + ' isFurniture: ' + this.brickData[i].getComponent('Brick').isFurniture);
                }
                this.brickData[0].getComponent('Brick').showColorBlock(false);
                console.log(IDs);
                //移动了家具位置，更新家具列表数据
                var furList = cc.GameData.Get(cc.Gl.S_Key_Furnitures);
                furList[this.node.itemId].brickId = IDs;
                cc.GameData.Set(cc.Gl.S_Key_Furnitures, furList, true);
            }
        }
    },

    // update (dt) {},
});
