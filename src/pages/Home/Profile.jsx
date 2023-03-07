import React from 'react'
import { useState, useEffect } from 'react'

import { getAuth, updateAuth, updateProfile } from 'firebase/auth'
import {
  updateDoc,
  doc,
  addDoc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase.config'

import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

// delete later
import vfrRep from '../../data/vfrRep.json'
import airports from '../../data/Airports.json'
import ifr from '../../data/ifr.json'

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

  // delete later
  // const onDataAdd = async () => {
  //   const arr = Object.entries(ifr.points)
  //   console.log(arr)

  //   const arr2 = []
  //   arr.forEach((item) => {
  //     let doc = item[1]
  //     arr2.push({
  //       geometry: {
  //         coordinates: [doc.lng, doc.lat],
  //         type: 'Point',
  //       },
  //       properties: {
  //         name: doc.name,
  //         routes: doc.routes,
  //         ad: doc.ad,
  //         entry: doc.entry ? doc.entry : null,
  //         arrival: doc.arrival ? doc.arrival : null,
  //         departure: doc.departure ? doc.departure : null,
  //         intermediate: doc.intermediate ? doc.intermediate : null,
  //         exit: doc.exit ? doc.exit : null,
  //       },
  //       type: 'Feature',
  //     })
  //   })

  //   console.log(arr2)

  //   const obj = {
  //     type: 'FeatureCollection',
  //     name: 'waypoints',
  //     crs: {
  //       type: 'name',
  //       properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
  //     },
  //     features: arr2,
  //   }

  //   const obj2 = airspaces
  //   console.log(obj2)

  //   const addData = async () => {
  //     const docRef = await setDoc(doc(db, 'static-map-data', 'airspaces'), obj2)
  //   }

  //   addData()
  // }

  // const getOnClick = async () => {
  //   const q = query(collection(db, 'airports'), where('ident', '==', 'EFHK'))
  //   const qSnap = await getDocs(q)
  //   qSnap.forEach((doc) => console.log(doc.data().type))
  // }

  // const onDataAddAP = () => {
  //   const fiAps = airports.filter((item) => item.iso_country === 'FI')
  //   // console.log(fiAps)

  //   fiAps.forEach((ap) => {
  //     const ident = ap.ident

  //     const url = `${process.env.REACT_APP_AIRPORTDB_URL}${ident}?apiToken=${process.env.REACT_APP_AIRPORTDB_TOKEN}`

  //     fetch(url)
  //       .then((res) => res.json())
  //       .then(async (json) => await setDoc(doc(db, 'airports', ident), json))
  //   })
  // }

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
            {/* // delete later */}
            {/* <button className='btn btn-primary' onClick={onDataAdd}>
              OnDataAdd
            </button> */}

            {/* <button className='btn btn-primary' onClick={onDataAddAP}>
              Submit airport data
            </button> */}
            {/* 
            <button className='btn btn-primary' onClick={getOnClick}>
              Get Data
            </button> */}

            {/* Delete later */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
