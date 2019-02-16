

cc.Class({
    extends: cc.Component,

    properties: {
        template: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.content = this.node.getComponent(cc.ScrollView).content;
        this.content.on(cc.Node.EventType.TOUCH_START, this.onStartEvent.bind(this), this);
        this.content.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveEvent.bind(this), this);
        this.content.on(cc.Node.EventType.TOUCH_END, this.onEndEvent.bind(this), this);
        this.content.on(cc.Node.EventType.TOUCH_CANCEL, this.onCancelEvent.bind(this), this);

        this.initialize();
        this.initItemPool('Furniture');
        this.initItem('Furniture');
    },

    start () {

    },

    initialize: function () {
        this.items = [];
    },

    initItem: function (key) {
        if (this.items.lenght > 0) {
            this.content.removeAllChildren();
            for (let i = 0; i < this.items.lenght; ++i) {
                this.removeItemPool(this.items[i]);
            }
        }
        for (let i = 0; i < cc.GameFile.readJS_DecorateMap(key).length; ++i) {
            this.createItem(this.content, i, cc.GameFile.readJS_DecorateMap(key)[i]);
        }
    },

    initItemPool: function (key) {
        if (!this.itemPool) {
            this.itemPool = new cc.NodePool();
        }
        if (this.itemPool.size() <= 0) {
            for (let i = 0; i < cc.GameFile.readJS_DecorateMap(key).length; ++i) {
                var item = cc.instantiate(this.template);
                this.itemPool.put(item);
            }
        }
    },

    createItem: function (parent, itemId, value) {
        var item = null;
        if (this.itemPool.size() > 0) {
            item = this.itemPool.get();
        }
        else {
            item = cc.instantiate(cc.template);
            this.itemPool.put(item);
        }
        this.items.push(item);
        item.parent = parent;
        item.itemId = itemId;
        var fileName = 'Img_' + value.type + '.png';
        cc.CommRes.setTexture(item.getChildByName('sprt_item'), cc.CommRes.DecorateTexture(fileName));
    },

    removeItemPool: function (item) {
        this.itemPool.put(item);
    },

    onStartEvent: function (event) {

    },

    onMoveEvent: function (event) {

    },

    onEndEvent: function (event) {
        console.log('end');
    },

    onCancelEvent: function (event) {

    }

    // update (dt) {},
});
