const express = require('express')
const cors = require('cors');
const app = express();
const port = 4000
app.use(cors());

const data = [
    {id:1,equation: 'x^7-4'},
]



app.get('/',(req,res)=>{
    res.send(data)
})
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})

