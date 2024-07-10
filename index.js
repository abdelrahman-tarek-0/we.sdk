const WeApi = require('./lib/api.js')
const WeCachedApi = require('./lib/cachedApi.js')
const WeApiError = require('./lib/utils/ErrorBuilder.js')

const CacheProviderInterface = require('./lib/interfaces/CacheProvider.Interface.js')
const CacheProviderInMemory = require('./lib/providers/cache.providers/CacheProviderInMemory.js')
const CacheProviderInFile = require('./lib/providers/cache.providers/CacheProviderInFile.js')

module.exports = {
   WeApi,
   WeApiError,
   WeCachedApi,
   CacheProviderInterface,
   CacheProviderInMemory,
   CacheProviderInFile,
}