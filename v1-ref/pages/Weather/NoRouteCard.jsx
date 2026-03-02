import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NoRouteCard() {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center content-center'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>Forgot to add route!</h2>
          <p>Please add route first so you can see the weather ⛅</p>
          <div className='card-actions justify-end'>
            <button
              className='btn btn-primary'
              onClick={() => navigate('/route')}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
