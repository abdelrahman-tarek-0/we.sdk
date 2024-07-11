/**
 * @typedef {Object} Hooks
 * @property {function(string): void} beforeRequest
 * @property {function(string): void} afterRequest
 */

/**
 * @typedef {Object} TTLInMs
 * @property {number} session
 * @property {number} balance
 * @property {number} freeUnit
 */

/**
 * @typedef {Object} Customer
 * @property {string} number
 * @property {string} password
 */

/**
 * @typedef {Object} Config
 * @property {Customer} customer
 * @property {TTLInMs} ttlInMs
 * @property {CacheProviderInFile | CacheProviderInMemory | CacheProviderInterface} CacheProvider
 * @property {string} cachePath
 * @property {Hooks} hooks
 */

module.exports = {}