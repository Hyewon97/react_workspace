import moment from 'moment';

const ReplyTableRow = (props) => {
  const { reply } = props;
  const today = moment(); // 오늘 날짜

  // reply.regDate를 moment 객체로 변환
  const replyRegDate = moment(reply.regDate);

  // 연월일이 같은 경우 시간 hh:mm으로 출력
  const isToday = today.isSame(replyRegDate, 'day');
  const formattedTime = replyRegDate.format('HH:mm');

  // 연월일이 다른 경우 yyyy-mm-dd 형태로 출력
  const formattedDate = replyRegDate.format(isToday ? 'HH:mm' : 'YYYY-MM-DD');

  return (
    <div>
      <tr>
        <td>
          {reply['membersDto'] ? reply['membersDto']['memberProfile'] : null}
        </td>
        <td>{formattedDate}</td>
      </tr>
      <tr>
        <td>{reply.talkReplyContent}</td>
      </tr>
    </div>
  );
};

export default ReplyTableRow;
