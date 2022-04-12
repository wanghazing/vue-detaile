<template>
  <i
    class="tg-icon"
    :style="iconStyle || { color }"
    :class="['tg-' + name, 'tg-icon-' + size]"
  ></i>
</template>
<script>
export default {
  name: "tg-icon",
  props: {
    name: String,
    iconStyle: Object,
    color: {
      type: String,
      default: "#333",
    },
    size: {
      type: String,
      default: "middle",
    },
  },
};
</script>
<style lang="scss" scoped>
.tg-icon {
  font-family: "tgui";
  font-style: normal;
}
.tg-icon-small {
  font-size: 24px;
}
.tg-icon-middle {
  font-size: 30px;
}
.tg-icon-large {
  font-size: 36px;
}
</style>
