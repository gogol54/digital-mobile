import { createSlice } from '@reduxjs/toolkit';

const rewardSlice = createSlice({
  name: 'reward',
  initialState: {
    list: [],
    current: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    // CREATE
    createRewardStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createRewardSuccess: (state, action) => {
      state.isFetching = false;
      state.list.push(action.payload);
    },
    createRewardFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // GET ALL
    getRewardsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getRewardsSuccess: (state, action) => {
      state.isFetching = false;
      state.list = action.payload;
    },
    getRewardsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // GET BY ID / GET ONE
    getRewardStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getRewardSuccess: (state, action) => {
      state.isFetching = false;
      state.current = action.payload;
    },
    getRewardFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // UPDATE
    updateRewardStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateRewardSuccess: (state, action) => {
      state.isFetching = false;
      const updated = action.payload;
      const index = state.list.findIndex((r) => r._id === updated._id);
      if (index !== -1) {
        state.list[index] = updated;
      }
      if (state.current && state.current._id === updated._id) {
        state.current = updated;
      }
    },
    updateRewardFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },


    deleteRewardStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteRewardSuccess: (state, action) => {
      state.isFetching = false;
      state.list = state.list.filter(item => item._id !== action.payload); // Garantindo que o payload seja o id
    },
    deleteRewardFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },  

  }
});

export const {
  createRewardStart,
  createRewardSuccess,
  createRewardFailure,
  getRewardsStart,
  getRewardsSuccess,
  getRewardsFailure,
  getRewardStart,
  getRewardSuccess,
  getRewardFailure,
  updateRewardStart,
  updateRewardSuccess,
  updateRewardFailure,
  deleteRewardStart,
  deleteRewardSuccess,
  deleteRewardFailure
} = rewardSlice.actions;

export default rewardSlice.reducer;