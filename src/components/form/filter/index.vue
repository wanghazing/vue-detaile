<template>
  <div class="ui-filter">
    <div class="filter-bar">
      <div
        class="filter-item-box"
        v-for="field in filterFieldList"
        :key="field.key"
        @click.stop="handleActiveFilter(field)"
      >
        <p>{{ field.label }}</p>
        <tg-icon
          :name="field.icon || 'shengxu'"
          size="small"
          color="var(--color-text-sub)"
          :icon-style="{
            transform:
              filterActiveFlag === field.key && field.rotate
                ? 'rotateZ(180deg)'
                : '',
          }"
        ></tg-icon>
      </div>
    </div>
    <div
      class="filter-option-container"
      :style="{ top: '1.7rem' }"
      v-if="filterActiveFlag && !activeFilter.deep"
      @click="closeOptionPanel"
    >
      <div
        class="option-panel"
        :style="{
          transform: showOptionList ? 'translateY(0)' : 'translateY(-0.35rem)',
          opacity: showOptionList ? '1' : '0',
        }"
      >
        <div class="option-list">
          <div
            class="option-box"
            v-for="option in activeFilter.options"
            :key="option.value"
            @click.stop="handleSelectOption(option.value)"
          >
            <div
              class="select-box"
              v-if="activeFilter.selectedValue.includes(option.value)"
            >
              <tg-icon name="duihao2" class="select-box-icon"></tg-icon>
            </div>
            <p class="option-label">{{ option.label }}</p>
          </div>
        </div>
        <div class="multiple-select-box" v-if="activeFilter.multiple">
          <div class="reset-btn" @click.stop="handleReset">重置</div>
          <div class="confirm-btn" @click="handleConfirm">确定</div>
        </div>
      </div>
    </div>
    <div
      class="advance-filter-container"
      :style="{ top: '1.7rem' }"
      @click="closeOptionPanel"
      v-if="filterActiveFlag && activeFilter.deep"
    >
      <div
        class="option-panel"
        :style="{
          transform: showOptionList ? 'translateY(0)' : 'translateY(-0.35rem)',
          opacity: showOptionList ? '1' : '0',
        }"
      >
        <div class="option-list-deep">
          <div class="option-left-bar">
            <div
              class="option-box-l1"
              v-for="option in (activeFilter.options || []).filter(
                ({ options }) => !!options.length
              )"
              :key="option.value"
              :style="{
                backgroundColor:
                  option.value === activeOption.value
                    ? 'var(--color-bg-sub)'
                    : 'var(--color-bg-primary)',
                borderColor:
                  option.value === activeOption.value
                    ? 'var(--color-bg-sub)'
                    : 'var(--color-border-light)',
              }"
              @click.stop="handleActiveOption(option)"
            >
              {{ option.label }}
            </div>
          </div>
          <div class="option-right-container">
            <div
              class="child-option-group"
              v-for="optionL2 in (activeOption.options || []).filter(
                ({ options }) => !!options.length
              )"
              :key="optionL2.value"
            >
              <p class="child-option-group-title">{{ optionL2.label }}</p>
              <div class="child-option-list">
                <div
                  class="child-option-box"
                  v-for="optionL3 in optionL2.options"
                  :key="optionL3.value"
                  @click.stop="handleSelectOptionDeep(optionL3.value)"
                  :class="{
                    'child-option-l3-actived':
                      activeFilter.selectedValue.includes(optionL3.value),
                  }"
                >
                  {{ optionL3.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="multiple-select-box">
          <div class="reset-btn" @click.stop="handleReset">重置</div>
          <div class="confirm-btn" @click.stop="handleConfirm">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ui-filter",
  data() {
    return {
      filterActiveFlag: "",
      showOptionList: false,
      activeFilter: {},
      activeOption: {},
      selectdOptionsDeep: [],
    };
  },
  props: {
    settings: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.filterFieldList = this.settings.map((set) => ({
      ...set,
      selectedValue: [],
    }));
  },
  watch: {
    filterActiveFlag(val) {
      setTimeout(() => {
        this.showOptionList = val;
      }, 0);
    },
  },
  methods: {
    handleActiveFilter(field) {
      this.filterActiveFlag =
        field.key === this.filterActiveFlag ? "" : field.key;
      this.activeFilter = field;
      if (field.deep && !this.activeOption.value) {
        this.handleActiveOption(
          field.options.filter(({ options }) => options.length > 0)[0]
        );
      }
    },
    handleSelectOption(value) {
      let idx = this.activeFilter.selectedValue.findIndex(
        (val) => val === value
      );
      if (this.activeFilter.multiple) {
        if (idx === -1) {
          this.activeFilter.selectedValue.push(value);
        } else {
          this.activeFilter.selectedValue.splice(idx, 1);
        }
      } else {
        if (idx === -1) {
          this.activeFilter.selectedValue = [value];
        } else {
          this.activeFilter.selectedValue = [];
        }
        this.$emit("filter", {
          value: this.getValue(),
        });
        this.handleActiveFilter(this.activeFilter);
      }
    },
    handleConfirm() {
      this.$emit("filter", {
        value: this.getValue(),
      });
      this.handleActiveFilter(this.activeFilter);
    },
    handleReset() {
      // 多选
      this.activeFilter.selectedValue = [];
    },
    getValue() {
      let result = {};
      this.filterFieldList.forEach((field) => {
        if (field.selectedValue.length > 0) {
          result[field.key] = field.selectedValue;
        }
      });
      return result;
    },
    closeOptionPanel() {
      this.filterActiveFlag = "";
    },
    handleActiveOption(option) {
      this.activeOption = option;
    },
    handleSelectOptionDeep(value) {
      let idx = this.activeFilter.selectedValue.findIndex(
        (val) => val === value
      );
      if (idx === -1) {
        this.activeFilter.selectedValue.push(value);
      } else {
        this.activeFilter.selectedValue.splice(idx, 1);
      }
    },
  },
};
</script>

<style lang="scss">
.ui-filter {
  background-color: var(--color-bg-primary);
  position: relative;
  .filter-bar {
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    font-size: var(--font-size-body-lg);
    touch-action: none;
    .filter-item-box {
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
    }
    p {
      max-width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    i {
      transition: 0.5s;
      display: block;
      margin-left: 10px;
    }
  }
  .filter-option-container,
  .advance-filter-container {
    position: fixed;
    z-index: 1999;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(52, 52, 52, 0.5);
    .option-panel {
      transition: transform 0.2s ease-out;
    }
    .option-list {
      max-height: 800px;
      background-color: var(--color-bg-primary);
      overflow: scroll;
      .option-box {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        display: row;
        border-bottom: 1px solid var(--color-border-light);
        .select-box {
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          .select-box-icon {
            font-size: var(--font-size-header-lg);
            color: var(--color-primary);
          }
        }
      }
      :nth-last-child(1) {
        border: none;
      }
    }
    .option-list-deep {
      height: 800px;
      background-color: var(--color-bg-sub);
      display: flex;
      flex-direction: row;
    }
    .option-left-bar {
      background-color: var(--color-bg-primary);
      width: 210px;
      min-width: 210px;
      height: 100%;
      overflow: scroll;
      .option-box-l1 {
        height: 100px;
        border-bottom: 1px solid var(--color-border-primary);
        line-height: 100px;
        text-align: center;
      }
      :nth-last-child(1) {
        border: none;
      }
    }
    .option-right-container {
      flex-grow: 1;
      height: 800px;
      overflow: scroll;
      .child-option-group {
        margin: 24px;
        .child-option-group-title {
          font-size: var(--font-size-header-sm);
          color: var(--color-text-primary);
          font-weight: bold;
          margin-bottom: 24px;
        }
        .child-option-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          .child-option-box {
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
          .child-option-l3-actived {
            background-color: var(--color-primary);
            color: var(--color-text-reverse);
          }
        }
      }
    }
    .multiple-select-box {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      background-color: var(--color-bg-primary);
      .reset-btn,
      .confirm-btn {
        height: 100%;
        line-height: 100px;
        flex-grow: 1;
        font-size: var(--font-size-body);
        text-align: center;
      }
      .confirm-btn {
        background-color: var(--color-primary);
        color: var(--color-text-reverse);
      }
      .disabled-btn {
        background-color: var(--color-bg-disabled);
      }
    }
  }
}
</style>
