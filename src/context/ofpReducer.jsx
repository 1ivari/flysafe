import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import calculateOFP from '../utils/calculateOFP'
import distance from '@turf/distance'
import bearing from '@turf/bearing'
import midpoint from '@turf/midpoint'
import * as geomag from 'geomag'
dayjs.extend(duration)

let OfpRow = {
  key: 0,
  startCoord: [0, 0],
  midCoord: [0, 0],
  endCoord: [0, 0],
  description: '',
  minAlt: '',
  planAlt: '',
  tas: 0,
  wind: 0,
  windSpeed: 0,
  tc: 0,
  wca: 0,
  th: 0,
  declination: 0,
  mh: 0,
  dev: 0,
  ch: 0,
  distInt: 0,
  distAcc: 0,
  gs: 0,
  timeInt: '',
  timeIntRaw: 0,
  timeAcc: '',
  timeAccRaw: 0,
  eto: '',
  ato: '',
  fuelRem: '',
  remark: '',
}

const initialState = []
export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem('localOfp')) || initialValue

export const ofpReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'CLEAR':
      return initialState

    case 'CHANGE_ITEM':
      return state.map((item) =>
        payload.id === item.key
          ? { ...item, [payload.name]: payload.value }
          : item
      )

    case 'RECALCULATE': {
      let sumNum = Number(0)
      return state.map((obj) => {
        if (obj.key === payload.id) {
          // take wind ito account
          const values = calculateOFP(
            obj.tc,
            obj.tas,
            obj.wind,
            obj.windSpeed,
            obj.distInt,
            obj.declination
          )

          sumNum += values.timeIntervalRaw
          return {
            ...obj,
            timeInt: values.timeIntervalDayjs.format('HH:mm'),
            timeAcc: dayjs.duration(sumNum, 'hours').format('HH:mm'),
            wca: values.windCorrectionAngle,
            gs: values.groundSpeed,
            th: values.trueHeading,
            mh: values.magHeading,
          }
        } else {
          if (obj.tas === 0) {
            return { ...obj }
          } else {
            sumNum += obj.distInt / obj.gs
            return {
              ...obj,
              timeAcc: dayjs.duration(sumNum, 'hours').format('HH:mm'),
            }
          }
        }
      })
    }

    case 'ADD_DEPARTURE': {
      return [
        ...state,
        {
          ...OfpRow,
          key: payload.key,
          description: 'DEP => ' + payload.ident,
        },
      ]
    }

    case 'ADD_LEG': {
      return [
        ...state,
        {
          ...OfpRow,
          key: payload.key,
        },
      ]
    }

    case 'DELETE_LEG': {
      return state.filter((item) => item.key !== payload.id)
    }

    case 'CONSTRUCT_FROM_ROUTE':
      {
        const route = payload.obj
        let sumDistance = 0
        let sumTime = 0
        if (route.length > 0) {
          return route.map((poi, i, arr) => {
            const properties = poi.geoJSON.properties
            const desc =
              i > 0
                ? arr[i - 1].geoJSON.properties.ident +
                  ' -> ' +
                  properties.ident
                : 'DEP: ' + properties.ident

            const dist =
              i > 0
                ? Number(
                    distance(arr[i - 1].geoJSON, poi.geoJSON, {
                      units: 'nauticalmiles',
                    })
                  )
                : Number(0)
            sumDistance += dist
            // take the starting point declination as in Marilyn
            const loc =
              i > 0
                ? arr[i - 1].geoJSON.geometry.coordinates
                : poi.geoJSON.geometry.coordinates
            const magVar = geomag.field(loc[1], loc[0])

            const startCoord =
              i > 0
                ? arr[i - 1].geoJSON.geometry.coordinates
                : poi.geoJSON.geometry.coordinates
            const midCoord =
              i > 0
                ? midpoint(
                    arr[i - 1].geoJSON.geometry.coordinates,
                    poi.geoJSON.geometry.coordinates
                  ).geometry.coordinates
                : poi.geoJSON.geometry.coordinates
            const endCoord = poi.geoJSON.geometry.coordinates

            const trueCourse180 =
              i > 0
                ? Number(
                    bearing(arr[i - 1].geoJSON.geometry, poi.geoJSON.geometry)
                  )
                : Number(0)

            const trueCourse360 =
              trueCourse180 < 0 ? trueCourse180 + 360 : trueCourse180

            const tas = 90
            const wind = 0
            const windSpeed = 0

            const values = calculateOFP(
              trueCourse360,
              tas,
              wind,
              windSpeed,
              dist,
              magVar.declination
            )
            sumTime += values.timeIntervalRaw

            return {
              ...OfpRow,
              key: poi.key,
              startCoord: startCoord,
              midCoord: midCoord,
              endCoord: endCoord,
              description: desc,
              distInt: dist,
              distAcc: sumDistance,
              declination: magVar.declination,
              tc: trueCourse360,
              tas: tas,
              timeInt: values.timeIntervalDayjs.format('HH:mm'),
              timeAcc: dayjs.duration(sumTime, 'hours').format('HH:mm'),
              wind: wind,
              windSpeed: windSpeed,
              wca: values.windCorrectionAngle,
              gs: values.groundSpeed,
              th: values.trueHeading,
              mh: values.magHeading,
            }
          })
        } else return initialState
      }

      break
    default:
      return state
  }
}
