import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../../assets/svg/visibilityIcon.svg'

const showPasswordStyle = {
  cursor: 'pointer',
  position: 'absolute',
  top: '3%',
  right: '15%',
  padding: '1rem',
}

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/profile')
      }
    } catch (error) {
      toast.error('Bad User Credentials')
    }
  }

  return (
    <>
      <div className='flex h-screen justify-center items-center'>
        <div className='card card-bordered'>
          <div className='card-body'>
            <header>
              <p className='card-title text-slate-900 font-extrabold text-4xl dark:text-white'>
                Welcome Back!
              </p>
            </header>

            <main>
              <form onSubmit={onSubmit}>
                <input
                  type='email'
                  className='input input-bordered input-primary my-2'
                  placeholder='Email'
                  id='email'
                  value={email}
                  onChange={onChange}
                />
                <div className='passwordInputDiv relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className='input input-bordered input-primary my-2'
                    placeholder='password'
                    id='password'
                    value={password}
                    onChange={onChange}
                  />
                  <img
                    src={visibilityIcon}
                    alt='Show Password'
                    style={showPasswordStyle}
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  />
                </div>

                <Link to='/forgot-password' className='forgotPasswordLink'>
                  <p>Forgot Password</p>
                </Link>

                <div className='flex items-center'>
                  <p className='font-extrabold text-2xl dark:text-white'>
                    Sign In
                  </p>
                  <button className='btn btn-primary'>
                    <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                  </button>
                </div>
              </form>

              {/* Google OAuth */}

              <Link to='/signup' className=''>
                Sign Up Instead
              </Link>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
