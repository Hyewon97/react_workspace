import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TableRow from "./table_row";
import PageNavigation from "./page_nav";
import { footballTalkActions } from "../../reduxs/actions/footballTalk_action";

const FootballTalkList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { currentPage } = useParams();
  const footballTalkList = useSelector(
    (state) => state.footballTalk.footballTalkList
  );

  const pv = useSelector((state) =>
    state.footballTalk.pv ? state.footballTalk.pv : { currentPage: 1 }
  );

  const getFootballTalkList = (currentPage) => {
    dispatch(footballTalkActions.getFootballTalkList(currentPage));
    navigator(`/admin/footballTalk/list/${currentPage}`);
  };

  useEffect(() => {
    getFootballTalkList(currentPage);
  }, []); // 한번만 요청이 되도록 설정

  return (
    <div>
      <h3 className="text-center">토크 목록</h3>
      {/* 테이블 스타일 변경 */}
      <table className="table table-hover" style={{ marginTop: 80 }}>
        <colgroup>
          <col width="5%" />
          <col width="13%" />
          <col width="13%" />
          <col width="*%" />
          <col width="*%" />
          <col width="6%" />
          <col width="6%" />
        </colgroup>

        <thead>
          <tr>
            <th>번호</th>
            <th>회원</th>
            <th>리그</th>
            <th>제목</th>
            <th>내용</th>
            <th>댓글</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {footballTalkList &&
            footballTalkList.map((footballTalk) => {
              return (
                <TableRow
                  footballTalk={footballTalk}
                  key={footballTalk.talkNum}
                />
              );
            })}
        </tbody>
      </table>

      {pv ? <PageNavigation getFootballTalkList={getFootballTalkList} /> : ""}
    </div>
  );
};

export default FootballTalkList;
