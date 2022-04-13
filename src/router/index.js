import { createRouter, createWebHistory } from "vue-router";

import demo from "./demo";

import Home from "@/views/home";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      title: "",
    },
  },
  ...demo,
];
export default createRouter({ routes, history: createWebHistory() });
