import { __normalizePath__, __set__, __get__, genCommitName } from "src/Store";
import { Store } from "kiss-vuex";

describe(`src/Store.js`, () => {
    describe(`__normalizePath__(path)`, () => {
        test(`should return the path array when given argument is an array`, () => {
            expect(["c", "f", "g"]).toEqual(
                __normalizePath__(["", ".", "c.f.g"])
            );
        });
        test(`should return the path array when given argument is a string`, () => {
            expect(["c", "e", "0"]).toEqual(__normalizePath__("c.e.0"));
        });
    });
    describe(`__set__(object, path, value)`, () => {
        test(`set successfully`, () => {
            expect(__set__({}, "a", 1)).toEqual({ a: 1 });
            expect(__set__({}, "a.b", 1)).toEqual({ a: { b: 1 } });
            expect(__set__({ a: {} }, "a[c]", 2)).toEqual({ a: { c: 2 } });
        });
        test(`will break if the target is not undefined, null or object`, () => {
            expect(__set__({ a: 1 }, "a[c]", 2)).toEqual({
                a: { c: 2 }
            });
        });
    });
    describe(`__get__(object, path)`, () => {
        const object = {
            a: 1,
            b: [2, 3],
            c: { d: 4, e: [5, 6], f: { g: 7 } }
        };
        test(`get the target value if it exsits`, () => {
            expect(__get__(object, "c.e[0]")).toBe(5);
        });
    });
    describe(`genCommitName(key)`, () => {
        test(`will return empty string when given key is not valid path key`, () => {
            expect(genCommitName(Object({ a: 1 }))).toBe("");
        });
    });
    describe(`@Store`, () => {
        test(`will get a decorated class`, () => {
            @Store
            class AppStore {
                counter = 0;
                info = {};
                timeStamps = [];
            }
            const appStore = new AppStore();
            const obj1 = {
                get counter() {
                    return appStore.counter;
                }
            };
            const obj2 = {
                set counter(value) {
                    appStore.counter = value;
                },
                get counter() {
                    return appStore.counter;
                }
            };
            const randomInt = parseInt(10 * Math.random(), 10);
            obj2.counter += randomInt;
            expect(obj1.counter).toBe(randomInt);
        });
    });
    describe(`Store(options)`, () => {
        test(`will get a store`, () => {
            const appStore = Store({
                counter: 0,
                info: {},
                timeStamps: []
            });
            const obj1 = {
                get info() {
                    return appStore.info;
                }
            };
            const obj2 = {
                set info(value) {
                    appStore.info = value;
                }
            };
            const randomInt = parseInt(10 * Math.random(), 10);
            const now = new Date().toString();
            obj2.info = { [randomInt]: now };
            expect(obj1.info).toEqual({ [randomInt]: now });
        });
    });
});
