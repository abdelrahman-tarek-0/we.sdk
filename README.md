# We Api

we.api is an open source package for JavaScript that acts as an Api or an SDK for We Telecom Egypt (We TE) website <br />
due to cors errors this package is not working on the browser but it works on nodejs

# DECLAIMER

⚠️⚠️⚠️⚠️⚠️⚠️⚠️<br/>
**THIS PACKAGE IS NOT ASSOCIATED WITH WE TELECOM EGYPT IN ANY WAY, SHAPE OR FORM WHATSO EVER** <br />
**IT JUST BASED ON THE PUBLIC API THAT "WE TE" PROVIDES ON THERE WEBSITE** <br/>

**هذه المشروع ليس له اي علاقة نهائيا بشركة we**<br />
**المشروع ببساطة مبني علي الapi المتاح من خلال موقع we فقط وليس لwe اي علاقة بهاذا المشروع** <br/>
⚠️⚠️⚠️⚠️⚠️⚠️⚠️<br/>

# Installation

```bash
npm install we.api
```

```bash
yarn add we.api
```

# Usage

```javascript
const { WeApi } = require('we.api')

const main = async (number, password) => {
   const session = await WeApi.userAuthenticate(number, password)
   const balance = await WeApi.getBalance(session)
   const quota = await WeApi.getFreeUnits(session)

   console.log(JSON.stringify(session, null, 2))
   console.log(JSON.stringify(balance, null, 2))
   console.log(JSON.stringify(quota, null, 2))
}

main(process.argv[2], process.argv[3])
```

# Todo List
- [x] userAuthenticate - login user with phone number and password
- [x] getBalance - get user balance
- [x] getBalanceInfo - get user balance info
- [ ] checkIfCanRenew - check if user can renew his main subscription
- [ ] renewMainSubscription - renew user main subscription
- [ ] ApiCashing version

# Methods

## userAuthenticate

`WeApi.userAuthenticate(number: string, password: string): Promise<Session>`

```javascript
const session = await WeApi.userAuthenticate(number, password)
```

| parameter | type   | required | example    | note                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | ------ | -------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number    | string | yes      | 0223123456 | It can be in any valid Egyptian landline number <br>ex: +20223123456, 0020223123456,+20-2-2312-3456, 68-312-3456, 02-2312-3456<br>any Egyptian number that can be parsed with [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) is valid<br>you can check the logic behind it in [phoneParser.js](https://github.com/abdelrahman-tarek-0/we.api/blob/master/lib/utils/phoneParser.js) |
| password  | string | yes      | myPassword | Your WE TE account password (this is not being stored, sent, or modified in any sort)                                                                                                                                                                                                                                                                                                                    |

return: Promise<[Session](#userresponse-session)>

## getBalance

`WeApi.getBalance(session: Session): Promise<UserBalanceInfo>`

```javascript
const balance = await WeApi.getBalance(session)
```

| parameter | type   | required | example | note |
| --------- | ------ | -------- | ------- | ---- |
| session   | [Session](#userresponse-session) | yes      |         | only parts needed from the [Session](#userresponse-session) Object not all <br />  for more details check the input from more info check the method input [here](https://github.com/abdelrahman-tarek-0/we.api/blob/master/lib/api.js#L79)  |

return: Promise<[UserBalanceInfo](#userbalanceinfo)>

## getFreeUnits

`WeApi.getFreeUnits(session: Session): Promise<FreeUnit[]>`

```javascript
const quota = await WeApi.getFreeUnits(session)
```

| parameter | type   | required | example | note |
| --------- | ------ | -------- | ------- | ---- |
| session   | [Session](#userresponse-session) | yes      |         | only parts needed from the [Session](#userresponse-session) Object not all <br />  for more details check the input from more info check the method input [here](

return: Promise<[FreeUnit](#freeunit)[]>

# types

## IndividualInfo

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

## Customer

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

## Account

<pre>
/**
 * @typedef {Object} Account
 * @property {string} acctId - The account ID.
 * @property {string} acctCode - The account code.
 * @property {Array} billCycle - The billing cycle information.
 */
</pre>

## Subscriber

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

## UserResponse (session)

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

## BalanceDetail

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

## BalanceInfo

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

## CreditInfo

<pre>
/**
 * @typedef {Object} CreditInfo
 * @property {string} totalCreditAmount - The total credit amount.
 * @property {string} totalUsageAmount - The total usage amount.
 * @property {string} totalRemainAmount - The total remain amount.
 * @property {string} currencyId - The currency ID.
 */
</pre>

## UserBalanceInfo

<pre>
/**
 * @typedef {Object} UserBalanceInfo
 * @property {string} acctId - The account ID.
 * @property {<a href="#balanceinfo">BalanceInfo</a>[]} balanceInfo - The balance information.
 * @property {<a href="#creditinfo">CreditInfo</a>[]} creditInfo - The credit information.
 * @property {Array} outstandingInfo - The outstanding information.
 */
</pre>

## FreeUnitBeanDetail
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

## FreeUnit
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