import axios from "axios";

let AxiosService:any = axios;
// console.log(import.meta.env.VITE_BASE_URL);

if (import.meta.env.VITE_BASE_URL) {
  AxiosService = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  AxiosService.interceptors.request.use(
    function (config) {
      const authString = `Basic ${btoa(`${import.meta.env.VITE_AUTH_KEY}:${import.meta.env.VITE_AUTH_SECRET}`)}`
      config['headers']['Authorization'] =authString
      // Do something before request is sent
      return config;
    },
    function (error) {
      console.log(error);
      
      // Do something with request error
      return Promise.reject(error?.response?.data?.message || error);
    }
  );
  
}
AxiosService.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    console.log(error);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error?.response?.data?.message || error);
  }
);

export { AxiosService };
