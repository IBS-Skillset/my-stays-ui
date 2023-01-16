import axios from 'axios'
import { IFormInputs } from '../../pages/sign-up/SignUp'
import APIConstants from '../constants/APIConstants'

class CreateAccountService {
  getCreateAccount(data: IFormInputs) {
    const createInstance = axios.create()
    return createInstance.post(
      APIConstants.CREATE_ACCOUNT_URL,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export default new CreateAccountService()
