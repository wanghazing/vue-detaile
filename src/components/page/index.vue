<template>
  <div class="ui-page-container">
    <header-bar v-if="!useCustomHeader" @back="header.back"></header-bar>

    <slot v-else name="header"></slot>
    <div
      class="main-container"
      :id="mainContainerId"
      :style="{
        top: titleHeight,
      }"
    >
      <div class="slot-container">
        <div class="pulling-down">
          <p>{{ pullDownTipText[pullDownState] }}</p>
        </div>
        <slot></slot>
        <div class="pulling-up">
          <p>{{ pullUpTipText[pullUpState] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BetterScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
import Pullup from "@better-scroll/pull-up";
BetterScroll.use(PullDown);
BetterScroll.use(Pullup);
import headerBar from "../header";
export default {
  name: "ui-page",
  components: {
    headerBar,
  },
  data() {
    // this. = ;
    return {
      uuid: "",
      scroller: null,
      startX: 0,
      startY: 0,
      isSupportRefresh: false,
      isSupportLoadmore: false,
      isSupportSwiper: false,
      titleHeight: "",
      offsetY: 0,
      translateY: 0,
      mainContainerHeight: 0,
      slotContainerHeight: 0,
      overContainer: 0,
      beforePulling: false,
      pullDownState: "",
      pullDownTipText: {
        before: "下拉刷新",
        release: "松开",
        loading: "加载中",
        finish: "刷新成功",
      },
      pullUpState: "before",
      pullUpTipText: {
        before: "下拉加载更多",
        loading: "加载中",
      },
    };
  },
  props: {
    // 标题栏配置
    header: {
      type: Object,
      default: () => {
        return { back: () => {}, isSpecial: false, _isDefault: true };
      },
    },
    speed: {
      type: Number,
      default: 1,
    },
    // 使用插槽标题栏
    useCustomHeader: {
      type: Boolean,
      default: false,
    },
    // 下拉最大距离
    maxRefreshHeight: {
      type: Number,
      default: 300,
    },
    // 上拉最大距离
    maxLoadmoreHeight: {
      type: Number,
      default: 300,
    },
    // 触发下拉刷新距离
    refreshListenHeight: {
      type: Number,
      default: 200,
    },
    // 触发上拉加载距离
    loadmoreListenHeight: {
      type: Number,
      default: 200,
    },
    // 是否支持下拉刷新和上拉加载，传入refresh:支持下拉刷新，传入loadmore:支持上拉加载，swiper:不支持刷新和加载，但是有刷新和加载的效果
    touchActions: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.titleHeight = "0.9rem";
    let uuid = ~~(Math.random() * 64800);
    this.mainContainerId = "mainContainer-" + uuid;
    this.isSupportRefresh = this.touchActions.indexOf("refresh") !== -1;
    this.isSupportLoadmore = this.touchActions.indexOf("loadmore") !== -1;
    this.isSupportSwiper = this.touchActions.indexOf("swiper") !== -1;
    console.log(this.isSupportLoadmore);
  },
  mounted() {
    this.uiScroller = new BetterScroll("#" + this.mainContainerId, {
      useTransition: false,
      pullDownRefresh: {
        threshold: 90,
        stop: 40,
      },
      pullUpLoad: {
        threshold: 90,
        stop: 40,
      },
    });
    this.initPullUp();
    this.initPullDown();
    // this.APP_PAGE_ROOT.activePage = this;
    // this.translateY = this.mainContainerHeight - this.slotContainerHeight;
    // });
  },
  methods: {
    // 初始化上拉加载
    initPullUp() {
      this.uiScroller.on("pullingUp", () => {
        this.pullUpState = "loading";
        this.$emit("loadmore");
      });
    },
    // 初始化下拉刷新
    initPullDown() {
      this.uiScroller.on("pullingDown", () => {
        this.pullDownState = "loading";
        this.$emit("refresh");
        // this.uiScroller.refresh();
      });
      this.uiScroller.on("scrollEnd", () => {
        console.log("scrollEnd");
      });
      // v2.4.0 supported
      this.uiScroller.on("enterThreshold", () => {
        this.pullDownState = "before";
      });
      this.uiScroller.on("leaveThreshold", () => {
        this.pullDownState = "release";
      });
    },
    rem2px(str) {
      return Number(String(str).replace("rem", "")) * 100;
    },
    handlePullingDown() {
      // return new Promise((resolve) => {
      //   this.$emit("refresh", () => {
      //     setTimeout(() => {
      //       this.pullDownState = "finish";
      //       resolve();
      //     }, 4000);
      //   });
      // });
    },
    finishRefresh() {
      this.pullDownState = "finish";
      console.log("finish");
      this.uiScroller.finishPullDown();
      this.$nextTick(() => {
        this.uiScroller.refresh();
      });
    },
    finishLoadMore() {
      this.pullUpState = "before";
      this.uiScroller.finishPullUp();
      this.$nextTick(() => {
        this.uiScroller.refresh();
      });
    },
    // viewappear()
  },
};
</script>

<style>
.ui-page-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.main-container {
  position: absolute;
  /* top: 90px; */
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  transition: 0.3s all ease;
}

.refresh {
  position: absolute;
  z-index: -1;
  /* top: 90px; */
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #999999;
}
.pulling-down {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}
.loadmore {
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #999999;
}
</style>
