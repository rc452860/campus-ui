import axios from 'axios';
import {stringify} from 'qs'
let base = 'http://localhost:8080';


axios.defaults.validateStatus = status => {
    return status < 404;
}

// axios.interceptors.request.use(function (config) {
//     const token = sessionStorage.getItem("login");
//     console.log(token);
//
//     if (token != null) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, function (err) {
//     return Promise.reject(err);
// });


export const requestLogin = params => {
    return axios.post(`${base}/teacher/login`, params)
};
export const getStudentList = params => {
  return axios.get(`${base}/teacher`, {params: params});
};

export const getUserList = params => {
    return axios.get(`${base}/teacher/all`, {params: params});
};

// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
