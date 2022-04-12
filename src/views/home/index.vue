<template>
  <!-- <header-bar>
    <span> </span>
  </header-bar>
  <div>home</div> -->
  <ui-page
    :touch-actions="['loadmore', 'refresh']"
    @loadmore="loadmore"
    ref="page"
    @refresh="refresh"
  >
    <div style="background-color: #fff">
      <div
        v-for="(item, idx) in dataList"
        :key="idx"
        style="margin-bottom: 0.24rem"
      >
        {{ idx }}:{{ item }}
      </div>
    </div>
  </ui-page>
</template>

<script>
// import headerBar from "@/components/header";
export default {
  name: "homePage",
  // components: { headerBar },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      dataList: [],
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
  },
};
</script>

<style></style>
