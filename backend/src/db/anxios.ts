import axios from 'axios';

// Configuração global do Axios
axios.defaults.baseURL = 'http://localhost:3000'; // Altere para a URL do seu servidor

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Recupera o token do armazenamento local

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Verificar se o erro é devido a um token expirado
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      window.location.href = "/login";

      try {
        // Solicitar um novo token
        const newToken = await obterNovoToken();

        // Atualizar o token no armazenamento local
        localStorage.setItem('token', newToken);

        // Atualizar o cabeçalho da solicitação original com o novo token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Repete a solicitação original com o novo token
        return axios(originalRequest);
      } catch (error) {
        console.error('Erro ao obter novo token:', error);
        // Trate o erro conforme necessário
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Função para obter um novo token do servidor
const obterNovoToken = async () => {

  return 'novo_token'; 
};

export default axios;
