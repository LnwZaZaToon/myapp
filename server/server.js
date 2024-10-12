const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
dotenv.config({ path: './server/.env' });

const port = process.env.PORT || 7000
const MONGO_URL = process.env.MONGO_URL
app.use(cors());
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
  })

 mongoose.connect(MONGO_URL).then(()=>{
    console.log("Connected Success")
}).catch((error) => console.log(error))

const data = [
    {id:1,equation: '4x-3',ans:2654},
]


const equationSchema = new mongoose.Schema({
    id: { type: Number },
    equation: { type: String },
});

const Equation = mongoose.model('equation', equationSchema);

app.get('/api/equations', (req, res) => {
  Equation.find().then((data)=>res.send(data))
});


