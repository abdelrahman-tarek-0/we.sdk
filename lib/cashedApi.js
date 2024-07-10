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
   hooks: {
      beforeRequest: (key) => {},
      afterRequest: (key) => {},
   },
}

const constructConfig = (config) => {
   config.customer = config.customer || CONFIG.customer
   config.customer.number = config.customer.number || CONFIG.customer.number
   config.customer.password =
      config.customer.password || CONFIG.customer.password
   config.ttlInMin = config.ttlInMin || CONFIG.ttlInMin
   config.ttlInMin.session = config.ttlInMin.session || CONFIG.ttlInMin.session
   config.ttlInMin.balance = config.ttlInMin.balance || CONFIG.ttlInMin.balance
   config.ttlInMin.freeUnit =
      config.ttlInMin.freeUnit || CONFIG.ttlInMin.freeUnit
   config.CashProvider = config.CashProvider || CONFIG.CashProvider
   config.hooks = config.hooks || CONFIG.hooks
   config.hooks.beforeRequest =
      config.hooks.beforeRequest || CONFIG.hooks.beforeRequest
   config.hooks.afterRequest =
      config.hooks.afterRequest || CONFIG.hooks.afterRequest

   return config
}

class WeCashedApi {
   constructor(config = CONFIG) {
      config = constructConfig(config)

      this.customer = config.customer 
      this.ttlInMin = config.ttlInMin
      this.cacheProvider = new config.CashProvider(this.ttlInMin)
      this.hooks = config.hooks

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

