import { createRouter, createWebHistory } from "vue-router";

import demo from "./demo";

import Launcher from "@/views/launcher";
import Home from "@/views/launcher/views/home";
const routes = [
  {
    path: "/",
    redirect: "/launcher",
  },
  {
    path: "/launcher",
    name: "launcher",
    component: Launcher,
    redirect: "/home",
    meta: {
      title: "",
    },
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
        meta: {
          title: "首页",
          order: 1,
          selectIcon: "home-sel.png",
          unSelectIcon: "home-nor.png",
          isDefault: true,
        },
      },
      {
        path: "discovery",
        name: "discovery",
        component: Home,
        meta: {
          title: "发现",
          order: 2,
          selectIcon: "global-sel.png",
          unSelectIcon: "global-nor.png",
        },
      },
      {
        path: "direct",
        name: "direct",
        component: Home,
        meta: {
          title: "待办",
          order: 3,
          selectIcon: "direct-sel.png",
          unSelectIcon: "direct-nor.png",
        },
      },
      {
        path: "mine",
        name: "mine",
        component: Home,
        meta: {
          title: "我的",
          order: 1,
          selectIcon: "mine-sel.png",
          unSelectIcon: "mine-nor.png",
        },
      },
    ],
  },
  ...demo,
];
export default createRouter({ routes, history: createWebHistory() });
