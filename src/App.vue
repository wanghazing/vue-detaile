<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cacheComponents">
      <component :is="Component" />
    </keep-alive>
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
// #app {
// }
#testA {
  width: 750px;
  height: 100px;
}
</style>
