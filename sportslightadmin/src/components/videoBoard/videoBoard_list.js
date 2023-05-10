import { useDispatch, useSelector } from "react-redux";
import { videoBoardActions } from "../../reduxs/actions/videoBoard_action";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TableRow from "./table_row";
import PageNavigation from "./page_nav";

const VideoBoardList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { currentPage, currentVideoNum } = useParams();
  const videoBoardList = useSelector(
    (state) => state.videoBoard.videoBoardList
  );

  const pv = useSelector((state) =>
    state.videoBoard.pv ? state.videoBoard.pv : { currentPage: 1 }
  );

  const getVideoBoardList = async (currentPage, videoNum) => {
    dispatch(videoBoardActions.getVideoBoardList(currentPage, videoNum));
    navigator(`/admin/videoBoard/list/${videoNum}/${currentPage}`);
  };

  useEffect(() => {
    getVideoBoardList(currentPage, currentVideoNum);
  }, [currentPage, currentVideoNum]); // currentPage와 currentVideoNum이 바뀔 때마다 실행되도록 설정

  return (
    <div>
      <h3 className="text-center">한줄 게시판</h3>
      <Link className="btn btn-secondary" to="/admin/video/list/1">
        영상 목록
      </Link>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <colgroup>
          <col width="8%" />
          <col width="8%" />
          <col width="8%" />
          <col width="*%" />
          <col width="12%" />
        </colgroup>

        <thead>
          <tr>
            <th>동영상 번호</th>
            <th>게시판 번호</th>
            <th>작성자 번호</th>
            <th>내용</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {videoBoardList &&
            videoBoardList.map((videoBoard) => {
              return (
                <TableRow
                  videoBoard={videoBoard}
                  key={videoBoard.videoBoardNum}
                />
              );
            })}
        </tbody>
      </table>

      {pv ? <PageNavigation getMemberzList={getVideoBoardList} /> : ""}
    </div>
  );
};

export default VideoBoardList;
