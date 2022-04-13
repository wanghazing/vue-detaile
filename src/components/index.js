import UiPage from "./page";
import UiFilter from "./form/filter";
import HeaderBar from "./header";
import TgIcon from "./icon";
export default function registerComonent(app) {
  app.component("ui-page", UiPage);
  app.component("ui-filter", UiFilter);
  app.component("header-bar", HeaderBar);
  app.component("tg-icon", TgIcon);
}
