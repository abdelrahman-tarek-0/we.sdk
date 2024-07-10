const WeApi = require('./api.js')
const WeApiError = require('./utils/ErrorBuilder.js')
const CacheProviderInMemory = require('./providers/cache.providers/CacheProviderInMemory.js')
const CacheProviderInterface = require('./interfaces/CacheProvider.Interface.js')

const CONFIG = {
   customer: {
      number: '',
      password: '',
   },
   ttlInMin: {
      session: 3.5 * 60, // 3.5 hours
      balance: 10, // 10 minutes
      freeUnit: 10, // 10 minutes
   },
   CashProvider: CacheProviderInMemory,
}

class WeCashedApi {
   constructor(config = CONFIG) {
      this.customer = config.customer || CONFIG.customer
      this.ttlInMin = config.ttlInMin || CONFIG.ttlInMin
      this.cacheProvider = config.CashProvider
         ? new config.CashProvider(this.ttlInMin)
         : new CONFIG.CashProvider(this.ttlInMin)

      if (!(this.cacheProvider instanceof CacheProviderInterface))
         throw new WeApiError(
            'Invalid cache provider provided, must implement CacheProviderInterface',
            'WE_INVALID_CACHE_PROVIDER',
            {
               CashProvider: config.CashProvider,
            }
         )
   }
}

