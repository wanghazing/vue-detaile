import "./debugger.js";
import "./polyfill.js";
import Theme from "./theme";

const THEME = new Theme();
THEME.registerTheme([
  { themeName: "default", isDefault: true, description: "默认模式" },
  { themeName: "dark", isDefault: false, description: "暗黑模式" },
]);
let theme = THEME.getActiveTheme();
console.log(theme, "theme");
THEME.applyTheme(theme ? theme.themeName : "default");
window.THEME = THEME;
window.addEventListener(
  "DOMContentLoaded",
  function () {
    window.FastClick && window.FastClick.attach(document.body);
  },
  false
);
window.getRandomCnWord = function (minLength = 1, maxLength = 20) {
  let length = ~~(Math.random() * (maxLength - minLength)) + minLength;
  return [...Array(length).keys()]
    .map(() => String.fromCharCode(~~(Math.random() * 7000 + 19000)))
    .join("");
};
