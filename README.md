# We Api

we.sdk is an open source package for JavaScript that acts as an Api or an SDK for We Telecom Egypt (We TE) website <br />
_can only run in Egypt and with Node.js_ <br />
i am aiming to make this package as robust as possible and to cover all the features that the website provides <br />
please feel free to contribute to this project and make it better <br />

# DECLAIMER

⚠️⚠️⚠️⚠️⚠️⚠️⚠️<br/>
**THIS PACKAGE IS NOT ASSOCIATED WITH WE TELECOM EGYPT IN ANY WAY, SHAPE OR FORM WHATSO EVER** <br />
**IT JUST BASED ON THE PUBLIC API THAT "WE TE" PROVIDES ON THERE WEBSITE** <br/>

**هذا المشروع ليس له اي علاقة نهائيا بشركة we**<br />
**المشروع ببساطة مبني علي الapi المتاح من خلال موقع we فقط وليس لwe اي علاقة بهاذا المشروع** <br/>
⚠️⚠️⚠️⚠️⚠️⚠️⚠️<br/>

# Installation

```bash
npm install we.sdk
```

```bash
yarn add we.sdk
```

# Usage
there are two ways to use this package
1. only using the plain api
2. using the cached api (recommended and optimized)

## Normal API usage

```javascript
const { WeApi, WeApiError } = require('we.sdk')

const main = async (number, password) => {
   try {
      const session = await WeApi.userAuthenticate(number, password)
      const balance = await WeApi.getBalance(session)
      const quota = await WeApi.getFreeUnits(session)

      console.log(JSON.stringify(session, null, 2))
      console.log(JSON.stringify(balance, null, 2))
      console.log(JSON.stringify(quota, null, 2))
   } catch (error) {
      if (error instanceof WeApiError) {
         return console.log('We Api Error:', error.message)
      }
   }
}

main(process.argv[2], process.argv[3])
```

## Cached API usage

````javascript
const { WeCachedApi, WeApiError, CacheProviderInMemory, CacheProviderInFile } = require('we.sdk')

const main = async (number, password) => {
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
   }
}
````


# Todo List

-  [x] userAuthenticate - login user with phone number and password
-  [x] getBalance - get user balance
-  [x] getBalanceInfo - get user balance info
-  [ ] checkIfCanRenew - check if user can renew his main subscription
-  [ ] renewMainSubscription - renew user main subscription
-  [x] ApiCaching version

# Api

## WeApi (class)

```javascript
const { WeApi } = require('we.sdk')
```

### WeApi.userAuthenticate

`WeApi.userAuthenticate(number: string, password: string): Promise<Session>`

```javascript
const session = await WeApi.userAuthenticate(number, password)
```

