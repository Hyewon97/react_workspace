import { useEffect, useState, useRef } from 'react';
import { Container } from 'reactstrap';
import { baseUrl } from '../../apiurl';
import axios from 'axios';
import TableRow from './tableRow';
import { Link } from 'react-router-dom';
import './legueSelect.css';

function LeagueSelect() {
  const [leagueName, setLeagueName] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState();
  const [yearMonth, setYearMonth] = useState();
  const [leagueYM, setLeagueYM] = useState('');
  const [scheduleView, setScheduleView] = useState([]);

  //초기 렌더링 시 프리미어리그의 이번 달 일정 호출
  useEffect(() => {
    getRecentSchedule('프리미어리그');
    getSelectedSchedule('프리미어리그');
  }, []);

  // config
  const config3 = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
  };

  console.log(leagueName);

  //유저가 선택한 리그의 모든 일정 호출
  const getSelectedSchedule = async (leagueName) => {
    try {
      const response = await axios.get(
        `${baseUrl}/schedule/${leagueName}`,
        config3
      );
      setLeagueName(leagueName);
      setSelectedSchedule(response.data.selectedSchedule);
      setYearMonth(
        response.data.selectedSchedule
          .map((item) => item.leagueYM)
          .filter((value, index, array) => array.indexOf(value) === index)
      );
      if (leagueYM === '') {
        setLeagueYM(
          response.data.selectedSchedule.filter(
            (item, index, array) => index === array.length - 1
          )[0].leagueYM
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //유저가 선택한 리그의 이번 달 일정 호출
  const getRecentSchedule = async (leagueName) => {
    try {
      const response = await axios.get(
        `${baseUrl}/schedule/${leagueName}`,
        config3
      );
      setSelectedSchedule(response.data.recentSchedule);
      setScheduleView(response.data.recentSchedule);
    } catch (error) {
      console.log(error);
    }
  };

  //동적 렌더링 되는 연월 버튼의 onClick 함수
  const handleButtonClick = (ym) => {
    setLeagueYM(ym);
    const filteredSchedule = selectedSchedule.filter(
      (item) => item.leagueYM === ym
    );
    setScheduleView(filteredSchedule);
  };

  return (
    <>
      <div className='leagueAll'>
        <Container>
          <div>
            <img
              src='/images/banner3.png'
              style={{ width: '100%', height: '380px', marginBottom: '20px' }}
            />
          </div>
          <div className='center'>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  <button
                    className={
                      leagueName === '프리미어리그'
                        ? 'selectedLeague'
                        : 'navleague'
                    }
                    value='프리미어리그'
                    onClick={() => {
                      getRecentSchedule('프리미어리그');
                      getSelectedSchedule('프리미어리그');
                    }}
                  >
                    프리미어리그
                  </button>
                </li>

                <li className='nav-item'>
                  <button
                    className={
                      leagueName === '라리가' ? 'selectedLeague' : 'navleague'
                    }
                    value='라리가'
                    onClick={() => {
                      getRecentSchedule('라리가');
                      getSelectedSchedule('라리가');
                    }}
                  >
                    라리가
                  </button>
                </li>

                <li className='nav-item'>
                  <button
                    className={
                      leagueName === '분데스리가'
                        ? 'selectedLeague'
                        : 'navleague'
                    }
                    value='분데스리가'
                    onClick={() => {
                      getRecentSchedule('분데스리가');
                      getSelectedSchedule('분데스리가');
                    }}
                  >
                    분데스리가
                  </button>
                </li>

                <li className='nav-item'>
                  <button
                    className={
                      leagueName === '세리에 A' ? 'selectedLeague' : 'navleague'
                    }
                    value='세리에 A'
                    onClick={() => {
                      getRecentSchedule('세리에 A');
                      getSelectedSchedule('세리에 A');
                    }}
                  >
                    세리에 A
                  </button>
                </li>

                <li className='nav-item'>
                  <button
                    className={
                      leagueName === '리그 1' ? 'selectedLeague' : 'navleague'
                    }
                    value='리그 1'
                    onClick={() => {
                      getRecentSchedule('리그 1');
                      getSelectedSchedule('리그 1');
                    }}
                  >
                    리그 1
                  </button>
                </li>

                <li className='nav-item'>
                  <button
                    className={
                      leagueName === '챔피언스리그'
                        ? 'selectedLeague'
                        : 'navleague'
                    }
                    value='챔피언스리그'
                    onClick={() => {
                      getRecentSchedule('챔피언스리그');
                      getSelectedSchedule('챔피언스리그');
                    }}
                  >
                    챔피언스리그
                  </button>
                </li>

                <li className='nav-item'>
                  <button
                    className={
                      leagueName === '유로파리그'
                        ? 'selectedLeague'
                        : 'navleague'
                    }
                    value='유로파리그'
                    onClick={() => {
                      getRecentSchedule('유로파리그');
                      getSelectedSchedule('유로파리그');
                    }}
                  >
                    유로파리그
                  </button>
                </li>

                <li className='nav-item'>
                  <button
                    className={
                      leagueName === 'K리그1' ? 'selectedLeague' : 'navleague'
                    }
                    value='K리그1'
                    onClick={() => {
                      getRecentSchedule('K리그1');
                      getSelectedSchedule('K리그1');
                    }}
                  >
                    K리그1
                  </button>
                </li>

                <li className='nav-item'>
                  <button
                    className={
                      leagueName === 'K리그2' ? 'selectedLeague' : 'navleague'
                    }
                    value='K리그2'
                    onClick={() => {
                      getRecentSchedule('K리그2');
                      getSelectedSchedule('K리그2');
                    }}
                  >
                    K리그2
                  </button>
                </li>
              </ul>
            </nav>
            <div className='selectLogo'>
              {leagueName === '프리미어리그' ? (
                <img
                  className='logo2'
                  src='./images/leagueVideo/premierLeague.png'
                  alt='premierLeague'
                />
              ) : leagueName === '라리가' ? (
                <img
                  className='logo2'
                  src='./images/leagueVideo/laliga.png'
                  alt='premierLeague'
                />
              ) : leagueName === '분데스리가' ? (
                <img
                  className='logo2'
                  src='./images/leagueVideo/bundesliga-01.png'
                  alt='premierLeague'
                />
              ) : leagueName === '세리에 A' ? (
                <img
                  className='logo2'
                  src='./images/leagueVideo/serie.png'
                  alt='premierLeague'
                />
              ) : leagueName === '리그 1' ? (
                <img
                  className='logo2'
                  src='./images/leagueVideo/Ligue1-01.png'
                  alt='premierLeague'
                />
              ) : leagueName === '챔피언스리그' ? (
                <img
                  className='logo2'
                  src='./images/leagueVideo/championsLeague.png'
                  alt='premierLeague'
                />
              ) : leagueName === '유로파리그' ? (
                <img
                  className='logo2'
                  src='./images/leagueVideo/europaLeague.png'
                  alt='premierLeague'
                />
              ) : leagueName === 'K리그1' ? (
                <img
                  className='logo2'
                  src='./images/leagueVideo/Untitled-3-01.png'
                  alt='premierLeague'
                />
              ) : (
                <img
                  className='logo2'
                  src='./images/leagueVideo/kleague2-01.png'
                  alt='premierLeague'
                />
              )}
            </div>
            <hr />

            <div style={{ textAlign: 'center' }}>
              {/* 리그 이름 클릭 시 동적으로 렌더링 되는 연월 버튼 */}
              {yearMonth &&
                yearMonth.map((ym) => (
                  <button
                    key={ym}
                    className={
                      leagueYM === ym ? 'selectedYmButton' : 'ymButton'
                    }
                    onClick={() => {
                      handleButtonClick(ym);
                    }}
                  >
                    {ym}
                  </button>
                ))}
            </div>

            <hr />

            <h3 className='text-center'>{leagueName} 일정 / 결과</h3>

            <div className=''>
              <table className='table table-striped' style={{ marginTop: 20 }}>
                <colgroup>
                  <col width='8%' />
                  <col width='*' />
                  <col width='12%' />
                  <col width='12%' />
                </colgroup>

                <thead>
                  <tr>
                    <th>리그</th>
                    <th>날짜</th>
                    <th>시간</th>
                    <th>장소</th>
                    <th>홈</th>
                    <th>홈 스코어</th>
                    <th></th>
                    <th>어웨이 스코어</th>
                    <th>어웨이</th>
                    <th>경기 내용</th>
                  </tr>
                </thead>

                {/* TableRow에 props로 넘겨줘서 일정 데이터 출력 */}
                <tbody>
                  {scheduleView &&
                    scheduleView.map((sv) => {
                      return <TableRow sv={sv} key={sv.scheduleNum} />;
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default LeagueSelect;
