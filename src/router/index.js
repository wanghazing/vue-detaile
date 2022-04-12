import { createRouter, createWebHistory } from "vue-router";

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
];
export default createRouter({ routes, history: createWebHistory() });
