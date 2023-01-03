import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import ProgressSteps from '../components/ProgressSteps'
import ProgressStepsMobile from '../components/ProgressStepsMobile'

// New imports after utils folder created
import haverSineDistance from '../utils/haverSineDistance'
import calcTime from '../utils/calcTime'

function OperationalFlightPlanPage() {
	// TODO: dynamic table https://www.pluralsight.com/guides/dynamic-tables-from-editable-columns-in-react-html
	// TODO: https://atomizedobjects.com/blog/react/how-to-render-an-array-of-objects-with-map-in-react/

	const { route, ofpState, addOfpRow, addPoi, changeItem } =
		useContext(AppContext)

	useEffect(() => {
		constructOfp(route)
		cleanFirstRow()
		route.map((poi, idx) => {
			return addPoi(poi.geoJSON.properties, idx)
		})
	}, [])

	useEffect(() => {
		calcDistance()
	}, [ofpState[ofpState.length - 1].poi.latitude_deg])

	const constructOfp = (route) => {
		// correct: only execute if ofp state.length is different than route.length => there is a change to the route.

		if (ofpState.length != route.length) {
			for (let i = ofpState.length - 1; i < route.length - 1; i++) {
				addOfpRow(i + 1)
			}
		}
	}

	// Set's first row as '-'
	const cleanFirstRow = () => {
		ofpState.map((row, idx) => {
			if (idx === 0) {
				for (const key in row) {
					changeItem(key, '-', idx)
				}
			}
		})
	}

	const handleChange2 = (e, idx) => {
		changeItem(e.target.name, e.target.value, idx)
	}

	const handleChangeTas = (e, idx) => {
		const tas = e.target.value
		changeItem('tas', tas, idx)
		const distInt = ofpState[idx].distInt
		const timeInt = calcTime(tas, 'kt', distInt, 'nm', 'min')
		changeItem('timeInt', timeInt, idx)

		// calculate and set timeAcc
		if (idx > 0) {
			if (idx === 1) {
				changeItem('timeAcc', timeInt, idx)
			} else {
				let prev = Number(ofpState[idx - 1].timeAcc)
				changeItem('timeAcc', prev + timeInt, idx)
			}
		}
	}

	const calcDistance = () => {
		let cumSum = 0
		ofpState.map((row, idx) => {
			if (idx > 0) {
				const dist = haverSineDistance(
					Number(ofpState[idx - 1].poi.longitude_deg),
					Number(ofpState[idx - 1].poi.latitude_deg),
					Number(ofpState[idx].poi.longitude_deg),
					Number(ofpState[idx].poi.latitude_deg)
				)
				changeItem('distInt', dist, idx)
				cumSum = cumSum + dist
				changeItem('distAcc', cumSum, idx)
				console.log('calcd distance')
			}
		})
	}

	return (
		<>
			<ProgressSteps activePage={4} />
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
								<tr key={row.id} className='hover'>
									<td>{row.poi.ident}</td>
									<td>{row.poi.name}</td>
									<td>
										{idx > 0 ? (
											<input
												key={row.id}
												value={row.minAlt}
												name='minAlt'
												onChange={(e) => handleChange2(e, idx)}
												className='input input-xs text-base max-w-xs w-14'
											/>
										) : (
											'-'
										)}
									</td>
									<td>
										{idx > 0 ? (
											<input
												key={row.id}
												value={row.planAlt}
												name='planAlt'
												onChange={(e) => handleChange2(e, idx)}
												className='input input-xs text-base max-w-xs w-14'
											/>
										) : (
											'-'
										)}
									</td>
									<td>
										{idx > 0 ? (
											<input
												key={row.id}
												value={row.tas}
												name='tas'
												onChange={(e) => handleChangeTas(e, idx)}
												className='input input-xs text-base max-w-xs w-14'
											/>
										) : (
											'-'
										)}
									</td>
									<td>
										{idx > 0 ? (
											<input
												key={row.id}
												value={row.wind}
												name='wind'
												onChange={(e) => handleChange2(e, idx)}
												className='input input-xs text-base max-w-xs w-14'
											/>
										) : (
											'-'
										)}
									</td>
									<td>
										{idx > 0 ? (
											<input
												key={row.id}
												value={row.windSpeed}
												name='windSpeed'
												onChange={(e) => handleChange2(e, idx)}
												className='input input-xs text-base max-w-xs w-14'
											/>
										) : (
											'-'
										)}
									</td>
									<td>{row.tc}</td>
									<td>{row.wca}</td>
									<td>{row.th}</td>
									<td>{row.var}</td>
									<td>{row.mh}</td>
									<td>{row.dev}</td>
									<td>{row.ch}</td>
									<td>{row.distInt}</td>
									<td>{row.distAcc}</td>
									<td>Gs</td>
									<td>{row.timeInt}</td>
									<td>{row.timeAcc}</td>
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
			<ProgressStepsMobile
				activePage={4}
				nextPage={'/wnb'}
				previousPage={'/weather'}
			/>
		</>
	)
}

export default OperationalFlightPlanPage
