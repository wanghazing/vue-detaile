<template>
  <div class="launcher-tabbar">
    <div
      class="tab-menu"
      v-for="menu in menuList"
      :key="menu.name"
      @click="handleMenuClick(menu)"
    >
      <img
        v-if="menu.name === activeMenuId"
        :src="require('@/assets/images/tabbar/' + menu.selectIcon)"
        class="menu-icon"
      />
      <img
        v-else
        :src="require('@/assets/images/tabbar/' + menu.unSelectIcon)"
        class="menu-icon"
      />
      <span
        class="menu-title"
        :class="{ 'menu-actived': menu.name === activeMenuId }"
        >{{ menu.title }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "tab-bar",
  data() {
    return {
      activeMenuId: "",
      menuList: [],
    };
  },
  created() {
    this.activeMenuId = this.$route.name;
    const Launcher = this.$router.options.routes.find(
      ({ name }) => name === "launcher"
    );
    if (Launcher && Launcher.children && Launcher.children.length) {
      this.menuList = Launcher.children.map((child) => {
        // console.log(child.meta.isDefault);
        // if (child.meta.isDefault) {
        //   this.activeMenuId = child.name;
        // }
        return {
          name: child.name,
          path: child.path,
          ...child.meta,
        };
      });
    }
  },
  methods: {
    handleMenuClick(menu) {
      this.$router.push(menu.path);
      this.activeMenuId = menu.name;
      // this.menuList
    },
  },
  // props: {
  //   menuList: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
};
</script>

<style lang="scss">
.launcher-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-bg-primary);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100px;
  .tab-menu {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
    }
    .menu-actived {
      color: var(--color-primary);
    }
  }
}
</style>
