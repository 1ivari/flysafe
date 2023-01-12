import { FaPlaneDeparture } from 'react-icons/fa'
import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'
import FmiDataProviderV2 from './FmiDataProviderV2'

function Drawer(props) {
  const { drawerOpen, setDrawerOpen } = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <>
      {/* drawer-height is set in index-css. Reason is to prevent overflow due to drawer fitting under navbar */}
      <div className='drawer drawer-height'>
        <input
          id='my-drawer'
          type='checkbox'
          className='drawer-toggle'
          checked={drawerOpen}
        />
        <div className='drawer-content'>{props.children}</div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer' className='drawer-overlay'></label>
          <ul className='menu p-4 w-80 bg-base-100 text-base-content text-center'>
            <li className='mb-2'>
              <a className='' onClick={() => navigate('/')}>
                🏠 Home
              </a>
            </li>
            <hr />
            {props.drawerContent}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Drawer
