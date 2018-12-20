# kiss-vuex

`vuex` 极简语法糖，遵循 `KISS` 原则，让你使用最简单快速的语法创建和使用响应式数据。压缩版本仅 `3KB`（`gzip` 压缩版本仅 `1KB`）。

## 简介

`vuex` 是一款用于状态数据管理的类库，很好地解决了同级 `vue` 组件间数据交换的问题。但是随着项目扩大，会有越来越多的状态信息，`vuex` 数据变得越来越难以维护，另一方面对初学者而言， `vuex` 的学习和使用无疑是具有一定挑战的。而 `kiss-vuex` 则很好地解决这个问题，你甚至不需要学习任何有关 `vuex` 的使用就能够掌握它。

## 安装

```bash
$ npm i -S vue vuex
$ npm i -S kiss-vuex
```

## 配置

### babel

如果你使用了 `babel`，需要先安装将如下两个插件加入到你的 `babel` 配置中，用以支持装饰器语法和类属性语法。

当然如果你没有使用装饰器语法，可以忽略以下插件的安装和配置。

```bash
$ npm i -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

加入到 `babel` 配置文件中。

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

### typescript

如果你使用了 `typescript`，需要将 `tsconfig.json` 中的 `compilerOptions.experimentalDecorators` 这个属性设置为 `ture`。

如果你没有使用装饰器语法，可以忽略以下配置。

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

### es5

如果你偏爱 `es5` 环境，可以直接这么使用。

```html
<head>
    <script type="text/javascript" src="../node_modules/vue/dist/vue.min.js"></script>
    <script type="text/javascript" src="../node_modules/vuex/dist/vuex.min.js"></script>
    <script type="text/javascript" src="../node_modules/vuex/dist/kiss-vuex.min.js"></script>
    <script type="text/javascript">
        var appStore = KissVuex.Store({
            counter: 0,
            timeStamps: [],
            info: {
                counter: 0
            }
        });
        // 添加你的其余自定义代码
    </script>
</head>
```

## 使用

### @Store

作为一个装饰器使用。

```js
import { Store } from 'kiss-vuex';

@Store
class AppStore {
    counter = 0;
    timeStamps = [];
    info = {
        counter: 0
    };
}
const appStore = new AppStore();

export { appStore, AppStore }
```

在你需要使用到 `store` 数据时，直接引入，像一个普通对象使用即可。

```js
import Vue from 'vue';
import { appStore } from './appStore';

Vue.component("app-decorator", {
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
        <h1>Decorator Usage</h1>
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
            const date = new Date();
            appStore.counter++;
            appStore.timeStamps.push(date);
            appStore.info.counter++;
            appStore.info[appStore.counter] = date.valueOf();
        }
    }
});

new Vue({
    el: "#app",
    template: `<div><app-decorator></app-decorator></div>`
});
```

> 注意：装饰器语法和类属性语法需要开启额外插件和配置，具体见 [配置](#配置)

### Store

作为一个普通函数使用。

```js
import { Store } from 'kiss-vuex';

const appStore = Store({
    counter: 0,
    timeStamps: [],
    info: {
        counter: 0
    }
})
```

## 例子

这里有几个线上实例。

- [作为普通函数使用](http://jsfiddle.net/mubsp2d3/)

<iframe width="100%" height="300" src="//jsfiddle.net/mubsp2d3/embedded/result,js,html/dark" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

- [作为装饰器使用](http://jsfiddle.net/wurLz9v3/)

<iframe width="100%" height="300" src="//jsfiddle.net/wurLz9v3/embedded/result,js,html/dark" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>