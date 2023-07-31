const express = require('express');
const ItemsRoute=require('./routes/items')
const MarketsRoute=require('./routes/markets')
const cookieParser = require('cookie-parser')
var session = require('express-session')
const MongoStore=require('connect-mongo')
const authRoute=require('./routes/auth')
require('./database')
const passport=require('passport')
//require('./strategies/local')
require('./strategies/discord')

const app = express();
const PORT = 3001;
//const memoryStore=new session.MemoryStore();


app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())


//responsable sur session && cookies
app.use(session({
  secret: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  resave: false,
  saveUninitialized: false,
 // cookie: { secure: true }
 // store:memoryStore,
 store:MongoStore.create({
  mongoUrl:'mongodb://127.0.0.1:27017/expressjstuto'
 })
}))

//{ extended: true }
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//{ extended: true }

app.use((req,res,next)=>{
  console.log(`${req.method}:${req.url}`);
  next();
 });

 /*app.use((req,res,next)=>{
  console.log(memoryStore);
  next();
 });*/


/*app.use((req,res,next)=>{
  if(req.session.user) next();
  else res.send(401);
});*/



app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/api/v1/auth',authRoute);
 app.use('/api/v1/myroute',ItemsRoute)
 app.use('/api/v1/markets',MarketsRoute)
 

//we can use login route globalyy her or locally in each page e(items,...)

 app.listen(PORT, () => console.log(`Running Express server on port ${PORT}!`));







