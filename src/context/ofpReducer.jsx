import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import calculateOFP from '../utils/calculateOFP'
import distance from '@turf/distance'
import bearing from '@turf/bearing'
import * as geomag from 'geomag'
dayjs.extend(duration)

let OfpRow = {
  key: 0,
  poi: {},
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
  timeInt: dayjs.duration(0, 'hours'),
  timeAcc: dayjs.duration(0, 'hours'),
  eto: '',
  ato: '',
  fuelRem: '',
  remark: '',
}

export const initialState = []

const ofpReducer = (state, action) => {
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
      let sum = dayjs.duration(0)
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
          sum = dayjs.duration(sumNum, 'hours')
          return {
            ...obj,
            timeInt: values.timeIntervalDayjs,
            timeAcc: sum,
            wca: values.windCorrectionAngle,
            gs: values.groundSpeed,
            th: values.trueHeading,
            mh: values.magHeading,
          }
        } else {
          if (obj.tas === 0) {
            return { ...obj }
          } else {
            sumNum += obj.distInt / obj.tas
            sum = dayjs.duration(sumNum, 'hours')
            return {
              ...obj,
              timeAcc: sum,
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
            const timeAcc = dayjs.duration(sumTime, 'hours')
            return {
              ...OfpRow,
              key: poi.key,
              description: desc,
              distInt: dist,
              distAcc: sumDistance,
              declination: magVar.declination,
              tc: trueCourse360,
              tas: tas,
              timeInt: values.timeIntervalDayjs,
              timeAcc: timeAcc,
              wind: wind,
              windSpeed: windSpeed,
              wca: values.windCorrectionAngle,
              gs: values.groundSpeed,
              th: values.trueHeading,
              mh: values.magHeading,
            }
          })
        }
      }

      break
    default:
      return state
  }
}

export default ofpReducer
