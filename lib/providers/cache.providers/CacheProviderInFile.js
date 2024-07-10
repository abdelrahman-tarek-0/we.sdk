const fs = require('fs/promises')
const fsSync = require('fs')

const CacheProviderInterface = require('../../interfaces/CacheProvider.Interface.js')

class CacheProviderInFile extends CacheProviderInterface {
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

   async set(key, value) {
      this.cache[key] = {
         value,
         timestamp: Date.now(),
      }

      await fs.writeFile(this.path, JSON.stringify(this.cache))
      return this
   }

   async get(key) {
      if (!this.validateKey(key)) {
         return null
      }

      return this.cache?.[key]?.value
   }

   async remove(key) {
      delete this.cache?.[key]
      await fs.writeFile(this.path, JSON.stringify(this.cache))
      return this
   }

   async clear() {
      this.cache = {}
      await fs.writeFile(this.path, JSON.stringify(this.cache))
      return this
   }

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
