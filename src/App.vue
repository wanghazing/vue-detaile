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

<style>
.ui-ft-30-important {
  font-size: 30px !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#testA {
  width: 750px;
  height: 100px;
}
</style>
