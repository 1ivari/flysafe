import React from 'react'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import ProgressSteps from '../../components/ProgressSteps'
import ProgressStepsMobile from '../../components/ProgressStepsMobile'
import useMediaQuery from '../../hooks/useMediaQuery'
import OriginalTableStyleOFP from './OriginalTableStyleOFP'
import LocalOFP from './LocalOFP'
import MobileLocalOFP from './MobileLocalOFP'
import MobileStyleOFP from './MobileStyleOFP'
import OriginalTableStyleBasicData from './OriginalTableStyleBasicData'
import RadioFrequencyTable from './RadioFrequencyTable'
import OriginalTableStyleFuel from './OriginalTableStyleFuel'
import OriginalPerfTable from './OriginalPerfTable'
import FmiDataProviderV2 from '../../components/FmiDataProviderV2'
import Drawer from '../../components/Drawer'
import NoOfpCard from './NoOfpCard'

function DrawerContent() {
  const { setOfpLock } = useContext(AppContext)

  function toggleOfpLock(e) {
    if (e.target.checked) {
      setOfpLock(true)
    } else {
      setOfpLock(false)
    }
  }

  return (
    <>
      <li className='mt-2'>
        <FmiDataProviderV2 />
      </li>
      <li>
        <label className='label cursor-pointer'>
          <span className='label-text'>Lock OFP inputs 🔒 </span>
          <input
            type='checkbox'
            className='toggle toggle-primary'
            onClick={toggleOfpLock}
          />
        </label>
      </li>
      <li className='mt-2 menu-title'>
        <h1>Print instructions</h1>
        <h2>Desktop:</h2>
        <p>
          Currently you can print the OFP in table format by simply pressing{' '}
          <kbd className='kbd kbd-xs'>ctrl</kbd> +{' '}
          <kbd className='kbd kbd-xs'>P</kbd>{' '}
        </p>

        <h2>Mobile:</h2>
        <p>
          Tested on Android Chrome: When on OFP page, press the three dots in
          the top right corner. Then, select "Share" and from the share options
          you should find "Print" option. It will print to PDF. Then select
          "landscape" and "A4" Currently the page will be cropped, this need to
          be fixed...
        </p>
      </li>
    </>
  )
}

// New imports after utils folder created
function OperationalFlightPlanPage() {
  const { ofp, dispatch, ofpLock, basicData, setBasicData } =
    useContext(AppContext)

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
    dispatch({
      type: 'RECALCULATE',
      payload: { id: e.target.id },
    })
    dispatch({
      type: 'RECALCULATE_FUEL',
      payload: {
        rampFuel: basicData.rampFuel,
        fuelConsumption: basicData.fuelConsumption,
        taxiFuel: basicData.taxiFuel,
      },
    })
  }

  const handleChangeAll = (e) => {
    const keys = ofp.slice(1).map((row) => {
      return row.key
    })
    keys.forEach((key) => {
      dispatch({
        type: 'CHANGE_ITEM',
        payload: { name: e.target.name, value: e.target.value, id: key },
      })
    })
  }

  const handleChangeAllRecalculate = (e) => {
    const keys = ofp.slice(1).map((row) => {
      return row.key
    })
    keys.forEach((key) => {
      dispatch({
        type: 'CHANGE_ITEM',
        payload: { name: e.target.name, value: e.target.value, id: key },
      })
      dispatch({
        type: 'RECALCULATE',
        payload: { id: key },
      })
    })
    dispatch({
      type: 'RECALCULATE_FUEL',
      payload: {
        rampFuel: basicData.rampFuel,
        fuelConsumption: basicData.fuelConsumption,
        taxiFuel: basicData.taxiFuel,
      },
    })
  }

  const handleRecalculateLocal = (e) => {
    dispatch({
      type: 'CHANGE_ITEM',
      payload: { name: e.target.name, value: e.target.value, id: e.target.id },
    })
    dispatch({
      type: 'RECALCULATE_LOCAL',
      payload: {
        rampFuel: basicData.rampFuel,
        fuelConsumption: basicData.fuelConsumption,
        taxiFuel: basicData.taxiFuel,
      },
    })
  }

  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  return (
    <>
      {ofp.length === 0 ? (
        <>
          <ProgressSteps activePage={4} />
          <NoOfpCard />
        </>
      ) : isLargeScreen ? (
        <>
          <Drawer drawerContent={<DrawerContent />}>
            <ProgressSteps activePage={4} />
            <div className='m-4'>
              <div className='flex justify-between my-4'>
                <OriginalTableStyleBasicData />
              </div>
              <div className='flex justify-center my-4'>
                {basicData.type === 'route' ? (
                  <OriginalTableStyleOFP
                    ofp={ofp}
                    handleChange={handleChange}
                    handleChangeRecalculate={handleChangeRecalculate}
                    handleChangeAll={handleChangeAll}
                    handleChangeAllRecalculate={handleChangeAllRecalculate}
                    ofpLock={ofpLock}
                  />
                ) : (
                  <LocalOFP
                    ofp={ofp}
                    handleChange={handleChange}
                    handleRecalculateLocal={handleRecalculateLocal}
                    ofpLock={ofpLock}
                  />
                )}
              </div>

              <div className='my-4 flex justify-evenly items-center'>
                <div className='grow-0'>
                  <RadioFrequencyTable />
                </div>
                <OriginalPerfTable />
                <OriginalTableStyleFuel
                  ofp={ofp}
                  basicData={basicData}
                  setBasicData={setBasicData}
                  dispatch={dispatch}
                />
              </div>
            </div>
          </Drawer>
        </>
      ) : (
        <>
          <Drawer drawerContent={<DrawerContent />}>
            {basicData.type === 'route' ? (
              <MobileStyleOFP
                ofp={ofp}
                handleChangeRecalculate={handleChangeRecalculate}
                handleChange={handleChange}
                ofpLock={ofpLock}
              />
            ) : (
              <MobileLocalOFP
                ofp={ofp}
                handleChange={handleChange}
                handleRecalculateLocal={handleRecalculateLocal}
              />
            )}

            <div className='my-8 flex justify-center'>
              <OriginalTableStyleFuel
                ofp={ofp}
                basicData={basicData}
                setBasicData={setBasicData}
                dispatch={dispatch}
              />
              <hr />
            </div>
            <div className='my-8  flex justify-center'>
              <OriginalPerfTable />
            </div>
            <div className='my-8 pb-8 flex grow-0 justify-center'>
              <RadioFrequencyTable />
            </div>

            <ProgressStepsMobile
              activePage={4}
              nextPage={'/wnb'}
              previousPage={'/weather'}
            />
          </Drawer>
        </>
      )}

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
