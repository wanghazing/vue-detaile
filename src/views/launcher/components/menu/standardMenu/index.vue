<!-- 标准菜单 -->
<template>
  <menu-title
    :title="data.title"
    :sub-title="data.subTitle"
    :margin-l-r="data.style.marginLR"
  ></menu-title>
  <div
    class="menu-container"
    :style="{
      marginLeft: data.style.marginLR,
      marginRight: data.style.marginLR,
      marginBottom: data.style.marginB,
      width: data.style.width,
      height: data.style.height,
      borderRadius: data.style.borderRadius,
    }"
  >
    <div
      class="menu-item"
      v-for="menu in data.menuList"
      :key="menu.menuId"
      :style="{
        width: 100 / data.column + '%',
        height: data.menuStyle.height,
        marginBottom: data.menuStyle.menuMarginB,
      }"
    >
      <img
        :src="require('@/assets/images/menu/' + menu.icon)"
        alt=""
        class="menu-item-icon"
        :style="{
          width: data.menuStyle.iconWidth,
          height: data.menuStyle.iconHeight,
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
</template>

<script>
import MenuTitle from "../menuTitle";
export default {
  name: "standard-menu",
  components: { MenuTitle },
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        title: "",
        subTitle: "",
        style: {},
        menuStyle: {},
        column: 1,
        menuList: [],
      }),
    },
  },
};
</script>

<style lang="scss">
.menu-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
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
</style>
