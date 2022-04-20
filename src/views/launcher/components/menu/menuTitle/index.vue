<template>
  <div
    class="menu-bar"
    v-if="title"
    :style="{
      marginLeft: marginLR,
      marginRight: marginLR,
    }"
  >
    <div class="menu-title">{{ title }}</div>
    <div class="menu-sub-title">{{ subTitle }}</div>
  </div>
</template>

<script>
export default {
  name: "menu-title",
  props: {
    marginLR: String,
    title: String,
    subTitle: String,
  },
};
</script>

<style lang="scss">
.menu-bar {
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .menu-title {
    font-size: var(--font-size-header-sm);
    color: var(--color-text-primary);
  }
  .menu-sub-title {
    font-size: var(--font-size-body-sm);
    color: var(--color-text-placeholder);
  }
}
</style>
