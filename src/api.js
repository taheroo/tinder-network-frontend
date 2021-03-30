import axios from 'axios';

// if (auth.getJwt())
//   axios.defaults.headers.common["Authorization"] = auth.getJwt()
//     ? "Bearer " + auth.getJwt()
//     : "";

// export default axios.create({
//   baseURL: "http://localhost:4000/",
// });

const fetchClient = () => {
  const defaultOptions = {
    baseURL: 'https://tinder-network.herokuapp.com/',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();
