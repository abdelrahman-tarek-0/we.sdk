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
 * @typedef {Object} CustomerConfig
 * @property {string} number
 * @property {string} password
 */

/**
 * @typedef {Object} Config
 * @property {CustomerConfig} customer
 * @property {TTLInMs} ttlInMs
 * @property {CacheProviderInFile | CacheProviderInMemory | CacheProviderInterface} CacheProvider
 * @property {string} cachePath
 * @property {Hooks} hooks
 */

module.exports = {}