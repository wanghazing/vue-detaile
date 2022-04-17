<template>
  <ui-page :touch-actions="['swiper']" ref="page" use-custom-header>
    <template v-slot:header-bar>
      <header-bar
        :icon-style="{ color: 'var(--color-primary)' }"
        :bar-style="{ backgroundColor: 'var(--color-bg-primary)' }"
        use-custom-title-text
      >
        <div class="search-bar">
          <input
            type="text"
            class="search-bar-input"
            :value="searchText"
            @input="handleInput"
          />
          <tg-icon name="cuowu" v-show="searchText" @click="clear"></tg-icon>
        </div>
        <template v-slot:header-right>
          <span class="search-btn" @click="search">搜索</span>
        </template>
      </header-bar>
    </template>
    <div class="search-result ui-plr-32">
      <div class="search-history ui-mt-56">
        <div class="channel-bar">
          <h3>历史记录</h3>
          <tg-icon name="shanchu1" @click="clearSearhHistory"></tg-icon>
        </div>
        <div
          v-if="searchHistory.length > 0"
          class="search-history-list ui-mt-32"
        >
          <div class="his-tag" v-for="his in searchHistory" :key="his">
            {{ his }}
          </div>
        </div>
        <div v-else class="no-his-tip ui-mt-32">还没有历史记录哦~</div>
      </div>
    </div>
  </ui-page>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "demo-search",
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    ...mapState(["searchHistory"]),
  },
  methods: {
    ...mapMutations(["addSearchHistory", "clearSearhHistory"]),
    handleInput(e) {
      // console.log(e);
      this.searchText = e.target.value;
    },
    clear() {
      this.searchText = "";
    },
    search() {
      this.addSearchHistory(this.searchText);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  background-color: var(--color-bg-sub);
  height: 60px;
  border-radius: 30px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .search-bar-input {
    outline: none;
    border: none;
    background: transparent;
    height: 60px;
    line-height: 60px;
    flex-grow: 1;
    margin-right: 32px;
  }
  i {
    color: var(--color-text-placeholder);
  }
}
.search-btn {
  color: var(--color-primary);
}
.search-result {
  .channel-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .search-history-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .his-tag {
      max-width: 400px;
      height: 60px;
      padding: 0 16px;
      border-radius: 30px;
      line-height: 60px;
      text-align: center;
      color: var(--color-text-sub);
      font-size: var(--font-size-tip);
      background-color: #e9e9e9;
      margin-right: 16px;
      margin-bottom: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .no-his-tip {
    text-align: center;
    color: var(--color-text-placeholder);
  }
}
</style>
