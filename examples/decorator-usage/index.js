import Vue from "vue";
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

export default Vue.component("app-decorator", {
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
