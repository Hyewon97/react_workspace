import axios from "axios";
import { baseURL } from "../../apiurl";
import { videoReducers } from "../reducers/video_reducer";

function getVideoList(currentPage) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseURL}/admin/video/list/${currentPage}`)
      .then((response) => response.data); // 값 받기

    console.log(data);
    dispatch(videoReducers.getVideoList({ data }));
  };
}

function getVideoDetail(videoNum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseURL}/admin/video/view/${videoNum}`, config)
      .then((response) => response.data);
    dispatch(videoReducers.getVideoDetail({ data }));
  };
}

function getVideoUpdate(formData, config) {
  return async () => {
    await axios
      .put(`${baseURL}/admin/video/update`, formData, config)
      .then((response) => response.data);
  };
}

function getVideoDelete(videoNum, config) {
  return async (dispatch) => {
    await axios
      .delete(`${baseURL}/admin/video/delete/${videoNum}`, config)
      .then((response) => response.data);
  };
}

export const videoActions = {
  getVideoList,
  getVideoDetail,
  getVideoUpdate,
  getVideoDelete,
};
