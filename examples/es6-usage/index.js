import Vue from "vue";
import { Store } from "easy-vuex";

@Store
class AppStore {
    counter = 0;
    timeStamps = [];
}

const appStore = new AppStore();

Vue.component("app-opr", {
    computed: {
        counter: function() {
            return appStore.counter;
        },
        timeStamps: function() {
            return appStore.timeStamps;
        }
    },
    template: `
  	<div>
    	<strong>Operate Area</strong>
      <div><button @click="doClick()">Click me</button></div>
    </div>
  `,
    methods: {
        doClick() {
            appStore.counter++;
            appStore.timeStamps.push(new Date());
        }
    }
});

Vue.component("app-show", {
    computed: {
        counter: function() {
            return appStore.counter;
        },
        timeStamps: function() {
            return JSON.stringify(appStore.timeStamps);
        }
    },
    template: `
  	<div>
    	<strong>Show Area</strong>
      <p>Click times: {{counter}}</p>
      <p>Timestamps: {{timeStamps}}</p>
    </div>
  `
});

new Vue({
    el: "#app",
    template: `
    <div><app-opr></app-opr><app-show></app-show></div>
    `
});
