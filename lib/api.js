const axios = require('axios')

const parsePhone = require('./lib/utils/phoneParser.js')
const {
   responseHandler,
   weErrorHandler,
} = require('./lib/utils/responseHandler.js')

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