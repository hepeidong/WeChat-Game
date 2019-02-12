/**
 * 全局字段，游戏数据的字段放在这里，包括网络消息号
 */

var Gl = {}

Gl.OriginCoord = {x: -248, y: 175.6};//坐标原点（没用到）
Gl.OriginZIndexOfFloor = 100;//砖块的原始z轴深度，在这里是最右上角的砖块的z轴深度
Gl.OriginZIndexOfFurniture = 300;//家具在z轴上的初始深度

//坐标信息
Gl.Coords = [
    [{x: -18, y: 328},{x: -64.1, y: 297.8},{x: -110.5, y: 267.3},{x: -155.5, y: 236.5},{x: -202, y: 206},{x: -248, y: 175.6}],
    [{x: 27, y: 297.6},{x: -18.7, y: 267},{x: -64.7, y: 237},{x: -109.7, y: 206},{x: -156.7, y: 176},{x: -202.7, y: 146}],
    [{x: 73, y: 267},{x: 27, y: 236},{x: -19, y: 206},{x: -64, y: 175},{x: -111, y: 145},{x: -157, y: 115}],
    [{x: 119, y: 236},{x: 73, y: 205},{x: 27, y: 175},{x: -18, y: 144},{x: -65, y: 114},{x: -111, y: 84}],
    [{x: 165, y: 206},{x: 119, y: 175},{x: 73, y: 145},{x: 28, y: 114},{x: -19, y: 84},{x: -65, y: 54}],
    [{x: 210, y: 175},{x: 164, y: 144},{x: 118, y: 114},{x: 73, y: 83},{x: 26, y: 53},{x: -20, y: 23}]
]

//存储在缓存里面的数据
Gl.S_Key_Set = 's_key_set';//设置信息 {}
Gl.S_Key_Furnitures = 's_key_furnitures';//房间里已经存放的家具列表 []

//.............................
Gl.Key_BrickId = 'key_brickId';//砖块id Number

Gl.Key_FWP = 'key_furnitureWorldPos';//家具的世界坐标
Gl.Key_SBId= 'key_SBId';//被手指点中的砖块的Id，必须是空闲状态的砖块

Gl.Key_fCollisionId = 'key_firstCollisionId';//第一个发生碰撞的砖块id
Gl.Key_nCollisionId = 'key_nextCollisionId';//下一个发生碰撞的砖块id

Gl.Key_ZIndex = 'key_zIndex';//家具z轴的渲染深度

module.exports = Gl;