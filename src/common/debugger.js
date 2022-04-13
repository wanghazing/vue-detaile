console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "development") {
  var script = document.createElement("script");
  script.type = "text/javascript";

  script.src = process.env.VUE_APP_PUBLIC_PATH + "/vconsole.min.js";
  document.head.appendChild(script);
  script.onload = function () {
    new window.VConsole();
  };
}
