//类的继承
function createExtend(child, parent) {
    if (!(child instanceof Object)) {
        child = function(){};
    }
    function Super() { };
    Super.prototype = parent.prototype;
    child.prototype = new Super();
    child.prototype.constructor = child;
    return child;
}

function StateMachine() {
    this.stateMap = null;
}

function BaseState() {
    this._stateMachine = null;
}

var ChildMap = {};

StateMachine.prototype.setupState = function( object ) {
    this.stateMap = object;

    for (let key in object) {
        ChildMap[key] = createExtend(key, BaseState);
    }
}


