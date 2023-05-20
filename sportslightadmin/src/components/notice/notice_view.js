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
      <table className="table " style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width="10%">글쓴이</th>
            <td width="*">
              {noticeDetail["adminzDTO"]
                ? noticeDetail["adminzDTO"]["adminProfile"]
                : null}
            </td>

            <th width="10%">작성일자</th>
            <td width="10%">{noticeDetail.writeDate}</td>

            <th width="10%">글 번호</th>
            <td width="10%">{noticeDetail.noticeNum}</td>
          </tr>

          <tr>
            <th>제목</th>
            <td colSpan="5">{noticeDetail.noticeTitle}</td>
          </tr>

          <tr>
            <th>내용</th>
            <td
              colSpan="5"
              rows="15"
              cpls="100"
              style={{ whiteSpace: "pre-line" }}
            >
              {noticeDetail.noticeContent}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="text-center2">
        <Link
          className="btn btn-dark"
          to={`/admin/notice/list/${pv.currentPage}`}
        >
          리스트
        </Link>

        <Link className="btn btn-dark" to={`/admin/notice/update/${num}`}>
          수정
        </Link>

        <button className="btn btn-dark" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default NoticeView;
