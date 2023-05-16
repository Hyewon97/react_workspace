import { useDispatch, useSelector } from "react-redux";
import { memberzActions } from "../../reduxs/actions/memberz_action";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TableRow from "./table_row";
import PageNavigation from "./page_nav";

const MemberzList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { currentPage } = useParams();
  const memberzList = useSelector((state) => state.memberz.memberzList);

  const pv = useSelector((state) =>
    state.memberz.pv ? state.memberz.pv : { currentPage: 1 }
  );

  const getMemberzList = (currentPage) => {
    dispatch(memberzActions.getMemberzList(currentPage));
    navigator(`/admin/member/list/${currentPage}`);
  };

  useEffect(() => {
    getMemberzList(currentPage);
  }, []); // 한번만 요청이 되도록 설정

  return (
    <div>
      <h3 className="text-center">회원 목록</h3>
      <table className="table table-hover" style={{ marginTop: 80 }}>
        <colgroup>
          <col width="10%" />
          <col width="*%" />
          <col width="30%" />
          <col width="12%" />
          <col width="12%" />
          <col width="12%" />
        </colgroup>

        <thead>
          <tr>
            <th>회원 번호</th>
            <th>회원 이메일</th>
            <th>회원 닉네임</th>
            <th>가입일</th>
            <th>탈퇴여부</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {memberzList &&
            memberzList.map((memberz) => {
              return <TableRow memberz={memberz} key={memberz.num} />;
            })}
        </tbody>
      </table>

      {pv ? <PageNavigation getMemberzList={getMemberzList} /> : ""}
    </div>
  );
};

export default MemberzList;
