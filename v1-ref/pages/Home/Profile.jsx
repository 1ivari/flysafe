import React from 'react'
import { useState, useEffect } from 'react'

import { getAuth, updateAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase.config'

import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update Displayname
        await updateProfile(auth.currentUser, { displayName: name })

        // Update in FireStore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      toast.error('Could not update profile details.')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='card w-96 card-bordered'>
        <div className='card-body'>
          <header>
            <p className='card-title font-extrabold text-4xl dark:text-white'>
              Hi, {formData.name}!
            </p>
          </header>

          <h2>Personal Details:</h2>
          <form>
            <input
              type='text'
              id='name'
              disabled={!changeDetails}
              className='input input-primary my-2'
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              disabled={!changeDetails}
              className='input input-primary my-2'
              value={email}
              onChange={onChange}
            />
          </form>

          <div className='card-actions'>
            <button
              className={
                changeDetails
                  ? 'btn btn-outline btn-success'
                  : 'btn btn-outline btn-primary'
              }
              onClick={() => {
                changeDetails && onSubmit()
                setChangeDetails((prevState) => !prevState)
              }}
            >
              {changeDetails ? 'Save' : 'Change Details'}
            </button>
            <button className='btn btn-primary' onClick={onLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
