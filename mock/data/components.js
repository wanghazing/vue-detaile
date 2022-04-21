const queryString = require("query-string");
const componentList = [
  {
    page: "home",
    componentId: 10,
    componentType: "double-column-menu",
    data: {
      title: "双列菜单",
      subTitle: "更多",
      columns: 2,
      margin: ".3rem",
      padding: ".3rem",
      borderRadius: ".12rem",
      items: [
        {
          action: "",
          backgroundImage: "menu-bg-6.png",
          backgroundColor: "#FFFFFF",
          col: 1,
          colWidth: 1,
          index: 1001,
          name: "描述",
          row: 1,
          rowHeight: "1.6rem",
          texts: "1001,1002,1003",
        },
        {
          action: "",
          backgroundImage: "menu-bg-8.png",
          backgroundColor: "#FFFFFF",
          col: 2,
          colWidth: 1,
          index: 1001,
          name: "描述",
          row: 1,
          rowHeight: "1.6rem",
          texts: "1004,1002,1003",
        },
      ],
      texts: [
        {
          content: "菜单1",
          backgroundColor: "transparent",
          color: "#333",
          fontSize: ".3rem",
          fontWeight: "",
          height: "",
          index: "1001",
          isCenter: "",
          lineHeight: "",
          marginBottom: ".3rem",
          marginTop: "",
          name: "内容1",
          width: "",
        },
        {
          content: "菜单1内容",
          backgroundColor: "transparent",
          color: "#666",
          fontSize: ".24rem",
          fontWeight: "",
          height: "",
          index: "1002",
          isCenter: "",
          lineHeight: "",
          marginBottom: ".3rem",
          marginTop: "",
          name: "内容1",
          width: "",
        },
        {
          content: "菜单1内容2",
          backgroundColor: "transparent",
          color: "#666",
          fontSize: ".24rem",
          fontWeight: "",
          height: "",
          index: "1003",
          isCenter: "",
          lineHeight: "",
          marginBottom: ".3rem",
          marginTop: "",
          name: "内容1",
          width: "",
        },
        {
          content: "菜单4",
          backgroundColor: "transparent",
          color: "#333",
          fontSize: ".3rem",
          fontWeight: "",
          height: "",
          index: "1004",
          isCenter: "",
          lineHeight: "",
          marginBottom: ".3rem",
          marginTop: "",
          name: "内容1",
          width: "",
        },
      ],
    },
  },
];

export function getAllComponentsByPage(context) {
  // console.log(context);
  let urlArr = context.url.split("?");
  let params;
  if (urlArr.length > 1) {
    // console.log();
    params = queryString.parse(urlArr[1]);
    return {
      code: "00000000",
      data: {
        list: componentList.filter(({ page }) => page === params.page),
      },
      message: "ok",
    };
  } else {
    return {
      code: "00000010",
      data: {},
      message: "参数错误",
    };
  }
}
