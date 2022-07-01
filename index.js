const express = require('express')

const cors = require( 'cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000



app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uhdvz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
 try{
     await client.connect();
     console.log('DB connteted')
     const toDoCollection= client.db('to_do').collection('ToDoList')


     //todos show 
     app.get('/todos', async(req, res)=>{
        const query = {};
        const cursor = toDoCollection.find(query);
        const todoList = await cursor.toArray();
        res.send(todoList)

     })

     //todos add
     app.post("/todos", async (req, res)=> {
        const newtodos = req.body;
        const result = await toDoCollection.insertOne(newtodos);
        res.send(result);
      
      });
 }
 finally{

 }

}

run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('Hello todo user')
})

app.listen(port,()=>{

    console.log(`todo app running pn port ${port}`)
})