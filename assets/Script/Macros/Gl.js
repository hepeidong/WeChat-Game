/**
 * 全局字段，游戏数据的字段放在这里，包括网络消息号
 */

var Gl = {}

Gl.Key_Set = 'key_set';//设置信息 {}

Gl.Key_Coords = 'key_coords';//坐标信息 []

Gl.Key_BrickId = 'key_brickId';//砖块id Number

Gl.Key_FWP = 'key_furnitureWorldPos';//家具的世界坐标
Gl.Key_FWP2 = 'key_f2';

module.exports = Gl;