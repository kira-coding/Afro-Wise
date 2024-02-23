const request = require('supertest')
let server
let phone
const JWT = require('jsonwebtoken')
const config = require('config')
const { Teacher } = require('../../models/users/teacher')
describe('/teacher ', () => {
  let payload
  const exet = async () => {
    return await request(server)
      .post('/teacher/signup')
      .send(payload)
  }
  beforeEach(() => {
    server = require('../../app')
    payload = {
      first_name: 'Teacher',
      middle_name: 'Middle',
      sur_name: 'Last Name',
      email: 'email@example.com',
      password: '12345678',
      gender: 'male',
      user_name: 'username',
      phone: '0910281201'
    }
    phone = '091028281201'
    payload['x-otp-auth-token'] = JWT.sign({ phone: phone }, config.get('JWT-secret-key'))

    })
    
    afterEach(async () => {
        server.close();
        await Teacher.deleteMany({})
    })
    it('signup - GET should return status 200 ', async () => {
        const res = await request(server)
        .get('/teacher/signup')

        expect(res.status).toBe(200)
    })
    describe('signup - POST', () => {

        describe('Name', () => {
            it('Should return 400 if first_name is not provided ', async () => {
                payload.first_name = ''
                const res = await exet();
                expect(res.status).toBe(400)

            })
            it('Should return 400 if middle_name is not provided ', async () => {
                payload.middle_name = ''
                const res = await exet();
                expect(res.status).toBe(400)

            })
            it('Should return 400 if sur_name is not provided ', async () => {
                payload.sur_name = ''
                const res = await exet();
                expect(res.status).toBe(400)

            })
            it('Should return 400 if first_name is less than 3', async () => {
                payload.first_name = 'aa'
                const res = await exet();
                expect(res.status).toBe(400)
            })
            it('Should return 400 if middle_name is less than 3', async () => {
                payload.middle_name = 'aa'
                const res = await exet();
                expect(res.status).toBe(400)
            })
            it('Should return 400 if sur_name is less than 3', async () => {
                payload.sur_name = 'aa'
                const res = await exet();
                expect(res.status).toBe(400)
            })
            it('Should return 400 if first_name is greater than 115 characters', async () => {
                payload.first_name = 'a'.repeat(155)
                const res = await exet();
                expect(res.status).toBe(400)
            })
            it('Should return 400 if middle_name is greater than 155characters', async () => {
                payload.middle_name = 'a'.repeat(155)
                const res = await exet();
                expect(res.status).toBe(400)
            })
            it('Should return 400 if sur_name is greater than 115 characters', async () => {
                payload.sur_name = 'a'.repeat(155)
                const res = await exet();
                expect(res.status).toBe(400)
            })
        })
        describe('email', () => {
            it('Should return 400 if email is not provided', async () => {
                payload.email = '';
                const res = await exet()
                expect(res.status).toBe(400);
            })
            it('Should return 400 if email is not valid', async () => {
                payload.email = '676776hhhh';
                const res = await exet()
                expect(res.status).toBe(400);
            })
        })
        describe('password', () => {
            it('Should return 400 if password is not defined.', async () => {
                payload.password = ''
                const res = await exet()
                expect(res.status).toBe(400);
            })
            it('Should return 400 if password is less than 8 characters.', async () => {
                payload.password = 'aaaa'
                const res = await exet()
                expect(res.status).toBe(400);
            })
        })
        describe('gender', () => {
            it('Should return 400 if gender is not defined.', async () => {
                payload.gender = ''
                const res = await exet()
                expect(res.status).toBe(400);
            })
            it('Should return 400 if gender is niether male nor female', async () => {
                payload.gender = 'not male'
                const res = await exet()
                expect(res.status).toBe(400);
            })
        })
        describe('username', () => {
            it('Should return 400 if user_name is not defined.', async () => {
                payload.gender = ''
                const res = await exet()
                expect(res.status).toBe(400);
            })
            it('Should return 400 if user_name is less than 3 characters.', async () => {
                payload.gender = 'aa'
                const res = await exet()
                expect(res.status).toBe(400);
            })
            it('Should return 403 if user_name is already taken', async () => {
                let teacher = new Teacher(payload)
                await teacher.save()

                const res = await exet()
                expect(res.status).toBe(403);
            })
        })
        describe('Valid input', () => {
            it('Should  Return 200 if valid input is provided.', async () => {
                const res = await exet()
                expect(res.status).toBe(201)

            })
            it('Should create the teacher object ', async () => {
                const res = await exet()
                const object = await Teacher.find({ user_name: payload.user_name })
                expect(object).not.toBeNull()
                expect(object.length).toEqual(1)
                expect(object[0]).toHaveProperty("_id")
                expect(object[0]).toHaveProperty("user_name",payload.user_name)
            })
            it('Should send a  valid json web token', async () => {

                const res = await exet()

                const token = res.header['x_teacher_auth_token']
                console.log(res.header)
                expect(() => { JWT.verify(token, config.get('JWT-secret-key')) }).not.toThrow()
                const object = JWT.verify(token, config.get('JWT-secret-key'))
                expect(object).toHaveProperty('_id');
                expect(object).toHaveProperty('iat');
                expect(object).toHaveProperty('email', payload.email);
            })
        })
    })
    describe('login ',()=>{
        it("Should return 200 for a get request",async()=>{
            const res = await request(server).get('/teacher/login')
            console.log(res)
            expect(res.status).toBe(200)
        })
        // describe('POST',()=>{
            
        // })
    })
})
