const WeApi = require('./api.js')
const WeApiError = require('./utils/ErrorBuilder.js')
const CacheProviderInMemory = require('./providers/cache.providers/CacheProviderInMemory.js')
const CacheProviderInterface = require('./interfaces/CacheProvider.Interface.js')

const CONFIG = {
   customer: {
      number: '',
      password: '',
   },
   ttlInMs: {
      session: 3.5 * 60 * 60 * 1000, // 3.5 hours
      balance: 10 * 60 * 1000, // 10 minutes
      freeUnit: 10 * 60 * 1000, // 10 minutes
   },
   CacheProvider: CacheProviderInMemory,
   cachePath: './cache.json',
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
   config.ttlInMs = config.ttlInMs || CONFIG.ttlInMs
   config.ttlInMs.session = config.ttlInMs.session || CONFIG.ttlInMs.session
   config.ttlInMs.balance = config.ttlInMs.balance || CONFIG.ttlInMs.balance
   config.ttlInMs.freeUnit = config.ttlInMs.freeUnit || CONFIG.ttlInMs.freeUnit
   config.CacheProvider = config.CacheProvider || CONFIG.CacheProvider
   config.cachePath = config.cachePath || CONFIG.cachePath
   config.hooks = config.hooks || CONFIG.hooks
   config.hooks.beforeRequest =
      config.hooks.beforeRequest || CONFIG.hooks.beforeRequest
   config.hooks.afterRequest =
      config.hooks.afterRequest || CONFIG.hooks.afterRequest

   return config
}

class WeCachedApi {
   constructor(config = CONFIG) {
      config = constructConfig(config)

      this.customer = config.customer
      this.ttlInMs = config.ttlInMs
      this.cacheProvider = new config.CacheProvider(
         this.ttlInMs,
         config.cachePath
      )
      this.hooks = config.hooks

      if (!(this.cacheProvider instanceof CacheProviderInterface))
         throw new WeApiError(
            'Invalid cache provider provided, must implement CacheProviderInterface',
            'WE_INVALID_CACHE_PROVIDER',
            {
               CacheProvider: config.CacheProvider,
            }
         )
   }

   async userAuthenticate() {
      const res = await this.#executeApiCall(
         'session',
         WeApi.userAuthenticate,
         this.customer.number,
         this.customer.password
      )

      return res
   }

   async getBalance() {
      const session = await this.userAuthenticate()
      const res = await this.#executeApiCall(
         'balance',
         WeApi.getBalance,
         session
      )

      return res
   }

   async getFreeUnits() {
      const session = await this.userAuthenticate()
      const res = await this.#executeApiCall(
         'freeUnit',
         WeApi.getFreeUnits,
         session
      )

      return res
   }

   async #executeApiCall(key, apiCall, ...args) {
      let data = this.cacheProvider.get(key)
      if (data instanceof Promise) data = await data
      
      if (data) return data

      this?.hooks?.beforeRequest?.(key)
      const res = await apiCall(...args)
      this?.hooks?.afterRequest?.(key)

      const ack = this.cacheProvider.set(key, res)
      if (ack instanceof Promise) await ack

      return res
   }
}

module.exports = WeCachedApi