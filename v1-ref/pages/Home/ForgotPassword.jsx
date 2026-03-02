import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent!')
    } catch (error) {
      toast.error('Could not send the email.')
    }
  }

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <div className='card card-bordered w-96'>
        <div className='card-body'>
          <header>
            <p className='card-title font-extrabold text-4xl dark:text-white'>
              Forgot Password
            </p>
          </header>

          <form onSubmit={onSubmit}>
            <input
              type='email'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
              className='input input-primary input-bordered'
            />
            <button className='btn btn-primary'>Send Reset Link</button>
          </form>
          <Link to='/signin'>Sign in instead</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
