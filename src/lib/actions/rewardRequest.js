import { publicRequest } from '../../../axios.config';
import {
  createRewardStart,
  createRewardSuccess,
  createRewardFailure,
  updateRewardStart,
  updateRewardSuccess,
  updateRewardFailure,
  getRewardsStart,
  getRewardsSuccess,
  getRewardsFailure,
  getRewardStart,
  getRewardSuccess,
  getRewardFailure,
  deleteRewardStart,
  deleteRewardSuccess,
  deleteRewardFailure
} from "../redux/rewardRedux";
import { showToast } from "../functions/showToast";
// ✅ CREATE
export const createRewardItem = async (dispatch, payload, user) => {
  dispatch(createRewardStart());
  try {
    const response = await publicRequest.post('/reward/register', payload, {
      headers: { authorization: `Bearer ${user.token}` }
    });
    if (response) {
      dispatch(createRewardSuccess(response.data));
      showToast('success', 'Recompensa criada com sucesso!');
    }
  } catch (error) {
    dispatch(createRewardFailure());
    showToast('error', 'Erro ao criar recompensa.');
  }
};

// ✅ UPDATE
export const updateRewardItem = async (dispatch, payload, id, user) => {
  dispatch(updateRewardStart());
  try {
    const response = await publicRequest.put(`/reward/update/${id}`, payload, {
      headers: { authorization: `Bearer ${user.token}` }
    });
    if (response) {
      dispatch(updateRewardSuccess(response.data));
      showToast('success', 'Recompensa atualizada com sucesso!');
    }
  } catch (error) {
    console.log(error)
    dispatch(updateRewardFailure());
    showToast('error', 'Erro ao atualizar recompensa.');
  }
};

// ✅ GET ALL
export const getAllReward = async (dispatch, user) => {
  dispatch(getRewardsStart());
  try {
    const response = await publicRequest.get('/reward', {
      headers: { authorization: `Bearer ${user.token}` }
    });
    if (response) {
      dispatch(getRewardsSuccess(response.data));
    }
  } catch (error) {
    dispatch(getRewardsFailure());
    showToast('error', 'Erro ao carregar recompensas.');
  }
};

// ✅ GET BY ID
export const getRewardById = async (dispatch, user, id) => {
  dispatch(getRewardStart());
  try {
    const response = await publicRequest.get(`/reward/${id}`, {
      headers: { authorization: `Bearer ${user.token}` }
    });
    if (response) {
      dispatch(getRewardSuccess(response.data));
    }
  } catch (error) {
    dispatch(getRewardFailure());
    showToast('error', 'Erro ao buscar recompensa específica.');
  }
};

export const deleteReward = async (dispatch, id, user) => {
  dispatch(deleteRewardStart());
  try {
    const response = await publicRequest.delete(`/reward/${id}`, {
      headers: { authorization: `Bearer ${user.token}` }
    });
    if (response) {
      console.log(response)
      dispatch(deleteRewardSuccess(id));
    }
    showToast.fire('success', 'Recompensa foi deletada!');
  } catch (error) {
    console.log(error);
    dispatch(deleteRewardFailure());
  }
};
