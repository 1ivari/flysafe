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
      <label className='label cursor-pointer'>
        <span className='label-text'>Mercator projection set </span>
        <input
          type='checkbox'
          className='toggle toggle-primary'
          onClick={toggleProjection}
        />
      </label>
    </>
  )
}
