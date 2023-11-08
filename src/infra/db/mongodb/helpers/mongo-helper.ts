import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect() {
    await this.client?.close()
    this.client = null
  },

  async isConnected() {
    const db = this.client?.db()

    if (!db) {
      return false
    }

    let res

    try {
      res = await db.admin().ping()
    } catch (err) {
      return false
    }

    return Object.prototype.hasOwnProperty.call(res, 'ok') && res.ok === 1
  },

  async getCollection(name: string): Promise<Collection> {
    const isConnected = await this.isConnected()
    if (!isConnected) {
      await this.connect(this.uri)
    }

    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  },
}
