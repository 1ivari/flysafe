import { useContext } from 'react'
import AppContext from '../context/AppContext.jsx'

// TODO:
// - tallenna taulukon arvot jsoniin flightplan.json
//

function PerfTable() {
	const { aircrafts, aircraftId, wnb, setWnb } = useContext(AppContext)

	// Bring in aircraft data
	if (!aircrafts || aircrafts.length === 0) {
		return <p>No aircrafts initialized in database</p>
	}
	const aircraft = aircrafts.filter(
		(aircraft) => Number(aircraft.id) === Number(aircraftId)
	)[0]

	// Handle change of input
	const handleChange = (e) => {
		setWnb({ ...wnb, [e.target.name]: e.target.value })
		console.log(wnb)
	}

	//  Create helper variables
	// zero fuel weight
	const momBW = Math.ceil(aircraft.arm.bw * aircraft.basicWeight)
	const momSeat = Math.ceil(aircraft.arm.seat12 * wnb.seatWeight)
	const momBag1 = Math.ceil(aircraft.arm.baggageArea1 * wnb.baggageWeight1)
	const momBag2 = Math.ceil(aircraft.arm.baggageArea2 * wnb.baggageWeight2)
	const ZFW =
		parseInt(aircraft.basicWeight) +
		parseInt(wnb.seatWeight) +
		parseInt(wnb.baggageWeight1) +
		parseInt(wnb.baggageWeight2)
	const momentZFW = +momBW + +momSeat + +momBag1 + +momBag2
	const armZFW = momentZFW / ZFW

	const momFuel = Math.ceil(aircraft.arm.fuel * wnb.fuelWeight)

	const rampWeight = +ZFW + +wnb.fuelWeight
	const rampMom = +momentZFW + +momFuel
	const rampArm = rampMom / rampWeight

	const taxiFuel = 5
	const toWeight = rampWeight - taxiFuel
	const toMom = rampMom - aircraft.arm.fuel * taxiFuel
	const toArm = toMom / toWeight

	return (
		<>
			<div className='card shadow-md compact side bg-base-100'>
				<div className='flex-row items-center space-x-4 card-body'>
					<div className='overflow-x-auto'>
						<table className='table text-xs'>
							{/* <!-- head --> */}
							<thead>
								<tr>
									<th>Item</th>
									<th>Arm (in)</th>
									<th>Weight (lbs)</th>
									<th>Moment lbs in</th>
								</tr>
							</thead>
							<tbody>
								{/* <!-- row 1 --> */}
								<tr className='hover'>
									<th>BASIC WEIGHT</th>
									<td>{aircraft.arm.bw}</td>
									<td>{aircraft.basicWeight}</td>
									<td>{momBW}</td>
								</tr>
								{/* <!-- row 2 --> */}
								<tr className='hover'>
									<th>SEATS 1 & 2</th>
									<td>{aircraft.arm.seat12}</td>
									<td>
										<input
											type='number'
											name='seatWeight'
											onChange={handleChange}
											value={Number(wnb.seatWeight)}
											className='input input-xs input-ghost w-full max-w-xs w-14'
										/>
									</td>
									<td>{momSeat}</td>
								</tr>
								{/* <!-- row 3 --> */}
								<tr className='hover'>
									<th>BAGGAGE AREA 1</th>
									<td>{aircraft.arm.baggageArea1}</td>
									<td>
										<input
											type='number'
											name='baggageWeight1'
											onChange={handleChange}
											value={Number(wnb.baggageWeight1)}
											className='input input-xs input-ghost w-full max-w-xs w-14'
										/>
									</td>
									<td>{momBag1}</td>
								</tr>
								{/* <!-- row 4 --> */}
								<tr className='hover'>
									<th>BAGGAGE AREA 2</th>
									<td>{aircraft.arm.baggageArea2}</td>
									<td>
										<input
											type='number'
											name='baggageWeight2'
											onChange={handleChange}
											value={Number(wnb.baggageWeight2)}
											className='input input-xs input-ghost w-full max-w-xs w-14'
										/>
									</td>
									<td> {momBag2}</td>
								</tr>
								{/* <!-- row 5 --> */}
								<tr className='hover'>
									<th>ZERO FUEL WEIGHT</th>
									<td>{Number(armZFW).toFixed(2)}</td>
									<td>{ZFW}</td>
									<td>{momentZFW}</td>
								</tr>
								{/* <!-- row 3 --> */}
								<tr className='hover'>
									<th>FUEL</th>
									<td>{aircraft.arm.fuel}</td>
									<td>
										<input
											type='number'
											name='fuelWeight'
											onChange={handleChange}
											value={Number(wnb.fuelWeight)}
											className='input input-xs input-ghost w-full max-w-xs w-14'
										/>
									</td>
									<td>{momFuel}</td>
								</tr>
								{/* <!-- row 3 --> */}
								<tr className='hover'>
									<th>RAMP WEIGHT</th>
									<td>{rampArm.toFixed(2)}</td>
									<td>{rampWeight}</td>
									<td>{rampMom} </td>
								</tr>
								{/* <!-- row 3 --> */}
								<tr className='hover'>
									<th>TAXI FUEL</th>
									<td>{aircraft.arm.fuel}</td>
									<td>{taxiFuel}</td>
									<td>{aircraft.arm.fuel * taxiFuel}</td>
								</tr>
								{/* <!-- row 3 --> */}
								<tr className='hover'>
									<th>T/O WEIGHT</th>
									<td>{toArm.toFixed(2)}</td>
									<td>{toWeight}</td>
									<td>{toMom} </td>
								</tr>
								{/* <!-- row 3 --> */}
								<tr className='hover'>
									<th>TRIP FUEL</th>
									<td></td>
									<td></td>
									<td> </td>
								</tr>
								{/* <!-- row 3 --> */}
								<tr className='hover'>
									<th>LDG WEIGHT DEST</th>
									<td></td>
									<td></td>
									<td> </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	)
}

export default PerfTable
