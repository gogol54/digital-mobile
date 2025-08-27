import {
  loginStart,
  loginSuccess,
  loginFailure,
  setCurrentUserStart,
  setCurrentUserSuccess,
  setCurrentUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
} from '../redux/userRedux';
import { showToast } from '../functions/showToast';
import { publicRequest } from '../../../axios.config';

export const login = async (dispatch, payload, navigation, setLoading) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post('/login', payload);
    if (response) {
      showToast('success', 'Bem-vindo!');
      dispatch(loginSuccess(response.data));
    }
  } catch (error) {
    setLoading(false);
    const errorMessage = error.response?.data?.message || 'Erro ao fazer login.';
    showToast('error', errorMessage);
    dispatch(loginFailure());
  }
};


export const updateUserData = async (dispatch, id, payload, user) => {
  dispatch(updateUserStart());
  try {
    const response = await publicRequest.put(`/user/update/${id}`, payload, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    if (response) {
      dispatch(updateUserSuccess({ _id: id, ...response.data }));
      showToast('success', 'Perfil atualizado com sucesso!');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro inesperado';
    showToast('error', errorMessage);
    dispatch(updateUserFailure());
  }
};

export const verifyLogin = async (dispatch, payload, router, setLoading) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post('/login/decode', { payload });
    if (response) {
      showToast('success', 'Bem-vindo!');
      dispatch(loginSuccess(response.data));
      router.push('/lista');
    }
  } catch (error) {
    console.error(error);
    setLoading(false);
    const errorMessage = error.response?.data?.message || 'Erro ao fazer login.';
    showToast('error', errorMessage);
    dispatch(loginFailure());
  }
};

export const updateUserPassword = async (id, password) => {
  try {
    const response = await publicRequest.put(`/user/update/pass/${id}`, password);
    if (response) {
      showToast('success', 'Senha atualizada com sucesso!');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro inesperado';
    showToast('error', errorMessage);
  }
};

export const ForgotEmail = async (email, navigation) => {
  try {
    const response = await publicRequest.post('/user/restart/pass', {email: email});
    if (response) {
      navigation.goBack()
      showToast('success', 'Enviamos um link para redefinição no seu email, verifique sua caixa de spam!');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao enviar o email.';
    showToast('error', errorMessage);
  }
};

export const getCurrentUser = async (dispatch, user) => {
  dispatch(setCurrentUserStart());
  console.log('Fetching current user:', user?._id);
  try {
    const response = await publicRequest.get(`/user/${user._id}`, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    if (response) {
      dispatch(setCurrentUserSuccess(response.data));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao carregar o usuário.';
    showToast('error', errorMessage);
    dispatch(setCurrentUserFailure());
  }
};  

export const getUsersList = async (dispatch, user) => {
  dispatch(getUserStart());
  try {
    const response = await publicRequest.get('/user/list', {
      headers: { authorization: `Bearer ${user.token}` },
    });
    dispatch(getUserSuccess(response.data));
  } catch (error) {
    dispatch(getUserFailure());
    showToast('error', 'Erro ao carregar a lista de usuários.');
  }
};
