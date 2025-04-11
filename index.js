require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.port || 7500;
const app = express();
const corsOptions = {
  origin: ['http://localhost:5173',],
  credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
// console.log('user->',process.env.DB_USER)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.780sf.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db("xerox");
    const productCollection = database.collection("products");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.post('/products', async(req, res)=>{
      const data = req.body;
      const result = await productCollection.insertOne(data);
      res.send(result);
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('xerox is running.....')
})
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})