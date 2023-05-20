import { useEffect, useState } from 'react';
import axios from 'axios';
import Style from './myTHF.module.css';

const MyFavorite = () => {
  // 즐겨찾기 비디오 useState
  const [favoriteVideo, setFavoriteVideo] = useState([]);

  // memberNum 지정
  const memberNum = localStorage.getItem('memberNum') * 1;

  // config
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem('Authorization'),
    },
  };

  // 즐겨찾기 동영상 호출
  const getFavoriteVideo = async () => {
    const formData = new FormData();
    formData.append('memberNum', memberNum);

    await axios
      .post(`http://localhost:8090/myvideo/favorite`, formData, config)
      .then((response) => {
        setFavoriteVideo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // pagination
  const videosPerPage = 12; // 한번에 보여줄 비디오 개수
  const favoriteVideoChunks = []; // 페이지에 들어갈 비디오 리스트

  for (let i = 0; i < favoriteVideo.length; i += videosPerPage) {
    favoriteVideoChunks.push(favoriteVideo.slice(i, i + videosPerPage));
  }

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 설정
  const [pageRange, setPageRange] = useState([1, 10]); // 1부터 10까지의 페이지를 표시
  const currentVideos = favoriteVideoChunks[currentPage - 1];

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
      <ul
        style={{
          marginBottom: '-16px',
          paddingBottom: '55px',
          textAlign: 'center',
          listStyle: 'none',
        }}
      >
        {pageRange[0] > 1 && (
          <li>
            <button
              style={{ fontSize: 'large', color: 'white' }}
              onClick={handlePrev}
            >
              &#171;
            </button>
          </li>
        )}

        {pageNumbers.map(
          (pageNumber) =>
            pageNumber >= pageRange[0] &&
            pageNumber <= pageRange[1] && (
              <li key={pageNumber}>
                <button
                  style={{ fontSize: 'large' }}
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
          <li>
            <button style={{ fontSize: 'large' }} onClick={handleNext}>
              &#187;
            </button>
          </li>
        )}
      </ul>
    );
  };

  // useEffect
  useEffect(() => {
    getFavoriteVideo();
  }, []);

  //JSX---------------------------------------------------------------------------------------------
  return (
    <div>
      <div
        className={Style.myTHF}
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {favoriteVideo.length === 0 ? (
          <p className={Style.noHF}>등록된 즐겨찾기가 없습니다.</p>
        ) : (
          currentVideos?.map((favoriteVideo) => {
            return (
              <div
                style={{ margin: '2% 1% 2% 1%' }}
                className='myHFvideo'
                key={favoriteVideo.videoNum}
                onClick={() => {
                  window.location.href = `/view/${favoriteVideo.videoNum}`;
                }}
              >
                <img
                  src={favoriteVideo.thumbnailUrl}
                  alt={favoriteVideo.videoName}
                />
                <div>
                  <p style={{ width: '310px' }}>{favoriteVideo.videoName}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Pagination totalPages={favoriteVideoChunks.length} />
    </div>
  );
};

export default MyFavorite;
