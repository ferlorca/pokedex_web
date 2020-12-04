import axios from 'axios';

const baseURL = (process.env.NODE_ENV === 'production') ?
  "https://us-central1-pokedex-79f41.cloudfunctions.net/api"
  :
  "http://localhost:3001"
  ;

const AxiosInstance = (function () {
  var _instance;
  
  function _getIntance() {
    if (!_instance) {
      _instance = axios.create({
        baseURL,
      })
      _instance.interceptors.request.use(
        config => {
          const token = localStorage.token;
          if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
          }
          config.headers['Content-Type'] = 'application/json';
          config.headers["Access-Control-Allow-Origin"]= "*";
          return config;
        },
        error => {
          Promise.reject(error)
        });
      return _instance
    }
    return _instance
  }

  return _getIntance()
})();

export default AxiosInstance;


 