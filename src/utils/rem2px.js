export function rem2px(rem) {
  console.log(rem);
  if (!isNaN(rem)) {
    let ww = window.screen.width;
    return (rem * 100 * ww) / 750;
    // return 100 * num + "px";
  }
  return 0;
}
export function px2rem(px) {
  if (!px || typeof px !== "number") {
    return 0;
  }
  if (!isNaN(px)) {
    let ww = window.screen.width;
    // return (num / 100).toFixed(0) + "rem";
    return (7.5 * px) / ww;
  }
  return 0;
}
