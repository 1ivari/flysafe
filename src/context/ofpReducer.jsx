const ofpReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DESCRIPTION':
      return {
        ...state,
        description: action.payload,
      }

    default:
      return state
  }
}

export default ofpReducer
