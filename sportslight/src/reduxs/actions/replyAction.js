import axios from 'axios';
import { replyReducers } from '../reducers/replyReducer';
import { baseUrl } from '../../apiurl';

// config
const config3 = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Authorization'),
  },
};

function getReplyList(talkNum) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/footballreply/list/${talkNum}`, config3)
      .then((response) => response.data);
    console.log(data);
    dispatch(replyReducers.getReplyList({ data }));
  };
}

//formData => 넘겨줄 데이터 / config => 옵션
function replyCreate(formData) {
  return async (dispatch) => {
    await axios
      .post(`${baseUrl}/footballreply/create`, formData, config3)
      .then((response) => response.data);
  };
}

function replyDelete(talkReplyNum, config) {
  return async (dispatch) => {
    await axios
      .delete(`${baseUrl}/footballreply/delete/${talkReplyNum}`, config3)
      .then((response) => response.data);
  };
}

export const replyActions = {
  getReplyList,
  replyCreate,
  replyDelete,
};
