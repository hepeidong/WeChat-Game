
cc.Class({
    extends: cc.Component,

    properties: {
        itemTemplate: {
            default: null,
            type: cc.Node,
            visible: function () {
                return !this.isPrefabTemplate;
            },
            serializable: function () {
                return !this.isPrefabTemplate;
            }
        },
        scrollView: {
            default: null,
            type: cc.ScrollView,
            visible: function () {
                return !this.is;
            },
            serializable: function () {
                return !this.is;
            }
        },
        is: {
            default: false,
            tooltip: '滑动视图是否在邦定此脚本组件的当前节点上'
        },
        isPrefabTemplate: {
            default: false,
            tooltip: '是否為預製體'
        }, //是否為預製體
        itemTemplateUrl: {
            default: 'String',
            tooltip: '預製體路勁',
            visible: function () {
                return this.isPrefabTemplate;
            },
            serializable: function () {
                return this.isPrefabTemplate;
            },
        }, //預製體路勁
        component: {
            default: 'String',
            tooltip: '項目組件'
        }, //組件名
        spawnCount: {
            default: 0,
            tooltip: '實際創建的項目數'
        },// how many items we actually spawn 實際創建的item數
        totalCount: {
            default: 0,
            tooltip: '列表能容納的最多項目數'
        },// how many items we need for the whole list 列表能容納最多的item數
        spacing: {
            default: 0,
            tooltip: '項目之間間隔'
        },// space between each item 兩個item之間的間隔
        bufferZone: {
            default: 0,
            tooltip: '緩衝區大小'
        },// when item is away from bufferZone, we relocate it 緩衝區大小
        _horizontal: false,
        _vertical: true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (this.is) {
            this.scrollView = this.node.getComponent(cc.ScrollView);
        }
        this.content = this.scrollView.content;
        (this.scrollView.content);

        // this.content = this.scrollView.node.getChildByName('view').getChildByName('content');
        this.items = [];
        this.eventHandlers = [];
        // this.initialize();
        this.updateTimer = 0;
        this.updateIntervar = 0.2;
        this.lastContentPos = cc.v2(0, 0); // use this variable to detect if we are scrolling up or down 使用它來判斷是否下滑還是上滑
        this._horizontal = this.scrollView.horizontal;
        this._vertical = this.scrollView.vertical;
    },

    hideComponent: function () {
        this.node.active = false;
    },

    initialize: function (itemINFO) {
        // console.log('initialize')
        this.info = itemINFO;

        if (this.isPrefabTemplate) {
            this.initTemplate();
        }
        else {
            if (this._vertical) {
                this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing;
            }
            else if (this._horizontal) {
                this.content.width = this.totalCount * (this.itemTemplate.width + this.spacing) + this.spacing;
            }
            this.initItemPool(this.itemTemplate);
            this.initItem();
        }
    },

    initItem: function () {
        // console.log('initItem')
        this.content.removeAllChildren();
        if (this.items.length > 0)
        {
            for (let i = 0; i < this.items.length; i++)
            {
                this.removeItemInPool(this.items[i]);
            }
            this.items.splice(0, this.items.length);
        }
        for (let i = 0; i < this.spawnCount; i++)
        {
            this.createItem(this.content, i);
        }
    },

    initTemplate: function () {
        // console.log('initTemplate')
        let self = this;
        cc.loader.loadRes(this.itemTemplateUrl, function (err, prefab) {
            if (err) {
                console.error(err);
                return;
            }
            self.itemTemplate = cc.instantiate(prefab);
            if (self._vertical) {
                self.content.height = self.totalCount * (self.itemTemplate.height + self.spacing) + self.spacing;
            }
            else if (self._horizontal) {
                self.content.width = self.totalCount * (self.itemTemplate.width + self.spacing) + self.spacing;
            }
            self.initItemPool(prefab);
            self.initItem();
        });
    },

    //初始化對象池
    initItemPool: function (itemTemplate) {
        // console.log('initItemPool')
        this.itemPool = new cc.NodePool();
        for (let i = 0; i < this.spawnCount; i++)
        {
            let item = cc.instantiate(itemTemplate);
            this.itemPool.put(item);
        }
    },

    itemEventHandler: function (item, itemID, handler, customED) {
        // console.log('itemEventHandler')

        if (!this.eventHandlers[itemID]) {
            this.eventHandlers[itemID] = new cc.Component.EventHandler();
        }
        this.eventHandlers[itemID].target = item;
        this.eventHandlers[itemID].component = this.component;
        this.eventHandlers[itemID].customEventData = {itemID: customED, itemINFO: this.info};
        this.eventHandlers[itemID].handler = handler;
        this.eventHandlers[itemID].emit([handler]);
    },

    itemPosition: function (itemID, item) {
        if (this._horizontal) {
            return cc.v2(item.width * (0.5 + itemID) + this.spacing * (itemID + 1), 0);
        }
        else if (this._vertical) {
            return cc.v2(0, -item.height * (0.5 + itemID) - this.spacing * (itemID + 1));
        }
    },

    //取出對象池中的對象
    createItem: function (parent, itemID) {

        let item = null;
        if (this.itemPool.size() > 0) {
            item = this.itemPool.get();
        }
        else {
            item = cc.instantiate(this.itemTemplate);
            this.itemPool.put(item);
        }
        item.parent = parent;
        item.setPosition(this.itemPosition(itemID, item));
        item.itemID = itemID;
        this.items.push(item);
        //回调函数初始化item
        this.itemEventHandler(item, itemID, 'onInitItem', itemID);
    },

    //把對象重新放入對象池
    removeItemInPool: function (item) {
        this.itemPool.put(item);
    },

    getPositionInView: function (item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateIntervar) return; //每兩幀執行一次
        if (this.itemTemplate == null) return;
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let offset = 0;
        if (this._vertical) {
            offset = (this.itemTemplate.height + this.spacing) * items.length; //所有item加起來的總高度
        }
        else if (this._horizontal) {
            offset = (this.itemTemplate.width + this.spacing) * items.length; //所有item加起來的總宽度
        }
        

        let isDown = this.scrollView.content.y < this.lastContentPos.y; //是否下滑
        let isLeft = this.scrollView.content.x < this.lastContentPos.x; //是否右滑
        for (let i = 0; i < items.length; i++)
        {
            let viewPos = this.getPositionInView(items[i]);
            if (this._vertical) {
                if (isDown)
                {
                    //當前為下滑
                    if (viewPos.y < -buffer && items[i].y + offset < 0)
                    {
                        // console.log('11111111111111');
                        items[i].setPosition(items[i].x, items[i].y + offset);              
                        this.updateItem(i, isDown);
                    }
                }
                else
                {
                    //當前為上滑
                    if (viewPos.y > buffer && items[i].y - offset > -this.content.height)
                    {
                        // console.log('2222222222222');
                        items[i].setPosition(items[i].x, items[i].y - offset);
                        this.updateItem(i, isDown);
                    }
                }
            }
            else if (this._horizontal) {
                if (isLeft)
                {
                    //當前為左滑
                    // console.log(viewPos.x > buffer)
                    // console.log('a: ' + viewPos.x)
                    // console.log('b: ' + (items[i].x - offset));
                    // console.log('c: ' + (-this.content.width));
                    if (viewPos.x > buffer && items[i].x - offset > -this.content.width)
                    {
                        items[i].setPosition(items[i].x - offset, items[i].y);
                        this.updateItem(i, isLeft);
                    }
                }
                else
                {
                    //當前為右滑
                    // console.log(viewPos.x < -buffer)
                    if (viewPos.x < -buffer && items[i].x + offset < 0)
                    {
                        items[i].setPosition(items[i].x + offset, items[i].y);
                        this.updateItem(i, isLeft);
                    }
                }
            }
        }
        this.lastContentPos = this.scrollView.content.getPosition();
    },

    //更新视图列表中每个项目的内容
    updateItem: function (index, flag) {
        let item = this.items[index].getComponent(this.component);
        if (this._vertical) {
            if (!flag) {
                item.itemID = item.itemID + this.items.length;
            }
            else {
                item.itemID = item.itemID - this.items.length;
            }
        }
        else if (this._horizontal) {
            if (!flag) {
                item.itemID = item.itemID - this.items.length;
                // item.itemID = item.itemID + this.items.length;
            }
            else {
                item.itemID = item.itemID + this.items.length;
                // item.itemID = item.itemID - this.items.length;
            }
        }
        this.itemEventHandler(this.items[index], index, 'onUpdateItem', item.itemID);
    },

    //更新视图列表的内容
    updateListView: function (info) {
        this.itemPool = null;
        this.initialize(info);
    },

    addItem: function() {
        if (this._vertical) {
            this.content.height = (this.totalCount + 1) * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        }
        else if (this._horizontal) {
            this.content.width = (this.totalCount + 1) * (this.itemTemplate.width + this.spacing) + this.spacing; // get total content height
        }
        this.totalCount = this.totalCount + 1;
    },

    removeItem: function() {
        if (this.totalCount - 1 < this.spawnCount) {
            cc.error("can't remove item less than " + this.spawnCount + '!');
            return;
        }

        if (this._vertical) {
            this.content.height = (this.totalCount - 1) * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        }
        else if (this._horizontal) {
            this.content.width = (this.totalCount - 1) * (this.itemTemplate.width + this.spacing) + this.spacing; // get total content height
        }
        this.totalCount = this.totalCount - 1;
    },

     //新增: 查看明细先关
     setSpawnCount: function (num) {
        if (num < 6) {
            this.spawnCount = this.totalCount = num;
        } else {
            this.spawnCount = num - 3;
            this.totalCount = num;
        }
    },

});
