import axios from "axios";
import { baseURL } from "../../apiurl";
import { noticeReducers } from "../reducers/notice_reducer";
//
function getNoticeList(currentPage) {
  return async (dispatch) => {
    // 백엔드에 값 요청
    const data = await axios
      .get(`${baseURL}/admin/notice/list/${currentPage}`)
      .then((response) => response.data); // 값 받기

    console.log(data);
    dispatch(noticeReducers.getNoticeList({ data }));
  };
}

function getNoticeDetail(noticeNum, config) {
  return async (dispatch) => {
    //data 값을 reduce를 이용해서 store에 저장해야함
    const data = await axios
      .get(`${baseURL}/admin/notice/view/${noticeNum}`, config)
      .then((response) => response.data);
    dispatch(noticeReducers.getNoticeDetail({ data }));
  };
}

function getNoticeDelete(noticeNum, config) {
  return async (dispatch) => {
    await axios
      .delete(`${baseURL}/admin/notice/delete/${noticeNum}`, config)
      .then((response) => response.data);
  };
}

function getNoticeWrite(formData, config) {
  return async () => {
    await axios
      .post(`${baseURL}/admin/notice/write`, formData, config)
      .then((response) => response.data);
  };
}

function getNoticeUpdate(formData, config) {
  return async () => {
    await axios
      .put(`${baseURL}/admin/notice/update`, formData, config)
      .then((response) => response.data);
  };
}

// 어디에 있는거를 호출하는지 이름으로 구분 가능하다. 어느 라이브러리에 있는 어느 함수인지
export const noticeActions = {
  getNoticeList,
  getNoticeDetail,
  getNoticeDelete,
  getNoticeWrite,
  getNoticeUpdate,
}; // 여기에 등록을 해주어야 외부에서 접근할 수 있음

// 바로 호출할거면
// export const getBoardList; // 이런 식으로 쓰는듯
