const {Router}=require('express');

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



module.exports=router;