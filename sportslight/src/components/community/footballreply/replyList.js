import { useDispatch, useSelector } from 'react-redux';
import { replyActions } from '../../../reduxs/actions/replyAction';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './replyList.css';
import replyUser from '../../images/replyUser.png';

const ReplyList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { talkNum } = useParams();
  const memberNum = localStorage.getItem('memberNum');

  const [input, setInput] = useState();
  const [reply, setReply] = useState([]);

  const replyList = useSelector((state) => state.reply.replyList);

  function onSubmit(e) {
    e.preventDefault();
    const talkreplyDto = {
      talkNum: talkNum,
      memberNum: localStorage.getItem('memberNum'),
      talkReplyContent: input,
    };
    dispatch(replyActions.replyCreate(talkreplyDto));
    console.log(replyList.talkReplyNum + '번 댓글 내용 : ' + talkreplyDto);
    window.location.reload();
  }

  const fetchReflyList = async () => {
    const getReplyList = await dispatch(replyActions.getReplyList(talkNum));
    setReply(getReplyList);
  };

  useEffect(() => {
    fetchReflyList();
  }, [setReply]);

  //조건에 따라 작성일 포맷 설정
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    if (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    ) {
      //오늘과 연,월,일이 일치할 경우 포맷을 HH:MM 로 설정
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      //오늘과 연,월,일이 일치하지 않을 경우 포맷을 YYYY:MM:DD 로 설정
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  };

  return (
    <div style={{ paddingBottom: '70px' }}>
      <div className='d-flex justify-content-end mb-3'></div>
      <div>
        <form className='replyForm' onSubmit={onSubmit}>
          <div className='replyTextArea' value={input} type='text'>
            <textarea
              onChange={(e) => setInput(e.target.value)}
              placeholder='댓글을 입력해주세요'
            ></textarea>
          </div>
          <div className='replySubmit'>
            <button>등록</button>
          </div>
        </form>
      </div>

      {replyList && replyList.length > 0
        ? replyList.map((reply) => (
            <div className='replyWrapper' key={reply.talkReplyNum}>
              <div className='replyBorderBottom'>
                <div>
                  <img className='replyUser' src={replyUser} />
                </div>
                <div className='replyOnseSection'>
                  <div className='replyWriter'>
                    {reply['membersDto']
                      ? reply['membersDto']['memberProfile']
                      : null}
                  </div>
                  <div className='replyContent'>{reply.talkReplyContent}</div>
                  <div className='replyDate'>{formatDate(reply.regDate)}</div>
                  {memberNum == reply.memberNum ? (
                    <button
                      onClick={(e) => {
                        dispatch(replyActions.replyDelete(reply.talkReplyNum));
                        console.log(reply.talkReplyNum + '번 댓글 삭제');
                        window.location.reload();
                      }}
                      value={reply.talkReplyNum}
                      style={{
                        width: '50px',
                        height: '30px',
                        cursor: 'pointer',
                        border: '1px solid black',
                      }}
                    >
                      삭제
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className='replyBorder'></div>
            </div>
          ))
        : ''}
    </div>
  );
};

export default ReplyList;
