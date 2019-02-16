/**
 * 游戏配置文件
 */

var Config = {}
Config.GameSetMap = {
    musicVolume: 0.5, soundVolume: 1, musicOpen: true, soundOpen: true
  }

  //装饰物的配置表
  Config.DecorateMap = {
    //
    Furniture: [
      {name: '冰箱', id: 0, type: 'Refrigerator'},
      {name: '灶台', id: 1, type: 'Hearth'},
      {name: '桌子', id: 2, type: 'Table'}
    ]
  }

  module.exports = Config;
