import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { noticeActions } from "../../reduxs/actions/notice_action";

const NoticeView = () => {
  const { num } = useParams();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const noticeDetail = useSelector((state) => state.notice.noticeDetail); //noticeDetail에 있는 값 호출

  const pv = useSelector((state) => state.notice.pv);

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  // 맨 마지막에 처리됨
  useEffect(() => {
    dispatch(noticeActions.getNoticeDetail(num, config));
  }, [dispatch, num]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(noticeActions.getNoticeDelete(num, config));

    navigator(`/admin/notice/list/${pv.currentPage}`);
  };

  return (
    <div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width="20%">글쓴이</th>
            <td>
              {noticeDetail["adminzDTO"]
                ? noticeDetail["adminzDTO"]["adminProfile"]
                : null}
            </td>
          </tr>

          <tr>
            <th>제목</th>
            <td colSpan="3">{noticeDetail.noticeTitle}</td>
          </tr>

          <tr>
            <th>사용자 고유번호</th>
            <td colSpan="3">{noticeDetail.adminNum}</td>
          </tr>

          <tr>
            <th>글 고유번호</th>
            <td colSpan="3">{noticeDetail.noticeNum}</td>
          </tr>

          <tr>
            <th>작성일자</th>
            <td colSpan="3">{noticeDetail.writeDate}</td>
          </tr>

          <tr>
            <th>내용</th>
            <td colSpan="3">{noticeDetail.noticeContent}</td>
          </tr>
        </tbody>
      </table>

      <Link
        className="btn btn-primary"
        to={`/admin/notice/list/${pv.currentPage}`}
      >
        리스트
      </Link>

      {/* {localStorage.getItem("memberEmail") ===
      (boardDetail["memberEmail"] ? boardDetail["memberEmail"] : null) ? (
        <> */}
      <Link className="btn btn-primary" to={`/admin/notice/update/${num}`}>
        수정
      </Link>

      <button className="btn btn-primary" onClick={handleDelete}>
        삭제
      </button>
      {/* </> */}
      {/* ) : null} */}
    </div>
  );
};

export default NoticeView;
