import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './notice.module.css';

const Notice = () => {
  // 세부페이지 호출 함수
  const viewPage = (noticeNum) => {
    window.location.href = `/noticeview/${noticeNum}`;
  };

  // 리스트 useState
  const [noticeList, setNoticeList] = useState([]);

  // config
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem('Authorization'),
    },
  };

  // 리스트 호출
  const getNoticeList = async () => {
    const response = await axios.get(`http://localhost:8090/notice`, config);
    console.log(response.data);
    setNoticeList(response.data);
  };

  // pagination
  const noticePerPage = 10; // 한번에 보여줄 비디오 개수
  const noticeChunks = []; // 페이지에 들어갈 비디오 리스트

  for (let i = 0; i < noticeList.length; i += noticePerPage) {
    noticeChunks.push(noticeList.slice(i, i + noticePerPage));
  }

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 설정
  const [pageRange, setPageRange] = useState([1, 10]); // 1부터 10까지의 페이지를 표시
  const newNoticeList = noticeChunks[currentPage - 1];

  // 페이지네이션 함수
  const Pagination = ({ totalPages }) => {
    const pageNumbers = []; // 페이지 리스트(숫자) 선언

    // 페이지 숫자 배열 생성
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    // 뒤로 버튼
    const handlePrev = () => {
      setCurrentPage((currentPage) => currentPage - 10);
      setPageRange([pageRange[0] - 10, pageRange[1] - 10]);
    };

    // 앞으로 버튼
    const handleNext = () => {
      if (currentPage + 10 > pageNumbers.length) {
        setCurrentPage(pageNumbers.length);
      } else {
        setCurrentPage((currentPage) => currentPage + 10);
      }
      setPageRange([pageRange[0] + 10, pageRange[1] + 10]);
    };

    // 페이지네이션 리턴
    return (
      <ul>
        {pageRange[0] > 1 && (
          <li>
            <button onClick={handlePrev}>&#171;</button>
          </li>
        )}

        {pageNumbers.map(
          (pageNumber) =>
            pageNumber >= pageRange[0] &&
            pageNumber <= pageRange[1] && (
              <li key={pageNumber}>
                <button
                  onClick={() => {
                    setCurrentPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </button>
              </li>
            )
        )}

        {pageRange[1] < totalPages && (
          <li className={style.button}>
            <button onClick={handleNext}>&#187;</button>
          </li>
        )}
      </ul>
    );
  };

  // useEffect
  useEffect(() => {
    getNoticeList();
  }, []);

  return (
    <div className={style.wrap}>
      <>
        <div className={style.noticetitle}>
          <p style={{ padding: '50px' }}>공지사항</p>
        </div>
        <div className={style.content}>
          <table style={{ width: '1100px' }}>
            <thead>
              <tr className={style.tr1}>
                <th style={{ color: 'rgb(207, 207, 207)' }}>번호</th>
                <th className={style.date2}>작성일자</th>
                <th style={{ color: 'rgb(207, 207, 207)' }}>제목</th>
              </tr>
            </thead>
            <tbody>
              {newNoticeList &&
                newNoticeList.map((item, idx) => {
                  return (
                    <tr className={style.tr1} key={idx}>
                      <td className={style.num}>{item.noticeNum}</td>
                      <td className={style.date}>{item.writeDate}</td>
                      <td
                        className={style.title}
                        onClick={() => viewPage(item.noticeNum)}
                      >
                        <div className={style.titlehover}>
                          {item.noticeTitle}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Pagination totalPages={noticeChunks.length} />
        </div>
      </>
    </div>
  );
};

export default Notice;
