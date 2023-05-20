import { useDispatch, useSelector } from "react-redux";
import { footballTalkReplyActions } from "../../reduxs/actions/footballTalkReply_action";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TableRow from "./table_row";
import PageNavigation from "./page_nav";

const FootballTalkReplyList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { currentPage, currentTalkNum } = useParams();
  const footballTalkReplyList = useSelector(
    (state) => state.footballTalkReply.footballTalkReplyList
  );

  const pv = useSelector((state) =>
    state.footballTalkReply.pv ? state.footballTalkReply.pv : { currentPage: 1 }
  );

  const getFootballTalkReplyList = async (currentPage, talkNum) => {
    dispatch(
      footballTalkReplyActions.getFootballTalkReplyList(currentPage, talkNum)
    );
    navigator(`/admin/footballTalkReply/list/${talkNum}/${currentPage}`);
  };

  useEffect(() => {
    getFootballTalkReplyList(currentPage, currentTalkNum);
  }, [currentPage, currentTalkNum]); // currentPage와 currentTalkNum 바뀔 때마다 실행되도록 설정

  return (
    <div>
      <h3 className="text-center">토크 댓글</h3>
      <Link className="btn btn-secondary" to="/admin/footballTalk/list/1">
        토크 목록
      </Link>
      <table className="table table-hover" style={{ marginTop: 80 }}>
        <colgroup>
          <col width="10%" />
          <col width="8%" />
          <col width="13%" />
          <col width="*%" />
          <col width="8%" />
          <col width="12%" />
        </colgroup>

        <thead>
          <tr>
            <th>게시판 번호</th>
            <th>댓글 번호</th>
            <th>회원</th>
            <th>댓글 내용</th>
            <th>작성일자</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {footballTalkReplyList &&
            footballTalkReplyList.map((footballTalkReply) => {
              return (
                <TableRow
                  footballTalkReply={footballTalkReply}
                  key={footballTalkReply.talkReplyNum}
                />
              );
            })}
        </tbody>
      </table>

      {pv ? (
        <PageNavigation getFootballTalkReplyList={getFootballTalkReplyList} />
      ) : (
        ""
      )}
    </div>
  );
};

export default FootballTalkReplyList;
