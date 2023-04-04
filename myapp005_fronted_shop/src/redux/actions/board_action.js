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

// 어디에 있는거를 호출하는지 이름으로 구분 가능하다. 어느 라이브러리에 있는 어느 함수인지
export const boardActions = { getBoardList };

// 바로 호출할거면
// export const getBoardList; // 이런 식으로 쓰는듯
