export function titleCase(str) {
  return str.trim().replace(/\b\w/g, (char) => char.toUpperCase());
}
