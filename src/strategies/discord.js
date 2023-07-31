const passport = require('passport')
const {Strategy} =require('passport-discord')
//third part provider
const DiscordUser=require('../database/schemas/DiscordUser')

passport.serializeUser((user,done)=> {
    console.log('Serializing User...')
    console.log(user)
    done(null,user.id)
});
passport.deserializeUser( async (id,done)=>{ // user,done
   console.log('Deserializing User')
   console.log(id);
   try{
     const user=await DiscordUser.findById(id);
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
    clientID: '1135212374782124044',
    clientSecret: 'n-75Vuf1DrMjRHM-5TWNl58PPbFrilQO',
    callbackURL: 'http://localhost:3001/api/v1/auth/discord/redirect',
    scope: ['identify'],
},
   async (accessToken,refreshToken,profile,done)=>{
    console.log(accessToken,refreshToken)
    console.log(profile)
    try {
        const discordUser=await DiscordUser.findOne({
            discordId:profile.id
        })
    if(discordUser){
        console.log(`Found User :${discordUser}`)
        return done(null,discordUser)
    }else{
        const newUser=await DiscordUser.create({
          discordId:profile.id,
        })
        console.log(`Created User :${discordUser}`)
        return done(null,newUser)
    }  
    } catch (err) {
        console.log(err)
        return done(err,null)
    }

}
))