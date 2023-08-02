const {authRegisterContorller}=require('../../controllers/auth')

//fake request
const request={
    body:{
        email:'fake_email',
        password:'fake_password',
    }
}
it('should send a status code of 400 when user exists',()=>{
    authRegisterContorller(request);
})
