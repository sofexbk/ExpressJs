const {Router}=require('express');

const router=Router();

router.post('/login',(req,res)=>{
  const{username,pasword}=request.body;
  if(username && pasword){
    request.session.username
  }
});



module.exports=router;