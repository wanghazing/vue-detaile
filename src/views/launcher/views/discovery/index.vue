<template>
  <ui-page
    :touch-actions="['refresh', 'loadmore']"
    use-custom-header
    @loadmore="loadmore"
    @refresh="refresh"
    ref="page"
    :header="{
      barHeight: '1.2rem',
    }"
    :threshold="90"
    :stop="40"
    bottom="1rem"
  >
    <template v-slot:header-bar>
      <header-bar
        bar-height="1.2rem"
        :show-back="false"
        use-custom-title-text
        :bar-style="{ backgroundColor: 'transparent' }"
      >
        <template v-slot:header-left>
          <div
            :style="{
              height: '.48rem',
              overflow: 'hidden',
            }"
          >
            <div
              :style="{
                transition: 'all .7s ease',
                transform: `translateY(${
                  themeName === 'dark' ? '0' : '-0.48rem'
                })`,
              }"
            >
              <img
                :src="require(`@/assets/images/night.png`)"
                class="header-left-logo"
                alt=""
                srcset=""
                @click="changeTheme"
              />
              <img
                :src="require(`@/assets/images/noon.png`)"
                class="header-left-logo"
                alt=""
                srcset=""
                @click="changeTheme"
              />
            </div>
          </div>
        </template>
        <div class="header-menu">
          <div
            class="header-menu-item"
            v-for="menu in headerMenuList"
            :key="menu.menuId"
            :class="{ active: menu.menuId === activeHeaderMenu }"
            @click="handleChooseHeaderMenu(menu.menuId)"
          >
            {{ menu.menuName }}
          </div>
        </div>
        <template v-slot:header-right>
          <tg-icon
            name="sousuo2"
            size="large"
            :iconStyle="{
              fontSize: '0.48rem',
              color: 'var(--color-text-sub)',
            }"
            @click="$router.push('/search')"
          ></tg-icon>
        </template>
      </header-bar>
    </template>
    <div class="article-list">
      <div
        class="article-list-item"
        v-for="data in dataList"
        :key="data.articleId"
        @click="goDetail"
      >
        <div class="article-title">{{ data.title }}</div>
        <div class="article-body">
          <div class="article-body-left">
            <div class="article-releaser">
              <img
                :src="require('@/assets/images/logo/' + data.icon + '.png')"
                alt=""
                srcset=""
              />
              <span>{{ data.releaser }}</span>
            </div>
            <div class="article-content">{{ data.content }}</div>
          </div>
          <div class="article-body-poster">
            <img
              alt=""
              :src="require('@/assets/images/poster/' + data.poster + '.jpeg')"
              srcset=""
            />
          </div>
        </div>
        <div class="article-footer">
          <div class="article-data">
            {{ data.follow }}赞同·{{ data.view }}浏览
          </div>
        </div>
      </div>
    </div>
  </ui-page>
</template>

