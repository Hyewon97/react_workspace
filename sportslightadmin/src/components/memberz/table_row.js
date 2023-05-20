import { baseURL } from "../../apiurl";
import axios from "axios";

const TableRow = (props) => {
  const { memberz } = props;

  const updateMemberLeave = async () => {
    console.log(memberz.memberNum);
    if (memberz.memberLeave === "T") alert("이미 탈퇴된 회원입니다.");
    else {
      await axios.post(
        `${baseURL}/admin/member/list/update/${memberz.memberNum}`
      );
      alert("회원 탈퇴 완료");
      window.location.reload(); // 페이지 새로고침
    }
  };

  //

  return (
    <tr>
      <td>{memberz.memberNum}</td>
      <td>{memberz.memberEmail}</td>
      <td>{memberz.memberProfile}</td>
      <td>{memberz.memberReg}</td>

      <td>
        {memberz.memberEmail === "Null" ? (
          <img src="/images/userb.png" width="30" height="30" />
        ) : (
          <img src="/images/usera.png" width="30" height="30" />
        )}
      </td>

      <td>
        <button className="btn btn-outline-danger" onClick={updateMemberLeave}>
          탈퇴
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
