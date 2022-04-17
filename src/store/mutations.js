export default {
  initCacheComponents(state, list) {
    state.cacheComponents = [...new Set(list)];
  },
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
  clearSearhHistory(state) {
    state.searchHistory.splice(0, state.searchHistory.length);
  },
};
