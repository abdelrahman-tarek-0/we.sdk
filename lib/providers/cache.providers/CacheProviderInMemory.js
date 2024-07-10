const CacheProviderInterface = require('../../interfaces/CacheProvider.Interface.js')

class CacheProviderInMemory extends CacheProviderInterface {
   constructor(ttl) {
      super()
      this.cache = {}
      this.ttl = ttl
   }

   set(key, value) {
      this.cache[key] = value
      this.cache[key].timestamp = Date.now()
      return this
   }

   get(key) {
      if (!this.validateKey(key)) {
         return null
      }
      return this.cache?.[key]?.value
   }

   remove(key) {
      delete this.cache?.[key]
      return this
   }

   clear() {
      this.cache = {}
      return this
   }

   validateKey(key) {
      if (!this.cache[key]) {
         return false
      }

      if (Date.now() - this.cache[key].timestamp > this.ttl[key]) {
         this.remove(key)
         return false
      }

      return true
   }
}

module.exports = CacheProviderInMemory
