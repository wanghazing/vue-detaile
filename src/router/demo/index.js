import List from "@/views/demo/list";
import Search from "@/views/demo/search";
export default [
  {
    path: "/list",
    name: "list",
    component: List,
    meta: {
      title: "列表的例子",
    },
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: {
      title: "搜索",
    },
  },
];
