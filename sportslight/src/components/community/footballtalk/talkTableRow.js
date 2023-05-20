import { Link } from 'react-router-dom';
import moment from 'moment';
import './footballtalk.css';

const TalkTableRow = (props) => {
  const { talk } = props;

  // 오늘의 게시물 날짜 포맷은 'HH:mm', 이전의 게시물 날짜 포맷은 'YYYY-MM-DD'
  // 오늘 날짜
  const today = moment();
  // talk.regDate를 moment 객체로 변환
  const regDate = moment(talk.regDate);
  // 연월일이 같은 경우 시간 hh:mm으로 출력
  const isToday = today.isSame(regDate, 'day');
  // 연월일이 다른 경우 yyyy-mm-dd 형태로 출력
  const formattedDate = regDate.format(isToday ? 'HH:mm' : 'YYYY-MM-DD');

  return (
    <tr className='talkTableRows'>
      <td>{talk.talkNum}</td>
      <td>
        <div className='footballTalkLeague'>
          {talk['leagueDto'] ? talk['leagueDto']['leagueName'] : null}
        </div>
      </td>
      <td className='footballTalkTitle'>
        <Link to={`/footballtalk/read/${talk.talkNum}`}>{talk.talkTitle}</Link>
      </td>
      <td>{talk['membersDto'] ? talk['membersDto']['memberProfile'] : null}</td>
      <td>{formattedDate}</td>
      <td>{talk.talkViews}</td>
    </tr>
  );
};

export default TalkTableRow;
