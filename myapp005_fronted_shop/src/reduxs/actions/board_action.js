// 어디에 접근해서 어떤 데이터를 가지고 와야 하는지 정의

import axios from "axios";
import { baseURL } from "../../apiurl";
import { boardReducers } from "../reducers/board_reducer";
//
function getBoardList(currentPage) {
  // 함수명 없이 바로 사용한다.
  // board_reducer에 있는 친구를 사용한다.
  return async (dispatch) => {
    ////경로를 써준다...백엔드를 요청하고 결과값을 받을때까지 기다린다.(await)
    const data = await axios
      .get(`${baseURL}/board/list/${currentPage}`)
      .then((response) => response.data); // 넘겨주는 값을 받을 때는 무조건 response.data를 사용한다.

    console.log(data);
    dispatch(boardReducers.getBoardList({ data }));
  };
}

function getBoardDetail(num) {
  return async (dispatch) => {
    //data 값을 reduce를 이용해서 store에 저장해야함
    const data = await axios
      .get(`${baseURL}/board/view/${num}`)
      .then((response) => response.data); // backend에서 /board/view/ 이렇게 요청하도록 되어있어서 이렇게 주소를 써줌 -> 결과값을 받아옴 .then()
    dispatch(boardReducers.getBoardDetail({ data }));
  };
}

//backend에서 결과값을 받아야하니 변수를 선언해주어야함
function getBoardDownload(upload) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseURL}/board/contentdownload/${upload}`, {
        responseType: "blob", // backend에서 stream을 통해서 받도록 "application/octet-stream" 이렇게 해두어서 이렇게 받아줘야함
      })
      .then((response) => response.data); // data에 담아서 넘겨줌
    // data 값을 reduce에 저장시켜줘야함 -> store에 저장하기 위해서
    //dispatch(boardActions.getBoardDownload(data)); // 이렇게 넘겨줘도 가능
    return data; // store에 저장안하고 일회성으로 할 거면 이렇게 하고 board_view.js에서만 사용하게끔 할 수 있음
  };
}

function getBoardDelete(num) {
  return async (dispatch) => {
    await axios
      .delete(`${baseURL}/board/delete/${num}`)
      .then((response) => response.data);
  };
}

function getBoardWrite(formData, config) {
  return async () => {
    await axios
      .post(`${baseURL}/board/write`, formData, config)
      .then((response) => response.data);
  };
}

function getBoardUpdate(formData, config) {
  return async () => {
    await axios
      .put(`${baseURL}/board/update`, formData, config)
      .then((response) => response.data);
  };
}

// 어디에 있는거를 호출하는지 이름으로 구분 가능하다. 어느 라이브러리에 있는 어느 함수인지
export const boardActions = {
  getBoardList,
  getBoardDetail,
  getBoardDownload,
  getBoardDelete,
  getBoardWrite,
  getBoardUpdate,
}; // 여기에 등록을 해주어야 외부에서 접근할 수 있음

// 바로 호출할거면
// export const getBoardList; // 이런 식으로 쓰는듯
