const {Router}=require('express');
const User =require('../database/schemas/User')
const {hashPassword, comparePassword }=require('../utils/helpers');

const router=Router();

const passport =require('passport')


/*router.post('/login',(request,response)=>{
  const{username,pasword}=request.body;
  if(username && pasword){
      if(request.session.user){
        response.send(request.session.user);
      }else{
        request.session.user={
            username,
        };
        response.send(request.session);
    }
  }else response.sendStatus(401);
});*/

//commented just avant passport
/*router.post('/login',async(request,response)=>{
  const{email,pasword}=request.body;
  if(!email||!pasword) return response.send(400);
  const userDB=await User.findOne({email});
  if(!userDB) return response.send(401);
  const isValid=comparePassword(pasword,userDB.pasword);
  if(isValid){
    console.log('Authenticated Successfully');
    request.session.user=userDB;
    return response.send(200);
  }else{
    console.log('Failed to Authenticate');
    return response.send(401);
  }
});*/

//using passport
router.post('/login',passport.authenticate('local'),(req,res)=>{
  console.log('Logged In')
  res.send(200)
})






/*router.get('/login',(request,response)=> {
    response.send('Hello man')
});*/


//before hashing
/*router.post('/register',async(request,response)=>{
 const {username,pasword,email}=request.body;
 const userDB=await User.findOne({$or:[{username},{email}]});
 if(userDB){
  response.status(400).send({msg:'User already exists!'})
 }else{
  const newUser=await User.create({username,pasword,email});
  //newUser.save();
  response.send(201);
 }
});*/

//after hashing
/*router.post('/register',async(request,response)=>{
  const {username,email}=request.body;
  const userDB=await User.findOne({$or:[{username},{email}]});
  if(userDB){
   response.status(400).send({msg:'User already exists!'})
  }else{
    const password=hashPassword(request.body.pasword);
    console.log(password)
   const newUser=await User.create({username,pasword:password,email});
   //newUser.save();
   response.send(201);
  }
 });*/


 router.post('/register',async(request,response)=>{
  const {email}=request.body;
  const userDB=await User.findOne({email});
  if(userDB){
   response.status(400).send({msg:'User already exists!'})
  }else{
    const password=hashPassword(request.body.pasword);
    console.log(password)
   const newUser=await User.create({username,pasword:password,email});
   //newUser.save();
   response.send(201);
  }
 });

//solution found when i added pasword:password
//cue we creating pasword not password so => pasword:password
// we wont unhashe the password , the idea is to save the hashed password, when user want to login then we well hash the credentials given by the user and compared it to the forst hashed password

router.get('/discord',passport.authenticate('discord'),(req,res)=>{
  res.send(200)
})

router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (req,res) => {
  res.send(200)
})


module.exports=router;