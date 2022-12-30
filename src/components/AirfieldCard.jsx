import React from 'react'
import { useContext } from 'react'
import AppContext from '../context/AppContext'

export default function AirfieldCard(props) {
	const { route, setRoute } = useContext(AppContext)

	const handleDelete = () => {
		console.log('trying to delete key', props.toDelete)
		setRoute(route.filter((item) => item.key !== props.toDelete))
		console.log('tried to delete key', props.toDelete)
		console.log('route is now', route)
	}

	return (
		<div className='alert shadow-lg'>
			<h1>{props.ident}</h1>
			<div>
				<span>{props.name}</span>
			</div>
			<button onClick={handleDelete} className='btn btn-square btn-sm'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			</button>
		</div>
	)
}
