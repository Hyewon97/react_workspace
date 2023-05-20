import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { talkActions } from '../../../reduxs/actions/talkAction';
import ReplyList from '../footballreply/replyList';
import moment from 'moment';
import './talkRead.css';

const TalkRead = () => {
  const { talkNum } = useParams();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const talkRead = useSelector((state) => state.talk.talkRead); //reducer 이용해서 store에 저장되어있는 것을 가져옴
  //const talkFile = useSelector((state) => state.talk.talkFile);
  const talkpageDto = useSelector((state) => state.talk.talkpageDto);

  console.log(talkRead['memberNum']);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem('Authorization'),
    },
  };

  useEffect(() => {
    dispatch(talkActions.talkRead(talkNum, config));
  }, [dispatch, talkNum]);

  //download
  const handleDownload = async () => {
    const talkFile = await dispatch(talkActions.talkDownload(talkRead.upload));

    //dispatch(talkActions.getTalkDownload(talkRead.upload));

    const filename = talkRead.upload.substring(
      talkRead.upload.indexOf('_') + 1
    );

    console.log(filename);

    const url = window.URL.createObjectURL(new Blob([talkFile]), {
      type: 'application/octet-stream',
    });

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.style.cssText = 'display:none';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(
      talkActions.talkDelete(talkNum, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      })
    );
    navigator(`/footballtalk/list/${talkpageDto.currentPage}`);
  };

  // 오늘의 게시물 날짜 포맷은 'HH:mm', 이전의 게시물 날짜 포맷은 'YYYY-MM-DD'
  // 오늘 날짜
  const today = moment();
  // talkRead.regDate를 moment 객체로 변환
  const regDate = moment(talkRead.regDate);
  // 연월일이 같은 경우 시간 hh:mm으로 출력
  const isToday = today.isSame(regDate, 'day');
  // 연월일이 다른 경우 yyyy-mm-dd 형태로 출력
  const formattedDate = regDate.format(isToday ? 'HH:mm' : 'YYYY-MM-DD');

  console.log(localStorage.getItem('memberNum'));
  console.log(talkRead['memberNum']);

  return (
    <div className='talkReadAll'>
      <div className='talkReadCenter'>
        <table style={{ marginTop: 20 }}>
          <tbody>
            <tr>
              {/* 리그 엠블럼 추가 예정 */}
              <th colSpan='6'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ flexGrow: 1 }}>
                    {talkRead['leagueDto']
                      ? talkRead['leagueDto']['leagueName']
                      : null}
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Link
                      className='talkReadBtn'
                      to={`/footballtalk/list/${talkpageDto.currentPage}`}
                    >
                      목록
                    </Link>
                    {localStorage.getItem('memberNum') * 1 ===
                    (talkRead['memberNum'] ? talkRead['memberNum'] : null) ? (
                      <>
                        <Link
                          className='talkReadBtn'
                          to={`/footballtalk/update/${talkNum}`}
                        >
                          수정
                        </Link>

                        <button className='talkReadBtn' onClick={handleDelete}>
                          삭제
                        </button>
                      </>
                    ) : null}
                    {/* <Link
                      className='talkReadBtn'
                      to={`/footballtalk/update/${talkNum}`}
                    >
                      수정
                    </Link>
                    <button className='talkReadBtn' onClick={handleDelete}>
                      삭제
                    </button> */}
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th className='titleTh'>제목</th>
              <td colSpan='6'>{talkRead.talkTitle}</td>
            </tr>
            <tr>
              <th className='titleTh'>글쓴이</th>
              <td className='titleTd'>
                {talkRead['membersDto']
                  ? talkRead['membersDto']['memberProfile']
                  : null}
              </td>

              <th>조회</th>
              <td>{talkRead.talkViews}</td>

              <th>작성일</th>
              <td>{formattedDate}</td>
            </tr>
            <tr>
              <th className='titleTh'>파일</th>
              <td colSpan='6'>
                <button onClick={handleDownload}>
                  {talkRead.upload
                    ? talkRead.upload.substring(
                        talkRead.upload.indexOf('_') + 1
                      )
                    : null}
                </button>
                {/* 조건문 & 난수 제거 */}
              </td>
            </tr>
            <tr>
              <th style={{ borderRight: '1px solid #363636' }}>내용</th>
              {/* whiteSpace: 'pre-line'  => 줄바꾸기*/}
              <td
                className='contentTd'
                colSpan='6'
                style={{ whiteSpace: 'pre-line' }}
              >
                {talkRead.talkContent}
              </td>
            </tr>
          </tbody>
        </table>

        <ReplyList talkNum={talkNum} />
      </div>
    </div>
  );
};

export default TalkRead;
