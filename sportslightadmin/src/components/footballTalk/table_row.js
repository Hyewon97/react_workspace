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

      {/* <td>{footballTalk.leagueNum}</td> */}
      <td>
        {footballTalk.leagueNum === 1
          ? "프리미어리그"
          : footballTalk.leagueNum === 2
          ? "라리가"
          : footballTalk.leagueNum === 3
          ? "분데스리가"
          : footballTalk.leagueNum === 4
          ? "세리에 A"
          : footballTalk.leagueNum === 5
          ? "리그 1"
          : footballTalk.leagueNum === 6
          ? "UCL(챔피언스리그)"
          : footballTalk.leagueNum === 7
          ? "UEL(유로파리그)"
          : footballTalk.leagueNum === 8
          ? "k 리그 1"
          : "k 리그 2"}
      </td>

      <td>{footballTalk.talkTitle}</td>
      <td>{footballTalk.talkContent}</td>
      {/* <td>{footballTalk.regDate}</td> */}
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
