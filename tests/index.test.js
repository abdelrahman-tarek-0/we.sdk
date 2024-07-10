const {
   WeCachedApi,
   WeApi,
   WeApiError,
   CacheProviderInMemory,
   CacheProviderInFile,
} = require('../index.js')


const main = async (number, password) => {
   const session = await WeApi.userAuthenticate(number, password)
   const res = await WeApi.getBalance(session)
   const res2 = await WeApi.getFreeUnits(session)

   console.log(JSON.stringify(session, null, 2))
   console.log(JSON.stringify(res, null, 2))
   console.log(JSON.stringify(res2, null, 2))
}

const mainCached = async (number, password) => {
   try {
      const weCachedApi = new WeCachedApi({
         customer: {
            number: number,
            password: password,
         },
         CacheProvider: CacheProviderInFile, // or CacheProviderInMemory
         cachePath: './cache.json', // only needed if you are using CacheProviderInFile
         ttlInMs: {
            session: 3.5 * 60 * 60 * 1000, // 3.5 hours before the session expires
            balance: 10 * 60 * 1000, // 10 minutes before the balance expires
            freeUnit: 10 * 60 * 1000, // 10 minutes before the freeUnit expires
         },
         hooks: {
            beforeRequest: (key) => {
               console.log('beforeRequest', key) // will be called before the request if not cached
            },
            afterRequest: (key) => {
               console.log('afterRequest', key) // will be called after the request if not cached
            },
         },
      })

      const session = await weCachedApi.userAuthenticate()
      const balance = await weCachedApi.getBalance() // if session is not cached it will call userAuthenticate first
      const quota = await weCachedApi.getFreeUnits() // if session is not cached it will call userAuthenticate first

      console.log(JSON.stringify(session, null, 2))
      console.log(JSON.stringify(balance, null, 2))
      console.log(JSON.stringify(quota, null, 2))
   } catch (error) {
      if (error instanceof WeApiError) {
         return console.log('We Api Error:', error.message)
      }
      console.log('Error:', error.message)
   }
}

if (process.argv[2] === 'cached') {
   return mainCached(process.argv[3], process.argv[4])
}else {
   return main(process.argv[2], process.argv[4])
}

