import { FaPlaneDeparture } from 'react-icons/fa'
import { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext'
import FmiDataProviderV2 from './FmiDataProviderV2'

function Drawer(props) {
  const { drawerOpen, setDrawerOpen } = useContext(AppContext)
  return (
    <>
      <div className='drawer'>
        <input
          id='my-drawer'
          type='checkbox'
          className='drawer-toggle'
          checked={drawerOpen}
        />
        <div className='drawer-content'>{props.children}</div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer' className='drawer-overlay'></label>
          {props.drawerContent}
        </div>
      </div>
    </>
  )
}

export default Drawer
