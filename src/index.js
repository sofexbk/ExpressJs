const express = require('express');
const ItemsRoute=require('./routes/items')
const MarketsRoute=require('./routes/markets')
const cookieParser = require('cookie-parser')
var session = require('express-session')


const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
app.use(session({
  secret: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  resave: false,
  saveUninitialized: false,
 // cookie: { secure: true }
}))

//{ extended: true }
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//{ extended: true }
app.use((req,res,next)=>{
  console.log(`${req.method}:${req.url}`);
  next();
 })

 app.use('/api/v1/myroute',ItemsRoute)
 app.use('/api/v1/markets',MarketsRoute)
 app.listen(PORT, () => console.log(`Running Express server on port ${PORT}!`));







