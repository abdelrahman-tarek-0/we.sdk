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
 * @property {FreeUnitBeanDetail[]} freeUnitBeanDetailList - The list of free unit bean details.
 */


module.exports = {}