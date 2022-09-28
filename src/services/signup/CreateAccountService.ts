import axios from 'axios'
import { IFormInputs } from '../../pages/sign-up/SignUp'

const CREATE_ACCOUNT_URL = 'http://localhost:8089/account'

class CreateAccountService {
  getCreateAccount(data: IFormInputs) {
    return axios.post(CREATE_ACCOUNT_URL, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default new CreateAccountService()
