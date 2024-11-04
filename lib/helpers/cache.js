class Cache {
    constructor() {
      this.store = new Map();
    }
  
    set(key, value, ttl = 60000) {
      const expires = Date.now() + ttl;
      this.store.set(key, { value, expires });
    }
  
    get(key) {
      const item = this.store.get(key);
      if (!item) return null;
      if (item.expires < Date.now()) {
        this.store.delete(key);
        return null;
      }
      return item.value;
    }
  
    delete(key) {
      this.store.delete(key);
    }
  
    clear() {
      this.store.clear();
    }
  }
  
  module.exports = Cache;