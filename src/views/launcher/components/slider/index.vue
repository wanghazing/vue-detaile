<template>
  <div
    class="slider-ad"
    :id="slideId"
    :style="{
      marginLeft: data.adStyle.marginLR,
      marginRight: data.adStyle.marginLR,
      marginBottom: data.adStyle.marginB,
      width: data.adStyle.width,
      height: data.adStyle.height,
      borderRadius: data.adStyle.borderRadius,
    }"
  >
    <div
      class="slider-img-container"
      :style="{
        height: data.adStyle.height,
      }"
    >
      <div
        v-for="ad in adList"
        :key="ad.id"
        class="ad-img"
        :style="{
          width: data.adStyle.width,
          height: data.adStyle.height,
          backgroundColor: '#FFFFFF',
        }"
      >
        <img
          :src="ad.img"
          :style="{
            width: data.adStyle.width,
            height: data.adStyle.height,
          }"
          alt="拿不到图片"
          srcset=""
        />
      </div>
    </div>
    <!-- <span style="clear: both"></span> -->
  </div>
</template>

<script>
import BetterScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
BetterScroll.use(Slide);
export default {
  name: "slider-ad",
  data() {
    this.slideId = "slide-" + ~~(Math.random() * 64800);
    return {
      offsetX: 0,
      startX: 0,
      translateX: 0,
      showTransition: true,
      initTranslateX: 0,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        adList: [],
        sliderStyle: {},
        slider: null,
      }),
    },
  },
  created() {
    this.adList = this.data.adList.slice(0);
    // this.$nextTick(() => {

    // })
  },
  mounted() {
    this.slider = new BetterScroll("#" + this.slideId, {
      scrollX: true,
      scrollY: false,
      slide: {
        threshold: 100,
      },
      momentum: false,
      bounce: false,
      stopPropagation: true,
    });
    setTimeout(() => {
      this.slider.refresh();
    }, 60);
  },
  methods: {
    init() {},
  },
};
</script>

<style lang="scss">
.slider-ad {
  overflow: hidden;
  .slider-img-container {
    white-space: nowrap;
    .ad-img {
      display: inline-block;
      img {
      }
    }
  }
}
</style>
