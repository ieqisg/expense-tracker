const mongoose = require("mongoose"); //mongodb connection 
const express = require("express"); // makes it easy to build APIs and web servers.
const app = express(); // define routes
const cors = require('cors') // allows communication from frontend to backend
const userDetails = require('./models/models.js'); // import user details from model
const { type } = require("@testing-library/user-event/dist/type/index.js");

app.use(express.json()) // This middleware tells Express to automatically parse JSON request bodies. 
app.use(cors())  // allows communication from frontend to backend


// test if server is running 
app.get("/", (req, res) => {
  console.log("server is running on port 3000");
});

//route/endpoint
app.get('/api/details/exist', async (req, res) => {
  try {
    const { username } = req.query // take the inputted username 
    
    if(!username) { // if no username return bad request "username query is required"
      return res.status(400).json({message: "username query is required"})
    }
    const existUsername = await userDetails.exists({ username }) // checks if the username already exists in the database
    return res.status(200).json({exists: !!existUsername}) // return true if username already exists

  } catch (error) {
    return res.status(500).json({message: error}) // internal server error
    
    
  }
})



app.post('/api/details', async (req,res) => {
    try {
        
        const user_details = await userDetails.create(req.body) // saves new data in the database
        res.status(200).json(user_details) // return ok
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/details/me', async (req,res) => {
  try {
    const { authUserId } = req.query

    if (!authUserId) { return res.status(400).json({message: "AuthuserId is required"})}
    const details = await userDetails.findOne( { authUserId })
    if (!details) { return res.status(404).json({message: "Details not found"})}
    return res.status(200).json(details)
    
  } catch (error) {
    console.error(error)
  }

})

app.patch('/api/transactions/:authUserId', async (req,res) => {
  try {
    const { authUserId } = req.params
    if(!authUserId) return res.status(400).json({message: "AuthuserId is required"})
    
    const { type, category, amount, description } = req.body

    if (!type || !category || !amount) {
            return res.status(400).json({ error: "type, category, and amount are required" });
        }
    const newTransaction = { type, category, amount, description }

    const user_transaction = await userDetails.findOneAndUpdate(
      { authUserId: authUserId},
      {$push: {transactions: newTransaction}},
      {new: true}
    )

    if(!user_transaction) {
      res.status(404).json({message: "User not found"})
    }
    res.status(200).json(user_transaction)
  } catch (error) {
      console.error(error)
  }
})





// connect to database
mongoose
  .connect(
    "mongodb+srv://marctamayo027:9FVNBhvQ8kBfTR6p@database.7znl0ce.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Database"
  )
  .then(() => {
    console.log("Connected to the database");
    app.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  })

  .catch(() => {
    console.log("Failed to connect!");
  });
