
function Perftable() {
  return (
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
            <td></td>
            <td></td>
            <td></td>
        </tr>
        {/* <!-- row 2 --> */}
        <tr className="hover">
            <th>SEATS 1 & 2</th>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        {/* <!-- row 3 --> */}
        <tr className="hover">
            <th>BAGGAGE AREA 1</th>
            <td></td>
            <td></td>
            <td>    </td>
        </tr>
       {/* <!-- row 4 --> */}
       <tr className="hover">
            <th>BAGGAGE AREA 2</th>
            <td><input type="text" placeholder="" class="input input-ghost w-full max-w-xs" /></td>
            <td></td>
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
  )
}

export default Perftable