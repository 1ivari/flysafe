import {useState} from 'react'

function PerfTable({aircrafts}) {
    // update calculation in real time THIS DONT WORK
    const bgWeight = document.getElementById('bg2')
    console.log(bgWeight)


    //

    if(!aircrafts || aircrafts.length===0){
        return <p>No aircrafts initialized in database</p>
    }

    const aircraft = aircrafts.filter((aircraft) => aircraft.active===true)[0]
    // console.log(aircraft)

    

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
            <td>{aircraft.basicWeight}</td>
            <td>{Math.ceil(aircraft.arm.bw * aircraft.basicWeight)}</td>
        </tr>
        {/* <!-- row 2 --> */}
        <tr className="hover">
            <th>SEATS 1 & 2</th>
            <td>{aircraft.arm.seat12}</td>
            <td></td>
            <td></td>
        </tr>
        {/* <!-- row 3 --> */}
        <tr className="hover">
            <th>BAGGAGE AREA 1</th>
            <td>{aircraft.arm.baggageArea1}</td>
            <td></td>
            <td>    </td>
        </tr>
       {/* <!-- row 4 --> */}
       <tr className="hover">
            <th>BAGGAGE AREA 2</th>
            <td>{aircraft.arm.baggageArea2}</td>
            <td><input 
                type="text" 
                placeholder="0"
                id="bg2" 
                className="input input-ghost w-full max-w-xs"
                />
            </td>
            <td>    </td>
        </tr>
        {/* <!-- row 5 --> */}
        <tr className="hover">
            <th>ZERO FUEL WEIGHT</th>
            <td></td>
            <td></td>
            <td>    </td>
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