import { createSlice } from '@reduxjs/toolkit'

const rescueSlice = createSlice({
  name: 'rescue',
  initialState: {
    list: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // CREATE
    createRescueStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createRescueSuccess: (state, action) => {
      state.isFetching = false;
      state.list.push(action.payload);
    },
    createRescueFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // GET ALL
    getRescuesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getRescuesSuccess: (state, action) => {
      state.isFetching = false;
      state.list = action.payload;
    },
    getRescuesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // UPDATE STATUS
    updateRescueStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateRescueSuccess: (state, action) => {
      state.isFetching = false;
      const updated = action.payload;
      const index = state.list.findIndex((r) => r._id === updated._id);
      if (index !== -1) {
        state.list[index] = updated;
      }
    },
    updateRescueFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }
})

export const {
  createRescueStart,
  createRescueSuccess,
  createRescueFailure,
  getRescuesStart,
  getRescuesSuccess,
  getRescuesFailure,
  updateRescueStart,
  updateRescueSuccess,
  updateRescueFailure
} = rescueSlice.actions;

export default rescueSlice.reducer;
