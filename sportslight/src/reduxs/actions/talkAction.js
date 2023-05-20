import axios from 'axios';
import { talkReducers } from '../reducers/talkReducer';
import { baseUrl } from '../../apiurl';

// config
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('Authorization'),
  },
};

function recentList(currentPage) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/footballtalk/talklist/${currentPage}`, config) //백엔드를 요청
      .then((response) => response.data);
    console.log(data);
    dispatch(talkReducers.recentList({ data }));
  };
}

function viewsList(currentPage) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/footballtalk/talklist/${currentPage}`, config) //백엔드를 요청
      .then((response) => response.data);
    console.log(data);
    dispatch(talkReducers.viewsList({ data }));
  };
}

function leagueList(leagueNum) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/footballtalk/leaguelist/${leagueNum}`, config) //백엔드를 요청
      .then((response) => response.data);
    console.log(data);
    dispatch(talkReducers.leagueList({ data }));
  };
}

//formData => 넘겨줄 데이터 / config => 옵션
function talkCreate(formData, config) {
  return async (dispatch) => {
    await axios
      .post(`${baseUrl}/footballtalk/create`, formData, config)
      .then((response) => response.data);
  };
}

function talkRead(talkNum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/footballtalk/read/${talkNum}`, config)
      .then((response) => response.data);
    dispatch(talkReducers.talkRead({ data }));
  };
}

function talkUpdate(formData, config) {
  return async (dispatch) => {
    await axios
      .put(`${baseUrl}/footballtalk/update`, formData, config)
      .then((response) => response.data);
  };
}

function talkDelete(talkNum, config) {
  return async (dispatch) => {
    await axios
      .delete(`${baseUrl}/footballtalk/delete/${talkNum}`, config)
      .then((response) => response.data);
  };
}

function talkDownload(filename) {
  return async (dispatch) => {
    const data = await axios
      .get(
        `${baseUrl}/footballtalk/download/${filename}`,
        {
          responseType: 'blob',
        },
        config
      )
      .then((response) => response.data);
    //dispatch(talkActions.talkDownload({ data }));
    return data;
  };
}

export const talkActions = {
  recentList,
  viewsList,
  leagueList,
  talkCreate,
  talkRead,
  talkUpdate,
  talkDelete,
  talkDownload,
};
