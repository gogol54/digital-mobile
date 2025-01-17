import { publicRequest } from "../../../axios.config"
import { 
  getOneFileFailure, 
  getOneFileStart, 
  getOneFileSuccess, 
  getFilesStart, 
  getFilesSuccess, 
  getFilesFailure, 
  getStatusStart,
  getStatusSuccess,
  getStatusFailure,
  updateFileStart, 
  updateFileSuccess, 
  updateFileFailure,
  addFileStart, 
  addFileSuccess, 
  addFileFailure,
  deleteFileStart, 
  deleteFileSuccess, 
  deleteFileFailure, 
} from "../redux/dataRedux"
import { showToast } from "../functions/showToast";

export const createRequestExame = async (dispatch, payload, navigation, user) => {
  dispatch(addFileStart())
  try {
    const response = await publicRequest.post('/file/create', payload, {
      headers: { authorization: `Bearer ${user.token}` }
    });
    if(response.data.success === true){
      console.log(response.data.newFile)
      dispatch(addFileSuccess(payload))
      showToast('success', 'Solicitação gerada com sucesso!')
      navigation.navigate('List') 
    }
  } catch (error) {
    showToast('error', error.message)
    dispatch(addFileFailure())

  }
}

export const getStatus = async (dispatch, user) => {
  dispatch(getStatusStart())
  try {
    const response = await publicRequest.get('/file/stats/status', {
      headers: { authorization: `Bearer ${user.token}` }
    })
    console.log(response.data)
    dispatch(getStatusSuccess(response.data))
  } catch (error) {
    dispatch(getStatusFailure())
  }
}

export const getSingleData = async (dispatch, id, user) => {
  dispatch(getOneFileStart())
  try {
    const response = await publicRequest.get(`/file/${id}`, {
      headers: { authorization: `Bearer ${user.token}` }
    });
    console.log(response.data)
    if(response){
      dispatch(getOneFileSuccess(response.data))
    }
  } catch (error) {
    console.log(error)
    dispatch(getOneFileFailure())
  }
}

export const listOfFiles = async (dispatch, user) => {
  dispatch(getFilesStart())
  try {
    let response;
    if (user.userType === 'pacient') {
      // Buscando arquivos específicos do paciente
      response = await publicRequest.get(`/file/list/patient/${user._id}`,{
        headers: { authorization: `Bearer ${user.token}` } 
      });
    } 
    if (user.userType === 'dentist') {
      response = await publicRequest.get(`/file/list/${user._id}`,{
        headers: { authorization: `Bearer ${user.token}` }
      });
    }
    if (user.userType === 'admin') {
      response = await publicRequest.get('/file/superuser/files',{
        headers: { authorization: `Bearer ${user.token}` }
      });
    }

    if (response) {
      console.log(response)
      dispatch(getFilesSuccess(response.data)); 
    }
  } catch (error) {
    dispatch(getFilesFailure());
    showToast('error', 'Erro ao carregar os arquivos.');
  }
}

export const updateDataQuery = async (dispatch, payload, user) => {
  dispatch(updateFileStart());
  const data = {
    files: payload.files, 
    status: payload.status, 
    feedback: payload.feedback
  };
  
  try {
    const response = await publicRequest.put(
      `/file/update/${payload.id}`, 
      data,
      { headers: { authorization: `Bearer ${user.token}` } }
    );
    
    dispatch(updateFileSuccess(response.data)); 
    showToast('success', 'Solicitação foi atualizada com sucesso!');
    await getStatus(dispatch, user)
  } catch (error) {
    dispatch(updateFileFailure());
    showToast('error', 'Houve um erro ao atualizar a solicitação!');
  }
};