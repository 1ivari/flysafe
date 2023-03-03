import React from 'react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'

import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../../assets/svg/visibilityIcon.svg'

const showPasswordStyle = {
  cursor: 'pointer',
  position: 'absolute',
  top: '5%',
  right: '2%',
  padding: '1rem',
}

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData

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

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timeStamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration.')
    }
  }

  return (
    <>
      <div className='flex h-screen justify-center items-center'>
        <div className='card card-bordered'>
          <div className='card-body'>
            <header>
              <p className='card-title text-slate-900 font-extrabold text-4xl dark:text-white'>
                Sign Up!
              </p>
            </header>

            <main>
              <form onSubmit={onSubmit}>
                <div className=''>
                  <input
                    type='text'
                    className='input input-bordered input-primary my-2'
                    placeholder='Name'
                    id='name'
                    value={name}
                    onChange={onChange}
                  />
                </div>
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

                <div className='flex items-center mt-2'>
                  <p className='font-extrabold text-2xl dark:text-white'>
                    Sign Up
                  </p>
                  <button className='btn btn-primary'>
                    <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                  </button>
                </div>
              </form>

              {/* Google OAuth */}

              <Link to='/signin' className=''>
                Sign In Instead
              </Link>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
