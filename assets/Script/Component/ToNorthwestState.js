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

    toNorthwest: function () {
        console.error('ToWestState toNortheast');
    },

    toNorth: function () {
        this._hero.setHeroState(this._hero.ToNorthState);
        this._hero.getHeroState().toNorth();
    },

    toSoutheast: function () {
        this._hero.setHeroState(this._hero.ToSoutheastState);
        this._hero.getHeroState().toSoutheast();
    },

    toWest: function () {
        this._hero.setHeroState(this._hero.ToWestState);
        this._hero.getHeroState().toWest();
    }

    // update (dt) {},
});
