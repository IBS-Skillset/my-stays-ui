import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
interface MyFormValues {
  email: string
  fname: string
  lname: string
  phoneNumber: string
  password: string
}
const SignUp: React.FC<MyFormValues> = () => {
  const navigate = useNavigate()
  const [showPassword, hidePasword] = useState(false)
  console.log(showPassword)
  const triggerEyes = () => {
    hidePasword(!showPassword)
  }
  const initialValues: MyFormValues = {
    email: '',
    fname: '',
    lname: '',
    phoneNumber: '',
    password: '',
  }
  return (
    <div className="max-w-lg p-10 m-4 mx-auto">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log(values)
          actions.setSubmitting(false)
          navigate('/signin')
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Invalid email')
            .strict(false)
            .trim()
            .required('*Email is required'),
          fname: Yup.string()
            .max(15, 'Too Long!')
            .strict(false)
            .trim()
            .required('*Firstname is required'),
          lname: Yup.string()
            .max(15, 'Too Long!')
            .strict(false)
            .trim()
            .required('*Lastname is required'),
          phoneNumber: Yup.number()
            .typeError('Enter valid Phone Number')
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(12, 'Enter valid Phone Number'),
          password: Yup.string().required('*Password is required'),
        })}
      >
        {({ errors, touched }) => (
          <Form className="bg-white rounded px-2 pt-2 pb-2 mb-4 max-w-xl">
            <div className="mb-6">
              <h1 className="bg text-3xl font-semibold content-start">
                Create an account
              </h1>
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-semibold mb-2"
                htmlFor="email"
              >
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback text-red-700"
                />
                <Field
                  className="border border-solid border-zinc-500 rounded-md w-full py-2 px-3 text-black placeholder-gray-500 placeholder-opacity-100"
                  name="email"
                  id="email"
                  type="text"
                  placeholder="Email Address"
                />
                <div
                  className={errors.email && touched.email ? 'is-invalid' : ''}
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-semibold mb-2"
                htmlFor="fname"
              >
                <ErrorMessage
                  name="fname"
                  component="div"
                  className="invalid-feedback text-red-700"
                />
                <Field
                  className="border border-solid border-zinc-500 rounded-md w-full py-2 px-3 text-black placeholder-gray-500 placeholder-opacity-100"
                  name="fname"
                  id="fname"
                  type="text"
                  placeholder="First Name"
                />
                <div
                  className={errors.fname && touched.fname ? 'is-invalid' : ''}
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-semibold mb-2"
                htmlFor="lname"
              >
                <ErrorMessage
                  name="lname"
                  component="div"
                  className="invalid-feedback text-red-700"
                />
                <Field
                  className="border border-solid border-zinc-500 rounded-md w-full py-2 px-3 text-black placeholder-gray-500 placeholder-opacity-100"
                  name="lname"
                  id="lname"
                  type="text"
                  placeholder="Last Name"
                />
                <div
                  className={errors.lname && touched.lname ? 'is-invalid' : ''}
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-semibold mb-2"
                htmlFor="phoneNumber"
              >
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="invalid-feedback text-red-700"
                />
                <Field
                  className="border border-solid border-zinc-500 rounded-md w-full py-2 px-3 text-black placeholder-gray-500 placeholder-opacity-100"
                  name="phoneNumber"
                  id="phoneNumber"
                  type="text"
                  placeholder="PhoneNumber"
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-semibold mb-2"
                htmlFor="password"
              >
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback text-red-700"
                />
                <Field
                  className="border border-solid border-zinc-500 rounded-md w-full py-2 px-3 text-black mb-3 placeholder-gray-500 placeholder-opacity-100"
                  name="password"
                  id="password"
                  type={showPassword ? 'text' : 'Password'}
                  placeholder="Password"
                />
                <span
                  role="button"
                  className="flex items-right flex justify-end -mt-9 mr-2 h-4"
                  onClick={() => triggerEyes()}
                  onKeyDown={() => triggerEyes()}
                  tabIndex={0}
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </label>
            </div>
            <div className="flex items-center justify-between mb-2">
              <button
                className="w-full duration-150 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline mt-2"
                type="submit"
              >
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
