const express = require('express');
const ItemsRoute=require('./routes/items')


const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());
//{ extended: true }
app.use((req,res,next)=>{
  console.log(`${req.method}:${req.url}`);
  next();
 })
app.listen(PORT, () => console.log(`Running Express server on port ${PORT}!`));







