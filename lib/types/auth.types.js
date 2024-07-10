/**
 * @typedef {Object} IndividualInfo
 * @property {string} firstName - The individual's first name.
 * @property {string} lastName - The individual's last name.
 * @property {string} gender - The individual's gender.
 * @property {string} nationality - The individual's nationality.
 * @property {number} birthday - The individual's birthday timestamp.
 */

/**
 * @typedef {Object} Customer
 * @property {string} custId - The customer ID.
 * @property {string} custName - The customer name.
 * @property {string} custGender - The customer gender.
 * @property {string} custCode - The customer code.
 * @property {string} custType - The customer type.
 * @property {string} custClass - The customer class.
 * @property {IndividualInfo} individualInfo - The individual's information.
 * @property {Array} contactPersonList - The list of contact persons.
 * @property {Array} addressInfoList - The list of addresses.
 * @property {Array} serviceManagerInfo - The service manager information.
 * @property {Array} bankCards - The list of bank cards.
 */

/**
 * @typedef {Object} Account
 * @property {string} acctId - The account ID.
 * @property {string} acctCode - The account code.
 * @property {Array} billCycle - The billing cycle information.
 */

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

/**
 * @typedef {Object} UserResponse
 * @property {string} utoken - The user token.
 * @property {string} loginId - The login ID.
 * @property {string} loginType - The login type.
 * @property {string} token - The token.
 * @property {string} uToken - The user token (duplicate).
 * @property {string} needChangePwd - The need to change password status.
 * @property {Customer} customer - The customer information.
 * @property {Account} account - The account information.
 * @property {Subscriber} subscriber - The subscriber information.
 * @property {Array} ownerList - The list of owners.
 */

/** @typedef {import('./auth.types.js').UserResponse} UserResponse */