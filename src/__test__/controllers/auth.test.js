const {authRegisterContorller}=require('../../controllers/auth')
const User=require('../../database/schemas/User')


//mock
jest.mock('../../database/schemas/User')



//fake request
const request={
    body:{
        email:'fake_email',
        password:'fake_password',
    }
}
//a error occurs when we dont return a reposnse object so we should:
const response={
    
}
it('should send a status code of 400 when user exists',async()=>{
    User.findOne.mockImplementationOnce(()=>({id:1,email:'email',password:'password'}))
    await authRegisterContorller(request);
})


//we need  mocking(userfindone) for real test with real data
//in unit tsst we dont need to call database , isolated from other pieces of application