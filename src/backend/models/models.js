
const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose')


const userDetails = mongoose.Schema( // creates a schema
    {
        username: {
            type: String,
            required: true,
            unique: true
        },

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
            type: Number,
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