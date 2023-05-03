import axios from "axios";
import { baseURL } from "../../apiurl";
import { memberzReducers } from "../reducers/memberz_reducer";
//
function getMemberzList(currentPage) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseURL}/admin/member/list/${currentPage}`)
      .then((response) => response.data); // 값 받기

    console.log(data);
    dispatch(memberzReducers.getMemberzList({ data }));
  };
}

export const memberzActions = {
  getMemberzList,
};
