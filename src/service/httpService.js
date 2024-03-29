import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const excpectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!excpectedError) {
    console.log("Logging the error", error);
    toast.error("An unexcpected error occured");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
