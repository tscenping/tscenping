import axios from "axios";
import { useModalState, useNoticeModalState } from "../store/modal";

const baseURL = process.env.REACT_APP_BASEURL;

const useAxios = () => {
  const { setModalName } = useModalState();
  const { setContent } = useNoticeModalState();
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    function setConfig(param) {
      param.headers["Content-Type"] = "application/json";
      param.withCredentials = true;
      return param;
    },
    function getError(error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function handleResponse(response) {
      return response;
    },
    function handleError(error) {
      setModalName("notice");
      setContent(error.response.data.message);
      //   if (error.response && error.response.status === 400) {
      // alert(error.response.data.message);
      //   }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default useAxios;
