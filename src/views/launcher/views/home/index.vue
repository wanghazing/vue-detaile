<template>
  <ui-page
    :touch-actions="['refresh', 'swiper']"
    use-custom-header
    @refresh="refresh"
    ref="page"
    :header="{
      barHeight: '1.6rem',
    }"
    :threshold="90"
    :stop="40"
    bottom="1rem"
  >
    <template v-slot:header-bar>
      <header-bar
        bar-height="1.6rem"
        :show-back="false"
        use-custom-title-text
        :bar-style="{ backgroundColor: 'transparent' }"
      >
        <template v-slot:header-left>
          <img
            src="@/assets/images/love.png"
            class="header-left-logo"
            alt=""
            srcset=""
            @click="changeTheme"
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
        <template v-slot:header-right>
          <tg-icon
            name="sousuo2"
            size="large"
            :iconStyle="{
              fontSize: '0.48rem',
              color: 'var(--color-text-sub)',
            }"
            @click="$router.push('/search')"
          ></tg-icon>
        </template>
      </header-bar>
    </template>
    <slider-ad :data="sliderData"></slider-ad>
    <standard-menu :data="standardMenuData"></standard-menu>
    <single-row-menu :data="singleRowMenuData"></single-row-menu>
  </ui-page>
</template>

<script>
// import headerBar from "@/components/header";
import SliderAd from "../../components/slider";
import StandardMenu from "../../components/menu/standardMenu";
import SingleRowMenu from "../../components/menu/singleRowMenu";
export default {
  name: "homePage",
  components: { SliderAd, StandardMenu, SingleRowMenu },
  data() {
    return {
      activeHeaderMenu: 1,
      headerMenuList: [
        { menuId: 1, menuName: "关注" },
        { menuId: 2, menuName: "发现" },
        { menuId: 3, menuName: "法兰西岛" },
      ],
      sliderData: {
        adList: [
          { id: 1, img: require("@/assets/images/slider/ad4.jpeg") },
          { id: 2, img: require("@/assets/images/slider/ad6.jpeg") },
          { id: 3, img: require("@/assets/images/slider/ad4.jpeg") },
        ],
        adStyle: {
          marginLR: ".3rem",
          marginB: ".3rem",
          width: "6.9rem",
          height: "3.5rem",
          borderRadius: "0.24rem",
        },
      },
      standardMenuData: {
        style: {
          marginLR: ".3rem",
          marginB: ".3rem",
          width: "6.9rem",
        },
        menuStyle: {
          height: "1.25rem",
          iconWidth: ".48rem",
          iconHeight: ".48rem",
          iconMarginB: ".16rem",
          fontSize: ".3rem",
          fontWeight: "bold",
          color: "var(--color-text-primary)",
          menuMarginB: ".24rem",
        },
        column: 5,
        menuList: [
          { menuId: 1, title: "菜单1", icon: "menu1.png" },
          { menuId: 2, title: "菜单2", icon: "menu2.png" },
          { menuId: 3, title: "菜单3", icon: "menu3.png" },
          { menuId: 4, title: "菜单4", icon: "menu4.png" },
          { menuId: 5, title: "菜单5", icon: "menu5.png" },
          { menuId: 6, title: "菜单6", icon: "menu6.png" },
          { menuId: 7, title: "菜单7", icon: "menu7.png" },
          { menuId: 8, title: "菜单8", icon: "menu8.png" },
          { menuId: 9, title: "菜单9", icon: "menu9.png" },
          { menuId: 10, title: "菜单10", icon: "menu10.png" },
        ],
      },
      singleRowMenuData: {
        title: "在线课程",
        subTitle: "更多",
        style: {
          marginLR: ".3rem",
          marginB: ".3rem",
          width: "6.9rem",
        },
        menuStyle: {
          padding: ".32rem",
          height: "2rem",
          width: "2rem",
          iconWidth: ".96rem",
          iconHeight: ".96rem",
          iconMarginB: ".16rem",
          fontSize: ".3rem",
          fontWeight: "bold",
          color: "var(--color-text-primary)",
          menuMarginB: ".24rem",
        },
        menuList: [
          { menuId: 1, title: "菜单1", icon: "menu21.png" },
          { menuId: 2, title: "菜单2", icon: "menu22.png" },
          { menuId: 3, title: "菜单3", icon: "menu23.png" },
          { menuId: 4, title: "菜单4", icon: "menu24.png" },
          { menuId: 5, title: "菜单5", icon: "menu25.png" },
          { menuId: 6, title: "菜单6", icon: "menu26.png" },
          { menuId: 7, title: "菜单7", icon: "menu27.png" },
        ],
      },
    };
  },
  // mounted() {
  //   this.getDataList();
  // },
  methods: {
    refresh() {},
    handleChooseHeaderMenu(menuId) {
      this.activeHeaderMenu = menuId;
    },
    goDetail() {
      window.location.href = "http://10.28.103.151:8080/img/ad2.a8a5a160.jpg";
    },
    changeTheme() {
      let theme = window.THEME.getActiveTheme();
      if (theme.themeName === "default") {
        window.THEME.applyTheme("dark");
      } else {
        window.THEME.applyTheme("default");
      }
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
.article-list {
  margin-top: 64px;
  .article-list-item {
    padding: 32px;
    padding-bottom: 0;
    background-color: var(--color-bg-primary);
    margin-bottom: 32px;
    .article-title {
      font-size: var(--font-size-header);
      font-weight: bold;
      color: var(--color-text-primary);
      margin-bottom: 8px;
    }
    .article-body {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 200px;
      overflow: hidden;
      .article-body-left {
        flex-grow: 1;
        height: 200px;
        .article-releaser {
          display: flex;
          flex-direction: row;
          margin-bottom: 12px;
          height: 40px;
          align-items: center;
          img {
            width: 32px;
            height: 32px;
            margin-right: 24px;
          }
          span {
            font-size: var(--font-size-body-sm);
          }
        }
        .article-content {
          font-size: var(--font-size-body);
          height: 160px;
        }
      }
      .article-body-poster {
        min-width: 200px;
        width: 200px;
        height: 200px;
        margin-left: 32px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .article-footer {
      height: 60px;
      line-height: 60px;
      color: var(--color-text-sub);
      .article-data {
        font-size: var(--font-size-tip);
      }
    }
  }
}
.theme-dark .article-list-item {
  margin-bottom: 0;
  border-bottom: 1px solid var(--color-border-primary);
}
</style>
