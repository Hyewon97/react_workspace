import { useDispatch, useSelector } from "react-redux";
import { videoActions } from "../../reduxs/actions/video_action";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TableRow from "./table_row";
import PageNavigation from "./page_nav";

const VideoList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { currentPage } = useParams();
  const videoList = useSelector((state) => state.video.videoList);

  const pv = useSelector((state) =>
    state.video.pv ? state.video.pv : { currentPage: 1 }
  );

  const getVideoList = (currentPage) => {
    dispatch(videoActions.getVideoList(currentPage));
    navigator(`/admin/video/list/${currentPage}`);
  };

  useEffect(() => {
    getVideoList(currentPage);
  }, []); // 한번만 요청이 되도록 설정

  return (
    <div>
      <h3 className="text-center">비디오 목록</h3>
      <table className="table" style={{ marginTop: 80 }}>
        <colgroup>
          <col width="5%" />
          <col width="20%" />
          <col width="*%" />
          <col width="10%" />
          <col width="5%" />
        </colgroup>

        <thead>
          <tr>
            <th>번호</th>
            <th>썸네일</th>
            <th>비디오 제목</th>
            <th>댓글</th>
          </tr>
        </thead>

        <tbody>
          {videoList &&
            videoList.map((video) => {
              return <TableRow video={video} key={video.videoNum} />;
            })}
        </tbody>
      </table>

      {pv ? <PageNavigation getVideoList={getVideoList} /> : ""}
    </div>
  );
};

export default VideoList;
