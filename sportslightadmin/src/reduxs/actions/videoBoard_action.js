import axios from "axios";
import { baseURL } from "../../apiurl";
import { videoBoardReducers } from "../reducers/videoBoard_reducer";

function getVideoBoardList(currentPage, currentVideoNum) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseURL}/admin/videoBoard/list/${currentVideoNum}/${currentPage}`)
      .then((response) => response.data); // 값 받기

    console.log(data);
    dispatch(videoBoardReducers.getVideoBoardList({ data }));
  };
}

export const videoBoardActions = {
  getVideoBoardList,
  getCurrentVideoBoardList: (currentVideoNum) =>
    getVideoBoardList(1, currentVideoNum),
};
