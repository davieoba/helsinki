// import { createStore } from "redux"

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      // console.log({ ...state, good: state.good + 1 })
      return { ...state, good: state.good + 1 }
    case 'OK':
      return { ...state, ok: state.ok + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1 }
    case 'ZERO':
      return { ...state, good: 0, bad: 0, ok: 0 }
    case 'DO_NOTHING':
      return { ...state }
    default: return state
  }

}


// const store = createStore(counterReducer)

export default counterReducer