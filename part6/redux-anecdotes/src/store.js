import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
// import anecdoteReducer from "./reducers/anecdoteReducer.bak";
import anecdoteReducer, { setAnecdote } from "./reducers/anecdotes";
import filterReducer from "./reducers/filterReducer";
// import { anecdoteService } from "./services/anecdotes";

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})

// anecdoteService.getAll().then((response) => {
//   store.dispatch(setAnecdote(response))
// })



