const express = require('express');
const cors =require('cors');
const port = process.env.port || 7500;
const app = express();
const corsOptions = {
    origin:['http://localhost:5173',],
    credentials:true
}
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res)=>{
  res.send('xerox is running.....')  
})
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})