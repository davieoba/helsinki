import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: '',
  time: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification: (state, action) => {
      state.message = action.payload
    },
    removeNotification: (state, action) => {
      state.message = action.payload
    },
    // setNotification: (state, action) => {
    //   // some code
    //   // I want to set the notification and also remove it after some seconds 
    //   notificationSlice.caseReducers.createNotification(state, action.payload.message)

    //   setTimeout(() => {
    //     notificationSlice.caseReducers.removeNotification(state, '')
    //   }, action.payload.time)
    // }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions


export const setNotification = ({ message, time }) => {
  return async (dispatch) => {

    console.log(time)

    dispatch(createNotification(message))

    setTimeout(() => {
      dispatch(removeNotification(''))
    }, time * 1000)
  }
}


export default notificationSlice.reducer