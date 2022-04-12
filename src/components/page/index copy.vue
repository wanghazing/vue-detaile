<template>
  <div class="ui-page-container">
    <header-bar v-if="!useCustomHeader" @back="header.back"></header-bar>

    <slot v-else name="header"></slot>
    <div
      class="refresh"
      :style="{ height: translateY + speed * offsetY + 'px', top: titleHeight }"
      v-if="isSupportRefresh"
    >
      {{
        translateY + speed * offsetY > 40
          ? translateY + speed * offsetY > refreshListenHeight
            ? "松开刷新"
            : "继续下拉刷新"
          : ""
      }}
    </div>
    <div
      class="main-container"
      :id="mainContainerId"
      :style="{
        top: titleHeight,
      }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div
        class="slot-container"
        :id="slotContainerId"
        :style="{
          transform:
            'translate3d(0px,' + (translateY + speed * offsetY) + 'px,0px)',
          transition: 'transform 0.3s ease',
        }"
      >
        <slot></slot>
      </div>
    </div>
    <div
      class="loadmore"
      :style="{ height: overContainer + 'px' }"
      v-if="isSupportLoadmore"
    >
      {{
        overContainer > 40
          ? overContainer > loadmoreListenHeight
            ? "松开加载更多"
            : "加载更多"
          : ""
      }}
    </div>
  </div>
</template>

