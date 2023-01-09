import React from 'react'
import { useEffect, useState } from 'react'

function FimDataProvider() {
  const [fmiData, setFmiData] = useState([])

  // Define query parameters
  const height = 5000 // meters
  const timeStep = 60 // minutes
  const numResults = 24 // result rows
  const place = 'helsinki'
  const id = 'fmi::forecast::harmonie::hybrid::point::multipointcoverage'
  const request = 'getFeature'
  const startTimeParameter = new Date()
  const endTimeParameter = new Date(
    startTimeParameter.getTime() + numResults * timeStep * 60 * 1000
  )
  const url = `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=${request}&storedquery_id=${id}&place=${place}&height=${height}&timestep=${timeStep}&starttime=${startTimeParameter.toISOString()}&endtime=${endTimeParameter.toISOString()}`

  const fetchMet = async (url) => {
    // fetch data
    const response = await fetch(url)
    const data = await response.text() // returns typeof string
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
    const endTime = new Date(
      xmlDoc.getElementsByTagName('gml:TimePeriod')[0].childNodes[3].textContent
    ) // gets the actual forecast end time from xml results

    // parse xml results
    // this is rather complicated, but could not find ready made solution for parsing xml results
    // First find elements with tag name gml:doubleOrNilReasonTupleList, this works at least for multipointcoverage
    // Then split the text content of the element by space, filter out empty strings and newlines
    // Then map the array to an object with field names as keys and values from the array
    // Then add time to the object
    // Then filter out null values
    const results = await xmlDoc
      .getElementsByTagName('gml:doubleOrNilReasonTupleList')[0]
      .textContent.split(' ')
      .filter((item) => {
        if (item === '' || item === '\n') {
          return false
        } else return true
      })
      .map((item, idx) => {
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
    setFmiData(results)
  }

  useEffect(() => {
    fetchMet(url)
    console.log(fmiData)
  }, [])

  return (
    <>
      <table className='table table-compact'>
        <tr>
          <th>Time</th>
          <th>Temperature</th>
          <th>Wind direction</th>
          <th>Wind speed</th>
        </tr>
        {fmiData.map((item, idx) => {
          return (
            <tr key={idx}>
              <td>{item.time.toLocaleTimeString('fi')}</td>
              <td>{item.Temperature}</td>
              <td>{item.WindDirection}</td>
              <td>{item.WindSpeedMS}</td>
            </tr>
          )
        })}
      </table>
    </>
  )
}

export default FimDataProvider
