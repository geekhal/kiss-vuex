# kiss-vuex

One powerful library for using vuex more easily followed KISS principle, fast and tiny, the minified file is just 3KB (1KB Gzipped)!

## Why

Vuex is very good to transfer data between peer components, but the usage is too hard to understand for developers. With the application's complexity growing, it becomes more and more difficult to 
be maintained. So, kiss-vuex comes here, everything will be easy with it and there is no need to learn how to use vuex.

## Installation

```bash
$ npm i -S vue vuex
$ npm i -S kiss-vuex
```

## Configuration

### Use with babel

If you want to use decorators, you have to add such plugins to your project:

```bash
$ npm i -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

Then add these plugins to the babel config file, like below

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

### Use with typescript

Just set the property `compilerOptions.experimentalDecorators` `true` in the tsconfig.json file.

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

### Use with plain javascript

Just add script elements to your html files.

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
        // add other code here...
    </script>
</head>
```

## Usage

### @Store

As a decorator, just add it above the class statements, like below.

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

Then you have to import the store you declared where you want to use it.

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

### Store

As a common function, you just need to pass an object to it, like this:

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

## Examples

There are some online examples for you:

- [use as function](https://jsfiddle.net/mubsp2d3/1/)

<iframe width="100%" height="300" src="//jsfiddle.net/mubsp2d3/1/embedded/result,js,html/dark" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

- [use as decorator](https://jsfiddle.net/wurLz9v3/1/)

<iframe width="100%" height="300" src="//jsfiddle.net/wurLz9v3/1/embedded/result,js,html/dark" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>