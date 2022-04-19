<template>
  <ui-page
    :touch-actions="['refresh', 'loadmore']"
    @loadmore="loadmore"
    use-custom-header
    ref="page"
    top="1.7rem"
    @refresh="refresh"
  >
    <template v-slot:header-bar>
      <header-bar
        :bar-style="{ backgroundColor: 'var(--color-bg-primary)' }"
      ></header-bar>
      <ui-filter :settings="settings" @filter="handleFilter" v-slot="attr">
        <span>{{ attr }}</span>
      </ui-filter>
    </template>
    <div class="page-demo-list">
      <div class="ui-mt-24">
        <div class="data-box" v-for="item in dataList" :key="item">
          <div class="box-line-title">
            <div class="box-line-title-left">
              <img
                :src="require('@/assets/images/list/' + item.icon + '.png')"
                alt=""
                srcset=""
              />
              <span>{{ item.title }}</span>
            </div>
            <div class="box-line-title-right">{{ item.subTitle }}</div>
          </div>
          <div class="box-line-content">
            <div class="box-line-content-left">状态</div>
            <div class="box-line-content-right">{{ item.content1 }}</div>
          </div>
          <div class="box-line-content">
            <div class="box-line-content-left">描述</div>
            <div class="box-line-content-right">{{ item.content2 }}</div>
          </div>
        </div>
      </div>
    </div>
  </ui-page>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "demo-list",
  data() {
    return {
      // pageNo: 1,
      // pageSize: 10,
      // dataList: [],
      settings: [],
    };
  },
  setup() {
    const pageNo = ref(1);
    const pageSize = ref(10);
    const dataList = ref([]);
    const getDataList = (flag, cb) => {
      setTimeout(() => {
        const argv = [
          [0, dataList.value.length],
          [dataList.value.length, 0],
        ][0 | (flag === "loadmore")];
        console.log(pageSize.value, pageNo.value);
        dataList.value.splice(
          ...argv,
          ...[...Array(pageSize.value).keys()].map((idx) => {
            return {
              id: pageSize.value * pageNo.value + idx,
              icon: "p" + ~~(Math.random() * 6 + 1),
              title: window.getRandomCnWord(3, 5),
              subTitle: window.getRandomCnWord(4, 8),
              content1: window.getRandomCnWord(4, 8),
              content2: window.getRandomCnWord(4, 8),
            };
          })
        );
        cb && cb();
      }, 1000);
    };
    onMounted(getDataList);
    return {
      pageNo,
      pageSize,
      dataList,
      getDataList,
    };
  },
  created() {
    this.initSettings();
  },
  methods: {
    initSettings() {
      this.settings = [
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
          rotate: true,
          options: [...Array(17).keys()].map((idx) => ({
            value: "" + (idx + 1),
            label: `类别-${idx + 1}`,
            selected: false,
          })),
        },
        {
          key: "field3",
          label: "筛选3",
          icon: "fuhao-shaixuan",
          multiple: true,
          deep: true,
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
                    label: `${idx + 1}-${jdx + 1}-${kdx + 1}`,
                    selected: false,
                  })
                ),
              })
            ),
          })),
        },
      ];
    },
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
    // getDataList(flag, cb) {
    //   setTimeout(() => {
    //     const argv = [
    //       [0, this.dataList.length],
    //       [this.dataList.length, 0],
    //     ][0 | (flag === "loadmore")];
    //     this.dataList.splice(
    //       ...argv,
    //       ...[...Array(this.pageSize).keys()].map((idx) => {
    //         return {
    //           id: this.pageSize * this.pageNo + idx,
    //           icon: "p" + ~~(Math.random() * 6 + 1),
    //           title: getRandomCnWord(3, 5),
    //           subTitle: getRandomCnWord(4, 8),
    //           content1: getRandomCnWord(4, 8),
    //           content2: getRandomCnWord(4, 8),
    //         };
    //       })
    //     );
    //     cb && cb();
    //   }, 1000);
    // },
    handleFilter(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.page-demo-list {
  background-color: var(--color-bg-sub);
  padding-top: 24px;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  .data-box {
    margin-left: 32px;
    margin-right: 32px;
    background-color: var(--color-bg-primary);
    border-radius: 32px;
    margin-bottom: 32px;
    padding: 32px;
    .box-line-title,
    .box-line-content {
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    .box-line-title-left,
    .box-line-title-right,
    .box-line-content-left,
    .box-line-content-right {
      min-width: 300px;
    }
    .box-line-title-right,
    .box-line-content-right {
      text-align: right;
    }
    .box-line-title-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-size: var(--font-size-header);
      img {
        width: 48px;
        height: 48px;
        margin-right: 24px;
      }
    }
  }
}
</style>
