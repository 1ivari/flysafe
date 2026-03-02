import React from 'react'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'

// 1. Wrap airfield card in a div with a class of 'collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1' DONE

export default function AirfieldCard(props) {
  const { route, setRoute } = useContext(AppContext)

  const handleDelete = () => {
    setRoute(route.filter((item) => item.key !== props.toDelete))
  }

  return (
    <div className='h-8 flex flex-row content-center items-center justify-between w-full p-2 bg-primary shadow-lg text-xs rounded-md'>
      <div>
        {props.ident} - {props.name}
      </div>
      <div>
        <button onClick={handleDelete} className='btn btn-square btn-xs'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
