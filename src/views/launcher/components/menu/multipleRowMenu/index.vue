<!-- 双列菜单 -->
<template>
  <menu-title
    :title="data.title"
    :sub-title="data.subTitle"
    :margin-l-r="data.margin"
  ></menu-title>
  <div
    class="content-wrap"
    :style="{
      marginLeft: data.margin,
      marginRight: data.margin,
    }"
  >
    <div
      class="cols-item"
      v-for="(col, index) in menuList"
      :key="index"
      :style="{ width: stdWidth }"
    >
      <div
        class="rows-item"
        v-for="(row, idx) in col"
        :key="idx"
        :style="{
          height: row.rowHeight,
          padding: data.padding,
          borderRadius: data.borderRadius,
          marginBottom: idx === col.length - 1 ? 0 : data.padding,
          backgroundColor: row.backgroundColor,
          backgroundImage:
            'url(' +
            require('@/assets/images/menu/' + row.backgroundImage) +
            ')',
        }"
      >
        <text-rows :text-list="row.textList"></text-rows>
      </div>
    </div>
  </div>
</template>

<script>
/*
data: {
  title: 菜单标题,
  subTitle: 副标题,
  columns: 列数,
  margin: 外边距,
  items: [菜单项
    {
      action: 操作,
      backgroundImage: 背景图片,
      col: 列号,
      colWidth: 列宽,
      index: id,
      name: 描述,
      row: 行号,
      rowHeight: 行高,
      texts: 文本列表字符串，用,分开
    }
  ],
  texts: [文本项
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
  ]
}

*/
import TextRows from "../textRows";
import MenuTitle from "../menuTitle";
export default {
  name: "double-column-menu",
  components: { TextRows, MenuTitle },
  data() {
    return {
      str: "",
      stdWidth: 0,
      stdPadding: 0,
      menuList: [],
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        title: "",
        subTitle: "",
        items: [],
        texts: [],
      }),
    },
  },
  created() {
    let columns = this.data.columns;
    let marginPX = this.$utils.rem2px(
      Number(this.data.margin.replace("rem", ""))
    );
    this.stdWidth =
      (window.screen.width - 2 * marginPX - marginPX * (columns - 1)) /
        columns +
      "px";
    this.menuList = this.data.items.forEach((item) => {
      let it = { ...item };
      (it.texts || "")
        .split(",")
        .filter(Boolean)
        .forEach((str) => {
          let text = this.data.texts.find(({ index }) => index === str);

          if (it.textList) {
            it.textList.push({ ...text });
          } else {
            it.textList = [{ ...text }];
          }
        });
      return it;
    });
  },
};
</script>

<style lang="scss">
.content-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .rows-item {
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>
