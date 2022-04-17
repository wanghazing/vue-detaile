export default function (r, g, b) {
  if (!isNaN([r, g, b].join(""))) {
    return ["#", ...[r, g, b].map((n) => Number(n).toString(16))].join("");
  }
}
