
var EXPLOIT_PIXELS_W = 1280//设计分辨率宽
var EXPLOIT_PIXELS_H = 720//设计分辨率高
//模拟机型分辨率
var MODULE_PIXELS_W = 1280
var MODULE_PIXELS_H = 720
//有刘海全屏的分辨率
var BANGS_PIXELS_W = 1440
var BANGS_PIXELS_H = 720


function GamePlatform() {
    this.screenSize = null;
    this.sysInfo = null;
    if (this.IsWechatGame())
    {
        this.sysInfo = wx.getSystemInfoSync();
    }
}

GamePlatform.prototype = {
    GetScreenSize() {
        return cc.director.getWinSize();
    },
    GetWinSizeInPixels() {
        return cc.director.getWinSizeInPixels();
    },
    GetScreenScaleX() {
        return this.GetScreenSize().width / EXPLOIT_PIXELS_W;
    },
    GetScreenScaleY() {
        return this.GetScreenSize().height / EXPLOIT_PIXELS_H;
    },
    ScreenFitWidth() {
        let canvas = cc.find('Canvas').getComponent(cc.Canvas);
        let winSize = this.GetScreenSize();
        if (winSize.height / winSize.width <= EXPLOIT_PIXELS_H / EXPLOIT_PIXELS_W)
        {
            if (winSize.height / winSize.width < BANGS_PIXELS_H / BANGS_PIXELS_W)
            {
                canvas.node.scaleX = BANGS_PIXELS_W / winSize.width;
                this.screenSize = new cc.size(BANGS_PIXELS_W, cc.director.getVisibleSize().height);
            }
            canvas.fitHeight = true;
            canvas.fitWidth = false;
        }
    },
    ScreenFitWidthOfLayer(layerName, parent) {
        let layer = cc.director.getScene().getChildByName('Canvas').getChildByName(layerName);
        if (!layer) {
            if (!parent) return;
            layer = parent.getChildByName(layerName);
        }
        let layerSize = layer.getContentSize();
        let visibleSize = this.GetScreenSize();

        if (visibleSize.height / visibleSize.width < EXPLOIT_PIXELS_H / EXPLOIT_PIXELS_W) {
            //1280为设计分辨率
            if (visibleSize.height / visibleSize.width < BANGS_PIXELS_H / BANGS_PIXELS_W)
            {
                //有刘海的全屏适配
                WriteLog('有刘海全屏适配');
                layerSize.height = visibleSize.height;
                layerSize.width = visibleSize.width;
                layer.setContentSize(layerSize);
                // layer.scaleX = 1440 / visibleSize.width;
            }
            else {
                WriteLog('无刘海全屏适配');
                layerSize.height = visibleSize.height;
                layerSize.width = visibleSize.width;
                layer.setContentSize(layerSize);
            }
        }
    },
    GetVisibleSize() {
        if (this.screenSize) return this.screenSize;
        return cc.director.getVisibleSize();
    },
    IsWechatGame() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            return true;
        }

        return false;
    }
}

module.exports = GamePlatform;
