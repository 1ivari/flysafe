import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import calculateOFP from '../utils/calculateOFP'
import distance from '@turf/distance'
import bearing from '@turf/bearing'
import midpoint from '@turf/midpoint'
import * as geomag from 'geomag'
dayjs.extend(duration)

let OfpRow = {
  key: 0, // uuid
  startCoord: [0, 0], // latlon
  midCoord: [0, 0], // latlon
  endCoord: [0, 0], // latlon
  description: '', // string
  minAlt: '', //string, feet or FL
  planAlt: '', // string, feet or FL
  tas: Number(0), // num, kt
  wind: Number(0), // num, deg
  windSpeed: Number(0), // num, kt
  tc: Number(0), // num, deg
  wca: Number(0), // num, deg
  th: Number(0), // num, deg
  declination: Number(0), //num, deg
  mh: Number(0), // num, deg
  dev: Number(0), // num, deg
  ch: Number(0), // num, deg
  distInt: Number(0), // num, NM
  distAcc: Number(0), // num, NM
  gs: Number(0), // num, kt
  timeInt: Number(0), // num, minutes
  timeIntRaw: Number(0), // num, minutes
  timeAdd: Number(0), // num, minutes
  timeAcc: Number(0), // num, minutes
  timeAccRaw: Number(0), // num, minutes
  eto: '',
  ato: '',
  fuelRem: Number(0), // num,
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

    case 'RECALCULATE_FUEL':
      let sumConsumption = Number(0)
      return state.map((obj) => {
        sumConsumption += (payload.fuelConsumption / 60) * obj.timeIntRaw
        return {
          ...obj,
          fuelRem: payload.rampFuel - payload.taxiFuel - sumConsumption,
        }
      })

    case 'RECALCULATE_LOCAL':
      return state.map((obj, idx) => {
        if (idx === 0) {
          return obj
        } else {
          return {
            ...obj,
            timeAcc: Number(obj.timeInt) + Number(obj.timeAdd),
            fuelRem:
              payload.rampFuel -
              payload.taxiFuel -
              (payload.fuelConsumption / 60) *
                (Number(obj.timeInt) + Number(obj.timeAdd)),
          }
        }
      })

    case 'RECALCULATE': {
      let sumTime = Number(0)
      let timeAdder = Number(0)

      return state.map((obj) => {
        if (obj.key === payload.id) {
          // take wind into account
          const values = calculateOFP(
            obj.tc,
            obj.tas,
            obj.wind,
            obj.windSpeed,
            obj.distInt,
            obj.declination
          )
          timeAdder = values.timeIntervalRaw + Number(obj.timeAdd)
          sumTime += timeAdder
          return {
            ...obj,
            timeInt: values.timeIntervalDayjs.format('HH:mm'),
            timeIntRaw: timeAdder,
            timeAcc: dayjs.duration(sumTime, 'minutes').format('HH:mm'),
            timeAccRaw: sumTime,
            wca: values.windCorrectionAngle,
            gs: values.groundSpeed,
            th: values.trueHeading,
            mh: values.magHeading,
          }
        } else {
          if (obj.tas === 0) {
            return { ...obj }
          } else {
            timeAdder = obj.distInt / (obj.gs / 60) + Number(obj.timeAdd)
            sumTime += timeAdder

            return {
              ...obj,
              timeAcc: dayjs.duration(sumTime, 'minutes').format('HH:mm'),
              timeAccRaw: sumTime,
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

    case 'CONSTRUCT_FROM_ROUTE': {
      const route = payload.obj
      let sumDistance = 0
      let sumTime = 0
      if (route.length > 0) {
        return route.map((poi, i, arr) => {
          const properties = poi.geoJSON.properties
          const desc =
            i > 0
              ? arr[i - 1].geoJSON.properties.ident + ' -> ' + properties.ident
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
            trueCourse180 < 0.5 ? trueCourse180 + 360 : trueCourse180

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
            timeIntRaw: values.timeIntervalRaw,
            timeAcc: dayjs.duration(sumTime, 'minutes').format('HH:mm'),
            timeAccRaw: sumTime,
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

    case 'CONSTRUCT_LOCAL_FROM_ROUTE':
      {
        const route = payload.obj
        const poi = route[0] //takeoff point
        const magVar = geomag.field(
          poi.geoJSON.geometry.coordinates[1],
          poi.geoJSON.geometry.coordinates[0]
        )
        const ofp = [
          {
            ...OfpRow,
            key: poi.key,
            startCoord: poi.geoJSON.geometry.coordinates,
            midCoord: poi.geoJSON.geometry.coordinates,
            endCoord: poi.geoJSON.geometry.coordinates,
            description: poi.geoJSON.properties.ident,
            declination: magVar.declination,
            timeIntRaw: 0,
            timeInt: 0,
          },
          {
            ...OfpRow,
            key: crypto.randomUUID(),
            startCoord: poi.geoJSON.geometry.coordinates,
            startCoord: poi.geoJSON.geometry.coordinates,
            midCoord: poi.geoJSON.geometry.coordinates,
            endCoord: poi.geoJSON.geometry.coordinates,
            description: 'LOCAL',
            declination: magVar.declination,
            timeIntRaw: 60,
            timeInt: 60,
          },
        ]
        return ofp
      }

      break
    default:
      return state
  }
}
