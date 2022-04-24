import { createRouter, createWebHistory } from "vue-router";
import localCahce from "@/utils/localCache";
import demo from "./demo";

import Launcher from "@/views/launcher";
import Home from "@/views/launcher/views/home";
import Discovery from "@/views/launcher/views/discovery";
import Message from "@/views/launcher/views/message";

import Login from "@/views/login";
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      public: true,
    },
  },
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
          public: true,
        },
      },
      {
        path: "discovery",
        name: "discovery",
        component: Discovery,
        meta: {
          title: "发现",
          order: 2,
          selectIcon: "global-sel.png",
          unSelectIcon: "global-nor.png",
          public: true,
        },
      },
      {
        path: "message",
        name: "message",
        component: Message,
        meta: {
          title: "待办",
          order: 3,
          selectIcon: "direct-sel.png",
          unSelectIcon: "direct-nor.png",
          public: true,
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
const router = createRouter({ routes, history: createWebHistory() });
router.beforeEach((to, from, next) => {
  console.log(to);
  if (!to.meta.public) {
    const isLogin = localCahce.getItem("isLogin");
    if (isLogin !== "true") {
      return void router.push("/login?redirect=" + to.name);
    }
  }
  next();
});
export default router;
