import React from 'react'
import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function OperationalFlightPlanPage() {
  // TODO: dynamic table https://www.pluralsight.com/guides/dynamic-tables-from-editable-columns-in-react-html

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
