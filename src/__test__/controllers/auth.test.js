const {authRegisterContorller}=require('../../controllers/auth')
const User=require('../../database/schemas/User')
const {hashPassword} =require('../../utils/helpers')


jest.mock('../../utils/helpers',()=>({
    //hashPassword:jest.fn((x)=>x)
     hashPassword:jest.fn(()=>'hash password')
}))


//mock
jest.mock('../../database/schemas/User')

//fake request
const request={
    body:{
        email:'fake_email',
        pasword:'fake_password',
    }
}
//a error occurs when we dont return a reposnse object so we should:
const response={
    status:jest.fn((x)=>x),
    send:jest.fn((x)=>x),
}
it('should send a status code of 400 when user exists',async()=>{
    User.findOne.mockImplementationOnce(()=>({
        id:1,
        email:'email',
        password:'password'
    }))
    await authRegisterContorller(request,response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
})

//we need  mocking(userfindone) for real test with real data
//in unit tsst we dont need to call database , isolated from other pieces of application


it('should send a status code of 201 when new user is created',async()=>{
  User.findOne.mockResolvedValueOnce(undefined) 
  //hashPassword.mockReturnValueOnce('hash')  after i commented this i recive hash password as a console message
  User.create.mockResolvedValueOnce({
    id:1,
    email:'email',
    pasword:'password'
  })
  await authRegisterContorller(request,response); 
  //assertions
  expect(hashPassword).toHaveBeenCalledWith('fake_password')
  expect(User.create).toHaveBeenCalledWith({
    email:'fake_email',
    pasword:'hash password',
  });
  expect(response.send).toHaveBeenCalledWith(201)
})