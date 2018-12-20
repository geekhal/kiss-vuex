# kiss-vuex

[![](https://api.travis-ci.org/HalZhan/kiss-vuex.svg?branch=master)](https://travis-ci.org/HalZhan/kiss-vuex)
[![](https://img.shields.io/github/languages/code-size/halzhan/kiss-vuex.svg)](https://www.npmjs.com/package/kiss-vuex)
[![](https://img.shields.io/npm/v/kiss-vuex.svg)](https://www.npmjs.com/package/kiss-vuex)
[![codecov](https://codecov.io/gh/HalZhan/kiss-vuex/branch/master/graph/badge.svg)](https://codecov.io/gh/HalZhan/kiss-vuex)
[![](https://img.shields.io/npm/dm/kiss-vuex.svg)](https://www.npmjs.com/package/kiss-vuex)
[![](https://img.shields.io/github/license/halzhan/kiss-vuex.svg)](https://github.com/HalZhan/kiss-vuex/blob/master/LICENSE)

One powerful library for using vuex more easily followed KISS principle, fast and tiny, the minified js file is just 3KB (1KB Gzipped)!

## Installation

```bash
$ npm i -S kiss-vuex
```

> Please ensure that you have installed vue and vuex firstly, because kiss-vuex is dependent on them.

## Usage

`kiss-vuex` supports the easiest way to create vuex's store. It just exports one function named "Store" and you can use it like below:

-   [@Store](#@Store)
-   [Store](#Store)

### @Store

As a decorator, you just need to add it above the class statement.

```js
import { Store } from "kiss-vuex";

@Store
class AppStore {
    counter = 0;
    timeStamps = [];
    info = {
        counter: 0
    };
}

const appStore = new AppStore();

export { AppStore, appStore };
```

> Note: You have to add plugins for supporting decorator usage to your babel.config.js or set compilerOptions.experimentalDecorators property true in the tsconfig.json file.

#### Use with babel

You have to install such below development dependencies firstly.

```bash
$ npm i -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

Then add such plugins to the `.babelrc.js` , `.babelrc` or `babel.config.js` file.

```js
module.exports = {
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: false }]
    ],
    presets: [
        [
            "@babel/env",
            {
                modules: false
            }
        ]
    ]
};
```

#### Use with typescript

Set the property compilerOptions.experimentalDecorators true in the tsconfig.json file.

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

Import the store in the place where you want to use it.

```js
import { appStore } from "./appStore";
import Vue from "vue";

export default Vue.component("app-opr", {
    computed: {
        counter() {
            return appStore.counter;
        },
        timeStamps() {
            return JSON.stringify(appStore.timeStamps);
        },
        timeInfo() {
            return JSON.stringify(appStore.info);
        }
    },
    template: `
  	<div>
        <strong>Operate Area</strong>
        <div><button @click="doClick()">Click me</button></div>
        <div>
    	<strong>Show Area</strong>
            <p>Click times: {{counter}}</p>
            <p>Timestamps: {{timeStamps}}</p>
            <p>timeInfo: {{timeInfo}}</p>
        </div>
    </div>
  `,
    methods: {
        doClick() {
            appStore.counter++;
            appStore.timeStamps.push(new Date());
            appStore.info.counter++;
            appStore.info[appStore.counter] = date.valueOf();
        }
    }
});
```

### Store

As a common function, you can just pass object to it.

```js
import { Store } from 'kiss-vuex';

const appStore = Store({
    counter = 0,
    timeStamps = []
});

export {
    appStore
}
```

Then you can import the store in the place where you want to use it like above.

There are online examples you can also take a look at.

-   [Function Usage](http://jsfiddle.net/mubsp2d3/)
-   [Decorator Usage](http://jsfiddle.net/wurLz9v3/)

Enjoy using it and have fun :)

## Documentations

-   [中文](http://halzhan.cn/kiss-vuex/zh/)
-   [en-US](http://halzhan.cn/kiss-vuex/)

## License

[MIT](http://opensource.org/licenses/MIT)
