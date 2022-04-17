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
          @click="handleLeftClick"
          v-show="showBack"
        ></tg-icon>
        <slot name="header-left"></slot>
      </div>
      <h1 class="title-text" :style="titleStyle">
        <slot v-if="useCustomTitleText"></slot>
        <span v-else>{{ titleText || $route.meta.title }}</span>
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
        <h3 v-else class="header-right-text">
          <slot name="header-right"></slot>
        </h3>
      </div>
    </div>
  </header>
  <div
    class="header-polyfill"
    :style="{
      height:
        barHeight &&
        (typeof barHeight === 'string' ? barHeight : barHeight + 'px'),
      ...barStyle,
    }"
  ></div>
</template>

<script>
// import TgIcon from "@/components/icon";
export default {
  name: "headerBar",
  // components: { TgIcon },
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
    useCustomTitleText: {
      type: Boolean,
      default: false,
    },
    titleText: String,
    titleStyle: Object,
    rightTitleText: String,
    rightTitleImg: String,
    leftWidth: String,
    rightWidth: String,
    customBack: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 点击左侧区域
    handleLeftClick() {
      if (this.customBack) {
        // this.header.back(this.defaultBack);
        this.$emit("left-click", this.defaultBack);
      } else {
        this.defaultBack();
      }
    },
    // 默认返回
    defaultBack() {
      this.$router.back();
    },
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
  background-color: var(--color-bg-primary);
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
    text-align: center;
  }
  .title-text {
    font-size: var(--font-size-header);
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 300;
  }
  .header-left-text,
  .header-right-text {
    text-align: center;
  }
}
</style>
