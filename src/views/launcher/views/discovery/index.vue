<template>
  <ui-page
    :touch-actions="['refresh', 'loadmore']"
    use-custom-header
    @loadmore="loadmore"
    @refresh="refresh"
    ref="page"
    :header="{
      barHeight: '1.6rem',
    }"
    :threshold="90"
    :stop="40"
    bottom="1rem"
  >
    <template v-slot:header-bar>
      <header-bar
        bar-height="1.6rem"
        :show-back="false"
        use-custom-title-text
        :bar-style="{ backgroundColor: 'transparent' }"
      >
        <template v-slot:header-left>
          <img
            src="@/assets/images/love.png"
            class="header-left-logo"
            alt=""
            srcset=""
            @click="changeTheme"
          />
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
import { ref, onMounted } from "vue";
export default {
  name: "discoveryPage",
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
              icon: "logo" + ~~(Math.random() * 10 + 1),
              poster: "post" + ~~(Math.random() * 8 + 1),
              title: window.getRandomCnWord(10, 25),
              releaser: window.getRandomCnWord(2, 8),
              content: window.getRandomCnWord(20, 80),
              content2: window.getRandomCnWord(4, 8),
              follow: ~~(Math.random() * 300),
              view: ~~(Math.random() * 4000),
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
  },
};
</script>

<style></style>
