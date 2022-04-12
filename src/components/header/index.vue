<template>
  <header
    id="headerBar"
    :style="{
      height:
        barHeight &&
        (typeof barHeight === 'string' ? barHeight : barHeight + 'px'),
      ...barStyle,
    }"
  >
    <div class="title-body">
      <div class="header-left" :style="{ width: leftWidth }">
        <tg-icon
          :style="iconStyle"
          class="header-back"
          :name="iconName"
          size="large"
          @click="handleBack"
          v-show="showBack"
        ></tg-icon>
        <slot name="left"></slot>
      </div>
      <h1 class="title-text" :style="titleStyle">
        {{ titleText || $route.meta.title }}
        <slot></slot>
      </h1>
      <div class="header-right" :style="{ width: rightWidth }">
        <h3
          class="header-right-text"
          v-if="rightTitleText"
          @click="handleRightTitleClick"
        >
          {{ rightTitleText }}
        </h3>
        <img
          class="header-right-img"
          v-else-if="rightTitleImg"
          :src="rightTitleImg"
          alt=""
          srcset=""
          @click="handleRightTitleClick"
        />
        <h3 class="header-right-text">
          <slot name="right"></slot>
        </h3>
      </div>
    </div>
  </header>
</template>

<script>
import TgIcon from "@/components/icon";
export default {
  name: "headerBar",
  components: { TgIcon },
  props: {
    barStyle: Object,
    iconStyle: Object,
    iconName: {
      type: String,
      default: "shangyiye",
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    barHeight: {
      type: [String, Number],
      default: "0.9rem",
    },
    titleText: String,
    titleStyle: Object,
    rightTitleText: String,
    rightTitleImg: String,
    leftWidth: String,
    rightWidth: String,
  },
  methods: {
    handleBack() {},
    handleRightTitleClick() {},
  },
};
</script>

<style lang="scss">
#headerBar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: #fff;
}
.title-body {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .header-left,
  .header-right {
    width: 100px;
  }
  .title-text {
    font-size: var(--font-size-header);
    flex-grow: 1;
  }
}
</style>
