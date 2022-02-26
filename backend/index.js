const connectToMongo=require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express()
app.use(cors())
const port = 5000
// Available Routes
app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Apni Diary listening on port http://localhost:${port}`)
})