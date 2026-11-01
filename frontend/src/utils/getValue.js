export function getValue(obj, path) {
  const keys = String(path).split(".");
  return keys.reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}
