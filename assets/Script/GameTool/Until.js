

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    Log: function (text) {
        var str = text.split('@');
        if (typeof str[0] == 'string') {
            if ((str[0][0] == '{' && str[0][str[0].length - 1] == '}') || (str[0][0] == '[' && str[0][str[0].length - 1] == ']'))
            {
                console.log(new Date());
                console.log(JSON.parse(str[0]));
            }
            else {
                console.log(new Date() + ': ' + str[0]);
            }
        }
        else {
            console.log(new Date() + ': ' + str[0]);
        }
        if (str.length == 2) {
            console.log(str[1]);
        }
    },
    getStackTrace: function () {
        var obj = {};
        if (Error.captureStackTrace)
            {
                Error.captureStackTrace(obj, this.getStackTrace);
            }
        return obj.stack;
    },
    
    WriteLog: function (data) {
        var log = this.Log;
        var stack = this.getStackTrace() || ""
        var matchResult = stack.match(/\(.*?\)/g) || []
        var line = matchResult[1] || ""
        for (var i in arguments) {
        }
        if (typeof arguments[i] == 'object') {
            arguments[i] = JSON.stringify(arguments[i])
        }
        arguments[i] += '@' + line.replace("(", "").replace(")", "")
        log.apply(console, arguments)
    },

    Err: function (text) {
        var str = text.split('@');
        if (typeof str[0] == 'string') {
            if ((str[0][0] == '{' && str[0][str[0].length - 1] == '}') || (str[0][0] == '[' && str[0][str[0].length - 1] == ']'))
            {
                console.error(new Date());
                console.error(JSON.parse(str[0]));
            }
            else {
                console.error(new Date() + ': ' + str[0]);
            }
        }
        else {
            console.error(new Date() + ': ' + str[0]);
        }
        if (str.length == 2) console.log(str[1]);
    },
    
    WriteError: function (text) {
        var err = this.Err;
        var stack = this.getStackTrace() || ""
        var matchResult = stack.match(/\(.*?\)/g) || []
        var line = matchResult[1] || ""
        for (var i in arguments) {
        }
        if (typeof arguments[i] == 'object') {
            arguments[i] = JSON.stringify(arguments[i])
        }
        arguments[i] += '@' + line.replace("(", "").replace(")", "")
        err.apply(console, arguments)
    },

    Warn: function (text) {
        var str = text.split('@');
        if (typeof str[0] == 'string') {
            if ((str[0][0] == '{' && str[0][str[0].length - 1] == '}') || (str[0][0] == '[' && str[0][str[0].length - 1] == ']'))
            {
                console.warn(new Date());
                console.warn(JSON.parse(str[0]));
            }
            else {
                console.warn(new Date() + ': ' + str[0]);
            }
        }
        else {
            console.warn(new Date() + ': ' + str[0]);
        }
        if (str.length == 2) console.log(str[1]);
    },
    
    WriteWarn: function (text) {
        var warn = this.Warn;
        var stack = this.getStackTrace() || ""
        var matchResult = stack.match(/\(.*?\)/g) || []
        var line = matchResult[1] || ""
        for (var i in arguments) {
        }
        if (typeof arguments[i] == 'object') {
            arguments[i] = JSON.stringify(arguments[i])
        }
        arguments[i] += '@' + line.replace("(", "").replace(")", "")
        warn.apply(console, arguments)
    },

    addClickEvent: function (node, target, component, handler) {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        let clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
    },

    addToggleEvent: function (node, target, component, handler) {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        let toggleEvents = node.getComponent(cc.Toggle).clickEvents;
        toggleEvents.push(eventHandler);
    },

    addSlideEvent: function (node, target, component, handler) {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        let slideEvents = node.getComponent(cc.Slider).slideEvents;
        slideEvents.push(eventHandler);
    },

    addScrollEvent: function (node, target, component, handler) {
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        let scrollViewEvents = node.getComponent(cc.ScrollView).ScrollEvents;
        scrollViewEvents.push(eventHandler);
    },

    addEscEvent: function (node) {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
            },
            onKeyReleased: function (keyCode, event) {
                if (keyCode == cc.KEY.back) {
                    cc.vv.alert.show('提示', '确定要退出游戏吗？', function () {
                        cc.game.end();
                    }, true);
                }
            }
        }, node);
    },

    addEditReturnEvent: function (node, target, component, handler) {
        let editboxEventHandler = new cc.Component.EventHandler();
        editboxEventHandler.target = target; //这个 node 节点是你的事件处理代码组件所属的节点
        editboxEventHandler.component = component;
        editboxEventHandler.handler = handler;

        editbox.editingDidBegan.push(editboxEventHandler);
    },

    openView: function (panelName, cb) {
        // var child = cc.director.getScene().getChildByName('Canvas').getChildByName(panelName);
        // if (child != null) {
        //     child.active = true;
        //     cb && cb(child);

        //     return;
        // }
        
        // var loadPath = "Entity/" + panelName;
        // var onResLoaded = function (err, res) {

        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //     var panelNode = cc.instantiate(res);
        //     panelNode.name = res.name;
        //     if (!cc.director.getScene().getChildByName('Canvas').getChildByName(res.name)) {
        //         cc.director.getScene().getChildByName('Canvas').addChild(panelNode);
        //     }
        //     cb && cb(panelNode);
        // }
        // cc.loader.loadRes(loadPath, onResLoaded);
        this.loadPrefab(panelName, cc.director.getScene().getChildByName('Canvas'), cb);
    },

    closeView: function (panelName) {
        var child = cc.director.getScene().getChildByName('Canvas').getChildByName(panelName);
        if (child != null) {
            child.destroy();
            return;
        }
    },

    loadPrefab: function (prefabName, parent, cb) {
        var child = parent.getChildByName(prefabName);
        if (child != null) {
            child.active = true;
            cb && cb(child);
            return;
        }

        var loadPath = "Entity/" + prefabName;
        var onResLoaded = function (err, res) {

            if (err) {
                console.error(err);
                return;
            }
            var newNode = cc.instantiate(res);
            newNode.name = res.name;
            if (!parent.getChildByName(res.name)) {
                parent.addChild(newNode);
            }
            cb && cb(newNode);
        }
        cc.loader.loadRes(loadPath, onResLoaded);
    },

    popu: function (viewNode, cb) {
        viewNode.scaleX = 0;
        viewNode.scaleY = 0;
        let scaleTo1 = cc.scaleTo(0.2, 1.2, 1.2);
        let scaleTo2 = cc.scaleTo(0.2, 1, 1);
        if (cb) {
            let seq = cc.sequence(scaleTo1, scaleTo2, cc.callFunc(cb, this));
            viewNode.runAction(seq);
        }
        else {
            let seq = cc.sequence(scaleTo1, scaleTo2);
            viewNode.runAction(seq);
        }
    },

    wxGetSetting() {
        let that = this;
        if (!cc.GamePlatform.IsWechatGame()) return;
        wx.getSetting({
            success: function (res) {
                var authSetting = res.authSetting
                console.log(authSetting);
                if (authSetting['scope.userInfo'] === true) {
                    // 用户已授权，可以直接调用相关 API
                    that.wxUserInfo(true);
                } else if (authSetting['scope.userInfo'] === false) {
                    // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                    that.userInfoButton();
                } else {
                    // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                    that.userInfoButton();
                }
            }
        });
    },

    userInfoButton: function () {
        if (cc.GamePlatform.IsWechatGame()) {
            let winSize = cc.view.getFrameSize();
            let button = wx.createUserInfoButton({
                type: 'text',
                text: '点击登陆游戏',
                style: {
                    left: 30,
                    top: 300,
                    width: 200,
                    height: 40,
                    lineHeight: 40,
                    backgroundColor: '#ff0000',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                },
                withCredentials: true
            });
            button.onTap(res => {
                if (res.errMsg == "getUserInfo:ok") {
                    this.saveUserInfo(res);
                }
                else if (res.errMsg == "getUserInfo:fail auth deny") {
                    this.showWxModal('提示', '拒绝授权将无法进入游戏', () => { this.wxExitMiniProgram(); }, () => { this.userInfoButton(callback); });
                }
                button.destroy();
            });
        }
    },

    wxLoginCode: function (cb) {
        if (!cc.GamePlatform.IsWechatGame()) {
            return;
        }
        let that = this;
        //1)获取code
        wx.login({
            success: function (res) {
                // console.warn(res.code); //小游戏中,每次刷新code都会变化
                if (cb) cb();
            }
        });
    },

    wxUserInfo: function (b) {
        let that = this;
        wx.getUserInfo({
            withCredentials: b,
            success: function (retdata) {
                that.saveUserInfo(retdata);
            }
        });
    },

    showWxModal(title, content, sureFunc, cencelFunc) {
        if (!cc.GamePlatform.IsWechatGame()) {
            return;
        }

        wx.showModal({
            title: title,
            content: content,
            confirmColor: '#55E213',
            success: function (res) {
                if (res.confirm) {
                    //用户点击确定
                    sureFunc();
                } else {
                    //用户点击取消
                    cencelFunc();
                    //('用户点击确定');
                }
            }
        });
    },

    wxExitMiniProgram() {
        wx.exitMiniProgram({
            success: function (res) {
                //退出小游戏
            }
        });
    },

    saveUserInfo: function (retdata) {
        let user = {};
        user.encryptedData = retdata.encryptedData;
        user.iv = retdata.iv;
        user.signature = retdata.signature;
        user.rawData = retdata.rawData;
        cc.GameData.SetUserInfo(user);

        var userInfo = retdata.userInfo;
        cc.GameData.GetUserInfo().nickName = userInfo.nickName;
        cc.GameData.GetUserInfo().headUrl = userInfo.avatarUrl;
    },

    loadImage: function (spriteHead, imagUrl) {
        if (!imagUrl) {
            return false;
        }
        //此方法针对4人包括自己,
        let self = this;
        if (imagUrl == undefined || imagUrl == null || imagUrl == '' || imagUrl.length <= 0) return;
        cc.loader.load({ url: imagUrl, type: 'png' }, function (err, texture) {
            if (err) {
                setTimeout(() => {
                    self.loadImage(spriteHead, imagUrl);
                }, 2000);
                cc.error(err);
                return false;
            } else {
                spriteHead.spriteFrame = new cc.SpriteFrame(texture);
            }
        });
        return true;
    },


    // update (dt) {},
});
