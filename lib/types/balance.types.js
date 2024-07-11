/**
 * @typedef {Object} BalanceDetail
 * @property {string} balanceInstanceId - The balance instance ID.
 * @property {string} amount - The amount.
 * @property {string} initialAmount - The initial amount.
 * @property {number} effectiveTime - The effective time in milliseconds.
 * @property {number} expireTime - The expire time in milliseconds.
 */

/**
 * @typedef {Object} BalanceInfo
 * @property {string} balanceType - The balance type.
 * @property {string} balanceTypeName - The balance type name.
 * @property {string} totalAmount - The total amount.
 * @property {string} depositFlag - The deposit flag.
 * @property {string} refundFlag - The refund flag.
 * @property {string} currencyId - The currency ID.
 * @property {BalanceDetail[]} balanceDetail - The balance detail list.
 */

/**
 * @typedef {Object} CreditInfo
 * @property {string} totalCreditAmount - The total credit amount.
 * @property {string} totalUsageAmount - The total usage amount.
 * @property {string} totalRemainAmount - The total remain amount.
 * @property {string} currencyId - The currency ID.
 */

/**
 * @typedef {Object} UserBalanceInfo
 * @property {string} acctId - The account ID.
 * @property {BalanceInfo[]} balanceInfo - The balance information.
 * @property {CreditInfo[]} creditInfo - The credit information.
 * @property {Array} outstandingInfo - The outstanding information.
 */

module.exports = {}