// 占位组件，无内容

import { h } from "vue";
export default function (props) {
  return h("div", { style: props.data.style });
}
