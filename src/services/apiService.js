import axios from "axios";

const defaultHeaderParams = () => ({
  "Content-Type": "application/json",
  Authorization: `bearer ${sessionStorage.getItem("token")}`,
});

export const Api = {
  get: (url, params = {}) => {
    const getObject = {
      method: "get",
      url: url,
      responseType: params.responseType || "json",
      headers: {
        ...defaultHeaderParams(),
        ...params.headers,
      },
    };
    return axios(getObject);
  },
  post: (url, params = {}) => {
    const postObject = {
      method: "post",
      url: url,
      responseType: params.responseType || "json",
      data: params.data || {},
      headers: { ...defaultHeaderParams(), ...params.headers },
    };
    // const encrypted = aesEncrypt("Fibona");
    // const decrypted = aesDecrypt(encrypted);
    return axios(postObject);
    
  },
};
