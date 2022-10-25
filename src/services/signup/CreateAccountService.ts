import axios from 'axios'
import { IFormInputs } from '../../pages/sign-up/SignUp'

const CREATE_ACCOUNT_URL = 'http://localhost:9192/account/api'

class CreateAccountService {
  getCreateAccount(data: IFormInputs) {
    const createInstance = axios.create()
    return createInstance.post(CREATE_ACCOUNT_URL, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default new CreateAccountService()
