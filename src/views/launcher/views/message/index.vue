<template>
  <ui-page
    bottom="1rem"
    :header="{
      barHeight: '1.4rem',
    }"
    use-custom-header
    class="page-message"
  >
    <template v-slot:header-bar>
      <header-bar
        bar-height="1.4rem"
        :show-back="false"
        use-custom-title-text
        leftWidth="2rem"
        rightWidth="1.4rem"
        :bar-style="{ backgroundColor: 'var(--page-message-header-bg)' }"
      >
        <template v-slot:header-left>
          <p class="title-context-left">消息(32)</p>
        </template>
        <div></div>
        <template v-slot:header-right>
          <p class="title-context-right">
            <tg-icon name="renwu-tuandui" size="large"></tg-icon>
            <tg-icon name="rili1" size="large"></tg-icon>
          </p>
          <!-- <tg-icon
            name="fuhao-tongzhi"
            :iconStyle="{
              color: 'var(--color-text-reverse)',
            }"
          ></tg-icon> -->
        </template>
      </header-bar>
    </template>
    <div class="message-search-bar">
      <div class="message-search-bar-input"></div>
    </div>
    <div class="message-list">
      <div
        class="message-box"
        v-for="(msg, $index) in messageList"
        :key="msg.id"
      >
        <div class="message-box-avatar">
          <img
            alt=""
            :src="require('@/assets/images/logo/' + msg.icon + '.png')"
            srcset=""
          />
        </div>
        <div
          class="message-box-content"
          :class="{ 'no-border': $index === messageList.length - 1 }"
        >
          <div class="message-box-line">
            <div class="message-box-title-text">{{ msg.title }}</div>
            <div class="message-box-date-text">{{ msg.date }}</div>
          </div>
          <div class="message-box-line no-mbt">
            <p class="message-box-content-text">{{ msg.content }}</p>
            <p class="message-box-content-icon"></p>
          </div>
        </div>
      </div>
    </div>
  </ui-page>
</template>

<script>
export default {
  name: "page-message",
  data() {
    let length24List = Array(24).fill({});
    return {
      messageList: length24List.map((msg, idx) => {
        return {
          id: idx + 1,
          title: window.getRandomCnWord(2, 8),
          content: window.getRandomCnWord(6, 14),
          date: "2022年4月3日",
          icon: "logo" + ~~(Math.random() * 10 + 1),
        };
      }),
    };
  },
};
</script>

<style lang="scss">
.page-message {
  --page-message-header-bg: var(--color-primary);
  .title-context-left {
    color: var(--color-text-reverse);
    font-size: var(--font-size-header);
  }
  .title-context-right {
    color: var(--color-text-reverse);
    font-size: var(--font-size-header);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-right: 30px;
  }
  .message-search-bar {
    background-color: var(--page-message-header-bg);
    height: 100px;
    padding: 20px 30px;
    padding-bottom: 0;
    .message-search-bar-input {
      height: 80px;
      margin-bottom: 0;
      border-radius: 12px;
      background-color: var(--color-bg-primary);
    }
  }
  .message-list {
    .message-box {
      background-color: var(--color-bg-primary);
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 30px;
      padding-bottom: 0;
      .message-box-avatar {
        width: 120px;
        height: 120px;
        margin-right: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .message-box-content {
        height: 160px;
        flex-grow: 1;
        border-bottom: 1px solid var(--color-border-light);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .message-box-line {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 12px;
          width: 100%;
          .message-box-title-text {
            color: var(--color-primary);
            font-size: var(--font-size-body-lg);
          }
          .message-box-date-text {
            color: var(--color-text-placeholder);
            font-size: var(--font-size-body-sm);
          }
          .message-box-content-text {
            color: var(--color-text-sub);
            font-size: var(--font-size-body);
          }
        }
        .no-mbt {
          margin-bottom: 0;
        }
      }
      .no-border {
        border-bottom: none;
      }
    }
  }
}
.theme-dark {
  .page-message {
    --page-message-header-bg: --color-bg-sub;
    .title-context-left {
      color: var(--color-text-primary);
    }
    .title-context-right {
      color: var(--color-text-primary);
    }
  }
}
</style>
