import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import './SignUp.scss'
interface IFormInputs {
  email: string
  fname: string
  lname: string
  phoneNumber: string
  password: string
}
const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('*Email is required'),
  fname: Yup.string()
    .max(15, 'Too Long!')
    .matches(/^[aA-zZ\s]+$/, 'Please enter valid name')
    .required('*Firstname is required'),
  lname: Yup.string()
    .max(15, 'Too Long!')
    .matches(/^[aA-zZ\s]+$/, 'Please enter valid name')
    .required('*Lastname is required'),
  password: Yup.string().required('*Password is required'),
})
const SignUp: React.FC<IFormInputs> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })
  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    if (data.phoneNumber.length < 12) {
      window.alert('Please enter contact number with country code')
    }
    if (
      !(data.phoneNumber.length < 12) &&
      !(
        data.email === '' ||
        data.fname === '' ||
        data.lname === '' ||
        data.password === ''
      )
    ) {
      navigate('/signin')
    }
    console.log(data)
  }
  const [showPassword, hidePasword] = useState(false)
  const triggerEyes = () => {
    hidePasword(!showPassword)
  }
  const navigate = useNavigate()
  //const [phoneNumber , setPhoneNumber ] = useState('')
  return (
    <div className="content">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="bg-white rounded px-2 pt-2 pb-2 max-w-xl"
      >
        <div className="form">
          <h1 className="bg text-3xl font-semibold content-start">
            Create an account
          </h1>
        </div>
        <div className="form">
          <label className="label" htmlFor="email">
            {errors.email && errors.email?.message && (
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
            {errors.fname && errors.fname?.message && (
              <span className="errorMsg">{errors.fname.message}</span>
            )}
            <input
              className="inputField"
              id="fname"
              type="text"
              placeholder="First Name"
              {...register('fname')}
            />
          </label>
        </div>
        <div className="form">
          <label className="label" htmlFor="lname">
            {errors.lname && errors.lname?.message && (
              <span className="errorMsg">{errors.lname.message}</span>
            )}
            <input
              className="inputField"
              id="lname"
              type="text"
              placeholder="Last Name"
              {...register('lname')}
            />
          </label>
        </div>
        <div className="form">
          <label className="label" htmlFor="phoneNumber">
            {errors.phoneNumber && errors.phoneNumber?.message && (
              <span className="errorMsg">{errors.phoneNumber.message}</span>
            )}
            <input
              className="inputField"
              id="phoneNumber"
              type="number"
              placeholder="PhoneNumber"
              {...register('phoneNumber')}
            />
          </label>
        </div>
        <div className="form">
          <label className="label" htmlFor="password">
            {errors.password && errors.password?.message && (
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
              className="flex items-right flex justify-end -mt-6 mr-2 h-4"
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
