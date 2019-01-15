var GameControl = require('GameControl');

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (GameControl.runGameControl()) {
            cc.Utl.WriteLog('游戏框架启动成功');
            cc.GamePlatform.ScreenFitWidth();
            // var canvas = cc.find('Canvas');
            // for (let key in canvas.children) {
            //     canvas.children[key].scaleX = cc.GamePlatform.GetScreenScaleX();
            //     canvas.children[key].scaleY = cc.GamePlatform.GetScreenScaleY();
            // }
        }
    },

    start () {

    },

    // update (dt) {},
});
