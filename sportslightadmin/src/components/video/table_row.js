import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../apiurl";
import axios from "axios";
import { useDispatch } from "react-redux";
import { videoReducers } from "../../reduxs/reducers/video_reducer";

const TableRow = (props) => {
  const { video } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 링크를 눌렀을 때 해당되는 헌줄 게시판으로 이동되도록 임시 링크 설정
  // const linkToComments = () => {
  //   console.log("video list의 video.videoNum : " + video.videoNum); // 비디오 넘 값은 제대로 출력 됨
  //   //window.location.href = `http://localhost:3000/admin/videoBoard/list/${video.videoNum}/1`;
  // };

  // const linkToComments = (videoNum) => {
  //   console.log("video list의 video.videoNum : " + videoNum);
  //   //window.location.href = `http://localhost:3000/admin/videoBoard/list/${videoNum}/1`;
  // };

  const linkToComments = () => {
    console.log("video list의 video.videoNum : " + video.videoNum);
    // dispatch(videoReducers.setCurrentVideoNum(video.videoNum));

    navigate(`/admin/videoBoard/list/${video.videoNum}/1`);
    // window.location.reload();
  };

  return (
    <tr>
      <td>{video.videoNum}</td>
      <td>
        <Link to={`${video.videoUrl}`}>
          <img src={`${video.thumbnailUrl}`} />
        </Link>
      </td>

      <td>
        <Link to={`/admin/video/view/${video.videoNum}`}>
          {video.videoName}
        </Link>
      </td>

      <td>
        {/* <button className="btn btn-outline-danger" onClick={linkToComments}>
          이동
        </button> */}
        {/* <button
          className="btn btn-outline-danger"
          onClick={() => linkToComments(video.videoNum)}
        >
          이동
        </button> */}
        <button className="btn btn-outline-info" onClick={linkToComments}>
          이동
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
