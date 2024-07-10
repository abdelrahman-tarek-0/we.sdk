class WeApiError extends Error {
   constructor(message, code, data) {
      super(message)
      this.code = code
      this.data = data
      this.name = this.constructor.name
   }
}

module.exports = WeApiError
