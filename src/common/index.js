import "./debugger.js";
import "./polyfill.js";

window.addEventListener(
  "DOMContentLoaded",
  function () {
    window.FastClick && window.FastClick.attach(document.body);
  },
  false
);
