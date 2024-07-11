/**
 * @description WE error class
 */
class WeApiError extends Error {
   /**
    * 
    * @param {string} message 
    * @param {string} code 
    * @param {any} data 
    */
   constructor(message, code, data) {
      super(message)
      this.code = code
      this.data = data
      this.name = this.constructor.name
   }
}

module.exports = WeApiError
