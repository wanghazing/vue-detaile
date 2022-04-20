<!-- 单行菜单 -->
<template>
  <menu-title
    :title="data.title"
    :sub-title="data.subTitle"
    :margin-l-r="data.style.marginLR"
  ></menu-title>
  <div class="single-row-menu-container" :id="containerId">
    <div
      class="single-row-menu"
      :style="{
        padding: data.menuStyle.padding,
        height: data.menuStyle.height,
      }"
    >
      <div
        class="menu-item"
        v-for="menu in data.menuList"
        :key="menu.menuId"
        :style="{
          minWidth: data.menuStyle.width,
          height: data.menuStyle.height,
        }"
      >
        <img
          :src="require('@/assets/images/menu/' + menu.icon)"
          alt=""
          class="menu-item-icon"
          :style="{
            width: data.menuStyle.iconWidth,
            height: data.menuStyle.iconHeight,
            marginRight: data.menuStyle.iconMarginR,
            marginBottom: data.menuStyle.iconMarginB,
          }"
        />
        <h3
          class="menu-item-title"
          :style="{
            fontSize: data.menuStyle.fontSize,
            fontWeight: data.menuStyle.fontWeight,
            color: data.menuStyle.color,
          }"
        >
          {{ menu.title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import MenuTitle from "../menuTitle";
export default {
  name: "single-row-menu",
  components: { MenuTitle },
  data() {
    return {
      containerId: "singleRowMnueId-" + ~~(Math.random() * 64800),
      scroller: null,
    };
  },
  mounted() {
    this.scroller = new BScroll("#" + this.containerId, {
      scrollX: true,
      eventPassthrough: "vertical",
      stopPropagation: true,
    });
    // document
    //   .getElementById("#" + this.containerId)
    //   .addEventListener("touchstart", (e) => {
    //     e.stopPropagation();
    //   });
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        title: "",
        subTitle: "",
        style: {},
        menuStyle: {},
        menuList: [],
      }),
    },
  },
};
</script>

<style lang="scss">
.single-row-menu-container {
  overflow: scroll;
  .single-row-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .menu-item-title {
        text-align: center;
      }
    }
  }
}
</style>
