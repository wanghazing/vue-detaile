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
            transform: filterActiveFlag === field.key ? 'rotateZ(180deg)' : '',
          }"
        ></tg-icon>
      </div>
    </div>
    <div
      class="filter-option-container"
      :style="{ top: '0.8rem' }"
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
            @click="handleSelectOption(option, activeFilter)"
          >
            <div class="select-box" v-if="option.selected">
              <tg-icon name="duihao2" class="select-box-icon"></tg-icon>
            </div>
            <p class="option-label">{{ option.label }}</p>
          </div>
        </div>
        <div class="multiple-select-box" v-if="activeFilter.multiple">
          <div class="reset-btn" @click="handleReset(activeFilter)">重置</div>
          <div
            class="confirm-btn"
            :class="{ 'disabled-btn': !isCanSubmit }"
            @click="handleConfirmMultiple"
          >
            确定
          </div>
        </div>
      </div>
    </div>
    <div
      class="advance-filter-container"
      :style="{ top: '0.8rem' }"
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
                  v-for="(optionL3, ldx) in optionL2.options"
                  :key="optionL3.value"
                  @click.stop="
                    handleSelectOptionDeep(activeOption, optionL2, ldx)
                  "
                  :class="{ 'child-option-l3-actived': optionL3.selected }"
                >
                  {{ optionL3.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="multiple-select-box">
          <div class="reset-btn" @click.stop="handleResetDeep">重置</div>
          <div
            class="confirm-btn"
            :class="{ 'disabled-btn': !isCanSubmit }"
            @click.stop="handleConfirmDeep"
          >
            确定
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function deepReset(list) {
  return list.reduce((pv, cv) => {
    if (cv.options && cv.options.length) {
      // return pv.concat(deepReset(cv.options));
      return pv.concat({ ...cv, options: deepReset(cv.options) });
    } else if (cv.options) {
      return pv.concat({ ...cv });
    }
    if (cv.selected) {
      return pv.concat({ ...cv, selected: false });
    }
    return pv.concat({ ...cv });
  }, []);
}
export default {
  name: "ui-filter",
  data() {
    return {
      filterActiveFlag: "",
      showOptionList: false,
      activeFilter: {},
      activeOption: {},
    };
  },
  props: {
    settings: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.filterFieldList = this.settings;
  },
  computed: {
    isCanSubmit() {
      if (!this.activeFilter || !this.activeFilter.key) {
        return false;
      }
      return this.activeFilter.options.some(({ selected }) => selected);
    },
  },
  watch: {
    filterActiveFlag(val) {
      setTimeout(() => {
        this.showOptionList = val;
      }, 0);
    },
    // value(val) {

    //   this.filterFieldList.forEach((field, idx) => {
    //     if (Array.isArray(val[field.key]) && val[field.key].length > 0) {
    //       let options = field.options.reduce((pv,cv) => {
    //         return pv.concat({ ...cv, selected: val[field.key].indexOf(cv.value) })
    //       }, [])
    //       this.filterFieldList.splice(idx, 1, { ...field, options })
    //     } else if (val[field.key]) {
    //       let oIdx = field.options.find(({value}) => value === val[field.key]);
    //       field.options[oIdx].selected = true
    //       this.filterFieldList.splice(idx, 1, field)
    //     }
    //   })
    // }
  },
  methods: {
    handleActiveFilter(field) {
      this.filterActiveFlag =
        field.key === this.filterActiveFlag ? "" : field.key;
      this.activeFilter = field;
    },
    handleSelectOption(option, field) {
      // 多选
      let fieldIdx = this.filterFieldList.findIndex(
        ({ key }) => key === field.key
      );
      let optionIdx = field.options.findIndex(
        ({ value }) => value === option.value
      );
      let options = this.filterFieldList[fieldIdx].options;
      if (!field.multiple) {
        // 单选时将其他选项设为false
        options.forEach((o) => {
          o.selected = false;
        });
      }
      options.splice(optionIdx, 1, {
        ...options[optionIdx],
        selected: !options[optionIdx].selected,
      });
      this.filterFieldList.splice(fieldIdx, 1, {
        ...this.filterFieldList[fieldIdx],
        options,
      });
      // this.$set(this.filterFieldList, fieldIdx, );
      if (!field.multiple) {
        this.$emit("filter", {
          value: this.getValue(),
        });
        this.handleActiveFilter(field);
      }
    },
    handleConfirmMultiple() {
      this.$emit("filter", {
        value: this.getValue(),
      });
      this.handleActiveFilter(this.activeFilter);
    },
    handleReset(field) {
      // 多选
      let setFalseOptions = field.options.filter(({ selected }) => selected);
      setFalseOptions.forEach((option) => {
        this.handleSelectOption(option, field);
      });
    },
    getValue() {
      return this.filterFieldList.reduce((pv, cv) => {
        // if (cv.options.)
        if (cv.multiple) {
          let selectdOptions = cv.options.filter(({ selected }) => selected);
          if (selectdOptions.length > 0) {
            Object.assign(pv, {
              [cv.key]: selectdOptions.map(({ value }) => value),
            });
          }
        } else {
          let selectdOption = cv.options.find(({ selected }) => selected);
          if (selectdOption) {
            Object.assign(pv, {
              [cv.key]: selectdOption.value,
            });
          }
        }
        return pv;
      }, {});
    },
    closeOptionPanel() {
      this.filterActiveFlag = "";
    },
    handleActiveOption(option) {
      this.activeOption = option;
    },
    handleSelectOptionDeep(optionL1, optionL2, ldx) {
      let idx = this.filterFieldList.findIndex(
        ({ key }) => key === this.activeFilter.key
      );
      let jdx = this.activeFilter.options.findIndex(
        ({ value }) => value === optionL1.value
      );
      let kdx = this.activeFilter.options[jdx].options.findIndex(
        ({ value }) => value === optionL2.value
      );
      let activeFilter = { ...this.activeFilter };
      activeFilter.options[jdx].options[kdx].options[ldx].selected = true;
      this.filterFieldList.splice(idx, 1, activeFilter);
    },
    handleResetDeep() {
      this.activeFilter.options = deepReset(this.activeFilter.options);
      let idx = this.filterFieldList.findIndex(
        ({ key }) => key === this.activeFilter.key
      );
      let activeFilter = { ...this.activeFilter };
      let activeOptionIdx = this.activeFilter.options.findIndex(
        ({ value }) => value === this.activeOption.value
      );
      // this.activeFilter.options
      // this.activeOption =
      this.filterFieldList.splice(idx, 1, activeFilter);
      this.activeFilter = this.filterFieldList[idx];
      this.activeOption = this.activeFilter.options[activeOptionIdx];
    },
    handleConfirmDeep() {},
  },
};
</script>

<style lang="scss">
.ui-filter {
  background-color: var(--color-bg-primary);
  position: relative;
  height: calc(100% - 90px);
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
    position: absolute;
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
            max-width: 160px;
            height: 60px;
            padding: 0 16px;
            border-radius: 30px;
            line-height: 60px;
            text-align: center;
            color: var(--color-text-sub);
            font-size: var(--font-size-tip);
            background-color: #e3e3e3;
            margin-right: 16px;
            margin-bottom: 16px;
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
