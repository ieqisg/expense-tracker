
const mongoose = require('mongoose')

const userDetails = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },

        lastname: {
            type: String,
            required: true
        },

        date: {
            type: String,
            required: true
        },

        monthlyIncome: {
            type: String,
            required: true
        },

        sourceIncome: {
            type: String,
            required: true
        },
    }

)   
    const details = mongoose.model("details", userDetails)

    module.exports = details;