// board_reducer에서 받아온 데이터를 사용하기

import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../redux/actions/board_action";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableRow from "./table_row";
import PageNavigation from "./page_nav";

const BoardList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { currentPage } = useParams(); // 받아 온 값을 아래에서 사용한다.
  const boardList = useSelector((state) => state.board.boardList); // board에 있는 boardList를 가지고 오겠다.

  // 페이징 처리
  // state.board.pv값이 있으면 그대로 없으면 1을 넣는다.
  const pv = useSelector((state) =>
    state.board.pv ? state.board.pv : { currentPage: 1 }
  );

  const getBoardList = (currentPage) => {
    dispatch(boardActions.getBoardList(currentPage));
    // navigator(`/board/list/${currentPage}`); // 강제적인 페이지 이동
  };

  useEffect(() => {
    getBoardList(currentPage); // 1번을 넘겨줌
  }, []); // 한번만 요청이 되도록 설정

  return (
    <div>
      <h3 className="text-center">게시판 목록</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <colgroup>
          <col width="8%" />
          <col width="*" />
          <col width="12%" />
          <col width="12%" />
        </colgroup>

        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody>
          {boardList &&
            boardList.map((board) => {
              return <TableRow board={board} key={board.num} />;
            })}
        </tbody>
        {/* 처음에는 0출력, 화면에 출력되는 렌더링이 끝나면 useEffect가 수행되면서 백엔드에 요청을 하게 됨(board_action.js에서) */}
      </table>

      {/* 페이징 처리.. 별도로 만들어서 함. src>page_nav.js */}
      {/* pv가 있으면 페이지 네비게이션을 나오게 하기. */}
      {pv ? <PageNavigation getBoardList={getBoardList} /> : ""}
    </div>
  );
};

export default BoardList;
