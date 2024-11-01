const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
dotenv.config({ path: './server/.env' });
const EqRoot1 = require('./models/db');

const port = process.env.PORT || 7000
const MONGO_URL = process.env.MONGO_URL
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
  })

 mongoose.connect(MONGO_URL).then(()=>{
    console.log("Connected Success")
}).catch((error) => console.log(error))


app.get('/api/equations', async (req, res) => {
  try {
      const dataFound = await EqRoot1.find();
      console.log(dataFound); 
      res.send(dataFound);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.post('/api/Add-equations', async (req, res) => {
  const { methodType, func, xL, xR,table,epsilon,answer} = req.body;
  try {
    const newEquation = new EqRoot1({
      methodType,
      equation: func,
      xl: xL,
      xr: xR,
      table,
      epsilon,
      answer     
    });
    await newEquation.save();
    res.status(201).json(newEquation);
  } catch (error) {
    console.error('Error saving equation:', error); // Log the error details
    res.status(500).json({ message: 'Failed to save equation', error: error.message });
  }
});


