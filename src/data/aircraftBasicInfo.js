const aircraftBasicInfo = [
  {
    id: 1,
    active: true,
    type: 'C152',
    name: 'CAS',
    // arm (in)
    arm: {
      bw: 30.52,
      seat12: 41,
      baggageArea1: 64,
      baggageArea2: 84,
      fuel: 42,
    },
    // basic weight lbs
    basicWeight: 1217.0,
  },

  {
    id: 2,
    type: 'C152',
    name: 'CIS',
    // arm (in)
    arm: {
      bw: 37,
      seat12: 45,
      baggageArea1: 68,
      baggageArea2: 83,
      fuel: 49,
    },
    // basic weight lbs
    basicWeight: 1244.0,
  },
]

export default aircraftBasicInfo
