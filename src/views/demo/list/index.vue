<template>
  <ui-page
    :touch-actions="['refresh', 'loadmore']"
    @loadmore="loadmore"
    use-custom-header
    ref="page"
    top="1.7rem"
    @refresh="refresh"
  >
    <template v-slot:header>
      <header-bar
        :bar-style="{ backgroundColor: 'var(--color-bg-primary)' }"
      ></header-bar>
      <ui-filter :settings="settings" @filter="handleFilter" v-slot="attr">
        <span>{{ attr }}</span>
      </ui-filter>
    </template>
    <div class="page-demo-list">
      <div class="ui-mb-32" v-for="item in dataList" :key="item">
        {{ item }}
      </div>
    </div>
  </ui-page>
</template>

<script>
export default {
  name: "demo-list",
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      dataList: [],
      settings: [
        {
          key: "field1",
          label: "筛选解飞飞飞耦股1",
          multiple: false,
          icon: "xia4",
          rotate: true,
          options: [
            { value: "1", label: "选项1-1", selected: false },
            { value: "2", label: "选项1-2", selected: false },
            { value: "3", label: "选项1-3", selected: false },
          ],
        },
        {
          key: "field2",
          label: "筛选2",
          icon: "xia4",
          multiple: true,
          deep: true,
          rotate: true,
          options: [...Array(14).keys()].map((idx) => ({
            value: "" + (idx + 1),
            label: `类别-${idx + 1}`,
            selected: false,
            options: [...Array((Math.random() * 10) >> 0).keys()].map(
              (jdx) => ({
                value: "" + (idx + 1) + "" + (jdx + 1),
                label: `类别-${idx + 1}-${jdx + 1}`,
                selected: false,
                options: [...Array((Math.random() * 10) >> 0).keys()].map(
                  (kdx) => ({
                    value: "" + (idx + 1) + "" + (jdx + 1) + "" + (kdx + 1),
                    label: `类别-${idx + 1}-${jdx + 1}-${kdx + 1}`,
                    selected: false,
                  })
                ),
              })
            ),
          })),
        },
      ],
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    loadmore() {
      this.pageNo++;
      this.getDataList("loadmore", () => {
        this.$refs.page.finishLoadMore();
      });
    },
    refresh() {
      // this.dataList = [];
      this.pageNo = 1;
      this.pageSize = 10;
      this.getDataList("refresh", () => {
        this.$refs.page.finishRefresh();
      });
    },
    getDataList(flag, cb) {
      setTimeout(() => {
        const argv = [
          [0, this.dataList.length],
          [this.dataList.length, 0],
        ][0 | (flag === "loadmore")];
        this.dataList.splice(
          ...argv,
          ...Array(this.pageSize).fill(Math.random() * 9000)
        );
        cb && cb();
      }, 1000);
    },
    handleFilter(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.page-demo-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
