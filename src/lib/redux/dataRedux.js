import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "dataset", 
  initialState: {
    list: [],
    status: [],
    currentPage: 1,    // Adicionado para controlar a página atual
    totalItems: 0,     // Adicionado para controlar o total de itens
    totalPages: 0,     // Adicionado para controlar o total de páginas
    currentData: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    // GET ONE FILE
    getOneFileStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOneFileSuccess: (state, action) => {
      state.isFetching = false;
      state.currentData = action.payload;
    },
    getOneFileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // GET ALL
    getFilesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getFilesSuccess: (state, action) => {
      if (action.payload.files.length === 0 && state.currentPage === 1) {
        console.warn('Nenhum dado na primeira página.'); // Apenas alerta no console
      }      
      state.isFetching = false;
      state.list = action.payload.files;  // Agora esperamos a lista paginada
      state.currentPage = action.payload.currentPage; // Atualizando a página atual
      state.totalItems = action.payload.totalItems;   // Atualizando o total de itens
      state.totalPages = action.payload.totalPages;   // Atualizando o total de páginas
    },
    getFilesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // GET STATISTICS
    getAnalysisStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAnalysisSuccess: (state, action) => {
      state.isFetching = false;
      state.list = action.payload.files;
      state.totalItems = action.payload.statusMap.totalSolicitacoes;
      state.status = {
        pendente: action.payload.statusMap.pendente,
        finalizado: action.payload.statusMap.finalizado,
        cancelado: action.payload.statusMap.cancelado,
      };
    },
    getAnalysisFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    
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

    // DELETE METHODS
    deleteFileStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteFileSuccess: (state, action) => {
      state.isFetching = false;
      state.list.splice(
        state.list.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteFileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // UPDATE METHODS
    updateFileStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateFileSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.list.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    updateFileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // CREATE
    addFileStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addFileSuccess: (state, action) => {
      state.isFetching = false;
      state.list.push(action.payload);
    },
    addFileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    clearData: (state) => {
      state.list = []; // Limpa a lista de arquivos
      state.status = []; // Limpa a lista de status
      state.currentData = null;
      state.isFetching = false; // Caso queira resetar o estado de fetching
      state.error = false; // Caso queira resetar o estado de erro
    },
  },
});

export const {
  getOneFileFailure,
  getOneFileStart,
  getOneFileSuccess,
  getFilesStart,
  getFilesSuccess,
  getFilesFailure,
  getAnalysisStart,
  getAnalysisSuccess,
  getAnalysisFailure,
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
} = productSlice.actions;

export default productSlice.reducer;
