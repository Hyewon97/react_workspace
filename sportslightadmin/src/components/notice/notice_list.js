import { useDispatch, useSelector } from "react-redux";
import { noticeActions } from "../../reduxs/actions/notice_action";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TableRow from "./table_row";
import PageNavigation from "./page_nav";

const NoticeList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { currentPage } = useParams();
  const noticeList = useSelector((state) => state.notice.noticeList);

  const pv = useSelector((state) =>
    state.notice.pv ? state.notice.pv : { currentPage: 1 }
  );

  const getNoticeList = (currentPage) => {
    dispatch(noticeActions.getNoticeList(currentPage));
    navigator(`/admin/notice/list/${currentPage}`);
  };

  useEffect(() => {
    getNoticeList(currentPage);
  }, []); // 한번만 요청이 되도록 설정

  return (
    <div>
      <h3 className="text-center">공지 목록</h3>

      <Link className="btn btn-outline-secondary" to="/admin/notice/write">
        글쓰기
      </Link>

      <table className="table table-hover" style={{ marginTop: 80 }}>
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
            <th>작성일자</th>
          </tr>
        </thead>

        <tbody>
          {noticeList &&
            noticeList.map((notice) => {
              return <TableRow notice={notice} key={notice.num} />;
            })}
        </tbody>
      </table>
      {pv ? <PageNavigation getNoticeList={getNoticeList} /> : ""}
    </div>
  );
};

export default NoticeList;
