import { publicRequest } from '../../../axios.config';
import { 
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
  updateFileStart, 
  updateFileSuccess, 
  updateFileFailure,
  addFileStart, 
  addFileSuccess, 
  addFileFailure,
} from "../redux/dataRedux"
import { showToast } from "../functions/showToast"

export const createRequestExame = async (dispatch, payload, router, user) => {
  dispatch(addFileStart())
  try {
    const response = await publicRequest.post('/file/create', payload, {
      headers: { authorization: `Bearer ${user.token}` }
    });
    const dataPut = { points: payload.info.points }
    if(response) {
      const res = await publicRequest.put(`/user/${payload.createdById}/score`, dataPut, {
          headers: { authorization: `Bearer ${user.token}` }
        })
      }
    if(response.data.success === true){
      dispatch(addFileSuccess(payload))
      showToast('success', 'Solicitação gerada com sucesso!')
      router.push('/lista') 
    }
  } catch (error) {
    showToast('error', error.message)
    dispatch(addFileFailure())
  }
}

export const getAnalysis = async (dispatch, user, payload) => {
  dispatch(getAnalysisStart())
  try{
    const response = await publicRequest.post('/file/data/analysis', payload, {
      headers: { authorization: `Bearer ${user.token}` }
    });
    dispatch(getAnalysisSuccess(response.data))
  }
  catch(err){
    showToast('error', err.message)
    console.log(err)
    dispatch(getAnalysisFailure())
  }
}

export const getStatus = async (dispatch, user) => {
  dispatch(getStatusStart())
  try {
    const response = await publicRequest.get('/file/stats/status', {
      headers: { authorization: `Bearer ${user.token}` }
    })
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
    if(response){
      dispatch(getOneFileSuccess(response.data))
    }
  } catch (error) {
    console.log(error)
    dispatch(getOneFileFailure())
  }
}

export const listOfFiles = async (dispatch, user, page, limit = 25) => {
  dispatch(getFilesStart());
  try {
    const params = { page, limit };
    const headers = { authorization: `Bearer ${user.token}` };
    let endpoint;

    switch (user.userType) {
      case 'pacient':
        endpoint = `/file/list/patient/${user._id}`;
        break;
      case 'dentist':
        endpoint = `/file/list/${user._id}`;
        break;
      case 'admin':
        endpoint = '/file/superuser/files';
        break;
      default:
        throw new Error('Tipo de usuário inválido');
    }
    const response = await publicRequest.get(endpoint, { params, headers });
    dispatch(getFilesSuccess(response.data));
  } catch (error) {
    dispatch(getFilesFailure());
    showToast('error', error);
  }
};

export const updateDataQuery = async (dispatch, payload, user) => {
  dispatch(updateFileStart());
  const data = {
    files: payload.files, 
    fileType: payload.fileType,
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