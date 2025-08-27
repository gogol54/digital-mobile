import { publicRequest } from "../../../axios.config"
import {
  createRescueStart,
  createRescueSuccess,
  createRescueFailure,
  updateRescueStart,
  updateRescueSuccess,
  updateRescueFailure,
  getRescuesStart,
  getRescuesSuccess,
  getRescuesFailure
} from "../redux/rescueRedux"
import { showToast } from "../functions/showToast";
import { updateUserStart, updateUserSuccess } from "../redux/userRedux";

// ✅ CREATE
export const createRescueItem = async (dispatch, user, payload) => {
  dispatch(createRescueStart())
  try {
    const response = await publicRequest.post('/rescue/create', payload, {
      headers: { authorization: `Bearer ${user.token}` }
    });
    if (response) {
      dispatch(createRescueSuccess(response.data));
      showToast('success', 'Resgate solicitado com sucesso!');
      const dataPut = { points: parseInt(-payload.points) }
      const res = await publicRequest.put(`/user/${user._id}/score`, dataPut, {
        headers: { authorization: `Bearer ${user.token}` }
      })
      
      if (res && res.data) {
        dispatch(updateUserStart());
        const updatedUser = res.data.user || res.data;
        dispatch(updateUserSuccess(updatedUser));
      } else {
        dispatch(updateUserFailure());
        showToast('error', 'Erro ao atualizar pontuação do usuário.');
      }
    }

  } catch (error) {
    dispatch(createRescueFailure());
    showToast('error', 'Erro ao solicitar resgate.');
  }
}

// ✅ UPDATE
export const updateRescueItem = async (dispatch, id, user, payload) => {
  dispatch(updateRescueStart())
  try {
    const response = await publicRequest.put(`/rescue/${id}`, payload, {
      headers: { authorization: `Bearer ${user.token}` }
    });

    if (response) {
      dispatch(updateRescueSuccess(response.data));
      showToast('success', 'Status do resgate atualizado!');
    }
  } catch (error) {
    dispatch(updateRescueFailure());
    showToast('error', 'Erro ao atualizar status do resgate.');
  }
}

// ✅ LIST
export const listRescue = async (dispatch, user) => {
  dispatch(getRescuesStart())
  try {
    const response = await publicRequest.get('/rescue/alldata', {
      headers: { authorization: `Bearer ${user.token}` }
    });
    if (response) {
      dispatch(getRescuesSuccess(response.data));
    }
  } catch (error) {
    dispatch(getRescuesFailure());
    showToast('error', 'Erro ao carregar solicitações de resgate.');
  }
}
