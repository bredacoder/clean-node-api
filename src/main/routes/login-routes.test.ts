import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@infra/db/mongodb/helpers/mongo-helper'
import app from '@main/config/app'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Daniel',
          email: 'daniel.test@gmail.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login success', async () => {
      const password = await hash('123', 12)

      await accountCollection.insertOne({
        name: 'Daniel',
        email: 'daniel.test@gmail.com',
        password,
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'daniel.test@gmail.com',
          password: '123',
        })
        .expect(200)
    })

    test('Should return 401 if login fails', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'daniel.test@gmail.com',
          password: '123',
        })
        .expect(401)
    })
  })
})
