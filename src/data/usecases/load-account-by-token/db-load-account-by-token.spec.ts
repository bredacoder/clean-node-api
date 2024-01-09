import { Decrypter } from '@data/protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './load-account-by-token'

const makeSut = (): any => {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub,
  }
}

const makeDecrypter = (): any => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

describe('DbLoadAccountByToken', () => {
  test('Should call Decrypter with correct values', () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
