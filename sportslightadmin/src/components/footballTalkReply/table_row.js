import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../apiurl";
import axios from "axios";
import { useDispatch } from "react-redux";

const TableRow = (props) => {
  const { footballTalkReply } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 글 삭제
  const footballTalkReplydel = async () => {
    // console.log(
    //   "football list의 footballTalk.talkNum : " + footballTalkReply.memberNum
    // );
    await axios.delete(
      `${baseURL}/admin/footballTalkReply/list/delete/${footballTalkReply.talkReplyNum}`
    );
    window.location.reload();
  };

  return (
    <tr>
      <td>{footballTalkReply.talkNum}</td>
      <td>{footballTalkReply.talkReplyNum}</td>
      <td>{footballTalkReply.memberNum}</td>

      <td>{footballTalkReply.talkReplyContent}</td>
      <td>{footballTalkReply.regDate}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={footballTalkReplydel}
        >
          글 삭제
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
