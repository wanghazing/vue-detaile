<template>
  <ui-page
    :touch-actions="['swiper']"
    use-custom-header
    ref="page"
    :header="{
      barHeight: '1.6rem',
    }"
  >
    <template v-slot:header>
      <header-bar bar-height="1.6rem" :show-back="false">
        <template v-slot:header-left>
          <img
            src="@/assets/images/love.png"
            class="header-left-logo"
            alt=""
            srcset=""
          />
        </template>
        <div class="header-menu">
          <div
            class="header-menu-item"
            v-for="menu in headerMenuList"
            :key="menu.menuId"
            :class="{ active: menu.menuId === activeHeaderMenu }"
            @click="handleChooseHeaderMenu(menu.menuId)"
          >
            {{ menu.menuName }}
          </div>
        </div>
      </header-bar>
    </template>
    <div style="background-color: #fff">
      <div @click="$router.push('list')" class="ui-m-24">点我</div>
    </div>
  </ui-page>
</template>

<script>
// import headerBar from "@/components/header";
export default {
  name: "homePage",
  // components: { headerBar },
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
  methods: {
    handleChooseHeaderMenu(menuId) {
      this.activeHeaderMenu = menuId;
    },
  },
};
</script>

<style lang="scss">
.header-left-logo {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  display: block;
}
.header-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  .header-menu-item {
    font-size: var(--font-size-body);
    font-weight: 300;
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .active {
    font-size: var(--font-size-large);
    background-image: url(@/assets/images/header-menu-bg.png);
    background-size: 48px 48px;
    background-repeat: no-repeat;
    background-position: center 70%;
    font-weight: 600;
  }
}
</style>
