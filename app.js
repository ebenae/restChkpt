const { error } = require('console');
const http = require('http');
require('dotenv').config({path: './config/.env'});

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const database = process.env.DATABASE;
const mongoose =require("mongoose")

// app.use(express.json)

mongoose.connect("mongodb://hostname/database")  
 .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error')
  })

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });