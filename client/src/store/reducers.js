const sequencers = (state = {stuff: 0}, action) => {
  switch (action.type) {
    case 'ADD_STEP':
      state = Object.assign({}, state, {stuff: 3})
      break;
    default:

  }
  return state
}

export default sequencers
