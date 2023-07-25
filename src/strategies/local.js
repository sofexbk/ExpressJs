const passport =require('passport');
const { Strategy } =require('passport-local');;
const User=require('../database/schemas/User');
const {comparePassword} =require('../utils/helpers');

passport.serializeUser((user,done)=> {
    console.log('Serializing User...')
    console.log(user)
    done(null,user.id)
});
passport.deserializeUser( async (id,done)=>{ // user,done
    console.log('Deserializing User')
   console.log(id);
   try{
     const user=await User.findById(id);
     if(!user) throw new Error('User not found');
     console.log(user);
     done(null,user);
   }catch(err){
    console.log(err);
    done(err,null);//err, null=> no user
   }
})


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
