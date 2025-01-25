import {
  loginStart,
  loginSuccess,
  loginFailure,
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
    console.log('chegou aqui...')
    const errorMessage = error.response?.data?.message || 'Erro ao fazer login.';
    showToast('error', errorMessage);
    dispatch(loginFailure());
  }
};

export const createNewUser = async (dispatch, payload, router, setLoading) => {
  dispatch(addUserStart());
  try {
    const response = await publicRequest.post('/user/create', payload);
    if (response) {
      dispatch(addUserSuccess(response.data));
      showToast('success', 'Usuário cadastrado com sucesso!');
      router.push('/user/registrar/success');
      return response;
    } else {
      setLoading(false);
      showToast('error', 'Erro ao criar o usuário. Tente novamente.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Erro ao criar o usuário.';
    showToast('error', errorMessage);
    setLoading(false);
    dispatch(addUserFailure());
    throw error;
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

export const deleteUser = async (dispatch, id, user) => {
  dispatch(deleteUserStart());
  try {
    const response = await publicRequest.delete(`/user/${id}`, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    if (response) {
      dispatch(deleteUserSuccess(id));
      showToast('success', 'Usuário foi deletado!');
    }
  } catch (error) {
    showToast('error', 'Erro ao deletar o usuário.');
    dispatch(deleteUserFailure());
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

