const WeApiError = require('./ErrorBuilder.js')

exports.responseHandler = (res) => {
   const data = res?.data || {}

   if (data?.header?.retCode === '0') return data.body

   if (!data?.header?.retCode) {
      throw new WeApiError(
         'We Server not responding correctly, expected header.retCode to be present',
         'WE_INVALID_RESPONSE',
         data.body
      )
   }

   if (data?.header?.errorNo === '60301023110815002') {
      throw new WeApiError(
         'You got rate limited by We Server, try again later',
         'WE_RATE_LIMITED',
         data.body
      )
   }

   if (data?.header?.errorNo === '60301023110815001') {
      throw new WeApiError(
         'Invalid credentials provided',
         'WE_INVALID_CREDENTIALS',
         data.body
      )
   }

   if (data.header.errorNo === '603010110401111') {
      throw new WeApiError(
         'Invalid session provided',
         'WE_INVALID_SESSION',
         data.body
      )
   }

   if (data.header.errorNo === '603010110400003') {
      throw new WeApiError(
         'Invalid subscriberId provided from session',
         'WE_INVALID_SESSION',
         data.body
      )
   }

   throw new WeApiError(
      'We Server returned an error',
      'WE_SERVER_ERROR',
      data.body
   )
}

exports.weErrorHandler = (e) => {
   if (e?.request)
      throw new WeApiError(
         'We Server is not responding correctly, expected 200 status code',
         'WE_SERVER_ERROR',
         e?.response?.data
      )

   throw e
}
