const map = new Map()

module.exports = (ttl) => {
  return {

    get: (key) => {
      if (map.has(key)) {
        const entry = map.get(key)
        if (entry.updateAt + ttl > Date.now()) {
          return entry.value
        }
      }
    },

    set: (key, value) => {
      map.set(key, { updateAt: Date.now(), value })
    }
  }
}
