import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../reduxs/actions/board_action";

const BoardView = () => {
  const { num } = useParams(); // 번호에 해당되는 것을 db에서 가지고 와서 board_reducer.js에 있는 boardDetail을 이용해 담아서 store에 저장할 예정
  //console.log("num", num); // 번호 가지고 오는지 확인
  const dispatch = useDispatch();

  const navigator = useNavigate();

  const boardDetail = useSelector((state) => state.board.boardDetail); //boardDetail에 값이 저장되어 있어서 이렇게 호출가능

  const pv = useSelector((state) => state.board.pv);

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };
  //action에 있는 boardDetail 불러올 예정
  // 맨 마지막에 처리됨
  useEffect(() => {
    dispatch(boardActions.getBoardDetail(num, config));
  }, [dispatch, num]);

  // download
  // 동기화를 위해 async와 await를 사용해 감싸줬지만 안써도 가능
  const handleDownload = async () => {
    const boardFile = await dispatch(
      boardActions.getBoardDownload(boardDetail.upload)
    ); //boardDetail에 있는 첨부파일명 그대로 받아옴

    // dispatch(boardActions.getBoardDownload(boardDetail.upload));
    const fileName = boardDetail.upload.substring(
      boardDetail.upload.indexOf("_") + 1
    );

    console.log(fileName);

    //file의 내용을 읽어오는 작업
    const url = window.URL.createObjectURL(new Blob([boardFile]), {
      type: "application/octet-stream",
    });

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    link.style.cssText = "display:none";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(boardActions.getBoardDelete(num, config));
    // 삭제후 리스트 페이지로 이동하는 작업
    navigator(`/board/list/${pv.currentPage}`);
  };

  // 내용 뿌려줌
  return (
    <div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width="20%">글쓴이</th>
            <td>
              {boardDetail["membersDTO"]
                ? boardDetail["membersDTO"]["memberName"]
                : null}
            </td>
            <th width="20%">조회수</th>
            <td>{boardDetail.readcount}</td>
          </tr>

          <tr>
            <th>제목</th>
            <td colSpan="3">{boardDetail.subject}</td>
          </tr>

          <tr>
            <th>메일</th>
            <td colSpan="3">{boardDetail.memberEmail}</td>
          </tr>

          <tr>
            <th>내용</th>
            <td colSpan="3">{boardDetail.content}</td>
          </tr>

          <tr>
            <th>파일</th>
            <td colSpan="3">
              <button>
                {boardDetail.upload
                  ? boardDetail.upload.substring(
                      boardDetail.upload.indexOf("_") + 1
                    )
                  : null}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Link className="btn btn-primary" to={`/board/list/${pv.currentPage}`}>
        리스트
      </Link>
      <Link className="btn btn-primary" to={`/board/write/${boardDetail.num}`}>
        답변
      </Link>

      {localStorage.getItem("memberEmail") ===
      (boardDetail["memberEmail"] ? boardDetail["memberEmail"] : null) ? (
        <>
          <Link className="btn btn-primary" to={`/board/update/${num}`}>
            수정
          </Link>

          <button className="btn btn-primary" onClick={handleDelete}>
            삭제
          </button>
        </>
      ) : null}
    </div>
  );
};

export default BoardView;
