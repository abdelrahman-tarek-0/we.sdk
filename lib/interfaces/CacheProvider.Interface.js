/**
 * @interface
 * @description Base interface for cache providers.
 */
class CacheProviderInterface {
   /**
    *
    * @param {TTLInMs} ttl
    * @param {string} path location of the cashed file in json format
    */
   constructor(ttl, path) {}

   /**
    *
    * @param {string} key
    * @param {any} value
    * @returns {any}
    */
   async set(key, value) {
      throw new Error('Not implemented')
   }

   /**
    *
    * @param {string} key
    * @returns {any}
    */
   async get(key) {
      throw new Error('Not implemented')
   }

   /**
    *
    * @param {string} key
    * @returns {this}
    */
   async remove(key) {
      throw new Error('Not implemented')
   }

   /**
    *
    * @returns {this}
    */
   async clear() {
      throw new Error('Not implemented')
   }

   /**
    *
    * @param {string} key
    * @returns {boolean}
    */
   async validateKey(key) {
      throw new Error('Not implemented')
   }
}

module.exports = CacheProviderInterface
