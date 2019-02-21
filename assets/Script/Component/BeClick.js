/**被点中动作组件 */

cc.Class({
    extends: cc.Component,

    properties: {
        sysComp: {
            default: 'string',
            tooltip: '从属于哪个子系统'
        },
        find: {
            default: 'string',
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var children = cc.find('Canvas').getChildren();
        for (let i = 0; i < children.lenght; ++i) {
            
        }
    },

    start () {

    },

    onCollisionEnter: function (other, self) {
        cc.Utl.addEventHandler(cc.find(this.find, cc.find('Canvas')), this.sysComp, 'onEdit', this.node.parent);
    },

    onCollisionExit: function (other, self) {

    }

    // update (dt) {},
});
