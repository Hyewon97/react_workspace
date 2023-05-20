import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { noticeActions } from "../../reduxs/actions/notice_action";

const NoticeUpdate = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { noticeNum } = useParams();

  const [inputs, setInputs] = useState({
    noticeTitle: "",
    noticeContent: "",
  });

  const { noticeTitle, noticeContent } = inputs;

  const notice = useSelector((state) => state.notice.noticeDetail);
  const pv = useSelector((state) => state.notice.pv);

  useEffect(() => {
    setInputs(notice);
  }, []);

  const handleValueChange = (e) => {
    e.preventDefault();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setInputs((prev) => {
      return { ...prev, ...nextState };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("noticeNum", noticeNum);
    formData.append("noticeTitle", noticeTitle);
    formData.append("noticeContent", noticeContent);
    formData.append("currentPage", pv.currentPage);

    // 인증토큰을 가져와서 확인함.
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await dispatch(noticeActions.getNoticeUpdate(formData, config));

    // 초기화 시켜주기 위해서
    setInputs({
      noticeTitle: "",
      noticeContent: "",
    });

    // 글 수정 후 리스트로 이동
    navigator(`/admin/notice/list/${pv.currentPage}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInputs(notice);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigator(-1);
  };

  return (
    <div>
      <form name="frm" encType="multipart/form-data">
        <table className="table" style={{ marginTop: 20 }}>
          <tbody>
            <tr>
              <th width="18%">글쓴이</th>
              <td>
                {notice["adminzDTO"]
                  ? notice["adminzDTO"]["adminProfile"]
                  : null}
              </td>
              <th width="20%">등록일</th>
              <td>{notice.writeDate}</td>

              <th width="20%">글 고유 번호</th>
              <td>{notice.noticeNum}</td>
            </tr>

            <tr>
              <th>제목</th>
              <td colSpan="5">
                <input
                  type="text"
                  name="noticeTitle"
                  id="noticeTitle"
                  defaultValue={notice.noticeTitle}
                  value={noticeTitle}
                  onChange={handleValueChange}
                  style={{ width: "822px" }}
                />
              </td>
            </tr>

            <tr>
              <th>내용</th>
              <td colSpan="5">
                <textarea
                  name="noticeContent"
                  id="noticeContent"
                  rows="15"
                  cols="100"
                  defaultValue={notice.noticeContent}
                  value={noticeContent}
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="text-center2">
          <button className="btn btn-dark" onClick={handleUpdate}>
            수정
          </button>
          <button className="btn btn-dark" onClick={handleReset}>
            취소
          </button>
          <button className="btn btn-dark" onClick={handleBack}>
            뒤로
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeUpdate;
