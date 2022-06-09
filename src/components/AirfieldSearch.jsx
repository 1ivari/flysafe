import { useContext, useState } from 'react'
import AppContext from '../context/AppContext.jsx'
import icao from '../data/icao.json'

function AirfieldSearch() {
	const { route, setRoute } = useContext(AppContext)
	const [ap, setAp] = useState()
	const searchList = []

	const handleSearch = (e) => {
		e.preventDefault()
		setRoute([...route, ap])
		console.log(`route set to ${ap}`)
		console.log(`route looks now like this ${route}`)
	}

	const handleChange = (e) => {
		e.preventDefault()
		const res = icao.filter((ap) =>
			ap.ident.includes(e.target.value.toUpperCase())
		)
		searchList.push(res.slice(0, 5))
		console.log(res.length)
		console.log(searchList[0][0].ident)
		setAp(res)
	}

	return (
		<div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
			<div>
				<form action=''>
					<div className='form-control'>
						<div className='relative'>
							<input
								type='text'
								className='w-full pr-30 bg-gray-200 input input-sm text-black'
								placeholder='Search'
								onChange={handleChange}
							/>
							<button
								className='absolute top-0 right-0 rounded-l-none w-8 btn btn-sm'
								type='submit'
								onClick={handleSearch}>
								Go
							</button>
						</div>
					</div>
				</form>
			</div>
			<div>
				<button className='ml-4 btn btn-ghost btn-sm'>Clear</button>
			</div>

			<div className=''>
				<ul id='result' className='menu'>
					{searchList.map((ap) => {
						return <li key={ap[0][0].ident}>{ap[0][0].name}</li>
					})}
				</ul>
			</div>

			<ul id='result' className='menu'>
				{route.map((ap) => {
					return <li key={ap[0].ident}>{ap[0].name}</li>
				})}
			</ul>
		</div>
	)
}

export default AirfieldSearch
