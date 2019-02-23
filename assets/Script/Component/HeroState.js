

var HeroState = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    setHero: function (hero) {
        this._hero = hero;
    },

    toEast: function () {
        console.log('east');
    },

    toWest: function () {
        console.log('west');
    },

    toSouth: function () {
        console.log('south');
    },

    toNorth: function () {
        console.log('north');
    },

    toNortheast: function () {
        console.log('northeast');
    },

    toSoutheast: function () {
        console.log('southeast');
    },

    toSouthwest: function () {
        console.log('southwest');
    },

    toNorthwest: function () {
        console.log('northwest');
    },

    // update (dt) {},
});