| parameter | type   | required | example    | note                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | ------ | -------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number    | string | yes      | 0223123456 | It can be in any valid Egyptian landline number <br>ex: +20223123456, 0020223123456,+20-2-2312-3456, 68-312-3456, 02-2312-3456<br>any Egyptian number that can be parsed with [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) is valid<br>you can check the logic behind it in [phoneParser.js](https://github.com/abdelrahman-tarek-0/we.sdk/blob/master/lib/utils/phoneParser.js) |
| password  | string | yes      | myPassword | Your WE TE account password (this is not being stored, sent, or modified in any sort)                                                                                                                                                                                                                                                                                                                    |

Return: Promise<[Session](#userresponse-session)> <br />
Errors: [Possible Errors](#error-codes) <br />

### WeApi.getBalance

`WeApi.getBalance(session: Session): Promise<UserBalanceInfo>`

```javascript
const balance = await WeApi.getBalance(session)
```

| parameter | type                             | required | example | note                                                                                                                                                                                                                                      |
| --------- | -------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| session   | [Session](#userresponse-session) | yes      |         | only parts needed from the [Session](#userresponse-session) Object not all <br /> for more details check the input from more info check the method input [here](https://github.com/abdelrahman-tarek-0/we.sdk/blob/master/lib/api.js#L79) |

Return: Promise<[UserBalanceInfo](#userbalanceinfo)><br />
Errors: [Possible Errors](#error-codes) <br />

### WeApi.getFreeUnits

`WeApi.getFreeUnits(session: Session): Promise<FreeUnit[]>`

```javascript
const quota = await WeApi.getFreeUnits(session)
```

| parameter | type                             | required | example | note                                                                                                                                                                                                                                       |
| --------- | -------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| session   | [Session](#userresponse-session) | yes      |         | only parts needed from the [Session](#userresponse-session) Object not all <br /> for more details check the input from more info check the method input [here](https://github.com/abdelrahman-tarek-0/we.sdk/blob/master/lib/api.js#L120) |

Return: Promise<[FreeUnit](#freeunit)[]> <br />
Errors: [Possible Errors](#error-codes) <br />

## WeCachedApi (class)

```javascript
const { WeCachedApi } = require('we.sdk')
```

### WeCachedApi.constructor

`new WeCachedApi(options: object)`

```javascript
const WeCachedApi = new WeCachedApi({
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
```

| parameter    | type   | required | example | note |
| ------------ | ------ | -------- | ------- | ---- |
| options      | object | yes      |         |      |
| customer     | object | yes      |         |      |
| customer.number | string | yes | 0223123456 | It can be in any valid Egyptian landline number <br>ex: +20223123456, 0020223123456,+20-2-2312-3456, 68-312-3456, 02-2312-3456<br>any Egyptian number that can be parsed with [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) is valid<br>you can check the logic behind it in [phoneParser.js](https://github.com/abdelrahman-tarek-0/we.sdk/blob/master/lib/utils/phoneParser.js) |
| customer.password | string | yes | myPassword | Your WE TE account password (this is not being stored, sent, or modified in any sort) |
| CacheProvider | class | no, default: CacheProviderInMemory  | CacheProviderInFile or CacheProviderInMemory | the class that will be used to cache the data you can create your own cache provider by extending the [CacheProviderInterface](#cacheproviderinterface-interface) and implementing the methods |
| cachePath | string | no, default: './cache.json' | './cache.json' | only needed if you are using CacheProviderInFile |
| ttlInMs | object | no, default: { session: 3.5 * 60 * 60 * 1000, balance: 10 * 60 * 1000, freeUnit: 10 * 60 * 1000 } | { session: 3.5 * 60 * 60 * 1000, balance: 10 * 60 * 1000, freeUnit: 10 * 60 * 1000 } | the time to live for each cached item in milliseconds |
| hooks | object | no | | hooks that will be called before and after the request if not cached |

### WeCachedApi.*
the same as [WeApi](#weapi-class) but with caching

## CacheProviderInMemory (class)
used as a cache provider for the [WeCachedApi](#wecachedapi-class) class

```javascript
const { CacheProviderInMemory } = require('we.sdk')
```

## CacheProviderInFile (class)
used as a cache provider for the [WeCachedApi](#wecachedapi-class) class <br />
requires the `cachePath` parameter in the [WeCachedApi.constructor](#wecachedapiconstructor)

```javascript
const { CacheProviderInFile } = require('we.sdk')
```

## CacheProviderInterface (interface)
used to create your own cache provider for the [WeCachedApi](#wecachedapi-class) class

```javascript
const { CacheProviderInterface } = require('we.sdk')
```



## WeApiError (class) inherits from Error

```javascript
const { WeApiError } = require('we.sdk')
```

-  has the same properties as the Error class
-  has an additional property `code` which is the error code
-  has `name` property set to `WeApiError`

# Error Codes

Accessed by [WeApiError](#weapierror-class-inherits-from-error) instances error.code

```javascript
const { WeApiError } = require('we.sdk')

try {
   // some code
} catch (error) {
   if (error instanceof WeApiError) {
      console.log('We Api Error:', error.message)
      console.log('We Api Error Code:', error.code)
   }
   //or

   if (error.name === 'WeApiError') {
      console.log('We Api Error:', error.message)
      console.log('We Api Error Code:', error.code)
   }
}
```

-  WE_INVALID_CREDENTIALS
-  WE_INVALID_SESSION
-  WE_INVALID_PHONE_NUMBER
-  WE_INVALID_RESPONSE
-  WE_RATE_LIMITED
-  WE_SERVER_ERROR
-  WE_INVALID_CACHE_PROVIDER

# types

### IndividualInfo

<pre>
/**
 * @typedef {Object} IndividualInfo
 * @property {string} firstName - The individual's first name.
 * @property {string} lastName - The individual's last name.
 * @property {string} gender - The individual's gender.
 * @property {string} nationality - The individual's nationality.
 * @property {number} birthday - The individual's birthday timestamp.
*/
</pre>

### Customer

<pre>
/**
 * @typedef {Object} Customer
 * @property {string} custId - The customer ID.
 * @property {string} custName - The customer name.
 * @property {string} custGender - The customer gender.
 * @property {string} custCode - The customer code.
 * @property {string} custType - The customer type.
 * @property {string} custClass - The customer class.
 * @property {<a href="#individualinfo">IndividualInfo</a>} individualInfo - The individual's information.
 * @property {Array} contactPersonList - The list of contact persons.
 * @property {Array} addressInfoList - The list of addresses.
 * @property {Array} serviceManagerInfo - The service manager information.
 * @property {Array} bankCards - The list of bank cards.
*/
</pre>

### Account

<pre>
/**
 * @typedef {Object} Account
 * @property {string} acctId - The account ID.
 * @property {string} acctCode - The account code.
 * @property {Array} billCycle - The billing cycle information.
 */
</pre>

### Subscriber

<pre>
/**
 * @typedef {Object} Subscriber
 * @property {string} subscriberId - The subscriber ID.
 * @property {string} custId - The customer ID.
 * @property {string} accountId - The account ID.
 * @property {string} primaryOfferingId - The primary offering ID.
 * @property {string} servNumber - The service number.
 * @property {string} paymentType - The payment type.
 * @property {string} state - The state.
 * @property {string} statusDetail - The status detail.
 * @property {string} status - The status.
 * @property {string} networkType - The network type.
 * @property {string} firstContactChannel - The first contact channel.
 * @property {string} firstContactNumber - The first contact number.
 * @property {string} writtenLang - The written language.
 * @property {string} voiceRoaming - The voice roaming status.
 * @property {string} smsRoaming - The SMS roaming status.
 * @property {string} dataRoaming - The data roaming status.
 * @property {string} isDelegatorSubs - The delegator subscription status.
 */
</pre>

### UserResponse (session)

<pre>
/**
 * @typedef {Object} UserResponse
 * @property {string} utoken - The user token.
 * @property {string} loginId - The login ID.
 * @property {string} loginType - The login type.
 * @property {string} token - The token.
 * @property {string} uToken - The user token (duplicate).
 * @property {string} needChangePwd - The need to change password status.
 * @property {<a href="#customer">Customer</a>} customer - The customer information.
 * @property {<a href="#account">Account</a>} account - The account information.
 * @property {<a href="#subscriber">Subscriber</a>} subscriber - The subscriber information.
 * @property {Array} ownerList - The list of owners.
 */
</pre>

### BalanceDetail

<pre>
/**
 * @typedef {Object} BalanceDetail
 * @property {string} balanceInstanceId - The balance instance ID.
 * @property {string} amount - The amount.
 * @property {string} initialAmount - The initial amount.
 * @property {number} effectiveTime - The effective time in milliseconds.
 * @property {number} expireTime - The expire time in milliseconds.
 */
</pre>

### BalanceInfo

<pre>
/**
 * @typedef {Object} BalanceInfo
 * @property {string} balanceType - The balance type.
 * @property {string} balanceTypeName - The balance type name.
 * @property {string} totalAmount - The total amount.
 * @property {string} depositFlag - The deposit flag.
 * @property {string} refundFlag - The refund flag.
 * @property {string} currencyId - The currency ID.
 * @property {<a href="#balancedetail">BalanceDetail</a>[]} balanceDetail - The balance detail list.
 */
</pre>

### CreditInfo

<pre>
/**
 * @typedef {Object} CreditInfo
 * @property {string} totalCreditAmount - The total credit amount.
 * @property {string} totalUsageAmount - The total usage amount.
 * @property {string} totalRemainAmount - The total remain amount.
 * @property {string} currencyId - The currency ID.
 */
</pre>

### UserBalanceInfo

<pre>
/**
 * @typedef {Object} UserBalanceInfo
 * @property {string} acctId - The account ID.
 * @property {<a href="#balanceinfo">BalanceInfo</a>[]} balanceInfo - The balance information.
 * @property {<a href="#creditinfo">CreditInfo</a>[]} creditInfo - The credit information.
 * @property {Array} outstandingInfo - The outstanding information.
 */
</pre>

### FreeUnitBeanDetail

<pre>
/**
 * @typedef {Object} FreeUnitBeanDetail
 * @property {number} initialAmount - The initial amount.
 * @property {number} currentAmount - The current amount.
 * @property {string} measureUnit - The measurement unit.
 * @property {number} effectiveTime - The effective time in milliseconds.
 * @property {number} expireTime - The expiration time in milliseconds.
 * @property {number} expireTimeCz - The expiration time in another timezone in milliseconds.
 * @property {string} originType - The origin type.
 * @property {string} offeringName - The offering name.
 * @property {boolean} isGroup - Is group flag.
 * @property {string} serviceNumber - The service number.
 * @property {string} itemCode - The item code.
 * @property {number} remainingDaysForRenewal - The remaining days for renewal.
 */
</pre>

### FreeUnit

<pre>
/**
 * @typedef {Object} FreeUnit
 * @property {string} tabId - The tab ID.
 * @property {string} freeUnitType - The free unit type.
 * @property {string} freeUnitTypeName - The free unit type name.
 * @property {string} tabName - The tab name.
 * @property {string} measureUnit - The measurement unit.
 * @property {string} offerName - The offer name.
 * @property {number} total - The total amount.
 * @property {number} used - The used amount.
 * @property {number} remain - The remaining amount.
 * @property {number} actualRemain - The actual remaining amount.
 * @property {number} effectiveTime - The effective time in milliseconds.
 * @property {number} expireTime - The expiration time in milliseconds.
 * @property {string} groupOrder - The group order.
 * @property {string} iconImage - The icon image.
 * @property {string} freeUnitTypeId - The free unit type ID.
 * @property {string} originUnit - The origin unit.
 * @property {<a href="#freeunitbeandetail">FreeUnitBeanDetail</a>[]} freeUnitBeanDetailList - The list of free unit bean details.
 */
</pre>

# Contributing
this project is open for contributions, feel free to open an issue or a pull request <br />
you can complete the todo list or add new features, optimize the code, or fix bugs <br />
make sure you write the code as clean as possible and add comments <br />

# License
MIT