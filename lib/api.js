const axios = require('axios')

const WeApiError = require('./utils/ErrorBuilder.js')
const parsePhone = require('./utils/phoneParser.js')
const {
   responseHandler,
   weErrorHandler,
} = require('./utils/responseHandler.js')

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

/**
 *
 */
class WeApi {
   /**
    * Authenticate user with WE API.
    *
    * @param {string} number - A valid Egyptian landline number (e.g., 0223123456, +20223123456, 0020223123456).
    * @param {string} password - Your WE account password.
    * @returns {Promise<UserResponse>} - A session object.
    * @example
    * const session = await WeApi.userAuthenticate('02-2312-3456', 'yourPassword');
    */
   static async userAuthenticate(number, password) {
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
