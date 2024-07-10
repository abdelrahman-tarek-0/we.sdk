const parsePhoneNumber = require('libphonenumber-js')
const WeAPiError = require('./ErrorBuilder')

const phoneParser = (phone) => {
    const phoneNumber = parsePhoneNumber(phone, 'EG')
    // console.log(phoneNumber.nationalNumber, phoneNumber.isValid(), phoneNumber.nationalNumber.length)

    if (!phoneNumber?.isValid() || phoneNumber?.nationalNumber?.length !== 9) {
        throw new WeAPiError('Invalid Egyptian landline number', "INVALID_PHONE_NUMBER", {
            originalPhone: phone,
            parsedPhone: phoneNumber
        })
    }

    return `FBB${phoneNumber.nationalNumber}`
}

module.exports = phoneParser