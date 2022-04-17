<template>
  <div class="embed-container">
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <keep-alive :include="cacheComponents">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <tabbar></tabbar>
</template>

<script>
// import headerBar from "@/components/header";
import Tabbar from "./components/tabbar";
export default {
  name: "LauncherPage",
  components: { Tabbar },
  data() {
    return {
      activeHeaderMenu: 1,
      headerMenuList: [
        { menuId: 1, menuName: "关注" },
        { menuId: 2, menuName: "发现" },
        { menuId: 3, menuName: "法兰西岛" },
      ],
    };
  },
  created() {
    console.log(this.$route);
  },
  methods: {
    handleChooseHeaderMenu(menuId) {
      this.activeHeaderMenu = menuId;
    },
  },
};
</script>

<style lang="scss">
.embed-container {
  margin-bottom: 100px;
}
</style>
