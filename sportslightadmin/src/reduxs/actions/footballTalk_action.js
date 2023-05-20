import axios from "axios";
import { baseURL } from "../../apiurl";
import { footballTalkReducers } from "../reducers/footballTalk_reducer";

function getFootballTalkList(currentPage) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseURL}/admin/footballTalk/list/${currentPage}`)
      .then((response) => response.data); // 값 받기

    console.log(data);
    dispatch(footballTalkReducers.getFootballTalkList({ data }));
  };
}

export const footballTalkActions = {
  getFootballTalkList,
};
