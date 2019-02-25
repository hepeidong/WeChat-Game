var ToWestState = require('ToWestState');
var ToSouthState = require('ToSouthState');

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    ctor() {
        this._state = null;

        this.ToEastState = null,//东
        this.ToWestState = new ToWestState(),//西
        this.ToNorthState = null,//北
        this.ToSouthState = new ToSouthState(),//南
        this.ToNortheastState = null,//东北
        this.ToSoutheastState = null,//东南
        this.ToSouthwestState = null,//西南
        this.ToNorthwestState = null //西北
    },

    start () {

    },

    setHeroState: function (state) {
        this._state = state;
        this._state.setHero(this);
    },

    getHeroState: function () {
        return this._state;
    },

    toEast: function () {
        this._state.toEast();
    },

    toWest: function () {
        this._state.toWest();
    },

    toSouth: function () {
        this._state.toSouth();
    },

    toNorth: function () {
        this._state.toNorth();
    },

    toNortheast: function () {
        this._state.toNortheast();
    },

    toSoutheast: function () {
        this._state.toSoutheast();
    },

    toSouthwest: function () {
        this._state.toSouthwest();
    },

    toNorthwest: function () {
        this._state.toNorthwest();
    }

    // update (dt) {},
});
