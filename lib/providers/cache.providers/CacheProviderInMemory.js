const CacheProviderInterface = require('../../interfaces/CacheProvider.Interface.js')

/**
 * @implements {CacheProviderInterface}
 */
class CacheProviderInMemory extends CacheProviderInterface {
   /**
    * 
    * @param {TTLInMs} ttl 
    */
   constructor(ttl) {
      super()
      this.cache = {}
      this.ttl = ttl

   }

   /**
    * 
    * @param {string} key 
    * @param {any} value 
    * @returns {any}
    */
   set(key, value) {
      this.cache[key] = {
         value,
         timestamp: Date.now()
      }
      return this
   }

   /**
    * 
    * @param {string} key 
    * @returns {any}
    */
   get(key) {
      if (!this.validateKey(key)) {
         return null
      }
      return this.cache?.[key]?.value
   }


   /**
    * 
    * @param {string} key 
    * @returns {this}
    */
   remove(key) {
      delete this.cache?.[key]
      return this
   }

   /**
    * 
    * @returns {this}
    */
   clear() {
      this.cache = {}
      return this
   }

   /**
    * 
    * @param {string} key 
    * @returns {boolean}
    */
   validateKey(key) {
      if (!this.cache?.[key]) {
         return false
      }

      if ((Date.now() - this.cache?.[key]?.timestamp) > this.ttl?.[key]) {
         this.remove(key)
         return false
      }

      return true
   }
}

module.exports = CacheProviderInMemory
