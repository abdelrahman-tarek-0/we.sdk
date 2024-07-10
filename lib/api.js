const axios = require('axios')

const WeApiError = require('./utils/ErrorBuilder.js')
const parsePhone = require('./utils/phoneParser.js')
const {
   responseHandler,
   weErrorHandler,
} = require('./utils/responseHandler.js')

/** @typedef {import('./types/auth.types.js').UserResponse} UserResponse */
/** @typedef {import('./types/balance.types.js').UserBalanceInfo} UserBalanceInfo */
/** @typedef {import('./types/freeUnit.types.js').FreeUnit} FreeUnit */

const api = axios.create({
   baseURL: 'https://my.te.eg/',
   headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      channelid: '702',
      'content-type': 'application/json',
      csrftoken: '',
      delegatorsubsid: '',
      iscoporate: 'false',
      ismobile: 'false',
      isselfcare: 'true',
      languagecode: 'en-US',
      'sec-ch-ua':
         '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
   },
})

class WeApi {
   /**
    *
    * @param {String} number valid Egyptian landline number ex: 0223123456, +20223123456, 0020223123456
    * @param {String} password  your we account password
    * @description
    * * Authenticate user with we api
    * * note: the number parameter will be parsed to FBB format\
   you can provide it in any format you want but it should be a valid Egyptian landline number\
   the parsing library is libphonenumber-js make sure your number can be parsed with this successfully
    * * some examples on a valid numbers:
    * * * 0223123456
    * * * +20223123456
    * * * 0020223123456
    * * * +20-2-2312-3456
    * * * 68-312-3456
    * * * 02-2312-3456
    *
    * @returns {Promise<UserResponse>} session object
    * @example const session = await WeApi.userAuthenticate('02-2312-3456', 'yourPassword')
    */
   static userAuthenticate = async (number, password) => {
      if (!number || !password)
         throw new WeApiError(
            'Invalid credentials provided',
            'WE_INVALID_CREDENTIALS',
            {
               number,
               password,
            }
         )

      const res = await api
         .post(
            '/echannel/service/besapp/base/rest/busiservice/v1/auth/userAuthenticate',
            {
               acctId: parsePhone(number),
               password,
               appLocale: 'en-US',
               isSelfcare: 'Y',
               isMobile: 'N',
            }
         )
         .catch(weErrorHandler)

      return responseHandler(res)
   }

   /**
    * @param {Object} session
    * @param {String} session.uToken
    * @param {String} session.token
    * @param {Object} session.account
    * @param {String} session.account.acctId
    * @description
    * * Get user balance
    * * provide a valid session object from userAuthenticate method
    * @returns {Promise<UserBalanceInfo>} user balance
    * @example const balance = await WeApi.getBalance(session)
    * const balance = await WeApi.getBalance(await WeApi.userAuthenticate('02-2312-3456', 'yourPassword')
    */
   static async getBalance(session) {
      if (!session?.uToken || !session?.token || !session?.account?.acctId)
         throw new WeApiError(
            'Invalid session provided',
            'WE_INVALID_SESSION',
            {
               session,
            }
         )

      const res = await api
         .post(
            '/echannel/service/besapp/base/rest/busiservice/cbs/ar/queryBalance',
            {
               acctId: session.account.acctId,
            },
            {
               headers: {
                  csrftoken: session.token,
                  cookie: `indiv_login_token=${session.uToken}`,
               },
            }
         )
         .catch(weErrorHandler)

      return responseHandler(res)
   }

   /**
    * @param {Object} session
    * @param {String} session.uToken
    * @param {String} session.token
    * @param {Object} session.subscriber
    * @param {String} session.subscriber.subscriberId
    * @description
    * * Get user free units (your quota for the month)
    * * provide a valid session object from userAuthenticate method
    * @returns {Promise<FreeUnit[]>} user free units
    * @example const freeUnits = await WeApi.getFreeUnits(session)
    * const freeUnits = await WeApi.getFreeUnits(await WeApi.userAuthenticate('02-2312-3456', 'yourPassword')
    */
   static async getFreeUnits(session) {
      if (
         !session?.uToken ||
         !session?.token ||
         !session?.subscriber?.subscriberId
      )
         throw new WeApiError(
            'Invalid session provided',
            'WE_INVALID_SESSION',
            {
               session,
            }
         )

      const res = await api
         .post(
            '/echannel/service/besapp/base/rest/busiservice/cz/cbs/bb/queryFreeUnit',
            {
               subscriberId: session.subscriber.subscriberId,
            },
            {
               headers: {
                  csrftoken: session.token,
                  cookie: `indiv_login_token=${session.uToken}`,
               },
            }
         )
         .catch(weErrorHandler)

      return responseHandler(res)
   }
}

module.exports = WeApi
