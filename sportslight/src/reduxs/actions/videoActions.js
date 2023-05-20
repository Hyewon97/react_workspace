import axios from 'axios';
import { baseUrl } from '../../apiurl';
import { videoReducers } from '../reducers/videoReducers';

// config
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('Authorization'),
  },
};
const config3 = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Authorization'),
  },
};

const memberNum = localStorage.getItem('memberNum');

function getVideoList() {
  return async (dispatch) => {
    const data = await axios
      .post(`${baseUrl}/main`, memberNum, config3) //백엔드에 요청
      .then((response) => response.data);
    console.log(data);
    // dispatch({ type: "GET_VIDEO_LIST", payload: { data } });
    dispatch(videoReducers.getVideoList({ data }));
  };
}

function getSearchList(searchWord) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/search/${searchWord}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(videoReducers.getSearchList({ data }));
  };
}

function getLeagueVideoList() {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/category`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(videoReducers.getLeagueVideoList({ data }));
  };
}

export const videoActions = {
  getVideoList,
  getSearchList,
  getLeagueVideoList,
};
