import { useDispatch, useSelector } from 'react-redux';
import { talkActions } from '../../../reduxs/actions/talkAction';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TalkPaging from './talkPaging';
import TalkTableRow from './talkTableRow';
import './footballtalk.css';

const TalkList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { currentPage } = useParams();
  const [isRecent, setIsRecent] = useState(true);
  const [selectedLeagueNum, setSelectedLeagueNum] = useState(null);

  // 최신 순 리스트
  const recentList = useSelector((state) => state.talk.recentList);
  // 조회 순 리스트
  const viewsList = useSelector((state) => state.talk.viewsList);
  // 리그 셀렉트 리스트
  const leagueList = useSelector((state) => state.talk.leagueList);
  // TalkPageDTO
  const talkpageDto = useSelector((state) =>
    state.talk.talkpageDto ? state.talk.talkpageDto : { currentPage: 1 }
  );

  // 버튼에 조건을 부여하여 최신 순인지 조회 순인지 분류
  const renderingTalkList = isRecent ? recentList : viewsList;

  // 셀렉트 된 리그 고유번호와 비교하여 동일 한 리스트를 담아주는 함수
  const renderingLeagueList = leagueList;

  // 최신 순 리스트 가져오기
  const getRecentList = (currentPage) => {
    dispatch(talkActions.recentList(currentPage));
    setIsRecent(true);
    navigator(`/footballtalk/list/${currentPage}`);
  };

  // 조회 순 리스트 가져오기
  const getViewsList = (currentPage) => {
    dispatch(talkActions.viewsList(currentPage));
    setIsRecent(false);
    navigator(`/footballtalk/list/${currentPage}`);
  };

  // 리그 셀렉트 리스트 가져오기
  const getLeagueList = (leagueNum) => {
    dispatch(talkActions.leagueList(leagueNum));
  };

  useEffect(() => {
    if (isRecent) {
      getRecentList(currentPage);
    } else {
      getViewsList(currentPage);
    }
  }, [currentPage]);

  // 리그 셀렉트 이벤트 발생 이후를 다루는 핸들러
  const handleLeagueSelect = (event) => {
    const selectedValue = Number(event.target.value);
    setSelectedLeagueNum(selectedValue);
    getLeagueList(selectedValue);

    if (selectedValue === 0) {
      window.location.reload();
    }
  };

  console.log('list', renderingLeagueList);

  // pagination
  const listPerPage = 20; // 한번에 보여줄 게시물 개수
  const leagueListChunks = []; // 페이지에 들어갈 게시물 리스트

  // 20개 묶음으로 게시물 청크 생성
  for (let i = 0; i < leagueList.length; i += listPerPage) {
    leagueListChunks.push(leagueList.slice(i, i + listPerPage));
  }

  const [currentPaging, setCurrentPaging] = useState(1); // 현재 페이지 설정
  const [pageRange, setPageRange] = useState([1, 5]); // 1부터 5까지의 페이지를 표시
  const currentLists = leagueListChunks[currentPaging - 1];

  // 페이지네이션 함수
  const Pagination = ({ totalPages }) => {
    const pageNumbers = []; // 페이지 리스트(숫자) 선언

    // 페이지 숫자 배열 생성
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    // 뒤로 버튼
    const handlePrev = () => {
      setCurrentPaging((currentPaging) => currentPaging - 5);
      setPageRange([pageRange[0] - 5, pageRange[1] - 5]);
    };

    // 앞으로 버튼
    const handleNext = () => {
      if (currentPaging + 5 > pageNumbers.length) {
        setCurrentPaging(pageNumbers.length);
      } else {
        setCurrentPaging((currentPaging) => currentPaging + 5);
      }
      setPageRange([pageRange[0] + 5, pageRange[1] + 5]);
    };

    // 페이지네이션 리턴
    return (
      <div
        className='paginationAll'
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '30px',
        }}
      >
        <nav>
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              marginBlockEnd: 'unset',
            }}
          >
            {pageRange[0] > 1 && (
              <li>
                <button style={{ fontSize: 'large' }} onClick={handlePrev}>
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
                        setCurrentPaging(pageNumber);
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
        </nav>
      </div>
    );
  };

  return (
    <div className='footballTalkAll'>
      <div>
        <img
          src='/images/banner4.png'
          alt='footballTalkBanner'
          style={{
            width: '80%',
            height: '200px',
            marginLeft: '8%',
            paddingBottom: '20px',
          }}
        />
      </div>
      <div className='footballTalkCenter'>
        <h3 className='footballTitle'>FOOTBALL TALK</h3>
        <div className='footballArray'>
          <div className='ml-3'>
            <select value={selectedLeagueNum} onChange={handleLeagueSelect}>
              <option value={0}>리그 전체</option>
              <option value={1}>프리미어리그</option>
              <option value={2}>라리가</option>
              <option value={3}>분데스리가</option>
              <option value={4}>세리에 A</option>
              <option value={5}>리그 1</option>
              <option value={6}>챔피언스리그</option>
              <option value={7}>유로파리그</option>
              <option value={8}>K리그1</option>
              <option value={9}>K리그2</option>
            </select>
          </div>
          {!selectedLeagueNum && (
            <div className='btnGroup' role='group'>
              <button
                className={`btn btn-link ${isRecent ? 'active' : ''}`}
                onClick={() => getRecentList(1)}
              >
                최근 순
              </button>
              <button
                className={`btn btn-link ${!isRecent ? 'active' : ''}`}
                onClick={() => getViewsList(1)}
                style={{ marginLeft: '5px' }}
              >
                인기 순
              </button>
            </div>
          )}
        </div>

        <table className='footballTable' style={{ marginTop: 20 }}>
          <colgroup>
            <col width='8%' />
            <col width='*' />
            <col width='12%' />
            <col width='12%' />
          </colgroup>

          <thead>
            <tr className='footballTalkHeader'>
              <th>번호</th>
              <th>리그</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성일</th>
              <th>조회</th>
            </tr>
          </thead>

          <tbody>
            {selectedLeagueNum === null
              ? renderingTalkList.map((talk) => (
                  <TalkTableRow talk={talk} key={talk.talkNum} />
                ))
              : currentLists &&
                currentLists.map((talk) => (
                  <TalkTableRow talk={talk} key={talk.talkNum} />
                ))}
          </tbody>
        </table>

        <div className='footballTalkWrite'>
          <Link className='TalkWrite' to='/footballtalk/create'>
            글쓰기
          </Link>
        </div>

        <div style={{ paddingBottom: '40px' }}>
          {/* 리그 전체 최신순/조회순 페이징 */}
          {!selectedLeagueNum && talkpageDto ? (
            <TalkPaging
              RenderingPaging={isRecent ? getRecentList : getViewsList}
            />
          ) : (
            // 리그 셀렉트 페이징
            <Pagination totalPages={leagueListChunks.length} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TalkList;
