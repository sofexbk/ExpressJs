const passport =require('passport')
const { Strategy } =require('passport-local')
const User=require('../database/schemas/User')
const {comparePassword} =require('../utils/helpers')

passport.use(
    new Strategy({
        usernameField:'email',//it consider that the username is the email
    }, 
    async(email,password,done)=>{
       console.log(email);
       console.log(password);
        //done(error,user)
        //done(new Error('Bad request.Missing credentials'),null);
        try {
          if (!email || !password) throw new Error('Bad request.Missing credentials')
         const userDB=await User.findOne({email});
         if (!userDB) throw new Error('User not found');
         const isValid=comparePassword(password,userDB.pasword);
         if(isValid){
         console.log('Authenticated Successfully');
         done(null,userDB)
         }else{
            console.log('Invalid Authentication ')
         done(null,null)
         }
        } catch (err) {
            console.log(err)
         done(err,null)
       }

    })
);
