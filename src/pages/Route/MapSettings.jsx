import React from 'react'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'

export default function MapSettings() {
  const { mapSettings, setMapSettings } = useContext(AppContext)

  const toggleProjection = (e) => {
    if (e.target.checked) {
      setMapSettings({ ...mapSettings, projection: 'mercator' })
    } else {
      setMapSettings({ ...mapSettings, projection: 'globe' })
    }
  }

  return (
    <>
      <div className='dropdown dropdown-end'>
        <label tabIndex={0} className='btn'>
          Set
        </label>
        <div
          tabIndex={0}
          className='dropdown-content p-2 bg-base-100 rounded-box w-36'
        >
          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span className='label-text'>Mercator</span>
              <input
                type='checkbox'
                className='toggle'
                onClick={toggleProjection}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
