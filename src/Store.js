import Vue from "vue";
import Vuex from "vuex";

let vuexHasUsed = false;

function __isKey__(path) {
    return ["string", "number", "symbol", "bigint"].indexOf(typeof path) > -1;
}

function __normalizePath__(path) {
    let finalPaths = [];
    if (__isKey__(path)) {
        path = String(path)
            .replace("[", ".")
            .replace("]", ".")
            .split(".");
    }
    if (Array.isArray(path) && path.length) {
        for (let p of path) {
            if (p.indexOf(".") > -1) {
                finalPaths = finalPaths.concat(__normalizePath__(p));
            } else if (p || p == "0") {
                finalPaths.push(p);
            }
        }
    }
    return finalPaths;
}

function __set__(object, path, value) {
    const rawObj = object;
    if (object && typeof object === "object") {
        path = __normalizePath__(path);
        const length = path.length;
        for (let i = 0; i < length; i++) {
            if (i >= length - 1) {
                object[path[i]] = value;
            } else if (typeof object[path[i]] === "object") {
                object = object[path[i]];
            } else {
                object = object[path[i]] = {};
            }
        }
    }
    return rawObj;
}

function __get__(object, path) {
    let result = void 0;
    if (object && typeof object === "object") {
        path = __normalizePath__(path);
        const length = path.length;
        if (length) {
            for (let i = 0; i < length; i++) {
                if (i >= length - 1) {
                    result = object[path[i]];
                } else if (typeof object[path[i]] === "object") {
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
    const firstKey = getFirstKey(key),
        commitName = genCommitName(firstKey);
    return store.commit(commitName, { data, path: key });
}

function getFirstKey(key) {
    return __normalizePath__(key)[0];
}

function initVuexStore(object, keys) {
    keys = keys || Object.keys(Object(object));
    let store = null;
    if (keys && keys.length) {
        const state = {},
            mutations = {};
        for (let key of keys) {
            state[key] = object[key];
            let commitName = genCommitName(key);
            mutations[commitName] = function(state, options = {}) {
                let path = options.path || key,
                    data = options.data || null;
                path = path || key;
                if (hasOwnProperty.call(options, "data")) {
                    __set__(state, path, data);
                }
            };
        }
        store = new Vuex.Store({ state, mutations });
    }
    return store;
}

function makeStore(object) {
    object = Object(object);
    const keys = Object.keys(object),
        store = initVuexStore(object, keys),
        castReactive = function castReactive(key) {
            Object.defineProperty(object, key, {
                get() {
                    return getFromStore(store, key);
                },
                set(newVal) {
                    if (typeof newVal === "object") {
                        newVal = Object.assign({}, newVal);
                    }
                    setToStore(store, key, newVal);
                }
            });
        };
    for (let key of keys) {
        castReactive(key);
    }
    return store;
}

function makeClassStore(targetClass) {
    const targetObj = new targetClass(),
        store = makeStore(targetObj);
    const Class = function Class() {
        for (let prop of Object.keys(targetObj)) {
            Object.defineProperty(
                this,
                prop,
                Object.getOwnPropertyDescriptor(targetObj, prop)
            );
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

function Store(options = {}) {
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

export {
    __normalizePath__,
    __set__,
    __get__,
    genCommitName,
    getFromStore,
    setToStore,
    getFirstKey,
    initVuexStore,
    makeStore,
    makeClassStore,
    makeObjectStore
};

export default Store;
