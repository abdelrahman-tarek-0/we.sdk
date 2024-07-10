const WeApi = require('../lib/api.js')

const main = async (number, password) => {
   const session = await WeApi.userAuthenticate(number, password)
   const res = await WeApi.getBalance(session)
   const res2 = await WeApi.getFreeUnits(session)

   console.log(JSON.stringify(session, null, 2))
   console.log(JSON.stringify(res, null, 2))
   console.log(JSON.stringify(res2, null, 2))
}

main(process.argv[2], process.argv[3])
