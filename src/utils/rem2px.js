export function rem2px(rem) {
  if (!rem || typeof rem !== "string") {
    return "0px";
  }
  let num = rem.replace("rem", "");
  if (!isNaN(num)) {
    return 100 * num + "px";
  }
  return "0px";
}
export function px2rem(px) {
  if (!px || typeof px !== "string") {
    return "0rem";
  }
  let num = px.replace("px", "");
  if (!isNaN(px)) {
    return (num / 100).toFixed(0) + "rem";
  }
  return "0rem";
}
