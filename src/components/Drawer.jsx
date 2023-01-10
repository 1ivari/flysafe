import { FaPlaneDeparture } from 'react-icons/fa'
import { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext'

function Drawer() {
  const { drawerOpen, setDrawerOpen } = useContext(AppContext)
  return (
    <>
      <div className='drawer absolute top-0 left-0'>
        <input
          id='my-drawer'
          type='checkbox'
          className='drawer-toggle'
          checked={drawerOpen}
        />
        <div className='drawer-side'>
          <label htmlFor='my-drawer' className='drawer-overlay'></label>
          <ul className='menu p-4 w-80 bg-base-100 text-base-content'>
            {/* <!-- Sidebar content here --> */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Drawer
