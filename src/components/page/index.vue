<template>
  <div class="ui-page-container">
    <header-bar
      v-if="!useCustomHeader"
      @back="handleLeftClick"
      :bar-style="header.barStyle"
    ></header-bar>

    <slot v-else name="header"></slot>
    <div
      class="main-container"
      :id="mainContainerId"
      :style="{
        top: top || header.barHeight || $root.titleHeight,
      }"
    >
      <div class="slot-container">
        <div class="pulling-down" v-show="isSupportRefresh">
          <p>{{ pullDownTipText[pullDownState] }}</p>
        </div>
        <slot></slot>
        <div class="pulling-up" v-show="isSupportLoadmore">
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
import headerBar from "../header";
BetterScroll.use(PullDown);
BetterScroll.use(Pullup);
export default {
  name: "ui-page",
  components: {
    headerBar,
  },
  data() {
    // this. = ;
    this.pullDownTipText = Object.assign(
      {
        before: "下拉刷新",
        release: "松开",
        loading: "加载中",
        finish: "刷新成功",
      },
      this.pullDownTip
    );
    this.pullUpTipText = Object.assign(
      {
        before: "下拉加载更多",
        loading: "加载中",
      },
      this.pullUpTip
    );
    return {
      uuid: "",
      scroller: null,
      startX: 0,
      startY: 0,
      isSupportRefresh: false,
      isSupportLoadmore: false,
      isSupportSwiper: false,
      offsetY: 0,
      translateY: 0,
      mainContainerHeight: 0,
      slotContainerHeight: 0,
      overContainer: 0,
      beforePulling: false,
      pullDownState: "",
      // pullDownTipText: ,
      pullUpState: "before",
      pullUpTipText: {
        before: "下拉加载更多",
        loading: "加载中",
      },
      noMoreFlag: false,
    };
  },
  props: {
    // 标题栏配置
    header: {
      type: Object,
      default: () => {
        return { barStyle: { backgroundColor: "var(--color-bg-primary)" } };
      },
    },
    pullDownTip: {
      type: Object,
      default: () => {},
    },
    pullUpTip: {
      type: Object,
      default: () => {},
    },
    // 使用插槽标题栏
    useCustomHeader: {
      type: Boolean,
      default: false,
    },
    // 下拉最大距离
    threshold: {
      type: Number,
      default: 90,
    },
    // 触发下拉刷新距离
    stop: {
      type: Number,
      default: 40,
    },
    // 是否支持下拉刷新和上拉加载，传入refresh:支持下拉刷新，传入loadmore:支持上拉加载，swiper:不支持刷新和加载，但是有刷新和加载的效果
    touchActions: {
      type: Array,
      default: () => [],
    },
    top: [String, Number],
  },
  created() {
    let uuid = ~~(Math.random() * 64800);
    this.mainContainerId = "mainContainer-" + uuid;
    this.isSupportRefresh = this.touchActions.indexOf("refresh") !== -1;
    this.isSupportLoadmore = this.touchActions.indexOf("loadmore") !== -1;
    this.isSupportSwiper = this.touchActions.indexOf("swiper") !== -1;
    if (this.isSupportSwiper) {
      this.isSupportRefresh = this.isSupportLoadmore = false;
    }
  },
  mounted() {
    if (this.touchActions.length > 0) {
      this.initScroll();
    }
    // this.APP_PAGE_ROOT.activePage = this;
    // this.translateY = this.mainContainerHeight - this.slotContainerHeight;
    // });
  },
  methods: {
    // 返回
    handleLeftClick() {
      if (typeof this.header.handleLeftClick === "function") {
        this.header.handleLeftClick(this.defaultBack);
      } else {
        this.defaultBack();
      }
    },
    // 默认返回
    defaultBack() {
      this.$router.back();
    },
    // 初始化页面
    initScroll() {
      let pullDownRefresh = {
          threshold: this.threshold,
          stop: this.stop,
        },
        pullUpLoad = {
          threshold: this.threshold,
          stop: this.stop,
        };
      this.uiScroller = new BetterScroll("#" + this.mainContainerId, {
        useTransition: false,
        bindToWrapper: true,
        ...(this.isSupportRefresh || this.isSupportSwiper
          ? { pullDownRefresh }
          : {}),
        ...(this.isSupportLoadmore || this.isSupportSwiper
          ? { pullUpLoad }
          : {}),
      });
      if (this.isSupportRefresh || this.isSupportSwiper) {
        this.initPullUp();
      }
      if (this.isSupportLoadmore || this.isSupportSwiper) {
        this.initPullDown();
      }
    },
    // 初始化上拉加载
    initPullUp() {
      this.uiScroller.on("pullingUp", () => {
        if (this.isSupportLoadmore) {
          this.pullUpState = "loading";
          this.$emit("loadmore");
        }
      });
    },
    // 初始化下拉刷新
    initPullDown() {
      this.uiScroller.on("pullingDown", () => {
        if (this.isSupportRefresh) {
          this.pullDownState = "loading";
          this.$emit("refresh");
        } else {
          setTimeout(() => {
            this.finishRefresh();
          }, 300);
        }
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
  background-color: var(--color-bg-sub);
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
  /* padding: 20px; */
  box-sizing: border-box;
  transform: translateY(-100%) translateZ(0);
  text-align: center;
  color: #999;
}
.pulling-up {
  text-align: center;
  padding: 20px;
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
