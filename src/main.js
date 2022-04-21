import { createApp } from "vue";
import "./common";
import "@/assets/style/index.scss";

if (process.env.NODE_ENV === "development") {
  require("../mock");
}

import Toast from "@/plugins/toast";
import Http from "@/plugins/axios";
import Utils from "@/utils";
import router from "@/router";
import store from "@/store";
import registerComonent from "@/components";
import App from "./App.vue";

const app = createApp(App, {
  titleHeight: "0.9rem",
});
app.use(Toast);
app.use(Http);
app.use(Utils);
app.use(router);
app.use(store);
registerComonent(app);
app.mount("#app");
