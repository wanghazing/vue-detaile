import { rem2px } from "./rem2px";
import rgb from "./rgb";

export default {
  install(app) {
    app.config.globalProperties.$utils = {
      rem2px,
      rgb,
    };
  },
};