<script>
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
    this.uuid = ~~(Math.random() * 64800);
    this.isSupportRefresh = this.touchActions.indexOf("refresh") !== -1;
    this.isSupportLoadmore = this.touchActions.indexOf("loadmore") !== -1;
    this.isSupportSwiper = this.touchActions.indexOf("swiper") !== -1;
    console.log(this.isSupportLoadmore);
  },
  computed: {
    mainContainerId() {
      return "mainContainer-" + this.uuid;
    },
    slotContainerId() {
      return "slotContainer-" + this.uuid;
    },
  },
  mounted() {
    // this.APP_PAGE_ROOT.activePage = this;
    // this.translateY = this.mainContainerHeight - this.slotContainerHeight;
    // });
  },
  methods: {
    rem2px(str) {
      return Number(String(str).replace("rem", "")) * 100;
    },
    // 下拉
    touchDown(offsetY) {
      // 当内容高度低于容器高度时
      // 向下拉,已下拉距离不能超过最大可拉伸距离
      if (Math.abs(this.translateY + offsetY) < this.maxRefreshHeight) {
        this.offsetY = this.speed * offsetY;
      }
    },
    // 上拉
    touchUp(offsetY) {
      // 当内容高度低于容器高度时
      if (Math.abs(offsetY) < this.maxRefreshHeight) {
        this.offsetY = this.speed * offsetY;
      }
    },
    handleTouchStart(e) {
      // 等于1时表示此时只有一只手指在触摸屏幕
      if (e.touches.length === 1) {
        // 记录初始位置
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.mainContainerHeight = document.getElementById(
          this.mainContainerId
        ).offsetHeight;
        this.slotContainerHeight = document.getElementById(
          this.slotContainerId
        ).offsetHeight;
      }
    },
    handleTouchMove(e) {
      const moveY = e.touches[0].clientY;
      const offsetY = moveY - this.startY;
      if (offsetY > 0) {
        // 下拉
        this.touchDown(offsetY);
      } else {
        // 上拉
        this.touchUp(offsetY);
      }
      // // 当内容高度低于容器高度时
      // if (this.slotContainerHeight < this.mainContainerHeight) {
      //   if (offsetY > 0) {
      //     // 向下拉,已下拉距离不能超过最大可拉伸距离
      //     if (Math.abs(this.translateY + offsetY) < this.maxRefreshHeight) {
      //       this.offsetY = this.speed * offsetY;
      //     }
      //   } else {
      //     // 向上拉，已上拉距离不能超过最大可拉伸距离
      //     if (Math.abs(this.translateY + offsetY) < this.maxLoadmoreHeight) {
      //       this.offsetY = this.speed * offsetY;
      //       this.overContainer = Math.abs(this.translateY + this.offsetY);
      //     }
      //   }
      //   return 0;
      // } else {
      //   const overContainer =
      //     Math.abs(this.translateY + this.speed * offsetY) +
      //     this.mainContainerHeight -
      //     this.slotContainerHeight;
      //   console.log(overContainer);
      //   if (overContainer > this.maxLoadmoreHeight) {
      //     return false;
      //   }
      //   let rato = 1;
      //   if (overContainer > 0) {
      //     rato = this.increase(overContainer / this.maxLoadmoreHeight);
      //     console.log(rato);
      //     this.overContainer = overContainer * rato;
      //     this.offsetY = this.speed * offsetY * rato;
      //   } else if (this.translateY + this.speed * offsetY > 0) {
      //     //
      //     if (this.translateY + this.speed * offsetY > this.maxLoadmoreHeight) {
      //       return false;
      //     }
      //     rato = this.increase(
      //       (this.translateY + this.speed * offsetY) / this.maxRefreshHeight
      //     );
      //     this.offsetY = this.speed * offsetY * rato;
      //   } else {
      //     this.offsetY = this.speed * offsetY * rato;
      //   }
      // }
    },
    handleTouchEnd() {
      this.startX = 0;
      this.startY = 0;
      let overContainer = this.translateY + this.offsetY * this.speed;
      if (overContainer > 0) {
        // 下拉
        if (overContainer > this.maxRefreshHeight) {
          this.$emit("refresh");
        }
        this.offsetY = 0;
        this.translateY = 0;
      } else {
        // 上拉
        // 内容高度未超出容器高度，强制回到顶部
        if (this.slotContainerHeight < this.mainContainerHeight) {
          this.translateY = 0;
          if (Math.abs(overContainer) > this.loadmoreListenHeight) {
            this.$emit("loadmore");
          }
        } else {
          // 内容高度超过容器高度
          // 未触底
          if (
            this.slotContainerHeight >
            this.mainContainerHeight + Math.abs(overContainer)
          ) {
            this.translateY += this.offsetY * this.speed;
          } else {
            let translateY =
              this.mainContainerHeight -
              this.slotContainerHeight +
              Math.abs(overContainer);
            if (translateY > this.loadmoreListenHeight) {
              console.log("loadmore");
              this.$emit("loadmore");
            }
          }
        }
        // if (this.slotContainerHeight > this.maxRefreshHeight) {
        //   this.translateY = this.offsetY * this.speed;
        // }

        this.offsetY = 0;
      }
      // let offsetY = this.offsetY;
      // this.offsetY = 0;
      // this.translateY += this.speed * offsetY;
      // // 到顶
      // if (this.translateY > 0) {
      //   if (this.translateY > this.refreshListenHeight) {
      //     this.$emit("refresh");
      //   }
      //   this.translateY = 0;
      //   return;
      // }
      // // 当内容高度低于容器高度时
      // if (this.slotContainerHeight < this.mainContainerHeight) {
      //   if (this.overContainer > this.loadmoreListenHeight) {
      //     this.$emit("loadmore");
      //   }
      //   this.translateY = 0;
      //   this.overContainer = 0;
      //   return;
      // }
      // const overContainer =
      //   Math.abs(this.translateY) +
      //   this.mainContainerHeight -
      //   this.slotContainerHeight;
      // if (this.overContainer > 0 || overContainer > 0) {
      //   if (this.overContainer > this.loadmoreListenHeight) {
      //     this.$emit("loadmore");
      //   }
      //   this.translateY = this.mainContainerHeight - this.slotContainerHeight;
      //   this.overContainer = 0;
      // }
    },
    // 缓动函数，与目标值越接近，返回值越小，作用域[0,1],值域[0,1]
    increase(x) {
      return -x * x + 2 * x;
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
