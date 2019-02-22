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
