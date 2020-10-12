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
  // axios.interceptors.response.use(
  //   response => response,
  //   error => {
  //     if (401 === error.response.status) {
  //       store.dispatch(auth.actions.showSessionExpired());
  //       return Promise.reject(error);
  //     }
  //     return Promise.reject(error);
  //   }
  // );
}
