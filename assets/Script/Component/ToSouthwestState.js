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

    toSouthwest: function () {
        console.error('ToWestState toSoutheast');
    },

    toSouth: function () {
        this._hero.setHeroState(this._hero.ToSouthState);
        this._hero.getHeroState().toSouth();
    },

    toNortheast: function () {
        this._hero.setHeroState(this._hero.ToNortheastState);
        this._hero.getHeroState().toNortheast();
    },

    toWest: function () {
        this._hero.setHeroState(this._hero.ToWestState);
        this._hero.getHeroState().toWest();
    }

    // update (dt) {},
});
