const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
dotenv.config({ path: './server/.env' });
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const EqRoot1 = require('./models/db');
const IntegralApi = require('./models/dbintegral');
const DiffApi = require('./models/dbdiff');
const GaussApi = require('./models/dbgauss');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'A simple API documentation',
    },
    servers: [
      {
        url: 'http://localhost:4000', 
      },
    ],
  },
  apis: ['./server/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec))


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

// Swagger Documentation for GET /api/equations
/**
 * @swagger
 * /api/equations:
 *   get:
 *     summary: Get equation
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Error
 */
app.get('/api/equations', async (req, res) => {
  try {
      const dataFound = await EqRoot1.find();
      console.log(dataFound); 
      res.send(dataFound);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/Add-equations:
 *   post:
 *     summary: add equation
 *     responses:
 * 
 *       201:
 *         description: Successful
 *       500:
 *         description: Error
 */


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



app.get('/api/Integral', async (req, res) => {
  try {
      const dataFound = await IntegralApi.find();
      console.log(dataFound); 
      res.send(dataFound);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});



app.post('/api/Add-Integral', async (req, res) => {
  console.log('Request Body:', req.body); 
  const { methodType, equation, a, b, n, answer1, answer2 ,err} = req.body;
  try {
      const newEquation = new IntegralApi({
          methodType,
          equation,
          a,
          b,
          n,
          answer1,
          answer2,
          err          
      });
      await newEquation.save();
      res.status(201).json(newEquation);
  } catch (error) {
      console.error('Error saving equation:', error); 
      res.status(500).json({ message: 'Failed to save equation', error: error.message });
  }
});






app.get('/api/Diff', async (req, res) => {
  try {
      const dataFound = await DiffApi.find();
      console.log(dataFound); 
      res.send(dataFound);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});



app.post('/api/Add-Diff', async (req, res) => {
  console.log('Request Body:', req.body); 
  const { methodType, equation, x, h, degree, answer1, answer2 ,err} = req.body;
  try {
      const newEquation = new DiffApi({
          methodType,
          equation,
          x,
          h,
          degree,
          answer1,
          answer2,
          err          
      });
      await newEquation.save();
      res.status(201).json(newEquation);
  } catch (error) {
      console.error('Error saving equation:', error); 
      res.status(500).json({ message: 'Failed to save equation', error: error.message });
  }
});




app.get('/api/Gauss', async (req, res) => {
  try {
      const dataFound = await GaussApi.find();
      console.log(dataFound); 
      res.send(dataFound);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});



app.post('/api/Add-Gauss', async (req, res) => {
  console.log('Request Body:', req.body); 
  const { methodType, equation,size,answer,err,table} = req.body;
  try {
      const newEquation = new GaussApi({
          methodType,
          equation,
          size,
          answer,
          err,
          table      
      });
      await newEquation.save();
      res.status(201).json(newEquation);
  } catch (error) {
      console.error('Error saving equation:', error); 
      res.status(500).json({ message: 'Failed to save equation', error: error.message });
  }
});