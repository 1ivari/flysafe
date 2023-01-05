import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import ProgressSteps from '../components/ProgressSteps'
import ProgressStepsMobile from '../components/ProgressStepsMobile'

// New imports after utils folder created
function OperationalFlightPlanPage() {
	// TODO: dynamic table https://www.pluralsight.com/guides/dynamic-tables-from-editable-columns-in-react-html
	// TODO: https://atomizedobjects.com/blog/react/how-to-render-an-array-of-objects-with-map-in-react/

	const { route, ofp, dispatch, addOfpRow, addPoi, changeItem, changeTas } =
		useContext(AppContext)

	const handleChange = (e) => {
		dispatch({
			type: 'CHANGE_ITEM',
			payload: { name: e.target.name, value: e.target.value, id: e.target.id },
		})
	}

	const handleChangeRecalculate = (e) => {
		// dispatch({
		// 	type: 'CHANGE_TAS',
		// 	payload: { id: e.target.id, value: e.target.value },
		// })
		dispatch({
			type: 'CHANGE_ITEM',
			payload: { name: e.target.name, value: e.target.value, id: e.target.id },
		})
		dispatch({ type: 'RECALCULATE', payload: { id: e.target.id } })
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
							{/* <th>Description</th> */}
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
						{ofp.map((row, idx) => {
							return (
								<tr key={row.key} className='hover'>
									<td>{row.description}</td>
									<td>
										{idx > 0 ? (
											<input
												id={row.key}
												key={row.key}
												value={row.minAlt}
												name='minAlt'
												onChange={(e) => handleChange(e)}
												className='input input-xs text-base max-w-xs w-14'
											/>
										) : (
											'-'
										)}
									</td>
									<td>
										{idx > 0 ? (
											<input
												key={row.key}
												value={row.planAlt}
												name='planAlt'
												onChange={(e) => handleChange(e)}
												className='input input-xs text-base max-w-xs w-14'
											/>
										) : (
											'-'
										)}
									</td>
									<td>
										{idx > 0 ? (
											<input
												id={row.key}
												value={row.tas}
												name='tas'
												onChange={(e) => handleChangeRecalculate(e)}
												className='input input-xs text-base max-w-xs w-14'
											/>
										) : (
											'-'
										)}
									</td>
									<td>
										{idx > 0 ? (
											<input
												id={row.key}
												key={row.key}
												value={row.wind}
												name='wind'
												onChange={(e) => handleChangeRecalculate(e)}
												className='input input-xs text-base max-w-xs w-14'
											/>
										) : (
											'-'
										)}
									</td>
									<td>
										{idx > 0 ? (
											<input
												id={row.key}
												key={row.key}
												value={row.windSpeed}
												name='windSpeed'
												onChange={(e) => handleChangeRecalculate(e)}
												className='input input-xs text-base max-w-xs w-14'
											/>
										) : (
											'-'
										)}
									</td>
									<td>{row.tc.toFixed(0)}</td>
									<td>{row.wca.toFixed(0)}</td>
									<td>{row.th.toFixed(0)}</td>
									<td>{row.var.toFixed(1)}</td>
									<td>{row.mh.toFixed(0)}</td>
									<td>{row.dev}</td>
									<td>{row.ch}</td>
									<td>{row.distInt.toFixed(0)}</td>
									<td>{row.distAcc.toFixed(0)}</td>
									<td>{row.gs.toFixed(0)}</td>
									<td>{row.timeInt.format('HH:mm')}</td>
									<td>{row.timeAcc.format('HH:mm')}</td>
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
