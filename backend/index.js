const connectTOMongo = require('./db')
const express = require('express')
let cors = require('cors')


connectTOMongo();

const port=5000;
const app=express();
app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'));


app.listen(port,()=>{
  console.log(`iNotebook app is listining at http://localhost:${port}`)
})


