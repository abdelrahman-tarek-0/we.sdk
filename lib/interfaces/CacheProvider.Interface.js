class CacheProviderInterface {
    constructor() {}
 
    async set(key, value) {
       throw new Error('Not implemented')
    }
 
    async get(key) {
       throw new Error('Not implemented')
    }
 
    async remove(key) {
       throw new Error('Not implemented')
    }
 
    async clear() {
       throw new Error('Not implemented')
    }

    async validateKey(key) {
       throw new Error('Not implemented')
    }
 }

module.exports = CacheProviderInterface