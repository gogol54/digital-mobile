import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    currentUser: null,
    isFetching: false,
    isLoggingOut: false, 
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

 
    // LOGOUT Reducer
    logoutStart: (state) => {
      state.isFetching = true; 
      state.isLoggingOut = true; // Marca como em logout
    },
    logOut: (state) => {
      state.list = [];
      state.stats = [];
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      state.isLoggingOut = false; // Desmarca
    },
    logoutFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.isLoggingOut = false; // Desmarca
    },
  
    // GET ALL
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.list = action.payload
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // GET STATISTICS
    getStatsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getStatsSuccess: (state, action) => {
      state.isFetching = false;
      state.stats = action.payload;
    },
    getStatsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // DELETE METHODS
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.list = state.list.filter(item => item._id !== action.payload); // Garantindo que o payload seja o id
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },  

    // UPDATE METHODS
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      const updatedUser = action.payload;
    
      if (updatedUser && updatedUser._id) {
        if (state.currentUser && state.currentUser._id === updatedUser._id) {
          state.currentUser = updatedUser; 
        } else {
          const index = state.list.findIndex(item => item._id === updatedUser._id);
          if (index !== -1) {
            state.list[index] = updatedUser; 
          } else {
            console.warn(`Usuário com _id ${updatedUser._id} não encontrado na lista.`);
          }
        }
      } else {
        console.error('Payload inválido para updateUserSuccess:', action.payload);
      }
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // CREATE
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.list.push(action.payload)
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logOut,
  logoutFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  getStatsStart,
  getStatsSuccess,
  getStatsFailure,
} = userSlice.actions;

export default userSlice.reducer;
