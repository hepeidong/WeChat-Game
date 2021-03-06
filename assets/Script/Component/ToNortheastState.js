var HeroState = require('HeroState');

cc.Class({
    extends: HeroState,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    toNortheast: function () {
        console.error('ToWestState toNortheast');
    },

    toNorth: function () {
        this._hero.setHeroState(this._hero.ToNorthState);
        this._hero.getHeroState().toNorth();
    },

    toSouthwest: function () {
        this._hero.setHeroState(this._hero.ToSouthwestState);
        this._hero.getHeroState().toSouthwest();
    },

    toEast: function () {
        this._hero.setHeroState(this._hero.ToEastState);
        this._hero.getHeroState().toEast();
    }

    // update (dt) {},
});
