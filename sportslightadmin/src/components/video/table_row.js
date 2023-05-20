import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../apiurl";
import axios from "axios";
import { useDispatch } from "react-redux";
import { videoReducers } from "../../reduxs/reducers/video_reducer";

const TableRow = (props) => {
  const { video } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkToComments = () => {
    console.log("video list의 video.videoNum : " + video.videoNum);

    navigate(`/admin/videoBoard/list/${video.videoNum}/1`);
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
        <Link to={`/admin/video/view/${video.videoNum}`} className="linkStyle">
          {video.videoName}
        </Link>
      </td>

      <td>
        <button
          className="btn btn-outline-dark"
          onClick={linkToComments}
          style={{ marginTop: "65px" }}
        >
          이동
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