<script>
export default {
  name: "discoveryPage",
  // setup() {
  //   const pageNo = ref(1);
  //   const pageSize = ref(10);
  //   const dataList = ref([]);
  //   const getDataList = (flag, cb) => {
  //     setTimeout(() => {
  //       const argv = [
  //         [0, dataList.value.length],
  //         [dataList.value.length, 0],
  //       ][0 | (flag === "loadmore")];
  //       console.log(pageSize.value, pageNo.value);
  //       dataList.value.splice(
  //         ...argv,
  //         ...[...Array(pageSize.value).keys()].map((idx) => {
  //           return {
  //             id: pageSize.value * pageNo.value + idx,
  //             icon: "logo" + ~~(Math.random() * 10 + 1),
  //             poster: "post" + ~~(Math.random() * 8 + 1),
  //             title: window.getRandomCnWord(10, 25),
  //             releaser: window.getRandomCnWord(2, 8),
  //             content: window.getRandomCnWord(20, 80),
  //             content2: window.getRandomCnWord(4, 8),
  //             follow: ~~(Math.random() * 300),
  //             view: ~~(Math.random() * 4000),
  //           };
  //         })
  //       );
  //       cb && cb();
  //     }, 1000);
  //   };
  //   onMounted(getDataList);
  //   return {
  //     pageNo,
  //     pageSize,
  //     dataList,
  //     getDataList,
  //   };
  // },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      dataList: [],
      activeHeaderMenu: 1,
      themeName: "",
      headerMenuList: [
        { menuId: 1, menuName: "关注" },
        { menuId: 2, menuName: "发现" },
        { menuId: 3, menuName: "法兰西岛" },
      ],
    };
  },
  created() {
    this.themeName = window.THEME.themeName;
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.page.refreshScroll();
    // });
    this.getDataList();
  },
  methods: {
    getDataList(flag, cb) {
      setTimeout(() => {
        const argv = [
          [0, this.dataList.length],
          [this.dataList.length, 0],
        ][0 | (flag === "loadmore")];
        // console.log(pageSize, pageNo);
        this.dataList.splice(
          ...argv,
          ...[...Array(this.pageSize).keys()].map((idx) => {
            return {
              id: this.pageSize * this.pageNo + idx,
              icon: "logo" + ~~(Math.random() * 10 + 1),
              poster: "post" + ~~(Math.random() * 8 + 1),
              title: window.getRandomCnWord(10, 25),
              releaser: window.getRandomCnWord(2, 8),
              content: window.getRandomCnWord(20, 40),
              content2: window.getRandomCnWord(4, 8),
              follow: ~~(Math.random() * 300),
              view: ~~(Math.random() * 4000),
            };
          })
        );
        this.$nextTick(() => {
          this.$refs.page.refreshScroll();
          cb && cb();
        });
      }, 1000);
    },
    handleChooseHeaderMenu(menuId) {
      this.activeHeaderMenu = menuId;
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
    changeTheme() {
      let theme = window.THEME.getActiveTheme();
      if (theme.themeName === "default") {
        window.THEME.applyTheme("dark");
      } else {
        window.THEME.applyTheme("default");
      }
      this.themeName = window.THEME.themeName;
    },
  },
};
</script>

<style lang="scss">
.header-left-logo {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  display: block;
}
.header-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  .header-menu-item {
    font-size: var(--font-size-body);
    font-weight: 300;
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .active {
    font-size: var(--font-size-large);
    background-image: url(@/assets/images/header-menu-bg.png);
    background-size: 48px 48px;
    background-repeat: no-repeat;
    background-position: center 70%;
    font-weight: 600;
  }
}
.article-list {
  margin-top: 48px;
  .article-list-item {
    padding: 32px;
    padding-bottom: 0;
    background-color: var(--color-bg-primary);
    margin-bottom: 32px;
    .article-title {
      font-size: var(--font-size-header);
      font-weight: bold;
      color: var(--color-text-primary);
      margin-bottom: 8px;
    }
    .article-body {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 200px;
      overflow: hidden;
      .article-body-left {
        flex-grow: 1;
        height: 200px;
        .article-releaser {
          display: flex;
          flex-direction: row;
          margin-bottom: 12px;
          height: 40px;
          align-items: center;
          img {
            width: 32px;
            height: 32px;
            margin-right: 24px;
          }
          span {
            font-size: var(--font-size-body-sm);
          }
        }
        .article-content {
          font-size: var(--font-size-body);
          height: 160px;
        }
      }
      .article-body-poster {
        min-width: 200px;
        width: 200px;
        height: 200px;
        margin-left: 32px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .article-footer {
      height: 60px;
      line-height: 60px;
      color: var(--color-text-sub);
      .article-data {
        font-size: var(--font-size-tip);
      }
    }
  }
}
.theme-dark .article-list-item {
  margin-bottom: 0;
  border-bottom: 1px solid var(--color-border-primary);
}
</style>
