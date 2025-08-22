
const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose')


const userDetails = mongoose.Schema( // creates a schema
    {
        authUserId: {
            type: String,
            required: true,
            unique: true
        },
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

        transactions: [
            {
                type: {
                    type: String,
                    enum: ["Income", "Expenses"],
                    required: true
                },
                category: {
                    type: String,
                    enum: ["Salary", "Gift", "Business", "Freelance", "Investment", "Bills & Utilities", "Food", "Grocery", "Transportation", "Education", "Shopping", "Travel", "Other"],
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                },
                description: {
                    type: String,
                    required: false
                }
            }
        ], 
        default: []
    }

)   
    const details = mongoose.model("details", userDetails)

    module.exports = details; 