<template>
  <router-view v-slot="{ Component }">
    <transition name="slide">
      <keep-alive :include="cacheComponents">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      isRouterViewAlive: true,
    };
  },
  props: {
    titleHeight: String,
  },
  provide() {
    return {
      titleHeight: this.titleHeight,
    };
  },
  computed: {
    ...mapState(["cacheComponents"]),
  },
  created() {
    window.APP_ROOT = this;
    this.initCacheComponents(
      this.$router.options.routes
        .filter(({ keepAlive }) => keepAlive)
        .map(({ name }) => name)
    );
  },
  methods: {
    ...mapMutations(["initCacheComponents"]),
  },
};
</script>

<style lang="scss">
.ui-ft-30-important {
  font-size: 30px !important;
}
#app {
  color: var(--color-text-primary);
  border-color: var(--color-border-light);
}
#testA {
  width: 750px;
  height: 100px;
}
/* 进入的起点、离开的终点 */
.slide-enter {
  transform: translateY(40%);
  opacity: 0;
}
.slide-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-out;
}
/* 进入的终点、离开的起点 */
.slide-enter-to,
.slide-leave {
  transform: translateY(0);
  opacity: 1;
}
</style>
