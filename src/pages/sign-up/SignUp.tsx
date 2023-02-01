import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import './SignUp.scss'
import CreateAccountService from '../../services/signup/CreateAccountService'
import bcrypt, { hashSync } from 'bcryptjs'
import { useDispatch } from 'react-redux'
import { autoPopulateEmailAction } from '../../store/actions/signUpAction'

export interface IFormInputs {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  password: string
}
const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('*Email is required'),
  firstName: Yup.string()
    .max(15, 'Too Long!')
    .matches(/^[aA-zZ\s]+$/, 'Please enter first name')
    .required('*Firstname is required'),
  lastName: Yup.string()
    .max(15, 'Too Long!')
    .matches(/^[aA-zZ\s]+$/, 'Please enter last name')
    .required('*Lastname is required'),
  password: Yup.string().required('*Password is required'),
  phoneNumber: Yup.number()
    .typeError('Phone number is required')
    .min(100000000000, 'Phone number must be 12 digits with country code')
    .required('Phone number is required'),
})
const SignUp = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })
  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    {
      console.log(data)
      data.password = hashSync(data.password, bcrypt.genSaltSync(10))
      CreateAccountService.getCreateAccount(data)
        .then((response) => {
          if (response.data) {
            dispatch(autoPopulateEmailAction(data.email))
            console.log(response)
            navigate('/signin')
          } else {
            navigate('/signin?svcError=1')
          }
        })
        .catch((error) => {
          console.log(error)
          navigate('/signin?svcError=2')
        })
    }
  }
  const [showPassword, hidePasword] = useState(false)
  const triggerEyes = () => {
    hidePasword(!showPassword)
  }
  const navigate = useNavigate()
  return (
    <div className="content">
      <form onSubmit={handleSubmit(formSubmitHandler)} className="box">
        <div className="form">
          <h1 className="sigup-heading">Create an account</h1>
        </div>
        <div className="form">
          <label className="label" htmlFor="email">
            {errors.email && errors.email.message && (
              <span className="errorMsg">{errors.email.message}</span>
            )}
            <input
              className="inputField"
              id="email"
              type="text"
              placeholder="Email Address"
              {...register('email')}
            />
          </label>
        </div>
        <div className="form">
          <label className="label" htmlFor="fname">
            {errors.firstName && errors.firstName.message && (
              <span className="errorMsg">{errors.firstName.message}</span>
            )}
            <input
              className="inputField"
              id="fname"
              type="text"
              placeholder="First Name"
              {...register('firstName')}
            />
          </label>
        </div>
        <div className="form">
          <label className="label" htmlFor="lname">
            {errors.lastName && errors.lastName.message && (
              <span className="errorMsg">{errors.lastName.message}</span>
            )}
            <input
              className="inputField"
              id="lname"
              type="text"
              placeholder="Last Name"
              {...register('lastName')}
            />
          </label>
        </div>
        <div className="form">
          <label className="label" htmlFor="phoneNumber">
            {errors.phoneNumber && errors.phoneNumber.message && (
              <span className="errorMsg">{errors.phoneNumber.message}</span>
            )}
            <input
              className="inputField"
              id="phoneNumber"
              type="number"
              placeholder="Phone Number"
              {...register('phoneNumber')}
            />
          </label>
        </div>
        <div className="form">
          <label className="label" htmlFor="password">
            {errors.password && errors.password.message && (
              <span className="errorMsg">{errors.password.message}</span>
            )}
            <input
              className="inputField"
              id="password"
              type={showPassword ? 'text' : 'Password'}
              placeholder="Password"
              {...register('password')}
            />
            <span
              role="button"
              className="flex items-right justify-end -mt-6 mr-2 h-4"
              onClick={() => triggerEyes()}
              onKeyDown={() => triggerEyes()}
              tabIndex={0}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </label>
        </div>
        <div className="flex items-center justify-between mb-2">
          <button className="btn-continue">Continue</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
