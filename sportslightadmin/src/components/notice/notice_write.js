import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { noticeActions } from "../../reduxs/actions/notice_action";

const NoticeWrite = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    noticeTitle: "",
    noticeContent: "",
  });

  const { noticeTitle, noticeContent } = inputs;

  const pv = useSelector((state) =>
    state.notice.pv ? state.notice.pv : { currentPage: 1 }
  );

  const noticeDetail = useSelector((state) => state.notice.noticeDetail);

  // 일반 데이터
  const handleValueChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 세션에서 로그인 정보 가져오기
    const formData = new FormData();
    formData.append("noticeTitle", noticeTitle);
    formData.append("noticeContent", noticeContent);
    formData.append("adminEmail", localStorage.getItem("adminEmail"));
    formData.append("adminNum", localStorage.getItem("adminNum"));

    const config = {
      headers: {
        "noticeContent-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    console.log(localStorage.getItem("Authorization"));

    await dispatch(noticeActions.getNoticeWrite(formData, config));

    // 초기화 시켜주기 위해서
    setInputs({
      noticeTitle: "",
      noticeContent: "",
    });

    // 글 작성후 첫페이지로 이동 (공지사항 리스트)
    navigator(
      `/admin/notice/list/${
        pv.currentPage ? pv.currentPage : { currentPage: 1 }
      }`
    );
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td width="20%" align="center">
                작성자
              </td>
              <td>
                <input
                  type="text"
                  readOnly
                  value={localStorage.getItem("adminProfile")}
                  name="adminProfile"
                  style={{ border: "none" }}
                />
              </td>
            </tr>

            <tr>
              <td width="20%" align="center">
                제목
              </td>
              <td>
                <input
                  type="text"
                  name="noticeTitle"
                  value={noticeTitle}
                  onChange={handleValueChange}
                  style={{ width: "822px" }}
                />
              </td>
            </tr>

            <tr>
              <td width="20%" align="center">
                내용
              </td>
              <td>
                <textarea
                  name="noticeContent"
                  rows="15"
                  cols="100"
                  value={noticeContent}
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center2">
          <Link
            className="btn btn-dark"
            to={`/admin/notice/list/${pv.currentPage}`}
          >
            리스트
          </Link>
          <input type="submit" className="btn btn-dark" value="등록" />
        </div>
      </form>
    </>
  );
};

export default NoticeWrite;
