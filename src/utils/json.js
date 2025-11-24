// src/utils/json.js
// Utility to format JSON string if valid, else return original
export function formatJson(str) {
  try {
    const obj = JSON.parse(str);
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return str;
  }
}
