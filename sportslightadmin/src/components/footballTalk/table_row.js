import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../apiurl";
import axios from "axios";
import { useDispatch } from "react-redux";

const TableRow = (props) => {
  const { footballTalk } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 글 삭제
  const footballTalkdel = async () => {
    console.log(
      "football list의 footballTalk.talkNum : " + footballTalk.talkNum
    );
    await axios.delete(
      `${baseURL}/admin/footballTalk/delete/${footballTalk.talkNum}`
    );
    window.location.reload();
  };

  const linkToComments = () => {
    // console.log(
    //   "footballTalk list의 footballTalk.talkNum : " + footballTalk.talkNum
    // );
    navigate(`/admin/footballTalkReply/list/${footballTalk.talkNum}/1`); // 주소 임시 폐쇄
  };

  return (
    <tr>
      <td>{footballTalk.talkNum}</td>
      <td>
        {footballTalk["memberzDTO"]
          ? footballTalk["memberzDTO"]["memberProfile"]
          : null}
      </td>

      <td>
        {/* <Link to={`/admin/video/view/${video.videoNum}`}>
          {video.videoName}
        </Link> */}
        {footballTalk.leagueNum}
      </td>

      <td>{footballTalk.talkTitle}</td>
      <td>{footballTalk.talkContent}</td>
      <td>{footballTalk.regDate}</td>
      <td>
        <button className="btn btn-outline-info" onClick={linkToComments}>
          이동
        </button>
      </td>
      <td>
        <button className="btn btn-outline-danger" onClick={footballTalkdel}>
          글 삭제
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
