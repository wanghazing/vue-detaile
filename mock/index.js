import { getAllComponentsByPage } from "./data/components";
const Mock = require("mockjs");

Mock.mock("/article/list", () => {
  return {
    code: "00000000",
    data: {
      list: [{ a: 1 }],
    },
    message: "ok",
  };
});
Mock.mock("/article/error", () => {
  return {
    code: "10001000",
    data: {},
    message: "resource undefined",
  };
});

Mock.mock(new RegExp("/component/all.*"), getAllComponentsByPage);
