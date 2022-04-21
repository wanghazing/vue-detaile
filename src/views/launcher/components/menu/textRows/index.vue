<template>
  <div class="text-rows-box">
    <p
      v-for="(cm, index) in textList"
      :key="index"
      :style="{
        ...cm,
        textAlign: cm.isCenter ? 'center' : '',
      }"
    >
      {{ cm.content }}
    </p>
  </div>
</template>

<script>
/*
textList: [
  {
    content: 内容,
    backgroundColor: 背景色,
    color: 文字颜色,
    fontSize: 文字大小,
    fontWeight: 字重,
    height: 高度,
    index: id,
    isCenter: 是否居中,
    lineHeight: 行高,
    marginBottom: 下边距,
    marginTop: 上边距,
    name: 描述,
    width: 宽度
  }
]
*/
export default {
  name: "text-rows",
  props: {
    textList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.text-rows-box {
  display: flex;
  flex-direction: column;
}
</style>
