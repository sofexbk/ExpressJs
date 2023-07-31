const passport = require('passport')
const {Strategy} =require('passport-discord')

passport.use(
    new Strategy({
    clientID: '1135212374782124044',
    clientSecret: 'n-75Vuf1DrMjRHM-5TWNl58PPbFrilQO',
    callbackURL: 'http://localhost:3001/api/v1/auth/discord/redirect',
    scope: ['identify'],
}, async (accessToken,refreshToken,profile,done)=>{
    console.log(accessToken,refreshToken)
    console.log(profile)
}
))