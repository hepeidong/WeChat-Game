/**被点中动作组件 */

cc.Class({
    extends: cc.Component,

    properties: {
        sysComp: {
            default: 'string',
            tooltip: '从属于哪个子系统'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onCollisionEnter: function (other, self) {
        cc.Utl.addEventHandler(cc.find('Canvas').getChildByName(this.sysComp), this.sysComp, 'onEdit', this.node.parent);
    },

    onCollisionExit: function (other, self) {

    }

    // update (dt) {},
});
