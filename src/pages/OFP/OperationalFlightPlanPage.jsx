import React from 'react'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import ProgressSteps from '../../components/ProgressSteps'
import ProgressStepsMobile from '../../components/ProgressStepsMobile'
import { useEffect, useState } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import OriginalTableStyleOFP from './OriginalTableStyleOFP'
import MobileStyleOFP from './MobileStyleOFP'
import OriginalTableStyleBasicData from './OriginalTableStyleBasicData'
import RadioFrequencyTable from './RadioFrequencyTable'

// New imports after utils folder created
function OperationalFlightPlanPage() {
  // TODO: dynamic table https://www.pluralsight.com/guides/dynamic-tables-from-editable-columns-in-react-html
  // TODO: https://atomizedobjects.com/blog/react/how-to-render-an-array-of-objects-with-map-in-react

  const { ofp, dispatch } = useContext(AppContext)

  useEffect(() => {
    console.log('ofp', ofp)
  }, [])

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_ITEM',
      payload: { name: e.target.name, value: e.target.value, id: e.target.id },
    })
  }

  const handleChangeRecalculate = (e) => {
    dispatch({
      type: 'CHANGE_ITEM',
      payload: { name: e.target.name, value: e.target.value, id: e.target.id },
    })
    dispatch({ type: 'RECALCULATE', payload: { id: e.target.id } })
  }

  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  return (
    <>
      <ProgressSteps activePage={4} />

      {isLargeScreen ? (
        <>
          <div className='m-4'>
            <div className='flex justify-between my-4'>
              <OriginalTableStyleBasicData />
            </div>
            <OriginalTableStyleOFP
              ofp={ofp}
              handleChange={handleChange}
              handleChangeRecalculate={handleChangeRecalculate}
            />
            <div className='my-4'>
              <RadioFrequencyTable />
            </div>
          </div>
        </>
      ) : (
        <MobileStyleOFP
          ofp={ofp}
          handleChangeRecalculate={handleChangeRecalculate}
        />
      )}

      <ProgressStepsMobile
        activePage={4}
        nextPage={'/wnb'}
        previousPage={'/weather'}
      />

      {/* <link
				rel='stylesheet'
				type='text/css'
				href='./style/printOfp.css'
				media='print'
			/> */}

      {/* <link
				rel='stylesheet'
				type='text/css'
				href='/path/to/print.css'
				media='print and (url=http://www.example.com/specific-url)'
			/> */}
    </>
  )
}

export default OperationalFlightPlanPage
