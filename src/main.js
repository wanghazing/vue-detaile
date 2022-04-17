import { createApp } from "vue";
import "./common";
import "@/assets/style/index.scss";

import Toast from "@/plugins/toast";
import Utils from "@/utils";
import router from "@/router";
import store from "@/store";
import registerComonent from "@/components";
import App from "./App.vue";

const app = createApp(App, {
  titleHeight: "0.9rem",
});
app.use(Toast);
app.use(Utils);
app.use(router);
app.use(store);
registerComonent(app);
app.mount("#app");
