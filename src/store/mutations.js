export default {
  initCacheComponents(state, list) {
    state.cacheComponents = [...new Set(list)];
  },
};
