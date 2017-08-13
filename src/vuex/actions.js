//test
import {requestInfo} from '../teacher/api/api';


export const TEACHER_INFO_ACITON = ({commit, state}) => {
  requestInfo().then((res) => {
    commit("TEACHER_INFO", res.data.data)
  })
};
