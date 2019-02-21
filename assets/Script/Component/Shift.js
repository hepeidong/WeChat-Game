/**位移动作组件 */

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    shiftPosition: function (deltaX, deltaY) {
        this.node.x += deltaX;
        this.node.y += deltaY;
    },

    //家具进入砖块时的回调
    onEnterBrick: function (s, d) {
        for (let i = 0; i < d.bricks.length; ++i) {
            if (d.bricks[i].getComponent('Brick').isFurniture == false) {
                d.bricks[i].getComponent('Brick').isFurniture = true;//当前建筑落入的砖块
                d.bricks[i].getComponent('Brick').furnitureId = this.node.itemId;//在当前砖块上的家具编号
            }

            // cc.Utl.WriteLog('brick id and isFurniture:' + d.bricks[i].getComponent('Brick').id + ', ' + d.bricks[i].getComponent('Brick').isFurniture);
        }
    },

    //家具离开砖块时的回调
    onLeaveBrick: function (s, d) {
        for (let i = 0; i < d.bricks.length; ++i) {
            if (d.bricks[i].getComponent('Brick').furnitureId == this.node.itemId) {
                d.bricks[i].getComponent('Brick').isFurniture = false;
                d.bricks[i].getComponent('Brick').furnitureId = -1;
            }
        }
    },

    // update (dt) {},
});
