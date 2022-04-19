export default {
  // 初始化缓存页面
  initCacheComponents(state, list) {
    state.cacheComponents = [...new Set(list)];
  },
  // 新增历史记录
  addSearchHistory(state, text) {
    let idx = state.searchHistory.findIndex((item) => item === text);
    if (idx !== -1) {
      state.searchHistory.splice(idx, 1);
      state.searchHistory.unshift(text);
      return false;
    }
    let over = state.searchHistory.length - state.searchHistoryMaxLength;
    if (over >= 0) {
      while (over > -1) {
        state.searchHistory.pop();
        over--;
      }
    }
    state.searchHistory.unshift(text);
  },
  // 清空历史记录
  clearSearhHistory(state) {
    state.searchHistory.splice(0, state.searchHistory.length);
  },
};
