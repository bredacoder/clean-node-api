import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@infra/db/mongodb/helpers/mongo-helper'
import app from '@main/config/app'
import { sign } from 'jsonwebtoken'
import env from '@main/config/env'
import console from 'console'

let surveyCollection: Collection
let accountCollection: Collection
describe('Survey Routes', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')

    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              image: 'http://image-name.com',
              answer: 'Answer 1',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: '123',
        role: 'admin',
      })

      const id = result.insertedId

      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            accessToken,
          },
        },
      )

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              image: 'http://image-name.com',
              answer: 'Answer 1',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(204)
    })
  })
})
