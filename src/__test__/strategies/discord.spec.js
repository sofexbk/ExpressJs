const DiscordUser = require('../../database/schemas/DiscordUser');
const {discordVerifyFunction}=require('../../strategies/discord')


/*jest.mock('../../strategies/discord',()=>{
    findOne:jest.fn()
})*/
jest.mock('../../database/schemas/DiscordUser')


const accessToken='123';
const refreshToken='456'
const profile={
    id:'23264',
}
const done=jest.fn((x)=>x)


//first we gonna mock the findOne

describe('Discord Verify Function',()=>{
    it('should return user if found',async()=>{
        const mockedUser={
            id:'id_123',
            discordId:'profile.id',
            createdAt:new Date()
        }
        DiscordUser.findOne.mockResolvedValueOnce(mockedUser)
        await discordVerifyFunction(accessToken,refreshToken,profile,done);
        expect(DiscordUser.findOne).toHaveBeenCalledWith({discordId:profile.id})
        expect(done).toHaveBeenCalledWith(null,mockedUser);
    })
    it('should create user && return if not found',async()=>{
        const newProfile={
            id:'123',
        }
        const newUser={
            id:1,
            discordId:'123',
            createdAt:new Date(),
        }
        DiscordUser.create.mockResolvedValueOnce(newUser)
        DiscordUser.findOne.mockImplementationOnce(()=>undefined)
        await discordVerifyFunction(accessToken,refreshToken,newProfile,done);
        expect(DiscordUser.findOne).toHaveBeenCalledWith({discordId:newProfile.id})
        expect(DiscordUser.findOne).toHaveReturnedWith(undefined)
        expect(DiscordUser.create).toHaveBeenCalledWith({discordId:'123'})
    })
}) 