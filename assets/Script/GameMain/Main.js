var GameControl = require('GameControl');

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (GameControl.runGameControl()) {
            cc.Utl.WriteLog('游戏框架启动成功');
            cc.game.setFrameRate(30);
            cc.director.getCollisionManager().enabled = true;
            cc.Utl.WriteLog(cc.GamePlatform.GetScreenScaleX());
            cc.Utl.WriteLog(cc.GamePlatform.GetScreenScaleY());
            // cc.director.getCollisionManager().enabledDebugDraw  = true;
            // cc.GamePlatform.ScreenFitWidth();
            // var canvas = cc.find('Canvas');
            // for (let key in canvas.children) {
            //     canvas.children[key].scaleX = cc.GamePlatform.GetScreenScaleX();
            //     canvas.children[key].scaleY = cc.GamePlatform.GetScreenScaleY();
            // }

            this.DecorateList = this.node.getChildByName('DecorateList');
            //初始化缓存房间里家具信息的表
            if (!cc.GameData.isExist(cc.Gl.S_Key_Furnitures)) {
                cc.GameData.Set(cc.Gl.S_Key_Furnitures, [], true);
            }
            //初始化编辑模式为false
            cc.GameData.Set(cc.Gl.Key_EditMode, false);

            // var StateMachine = require('StateMachine');
            // var fsm = new StateMachine();
            // fsm.setupState({
            //     states: ['A', 'B'],
            //     events: [
            //         {name: 'StateA', from: ['B', 'C'], to: 'A'},
            //         {name: 'StateB', form: ['A', 'C'], to: 'B'},
            //         {name: 'StateC', form: ['A', 'B'], to: 'B'}
            //     ],
            //     callbacks: {
            //         onA: function() { console.log('测试 A'); },
            //         onB: function() { console.log('测试 B'); },
            //         onC: function() { console.log('测试 C'); }
            //     }
            // });
            // var s = fsm.doEvent('StateA');
            // console.log(s);
            // s.onA();
            // s.onB();
            // s.onC();
            // console.log(fsm);
        }
    },

    start () {

    },

    onButton: function (event) {
        // console.log('Room onButton');
        cc.GameData.Set(cc.Gl.Key_EditMode, !cc.GameData.Get(cc.Gl.Key_EditMode));
        this.DecorateList.active = !this.DecorateList.active;
    }

    // update (dt) {},
});
