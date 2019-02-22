
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.collisionMax = 0;//最大的碰撞次数
        this.collisionNum = 0;//碰撞次数
    },

    start () {

    },

    onCollisionEnter: function (other, self) {
        var comp = other.node.getComponent('Furniture');
        if (comp) {
            //记录需要碰撞几次才能放入桌面
            this.collisionMax = comp.collisionNodeNum;
        }
        else {
            this.collisionNum++;
            if (this.collisionMax - 1 == this.collisionNum) {
                other.node.overstep = false;
            }
        }
    },

    onCollisionExit: function (other, self) {
        this.collisionNum--;
        other.node.overstep = true;
    }

    // update (dt) {},
});
