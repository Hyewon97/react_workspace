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
  console.log(videoDetail.leagueNum);
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
      <table className="table" style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width="20%">비디오 번호</th>
            <td colSpan="3">{videoDetail.videoNum}</td>
          </tr>

          <tr>
            <th>비디오 제목</th>
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
            <th>팀1 </th>
            <td colSpan="3">{videoDetail.teamNum1}</td>
          </tr>

          <tr>
            <th>팀2 </th>
            <td colSpan="3">{videoDetail.teamNum2}</td>
          </tr>

          <tr>
            <th>리그 </th>
            <td colSpan="3">
              {videoDetail.leagueNum === 1
                ? "프리미어리그"
                : videoDetail.leagueNum === 2
                ? "라리가"
                : videoDetail.leagueNum === 3
                ? "분데스리가"
                : videoDetail.leagueNum === 4
                ? "세리에 A"
                : videoDetail.leagueNum === 5
                ? "리그 1"
                : videoDetail.leagueNum === 6
                ? "UCL(챔피언스리그)"
                : videoDetail.leagueNum === 7
                ? "UEL(유로파리그)"
                : videoDetail.leagueNum === 8
                ? "k 리그 1"
                : "k 리그 2"}
            </td>
          </tr>
        </tbody>
      </table>

      <Link className="btn btn-dark" to={`/admin/video/list/${pv.currentPage}`}>
        리스트
      </Link>

      <div className="text-center2">
        <Link className="btn btn-dark" to={`/admin/video/update/${videoNum}`}>
          수정
        </Link>

        <button className="btn btn-dark" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default VideoView;
