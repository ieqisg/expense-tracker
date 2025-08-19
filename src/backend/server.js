const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors')
const userDetails = require('./models/models.js')

app.use(express.json())
app.use(cors())



app.get("/", (req, res) => {
  console.log("server is running on port 3000");
});

app.get('/api/details/exist', async (req, res) => {
  try {
    const { username } = req.query
    
    if(!username) {
      return res.status(400).json({message: "username query is required"})
    }
    const existUsername = await userDetails.exists({ username })
    return res.status(200).json({exists: !!existUsername})

  } catch (error) {
    return res.status(500).json({message})
    
    
  }
})

app.post('/api/details', async (req,res) => {
    try {
        const user_details = await userDetails.create(req.body)
        res.status(200).json(user_details)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

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
