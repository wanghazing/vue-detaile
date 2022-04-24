<template>
  <ui-page
    :touch-actions="['refresh', 'swiper']"
    use-custom-header
    @refresh="refresh"
    ref="page"
    :header="{
      barHeight: '1.6rem',
      leftWidth: 0,
    }"
    :threshold="90"
    :stop="40"
    bottom="1rem"
    :page="{
      style: {
        backgroundImage:
          'url(' + require('@/assets/images/bg/home-bg.png') + ')',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
      },
    }"
  >
    <template v-slot:header-bar>
      <header-bar
        bar-height="1.6rem"
        :show-back="false"
        use-custom-title-text
        leftWidth="0.3rem"
        :bar-style="{ backgroundColor: 'transparent' }"
      >
        <div class="search-bar"></div>
        <template v-slot:header-right>
          <tg-icon
            name="fuhao-tongzhi"
            :iconStyle="{
              color: 'var(--color-text-reverse)',
            }"
          ></tg-icon>
        </template>
      </header-bar>
    </template>
    <div class="component-list">
      <div
        v-for="comp in componentList"
        :key="comp.componentId"
        :style="{ backgroundColor: comp.backgroundColor }"
      >
        <empty-block
          v-if="comp.componentType === 'empty-block'"
          :data="comp.data"
        ></empty-block>
        <double-column-menu
          v-if="comp.componentType === 'double-column-menu'"
          :data="comp.data"
        ></double-column-menu>
        <standard-menu
          v-if="comp.componentType === 'standard-menu'"
          :data="comp.data"
        ></standard-menu>
        <single-row-menu
          v-if="comp.componentType === 'single-row-menu'"
          :data="comp.data"
        ></single-row-menu>
        <slider-ad
          v-if="comp.componentType === 'slider'"
          :data="comp.data"
        ></slider-ad>
        <div class="component-list-bottom"></div>
      </div>
    </div>
  </ui-page>
</template>

<script>
// import headerBar from "@/components/header";
import SliderAd from "../../components/slider";
import StandardMenu from "../../components/menu/standardMenu";
import SingleRowMenu from "../../components/menu/singleRowMenu";
import DoubleColumnMenu from "../../components/menu/doubleColumnMenu";
import EmptyBlock from "../../components/emptyBlock";
export default {
  name: "homePage",
  components: {
    SliderAd,
    StandardMenu,
    SingleRowMenu,
    DoubleColumnMenu,
    EmptyBlock,
  },
  data() {
    return {
      componentList: [],
      themeName: "",
    };
  },
  mounted() {
    // this.getDataList();
    this.$http({
      url: "/component/all",
      params: { page: "home" },
    }).then((res) => {
      // console.log(res);
      this.componentList = res.data.list;
      this.$nextTick(() => {
        this.$refs.page.refreshScroll();
      });
    });
  },
  methods: {
    refresh() {},
    goDetail() {
      window.location.href = "http://10.28.103.151:8080/img/ad2.a8a5a160.jpg";
    },
  },
};
</script>

<style lang="scss">
.search-bar {
  background-color: var(--color-bg-sub);
  height: 60px;
  border-radius: 30px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.component-list {
  // padding-top: 300px;
}
</style>
