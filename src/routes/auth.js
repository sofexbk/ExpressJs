const {Router}=require('express');
const User =require('../database/schemas/User')


const router=Router();

router.post('/login',(request,response)=>{
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
});

/*router.get('/login',(request,response)=> {
    response.send('Hello man')
});*/

router.post('/register',async(request,response)=>{
 const {username,pasword,email}=request.body;
 const userDB=await User.findOne({$or:[{username},{email}]});
 if(userDB){
  response.status(400).send({msg:'User already exists!'})
 }else{
  const newUser=await User.create({username,pasword,email});
  //newUser.save();
  response.send(201);

 }
});


module.exports=router;