import React from 'react'
import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function OperationalFlightPlanPage() {
  // const createRow = () => {
  //   const rowArr = []
  //   for (let i = 1; i < 24; i++) {
  //     let row = React.createElement('div', {}, i)
  //     rowArr.push(row)
  //   }
  //   console.log(rowArr)
  //   console.log('moi')
  //   ReactDOM.render(rowArr, document.getElementById('global'))
  // }

  // createRow()

  return (
    <>
      <ProgressSteps activePage={4} />
      <PreviousNextBtn previousPage='/weather' nextPage='/wnb' />
      <div className='grid grid-cols-24 gap-2 p-10' id='global'>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>
        <div className='bg-neutral'>1</div>

        {/* <input type='number' className='p-2 w-10' /> */}
      </div>
    </>
  )
}

export default OperationalFlightPlanPage
