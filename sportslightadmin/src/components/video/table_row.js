import { Link } from "react-router-dom";
import { baseURL } from "../../apiurl";
import axios from "axios";
const TableRow = (props) => {
  const { video } = props;

  return (
    <tr>
      <td>{video.videoNum}</td>
      <td>
        <Link to={`${video.videoUrl}`}>
          <img src={`${video.thumbnailUrl}`} />
        </Link>
      </td>
      {/* <td>{video.thumbnailUrl}</td> */}

      <td>
        <Link to={`/admin/video/view/${video.videoNum}`}>
          {video.videoName}
        </Link>
      </td>

      <td>{video.videoType}</td>
      <td></td>
    </tr>
  );
};

export default TableRow;
