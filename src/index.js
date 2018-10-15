
/**
 * 装饰器
 * @param {string} type 
 * @returns {Function}
 */
function Dec(type) {
    return function(target) {
        target.prototype._type = type;
        return target;
    }
}

@Dec('Class')
class Person {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }
}

export default Person