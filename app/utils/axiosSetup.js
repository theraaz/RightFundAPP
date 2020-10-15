import { authActions } from './action-creators/auth.action.creator';

export function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken },
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = authToken;
      }

      return config;
    },
    err => Promise.reject(err),
  );
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.data?.response?.data?.name === 'TokenExpiredError') {
        store.dispatch(authActions.showSessionExpired());
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );
}
