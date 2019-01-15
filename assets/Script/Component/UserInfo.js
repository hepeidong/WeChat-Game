

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
        this.show();
    },

    start () {

    },

    init: function () {
        this.headImg = this.node.getChildByName('headImg');//头像
        this.name = this.node.getChildByName('name');//姓名

        let tangDou = this.node.getChildByName('tangDou');
        this.tangDouNum = tangDou.getChildByName('num');//糖豆数量

        let coin = this.node.getChildByName('coin');
        this.coinNum = coin.getChildByName('num');//金币数量

        let card = this.node.getChildByName('card');
        this.cardNum = card.getChildByName('num');//美食卡数量

        let redPack = this.node.getChildByName('redPack');
        this.tiquBtn = redPack.getChildByName('tiquBtn');//提取按钮
        this.redPackNum = redPack.getChildByName('num');//红包金额

        cc.Utl.addClickEvent(this.tiquBtn, this.node, 'UserInfo', 'onTiquBtnClicked');
    },

    show: function () {
        cc.Utl.loadImage(this.headImg.getComponent(cc.Sprite), cc.GameData.GetUserInfo().headUrl);
        this.name.getComponent(cc.Label).string = cc.GameData.GetUserInfo().nickName;
    },

    onTiquBtnClicked: function (event) {

    }

    // update (dt) {},
});
