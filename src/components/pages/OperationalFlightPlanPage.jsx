import React from 'react'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function OperationalFlightPlanPage() {
	// TODO: dynamic table https://www.pluralsight.com/guides/dynamic-tables-from-editable-columns-in-react-html
	// TODO: https://atomizedobjects.com/blog/react/how-to-render-an-array-of-objects-with-map-in-react/

	const { ofpState, addDescription, addOfpRow } = useContext(AppContext)

	const initOFP = [
		{
			id: 1,
			route: 'EFPO',
			description: 'Pori airport',
			minAlt: 500,
			planAlt: 1000,
			tas: 110,
			wind: 250,
			windSpeed: 25,
		},
		{
			id: 2,
			route: 'EFHK',
			description: 'Hesa airport',
			minAlt: 500,
			planAlt: 1200,
			tas: 125,
			wind: 130,
			windSpeed: 12,
		},
	]

	return (
		<>
			<ProgressSteps activePage={4} />
			<PreviousNextBtn previousPage='/weather' nextPage='/wnb' />
			<h1>Operational Flight Plan</h1>
			<button className='btn' onClick={addOfpRow}>
				päivitä state
			</button>
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
						{ofpState.map((row) => {
							return (
								<tr>
									<td>{row.id}</td>
									<td>{row.description}</td>
									<td>{row.minAlt}</td>
									<td>{row.planAlt}</td>
									<td>{row.tas}</td>
									<td>{row.wind}</td>
									<td>Wind speed</td>
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
