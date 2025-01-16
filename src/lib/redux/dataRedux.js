import {createSlice} from "@reduxjs/toolkit"

const productSlice = createSlice({
  name:"dataset",
  initialState: {
    list: [],
    status: [],
    currentData: null,
    isFetching: false,
    error: false,
  },
  reducers:{
    //GET ONE FILE
    getOneFileStart:(state) => {
      state.isFetching = true
      state.error = false
    },
    getOneFileSuccess:(state, action) => {
      state.isFetching = false
      state.currentData = action.payload
    },
    getOneFileFailure:(state) => {
      state.isFetching = false
      state.error = true
    },

    //GET ALL
    getFilesStart:(state) => {
      state.isFetching = true
      state.error = false
    },
    getFilesSuccess:(state, action) => {
      state.isFetching = false
      state.list = action.payload
    },
    getFilesFailure:(state) => {
      state.isFetching = false
      state.error = true
    },

      // GET STATISTICS
      getStatusStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getStatusSuccess: (state, action) => {
        state.isFetching = false;
        state.status = action.payload;
      },
      getStatusFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },

    //DELETE METHODS
    deleteFileStart:(state) => {
      state.isFetching = true
      state.error = false
    },
    deleteFileSuccess:(state, action) => {
      state.isFetching = false
      state.list.splice(
        state.list.findIndex((item) => item._id === action.payload), 1
      )
    },
    deleteFileFailure:(state) => {
      state.isFetching = false
      state.error = true
    },
    //UPDATE METHODS
    updateFileStart:(state) => {
      state.isFetching = true
      state.error = false
    },
    updateFileSuccess: (state, action) => { 
      state.isFetching = false; 
      console.log("Action Payload:", action.payload); // Adicione isto 
      const index = state.list.findIndex((item) => item._id === action.payload._id); 
      console.log("Index Found:", index); // Adicione isto 
      if (index !== -1) { 
        state.list[index] = { ...state.list[index], ...action.payload }; 
        console.log("Updated State List:", state.list[index]); // Adicione isto 
      } 
    },
    updateFileFailure:(state) => {
      state.isFetching = false
      state.error = true
    },
    //CREATE
    addFileStart:(state) => {
      state.isFetching = true
      state.error = false
    },
    addFileSuccess:(state, action) => {  
      state.isFetching = false
      state.list.push(action.payload)
    },
    addFileFailure:(state) => {
      state.isFetching = false
      state.error = true
    },  
    
    clearData: (state) => {
      state.list = []; // Limpa a lista de arquivos
      state.status = []; // Limpa a lista de arquivos
      state.currentData = null;
      state.isFetching = false; // Caso queira resetar o estado de fetching
      state.error = false; // Caso queira resetar o estado de erro
    },
  },
})

export const { 
  getOneFileFailure, 
  getOneFileStart, 
  getOneFileSuccess,
  getFilesStart, 
  getFilesSuccess, 
  getFilesFailure,
  getStatusStart,
  getStatusSuccess,
  getStatusFailure,
  deleteFileStart, 
  deleteFileSuccess, 
  deleteFileFailure,
  updateFileStart, 
  updateFileSuccess, 
  updateFileFailure,
  addFileStart, 
  addFileSuccess, 
  addFileFailure,
  clearData,    
} = productSlice.actions

export default productSlice.reducer