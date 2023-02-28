import React from 'react'
import { useState, useContext } from 'react'
import AppContext from '../context/AppContext'
import constants from '../utils/constants'
import useUpdateEffect from '../hooks/useUpdateEffect'

function FmiDataProviderV2() {
  const [fmiData, setFmiData] = useState({})
  const [loading, setLoading] = useState(false)
  const { ofp, dispatch, basicData } = useContext(AppContext)
  // const [ofpSlice, setOfpSlice] = useState(ofp.slice(1))

  // See for query definitions
  // http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=describeStoredQueries&

  // ------------- UTIL FUNCTIONS -------------
  function xmlParser(data, timeStep) {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(data, 'text/xml')
    let fieldArr = Array.prototype.slice.call(
      xmlDoc.getElementsByTagName('swe:field')
    ) // array for result field names
    let Obj = {} // temporary return object
    let returnObj = {} // final return object
    let numPasses = 0 // count of how many rows have been processed, needed for time calculation in object
    const beginTime = new Date(
      xmlDoc.getElementsByTagName('gml:TimePeriod')[0].childNodes[1].textContent
    ) // gets the actual forecast begin time from xml results
    // const endTime = new Date(
    //   xmlDoc.getElementsByTagName('gml:TimePeriod')[0].childNodes[3].textContent
    // ) // gets the actual forecast end time from xml results

    // parse xml results
    // this is rather complicated, but could not find ready made solution for parsing xml results
    // First find elements with tag name gml:doubleOrNilReasonTupleList, this works at least for multipointcoverage
    // Then split the text content of the element by space, filter out empty strings and newlines
    // Then map the array to an object with field names as keys and values from the array
    // Then add time to the object
    // Then filter out null values
    const results = xmlDoc
      .getElementsByTagName('gml:doubleOrNilReasonTupleList')[0]
      .textContent.split(' ')
      .filter((item) => {
        if (item === '' || item === '\n') {
          return false
        } else return true
      })
      .map((item, idx) => {
        // Handle nan values by simply setting 0
        if (item === 'NaN') {
          item = 0
        }
        Obj = {
          ...Obj,
          [fieldArr[idx % fieldArr.length].attributes.name.textContent]: item,
        }
        if ((idx + 1) % fieldArr.length === 0) {
          returnObj = {
            ...Obj,
            time: new Date(
              beginTime.getTime() + numPasses * timeStep * 60 * 1000
            ),
          }
          Obj = {}
          numPasses++
          return returnObj
        } else return null
      })
      .filter((item) => item !== null)

    return results
  }

  function sourceURLset(coord, planAlt, timeStep) {
    let height = planAlt * constants.FEET_TO_METERS // meters
    if (height < 20) {
      height = 20
    }

    let latlon = `${coord[1].toFixed(2)},${coord[0].toFixed(2)}` // latlon

    const numResults = 5 // result rows
    // const place = 'helsinki'
    const id = 'fmi::forecast::harmonie::hybrid::point::multipointcoverage'
    const request = 'getFeature'
    const startTimeParameter = new Date()
    const endTimeParameter = new Date(
      startTimeParameter.getTime() + numResults * timeStep * 60 * 1000
    )

    const url = `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=${request}&storedquery_id=${id}&latlon=${latlon}&height=${height}&timestep=${timeStep}&starttime=${startTimeParameter.toISOString()}&endtime=${endTimeParameter.toISOString()}`

    return url
  }

  // ------------- END UTIL FUNCTIONS -------------

  const fetchMet = async (planAlt, midCoord, key) => {
    const timeStep = 60 // minutes
    const url = sourceURLset(midCoord, planAlt, timeStep)
    // fetch data
    const response = await fetch(url)
    const data = await response.text() // returns typeof string
    const ress = xmlParser(data, timeStep)
    setFmiData({ key: key, data: ress })
  }

  useUpdateEffect(() => {
    if (fmiData) {
      dispatch({
        type: 'CHANGE_ITEM',
        payload: {
          name: 'windSpeed',
          value: fmiData.data[1].WindSpeedMS * constants.MS_TO_KNOTS,
          id: fmiData.key,
        },
      })
      dispatch({
        type: 'CHANGE_ITEM',
        payload: {
          name: 'wind',
          value: fmiData.data[1].WindDirection,
          id: fmiData.key,
        },
      })
      dispatch({ type: 'RECALCULATE', payload: { id: fmiData.key } })
      dispatch({
        type: 'RECALCULATE_FUEL',
        payload: {
          rampFuel: basicData.rampFuel,
          fuelConsumption: basicData.fuelConsumption,
          taxiFuel: basicData.taxiFuel,
        },
      })
    }
  }, [fmiData.key])

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const handleClick = async () => {
    setLoading(true)
    const ofpSlice = ofp.slice(1)
    for (const item of ofpSlice) {
      await sleep(500)
      fetchMet(item.planAlt, item.midCoord, item.key)
    }
    setLoading(false)
  }

  return (
    <>
      <button
        className={loading ? 'btn btn-primary loading' : 'btn btn-primary'}
        onClick={handleClick}
      >
        Fetch wind from FMI 💨
      </button>
    </>
  )
}

export default FmiDataProviderV2
