import { createApp } from "vue";
import "./common";
import "@/assets/style/index.scss";

import Toast from "@/plugins/toast";

import router from "@/router";
import store from "@/store";
import registerComonent from "@/components";
import App from "./App.vue";

const app = createApp(App);
app.use(Toast);
app.use(router);
app.use(store);
registerComonent(app);
app.mount("#app");
