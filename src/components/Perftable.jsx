import {useState} from 'react'

function PerfTable({aircrafts}) {
    
    // Create hooks
    const [seatWeight, setSeatWeight] = useState(0)
    const handleSeatWeightChange = (e) => {
        setSeatWeight(e.target.value)}

    const [baggageWeight1, setBaggageWeight1] = useState(0)
    const handleBaggageWeight1Change = (e) => {
        setBaggageWeight1(e.target.value)}


    const [baggageWeight2, setBaggageWeight2] = useState(0)
    const handleBaggageWeight2Change = (e) => {
        setBaggageWeight2(e.target.value)
    }

    // Bring in aircraft data
    if(!aircrafts || aircrafts.length===0){
        return <p>No aircrafts initialized in database</p>
    }

    const aircraft = aircrafts.filter((aircraft) => aircraft.active===true)[0]

    //  Create helper variables
    // zero fuel weight
    const momBW = Math.ceil(aircraft.arm.bw * aircraft.basicWeight)
    const momSeat = Math.ceil(aircraft.arm.seat12 * seatWeight)
    const momBag1 = Math.ceil(aircraft.arm.baggageArea1 * baggageWeight1)
    const momBag2 = Math.ceil(aircraft.arm.baggageArea2 * baggageWeight2)
    const ZFW = parseInt(aircraft.basicWeight) + parseInt(seatWeight) + parseInt(baggageWeight1) + parseInt(baggageWeight2)
    const momentZFW = (+momBW + +momSeat + +momBag1 + +momBag2)


    

  return (
 <>     
<div className="container-md ">
    

<div className="overflow-x-auto">
    <table className="table w-full">
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
        <tr className="hover">
            <th>BASIC WEIGHT</th>
            <td>{aircraft.arm.bw}</td>
            <td>{aircraft.basicWeight.toLocaleString('en-US')}</td>
            <td>{momBW.toLocaleString('en-US')}</td>
        </tr>
        {/* <!-- row 2 --> */}
        <tr className="hover">
            <th>SEATS 1 & 2</th>
            <td>{aircraft.arm.seat12}</td>
            <td><input 
                type="text" 
                placeholder="type"
                onChange={handleSeatWeightChange}
                value = {Number(seatWeight).toLocaleString('en-US')}
                className="input input-ghost w-full max-w-xs"
                /></td>
            <td>{momSeat.toLocaleString('en-US')}</td>
        </tr>
        {/* <!-- row 3 --> */}
        <tr className="hover">
            <th>BAGGAGE AREA 1</th>
            <td>{aircraft.arm.baggageArea1}</td>
            <td><input 
                type="text" 
                placeholder="type"
                onChange={handleBaggageWeight1Change}
                value = {Number(baggageWeight1).toLocaleString('en-US')}
                className="input input-ghost w-full max-w-xs"
                /></td>
            <td>{momBag1.toLocaleString('en-US')}</td>
        </tr>
       {/* <!-- row 4 --> */}
       <tr className="hover">
            <th>BAGGAGE AREA 2</th>
            <td>{aircraft.arm.baggageArea2}</td>
            <td><input 
                type="text" 
                placeholder="type"
                onChange={handleBaggageWeight2Change}
                value = {Number(baggageWeight2).toLocaleString('en-US')}
                className="input input-ghost w-full max-w-xs"
                />
            </td>
            <td> {momBag2.toLocaleString('en-US')}</td>
        </tr>
        {/* <!-- row 5 --> */}
        <tr className="hover">
            <th>ZERO FUEL WEIGHT</th>
            <td></td>
            <td>{ZFW.toLocaleString('en-US')}</td>
            <td>{momentZFW.toLocaleString('en-US')}    </td>
        </tr>
        {/* <!-- row 3 --> */}
        <tr className="hover">
            <th>FUEL</th>
            <td></td>
            <td></td>
            <td>    </td>
        </tr>
        {/* <!-- row 3 --> */}
        <tr className="hover">
            <th>RAMP WEIGHT</th>
            <td></td>
            <td></td>
            <td>    </td>
        </tr>
        {/* <!-- row 3 --> */}
        <tr className="hover">
            <th>TAXI FUEL</th>
            <td></td>
            <td></td>
            <td>    </td>
        </tr>
        {/* <!-- row 3 --> */}
        <tr className="hover">
            <th>T/O WEIGHT</th>
            <td></td>
            <td></td>
            <td>    </td>
        </tr>
        {/* <!-- row 3 --> */}
        <tr className="hover">
            <th>TRIP FUEL</th>
            <td></td>
            <td></td>
            <td>    </td>
        </tr>
        {/* <!-- row 3 --> */}
        <tr className="hover">
            <th>LDG WEIGHT DEST</th>
            <td></td>
            <td></td>
            <td>    </td>
        </tr>
        </tbody>
    </table>
</div>
</div>

</>
  )

}


export default PerfTable