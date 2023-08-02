const User=require('../database/schemas/User')

async function authRegisterContorller(request,response){
    const {email}=request.body;
    const userDB=await User.findOne({ email });
    if(userDB){
     response.status(400).send({msg:'User already exists!'})
    }else{
      const password=hashPassword(request.body.pasword);
      console.log(password)
     const newUser=await User.create({pasword:password,email});
     //newUser.save();
     response.send(201);
    }
}

module.exports={authRegisterContorller} 