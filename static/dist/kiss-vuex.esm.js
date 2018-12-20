/*!
 * kiss-vuex.js v0.1.3
 * (c) 2018-2018 Hal Zhan
 * Released under the MIT License.
 */
import Vue from 'vue';
import Vuex from 'vuex';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var vuexHasUsed = false;

function __isKey__(path) {
  return ["string", "number", "symbol", "bigint"].indexOf(_typeof(path)) > -1;
}

function __normalizePath__(path) {
  var finalPaths = [];

  if (__isKey__(path)) {
    path = String(path).replace("[", ".").replace("]", ".").split(".");
  }

  if (Array.isArray(path) && path.length) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var p = _step.value;

        if (p.indexOf(".") > -1) {
          finalPaths = finalPaths.concat(__normalizePath__(p));
        } else if (p || p == "0") {
          finalPaths.push(p);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return finalPaths;
}

function __set__(object, path, value) {
  var rawObj = object;

  if (object && _typeof(object) === "object") {
    path = __normalizePath__(path);
    var length = path.length;

    for (var i = 0; i < length; i++) {
      if (i >= length - 1) {
        object[path[i]] = value;
      } else if (_typeof(object[path[i]]) === "object") {
        object = object[path[i]];
      } else {
        object = object[path[i]] = {};
      }
    }
  }

  return rawObj;
}

function __get__(object, path) {
  var result = void 0;

  if (object && _typeof(object) === "object") {
    path = __normalizePath__(path);
    var length = path.length;

    if (length) {
      for (var i = 0; i < length; i++) {
        if (i >= length - 1) {
          result = object[path[i]];
        } else if (_typeof(object[path[i]]) === "object") {
          object = object[path[i]];
        }
      }
    }
  }

  return result;
}

function genCommitName(key) {
  if (__isKey__(key)) {
    return "SETTER_" + String(key).toUpperCase();
  }

  return "";
}

function getFromStore(store, key) {
  return __get__(store.state, key);
}

function setToStore(store, key, data) {
  var firstKey = getFirstKey(key),
      commitName = genCommitName(firstKey);
  return store.commit(commitName, {
    data: data,
    path: key
  });
}

function getFirstKey(key) {
  return __normalizePath__(key)[0];
}

function initVuexStore(object, keys) {
  keys = keys || Object.keys(Object(object));
  var store = null;

  if (keys && keys.length) {
    var state = {},
        mutations = {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function _loop() {
        var key = _step2.value;
        state[key] = object[key];
        var commitName = genCommitName(key);

        mutations[commitName] = function (state) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var path = options.path || key,
              data = options.data || null;
          path = path || key;

          if (hasOwnProperty.call(options, "data")) {
            __set__(state, path, data);
          }
        };
      };

      for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    store = new Vuex.Store({
      state: state,
      mutations: mutations
    });
  }

  return store;
}

function makeStore(object) {
  object = Object(object);

  var keys = Object.keys(object),
      store = initVuexStore(object, keys),
      castReactive = function castReactive(key) {
    Object.defineProperty(object, key, {
      get: function get() {
        return getFromStore(store, key);
      },
      set: function set(newVal) {
        if (_typeof(newVal) === "object") {
          newVal = Object.assign({}, newVal);
        }

        setToStore(store, key, newVal);
      }
    });
  };

  for (var _i = 0; _i < keys.length; _i++) {
    var key = keys[_i];
    castReactive(key);
  }

  return store;
}

function makeClassStore(targetClass) {
  var targetObj = new targetClass(),
      store = makeStore(targetObj);

  var Class = function Class() {
    var _arr = Object.keys(targetObj);

    for (var _i2 = 0; _i2 < _arr.length; _i2++) {
      var prop = _arr[_i2];
      Object.defineProperty(this, prop, Object.getOwnPropertyDescriptor(targetObj, prop));
    }
  };

  Class.prototype = Object.create(targetClass.prototype);
  Class.prototype.constructor = targetClass.prototype.constructor;
  Class.__VUE_STORE__ = store;
  return Class;
}

function makeObjectStore(options) {
  makeStore(options);
  return options;
}

function Store() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!vuexHasUsed) {
    Vue.use(Vuex);
    vuexHasUsed = true;
  }

  if (typeof options === "function") {
    return makeClassStore(options);
  } else {
    return makeObjectStore(options);
  }
}

export { Store };
//# sourceMappingURL=kiss-vuex.esm.js.map
