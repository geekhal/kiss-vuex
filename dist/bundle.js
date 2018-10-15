(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.EasyVuex = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  /**
   * 装饰器
   * @param {string} type 
   * @returns {Function}
   */
  function Dec(type) {
    return function (target) {
      target.prototype._type = type;
      return target;
    };
  }

  var Person = (_dec = Dec('Class'), _dec(_class = function Person(name, gender) {
    _classCallCheck(this, Person);

    this.name = name;
    this.gender = gender;
  }) || _class);

  return Person;

})));
//# sourceMappingURL=bundle.js.map
