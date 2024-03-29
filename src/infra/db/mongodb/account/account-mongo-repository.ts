import { ObjectId } from 'mongodb'
import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
} from '@data/usecases/add-account/db-add-account-protocols'
import { UpdateAccessTokenRepository } from '@data/usecases/authentication/db-authentication-protocols'
import { AccountModel } from '@domain/models/account'
import { AddAccountModel } from '@domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadAccountByTokenRepository } from '@data/protocols/db/account/load-account-by-token-repository'

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository
{
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)
    const createdAccount = await accountCollection.findOne(result.insertedId)
    return MongoHelper.map(createdAccount)
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          accessToken: token,
        },
      },
    )
  }

  async loadByToken(token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{ role }, { role: 'admin' }],
    })

    return account && MongoHelper.map(account)
  }
}
