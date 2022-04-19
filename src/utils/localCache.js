export default {
  setItem(key, value) {
    if (typeof value === "string") {
      localStorage.setItem(key, value);
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    }
  },
  getItem(key) {
    return localStorage.getItem(key);
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
