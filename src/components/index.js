import UiPage from "./page";
import HeaderBar from "./header";
export default function registerComonent(app) {
  app.component("ui-page", UiPage);
  app.component("header-bar", HeaderBar);
}
