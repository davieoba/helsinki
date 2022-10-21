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