import axios from "axios";
import { baseURL } from "../../apiurl";
import { videoBoardActions } from "../../reduxs/actions/videoBoard_action";
import { useDispatch } from "react-redux";

const TableRow = (props) => {
  const { videoBoard } = props;
  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const deleteVideoBoard = async () => {
    console.log(videoBoard.videoBoardNum);

    await axios.delete(
      `${baseURL}/admin/videoBoard/list/delete/${videoBoard.videoBoardNum}`
    );
    window.location.reload();
  };

  return (
    <tr>
      <td>{videoBoard.videoNum}</td>
      <td>{videoBoard.videoBoardNum}</td>
      <td>
        {videoBoard["memberzDTO"]
          ? videoBoard["memberzDTO"]["memberProfile"]
          : null}
      </td>
      <td>{videoBoard.videoReply}</td>
      <td>
        <button className="btn btn-outline-danger" onClick={deleteVideoBoard}>
          삭제
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
