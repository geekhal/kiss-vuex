import Vue from "vue";
import Vuex from "vuex";

let vuexHasUsed = false;

function __normalizePath__(path) {
    const finalPaths = [];
    if (typeof path === "string") {
        path = path.split(".");
    }
    if (Array.isArray(path) && path.length) {
        for (let p of path) {
            if (p || p == 0) {
                finalPaths.push(p);
            }
        }
    }
    return finalPaths;
}

function __set__(object, path, value) {
    if (object && typeof object === "object") {
        path = __normalizePath__(path);
        const length = path.length;
        for (let i = 0; i < length; i++) {
            if (i >= length - 1) {
                object[path[i]] = value;
            } else if (typeof object[path[i]] === "object") {
                object = object[path[i]];
            } else if (object[path[i]] == null) {
                object = object[path[i]] = {};
            } else {
                break;
            }
        }
    }
}

function __get__(object, path) {
    let result = void 0;
    if (object && typeof object === "object") {
        path = __normalizePath__(path);
        const length = path.length;
        for (let i = 0; i < length; i++) {
            if (i >= length - 1) {
                result = object[path[i]];
            } else if (typeof object[path[i]] === "object") {
                object = object[path[i]];
            }
        }
    }
    return result;
}

function genCommitName(key) {
    if (key && typeof key === "string") {
        return "SETTER_" + key.toUpperCase();
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
                    setToStore(store, key, newVal);
                }
            });
        };
    for (let key of keys) {
        castReactive(key);
    }
    return object;
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
    return Class;
}

function makeObjectStore(options) {
    return makeStore(options);
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

export default Store;
