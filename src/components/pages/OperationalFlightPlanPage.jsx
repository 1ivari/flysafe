import React from 'react'
import { useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext'
import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function OperationalFlightPlanPage() {
	// TODO: dynamic table https://www.pluralsight.com/guides/dynamic-tables-from-editable-columns-in-react-html
	// TODO: https://atomizedobjects.com/blog/react/how-to-render-an-array-of-objects-with-map-in-react/

	const { route, ofpState, addOfpRow, clearOfp, addPoi, changeItem } =
		useContext(AppContext)

	useEffect(() => {
		constructOfp(route)
		route.map((poi, idx) => {
			addPoi(poi, idx)
		})
	}, [])

	const constructOfp = (route) => {
		// only excecute if poi's have not been spread to ofpState (=> state length === 1)
		if (ofpState.length === 1) {
			for (let i = 0; i < route.length - 1; i++) {
				addOfpRow(i + 1)
			}
		}
	}

	const handleChange2 = (e, idx) => {
		changeItem(e.target.name, e.target.value, idx)
	}

	return (
		<>
			<ProgressSteps activePage={4} />
			<PreviousNextBtn previousPage='/weather' nextPage='/wnb' />
			<h1>Operational Flight Plan</h1>

			<div className='flex flex-col justify-center p-6'>
				<table className='table'>
					<thead>
						<tr>
							<th>Route</th>
							<th>Description</th>
							<th>Min Alt</th>
							<th>Plan Alt</th>
							<th>TAS</th>
							<th>Wind</th>
							<th>Wind speed</th>
							<th>Tc</th>
							<th>Wca</th>
							<th>Th</th>
							<th>Var</th>
							<th>Mh</th>
							<th>Dev</th>
							<th>Ch</th>
							<th>Dist Int</th>
							<th>Dist Acc</th>
							<th>Gs</th>
							<th>Time Int</th>
							<th>Time Acc</th>
							<th>Eto/Reto</th>
							<th>Ato</th>
							<th>Fuel Rem Est</th>
							<th>Fuel Rem Act</th>
							<th>Remarks</th>
						</tr>
					</thead>
					<tbody>
						{ofpState.map((row, idx) => {
							return (
								<tr>
									<td>{row.poi.ident}</td>
									<td>{row.poi.name}</td>
									<td>
										<input
											key={row.id}
											value={row.minAlt}
											name='minAlt'
											onChange={(e) => handleChange2(e, idx)}
											className='input input-xs text-base max-w-xs w-14'
										/>
									</td>
									<td>
										<input
											key={row.id}
											value={row.planAlt}
											name='planAlt'
											onChange={(e) => handleChange2(e, idx)}
											className='input input-xs text-base max-w-xs w-14'
										/>
									</td>
									<td>
										<input
											key={row.id}
											value={row.tas}
											name='tas'
											onChange={(e) => handleChange2(e, idx)}
											className='input input-xs text-base max-w-xs w-14'
										/>
									</td>
									<td>
										<input
											key={row.id}
											value={row.wind}
											name='wind'
											onChange={(e) => handleChange2(e, idx)}
											className='input input-xs text-base max-w-xs w-14'
										/>
									</td>
									<td>
										<input
											key={row.id}
											value={row.windSpeed}
											name='windSpeed'
											onChange={(e) => handleChange2(e, idx)}
											className='input input-xs text-base max-w-xs w-14'
										/>
									</td>
									<td>Tc</td>
									<td>Wca</td>
									<td>td</td>
									<td>Var</td>
									<td>Mh</td>
									<td>Dev</td>
									<td>Ch</td>
									<td>Dist Int</td>
									<td>Dist Acc</td>
									<td>Gs</td>
									<td>Time Int</td>
									<td>Time Acc</td>
									<td>Eto/Reto</td>
									<td>Ato</td>
									<td>Fuel Rem Est</td>
									<td>Fuel Rem Act</td>
									<td>Remarks</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default OperationalFlightPlanPage
