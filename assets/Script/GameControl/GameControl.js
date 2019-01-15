var Gl = require('Gl');
var GameData = require('GameData');
var GameFile = require('GameFile');
var SoundManager = require('SoundManager');
var GamePlatform = require('GamePlatform');
var Until = require('Until');

var GameControl = (function() {
    var _gameControl = null;
    function constructor() {
        return {
            run: function() {
                //to do
            }
        }
    }

    function _init() {
        cc.Gl = Gl;
        //游戏数据管理器必须最先实例化
        if (GameData.getInstance() == null) return false;
        if (GameFile.getInstance() == null) return false;
        if (SoundManager.getInstance() == null) return false;

        cc.GameData = GameData.Instance;
        cc.GameFile = GameFile.Instance;
        cc.SoundManager = SoundManager;

        cc.GamePlatform = new GamePlatform();
        cc.Utl = new Until();
        return true; 
    }

    return {
        getGameControl: function() {
            return _gameControl;
        },
        runGameControl: function() {
            if (_gameControl == null) {
                _gameControl = constructor();
                if (!_init()) {
                    _gameControl = null;
                    return false;
                }
            }
            return true;
        }
    }
})();

module.exports = GameControl;