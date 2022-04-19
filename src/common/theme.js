import localCahce from "@/utils/localCache";
export default class Theme {
  constructor() {
    this.themeList = [];
    this.themeName = localCahce.getItem("themeName");
  }
  registerTheme(themeList) {
    this.themeList = themeList.slice(0);
  }
  getActiveTheme() {
    return this.themeList.find(({ themeName }) => themeName === this.themeName);
  }
  applyTheme(themeName) {
    this.themeName = themeName;
    localCahce.setItem("themeName", themeName);
    const className =
      (document.body.classList && document.body.classList.value) ||
      (document.body.attributes.class && document.body.attributes.class.value);
    let cls = (className || "").replace(/theme-[a-z]+/g, "");
    document.body.className = cls + " theme-" + themeName;
  }
}
