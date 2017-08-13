import axios from 'axios';

let base = 'http://localhost:8080';


var studentApi = axios.create({
  baseURL: base,
  timeout: 1000
});

studentApi.defaults.withCredentials = true;

studentApi.defaults.validateStatus = status => {
    return status < 404;
};

studentApi.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("SESSION_STUDENT");
  console.log(token);
  if (token != null) {
    config.headers.sessionid = token;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});


//链式处理ERR
studentApi.interceptors.response.use(res => res, err => {
  //统一处理错误代码
  console.log(err);
  var message = "";
  try {
    var descript = err.data.descript;
    message      = (descript != null && descript.trim() != '') && descript;
  } catch (e) {
    console.log(e);
    message = "服务器错误"
  }
  vue.$message({
    message: message,
    type   : 'error'
  });
  return Promise.reject(err);
});


//时间转换
studentApi.defaults.transformResponse = (data) => {
  const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

  function reviver(key, value) {
    if (typeof value === "string" && dateFormat.test(value)) {
      return new Date(value);
    }

    return value;
  }

  try {
    const obj = JSON.parse(data, reviver);
    return obj;
  } catch (e) {
  }
  return data;
};


export const requestLogin = params => {
  return studentApi.post(`/student/login`, params)
};

export const getCurrentStudentInfo = () => {
  return studentApi.get(`/student/getinfo`);
};

export const getStudentList = params => {
  return studentApi.get(`/student/list`, {params: params});
};

export const getUserList = params => {
  return studentApi.get(`/student/all`, {params: params});
};

export const getAcademyByname = params =>{
  return studentApi.get(`/academy`, {params: params});
};

export const getPoolBuildBaseInfo = params =>{
  return studentApi.get(`/poorBuild`);
};

export const postPoolBuildInfo = params =>{
  return studentApi.post(`/poorBuild/application`, params);
};

export const getStatus = () =>{
  return studentApi.get(`/poorBuild/status`)
};

export const getReview = ()=>{
  return studentApi.get(`/poorBuild/review`)
};

// export const requestLogin = params => { return axios.post(`/login`, params).then(res => res.data); };

// export const getUserList = params => { return axios.get(`/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`/user/add`, { params: params }); };
