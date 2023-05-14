import { useSelector } from "react-redux";

const PageNavigation = ({ getBoardList }) => {
  // store에 저장되어 있으면 어디서든 데이터를 불러올 수 있다.
  const pv = useSelector((state) =>
    state.board.pv ? state.board.pv : { currentPage: 1 }
  );

  const pageNumbers = [];
  for (let i = pv.startPage; i < pv.endPage; i++) {
    pageNumbers.push(i); // 페이지에 대한 정보가 pageNumbers[]에 저장이 된다.
  }

  return (
    <nav arial-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={pv.startPage <= 1 ? "page-item disabled" : "page=item"}>
          <span
            className="page-link"
            onClick={() => getBoardList(pv.startPage - pv.blockPage)}
          >
            &laquo;
          </span>
        </li>

        {/* 반복문 사용해서 페이지 출력 */}
        {/* 현재 페이지 버튼? 에는 활성화 효과를 주고 다른 곳은 안준다. */}
        {/* 필요한 스타일 있으면 부트스트랩에서 넣으시라 */}
        {pageNumbers.map((pnum, idx) => (
          <li
            key={pnum}
            className={pv.currentPage === pnum ? "page-item active" : null}
            aria-current={pv.currentPage === pnum ? "page" : null}
          >
            {/* 클릭이란 이벤트가 발생되면 해당 페이지로 이동하라 */}
            {/* <a href="#!" onClick={() => getBoardList(pnum)}>
              <span className="page-link">{pnum}</span>
            </a> */}
            <span className="page-link" onClick={() => getBoardList(pnum)}>
              {pnum}
            </span>
          </li>
        ))}

        <li
          className={
            pv.endPage >= pv.totalPage ? "page-item disabled" : "page-item"
          }
        >
          {/* <a
            href="#!"
            className="page-link"
            onClick={() => getBoardList(pv.startPage + pv.blockPage)}
          >
            &raquo;
          </a> */}
          <span
            className="page-link"
            onClick={() => getBoardList(pv.startPage + pv.blockPage)}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;
