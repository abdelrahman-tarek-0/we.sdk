const fs = require('fs/promises')
const fsSync = require('fs')

const CacheProviderInterface = require('../../interfaces/CacheProvider.Interface.js')

/**
 * @implements {CacheProviderInterface}
 */
class CacheProviderInFile extends CacheProviderInterface {
   /**
    *
    * @param {TTLInMs} ttl
    * @param {string} path location of the cashed file in json format
    */
   constructor(ttl, path) {
      super()
      this.ttl = ttl
      this.path = path

      if (!fsSync.existsSync(this.path)) {
         fsSync.writeFileSync(this.path, '{}')
         this.cache = {}
      } else {
         try {
            this.cache = JSON.parse(fsSync.readFileSync(this.path, 'utf8'))
         } catch (error) {
            fsSync.writeFileSync(this.path, '{}')
            this.cache = {}
         }
      }
   }

   /**
    *
    * @param {string} key
    * @param {any} value
    * @returns {any}
    */
   async set(key, value) {
      this.cache[key] = {
         value,
         timestamp: Date.now(),
      }

      await fs.writeFile(this.path, JSON.stringify(this.cache))
      return this
   }

   /**
    *
    * @param {string} key
    * @returns {any}
    */
   async get(key) {
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
   async remove(key) {
      delete this.cache?.[key]
      await fs.writeFile(this.path, JSON.stringify(this.cache))
      return this
   }

   /**
    *
    * @returns {this}
    */
   async clear() {
      this.cache = {}
      await fs.writeFile(this.path, JSON.stringify(this.cache))
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

      if (Date.now() - this.cache?.[key]?.timestamp > this?.ttl?.[key]) {
         this.remove(key)
         return false
      }

      return true
   }
}

module.exports = CacheProviderInFile
