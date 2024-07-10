const axios = require('axios')

const WeApiError = require('./utils/ErrorBuilder.js')
const parsePhone = require('./utils/phoneParser.js')
const {
   responseHandler,
   weErrorHandler,
} = require('./utils/responseHandler.js')

const api = axios.create({
   baseURL: 'https://my.t222e.eg/',
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
}
