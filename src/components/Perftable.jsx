import { useState } from 'react'

function PerfTable({ aircrafts }) {
  // Create hooks
  const [seatWeight, setSeatWeight] = useState(0)
  const handleSeatWeightChange = (e) => {
    setSeatWeight(e.target.value)
  }

  const [baggageWeight1, setBaggageWeight1] = useState(0)
  const handleBaggageWeight1Change = (e) => {
    setBaggageWeight1(e.target.value)
  }

  const [baggageWeight2, setBaggageWeight2] = useState(0)
  const handleBaggageWeight2Change = (e) => {
    setBaggageWeight2(e.target.value)
  }

  const [fuelWeight, setfuelWeight] = useState(0)
  const handlefuelWeightChange = (e) => {
    setfuelWeight(e.target.value)
  }

  // Bring in aircraft data
  if (!aircrafts || aircrafts.length === 0) {
    return <p>No aircrafts initialized in database</p>
  }

  const aircraft = aircrafts.filter((aircraft) => aircraft.active === true)[0]

  //  Create helper variables
  // zero fuel weight
  const momBW = Math.ceil(aircraft.arm.bw * aircraft.basicWeight)
  const momSeat = Math.ceil(aircraft.arm.seat12 * seatWeight)
  const momBag1 = Math.ceil(aircraft.arm.baggageArea1 * baggageWeight1)
  const momBag2 = Math.ceil(aircraft.arm.baggageArea2 * baggageWeight2)
  const ZFW =
    parseInt(aircraft.basicWeight) +
    parseInt(seatWeight) +
    parseInt(baggageWeight1) +
    parseInt(baggageWeight2)
  const momentZFW = +momBW + +momSeat + +momBag1 + +momBag2
  const armZFW = momentZFW / ZFW

  const momFuel = Math.ceil(aircraft.arm.fuel * fuelWeight)

  const rampWeight = +ZFW + +fuelWeight
  const rampMom = +momentZFW + +momFuel
  const rampArm = rampMom / rampWeight

  const taxiFuel = 5
  const toWeight = rampWeight - taxiFuel
  const toMom = rampMom - aircraft.arm.fuel * taxiFuel
  const toArm = toMom / toWeight

  return (
    <>
      <div class='drawer drawer-mobile'>
        <input id='my-drawer-2' type='checkbox' class='drawer-toggle' />
        <div class='drawer-content flex flex-col items-center justify-center'>
          {/* Page content here */}
          <label
            for='my-drawer-2'
            class='btn btn-primary drawer-button lg:hidden'
          >
            Open drawer
          </label>
        </div>
        <div class='drawer-side'>
          <label for='my-drawer-2' class='drawer-overlay'></label>
          <div class='menu p-4 overflow-y-auto w-auto bg-base-100 text-base-content'>
            {/* <div className='container-md '> */}
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
                        onChange={handleSeatWeightChange}
                        value={Number(seatWeight)}
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
                        onChange={handleBaggageWeight1Change}
                        value={Number(baggageWeight1)}
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
                        onChange={handleBaggageWeight2Change}
                        value={Number(baggageWeight2)}
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
                        onChange={handlefuelWeightChange}
                        value={Number(fuelWeight)}
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
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default PerfTable
