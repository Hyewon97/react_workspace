import { baseURL } from "../../apiurl";
import axios from "axios";

const TableRow = (props) => {
  const { memberz } = props;

  // 공사중
  // 회원 탈퇴 함수 선언
  // const updateMemberLeave = async () => {
  //   //if (memberz.memberLeave === "T") alert("이미 탈퇴된 회원입니다.");
  //   //else

  //   await axios(`${baseURL}/admin/member/list/update/${memberz.memberNum}`);

  //   alert("회원 탈퇴 완료");
  //   console.log(memberz.memberNum);
  // };
  //
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
      <td>
        {/* <Link to={`/admin/member/view/${notice.noticeNum}`}> */}
        {memberz.memberEmail}
        {/* </Link> */}
      </td>
      <td>{memberz.memberProfile}</td>
      <td>{memberz.memberReg}</td>

      {/* <td>{memberz.memberLeave === "T" ? "탈퇴 회원" : "활동 회원"}</td>  아래 코드로 사용 가능*/}
      {/* 이 부분에 아이콘 추가했으면 좋겠음 */}
      <td>{memberz.memberEmail === "Null" ? "탈퇴 회원" : "활동 회원"}</td>

      <td>
        <button className="btn btn-outline-danger" onClick={updateMemberLeave}>
          탈퇴
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
