

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.deltaY = 0;
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            var delta = event.touch.getDelta();
            this.node.acitve = false;
            if (!this.newNode) {
                this.newNode = new cc.Node();
                this._on(this.newNode);
            }
            
            this.newNode.y += delta.y;
            this.deltaY += delta.y;
            if (this.deltaY >= this.node.getContentSize().height*0.6) {

            }

        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, function(event){}.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event){}.bind(this), this);
    },

    start () {

    },

    _on: function (node) {
        node.on(cc.Node.EventType.TOUCH_START, function(event){
           
        }.bind(this), this);
        node.on(cc.Node.EventType.TOUCH_MOVE, function(event){}.bind(this), this);
        node.on(cc.Node.EventType.TOUCH_END, function(event){}.bind(this), this);
        node.on(cc.Node.EventType.TOUCH_CANCEL, function(event){}.bind(this), this);
    },

    // update (dt) {},
});
