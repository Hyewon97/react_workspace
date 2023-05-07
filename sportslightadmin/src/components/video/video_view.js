import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { videoActions } from "../../reduxs/actions/video_action";
import { useEffect } from "react";

const VideoView = () => {
  const { videoNum } = useParams();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const videoDetail = useSelector((state) => state.video.videoDetail);
  const pv = useSelector((state) => state.video.pv);

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  useEffect(() => {
    dispatch(videoActions.getVideoDetail(videoNum, config));
  }, [dispatch, videoNum]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(videoActions.getVideoDelete(videoNum, config));

    navigator(`/admin/video/list/${pv.currentPage}`);
  };

  return (
    <div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width="20%">영상 번호</th>
            <td colSpan="3">{videoDetail.videoNum}</td>
          </tr>

          <tr>
            <th>영상 제목</th>
            <td colSpan="3">{videoDetail.videoName}</td>
          </tr>

          <tr>
            <th>썸네일 주소</th>
            <td colSpan="3">{videoDetail.thumbnailUrl}</td>
          </tr>

          <tr>
            <th>비디오 주소</th>
            <td colSpan="3">{videoDetail.videoUrl}</td>
          </tr>

          <tr>
            <th>동영상 타입</th>
            <td colSpan="3">{videoDetail.videoType}</td>
          </tr>

          <tr>
            <th>팀1 </th>
            <td colSpan="3">{videoDetail.teamNum1}</td>
          </tr>

          <tr>
            <th>팀2 </th>
            <td colSpan="3">{videoDetail.teamNum2}</td>
          </tr>

          <tr>
            <th>시즌 </th>
            <td colSpan="3">{videoDetail.seasonNum}</td>
          </tr>
        </tbody>
      </table>

      <Link
        className="btn btn-primary"
        to={`/admin/video/list/${pv.currentPage}`}
      >
        리스트
      </Link>

      {/* {localStorage.getItem("memberEmail") ===
      (boardDetail["memberEmail"] ? boardDetail["memberEmail"] : null) ? (
        <> */}
      <Link className="btn btn-primary" to={`/admin/video/update/${videoNum}`}>
        수정
      </Link>

      <button className="btn btn-primary" onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
};

export default VideoView;
