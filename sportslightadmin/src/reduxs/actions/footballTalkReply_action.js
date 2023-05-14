import axios from "axios";
import { baseURL } from "../../apiurl";
import { footballTalkReplyReducers } from "../reducers/footballTalkReply_reducer";
//
function getFootballTalkReplyList(currentPage, currentTalkNum) {
  return async (dispatch) => {
    const data = await axios
      .get(
        `${baseURL}/admin/footballTalkReply/list/${currentTalkNum}/${currentPage}`
      )
      .then((response) => response.data); // 값 받기

    console.log(data);
    dispatch(footballTalkReplyReducers.getFootballTalkReplyList({ data }));
  };
}

export const footballTalkReplyActions = {
  getFootballTalkReplyList,
  getCurrentFootballTalkReplyList: (currentTalkNum) =>
    getFootballTalkReplyList(1, currentTalkNum),
};
