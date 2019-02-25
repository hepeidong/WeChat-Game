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

    toSoutheast: function () {
        console.error('ToWestState toSoutheast');
    },

    toSouth: function () {
        this._hero.setHeroState(this._hero.ToSouthState);
        this._hero.getHeroState().toSouth();
    },

    toNorthwest: function () {
        this._hero.setHeroState(this._hero.ToNorthwestState);
        this._hero.getHeroState().toNorthwest();
    },

    toEast: function () {
        this._hero.setHeroState(this._hero.ToEastState);
        this._hero.getHeroState().toEast();
    }

    // update (dt) {},
});
