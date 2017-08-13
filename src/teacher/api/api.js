import axios from 'axios';
import vue from '../../main'

let base = 'http://localhost:8080';


var teacherApi = axios.create({
  baseURL: base,
  timeout: 1000
});

teacherApi.defaults.validateStatus = status => {
    return status < 404;
};
//teacherApi.defaults.withCredentials = true

teacherApi.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("SESSION_TEACHER");
  console.log(token);
  if (token != null) {
    config.headers.sessionid = token;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});
//链式处理RES
teacherApi.interceptors.response.use(function (res) {
  if (res.status == 200 &&
    res.hasOwnProperty("data") &&
    res.data.hasOwnProperty("status") &&
    res.data.status == "success") {
    //如果存在描述则直接显示出来
    if (res.data.hasOwnProperty("descript") && typeof res.data.descript == "string") {
      vue.$message({
        message: res.data.descript,
        type   : 'info'
      })
    }
    return res;
  }

  if (res.status == 302) {
    console.log("跳转");
    return res;
  }
  return Promise.reject(res);
}, err => err);
//链式处理ERR
teacherApi.interceptors.response.use(res => res, err => {
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
teacherApi.defaults.transformResponse = (data) => {
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
  return teacherApi.post(`${base}/teacher/login`, params)
};

export const requestOpenApply = params => {
  return teacherApi.post(`${base}/teacher/open`, params)
};

export const requestDocTagList = params => {
  return teacherApi.get(`${base}/doctag`, {params: params})
};

export const requestDelDocTags = params => {
  return teacherApi.delete(`${base}/doctag`, {data: params})
};

export const testUpload = params => {
  return teacherApi.post(`${base}/common/v2`, params)
};

export const requestDocList = params => {
  return teacherApi.get(`${base}/doctag/doc/list`, {params: params})
};


export const requestAudit = params => {
  return teacherApi.post(`${base}/doclist/audit`, params)
};

export const requestInfo = () => {
  return teacherApi.get(`${base}/teacher/info`)
};


// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
