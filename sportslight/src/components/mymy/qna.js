import { useEffect, useState } from 'react';
import style from './qna.module.css';

const Qna = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  const [visible8, setVisible8] = useState(false);

  const changeHide = (number) => {
    switch (number) {
      case 1:
        setVisible1(!visible1);
        break;
      case 2:
        setVisible2(!visible2);
        break;
      case 3:
        setVisible3(!visible3);
        break;
      case 4:
        setVisible4(!visible4);
        break;
      case 5:
        setVisible5(!visible5);
        break;
      case 6:
        setVisible6(!visible6);
        break;
      case 7:
        setVisible7(!visible7);
        break;
      case 8:
        setVisible8(!visible8);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    changeHide();
  }, []);

  return (
    <div className={style.wrap}>
      <>
        <div>
          <div className={style.line}></div>
          <div className={style.qnatitle}>
            <p style={{ borderBottom: '3px solid #888888' }}>
              QNA / 자주 하는 질문
            </p>
          </div>
        </div>

        <div>
          <div>
            <div onClick={() => changeHide(1)}>
              <p className={style.content}> 공지사항은 어디서 보나요</p>
            </div>
            <div id='q1' style={{ display: visible1 ? 'block' : 'none' }}>
              <p
                style={{
                  color: 'white',
                  backgroundColor: '#333333',
                  padding: '8px 15px',
                  borderRadius: '5px',
                }}
              >
                페이지 상단 MyPage 버튼을 누르시면 공지사항으로 이동하는 버튼이
                있습니다.
              </p>
            </div>
          </div>
          <div>
            <div onClick={() => changeHide(2)}>
              <p className={style.content}>경기 일정이 궁금합니다.</p>
            </div>
            <div id='q2' style={{ display: visible2 ? 'block' : 'none' }}>
              <p
                style={{
                  color: 'white',
                  backgroundColor: '#333333',
                  padding: '8px 15px',
                  borderRadius: '5px',
                }}
              >
                경기 일정은 메인페이지 - 경기일정에서 세부내용을 확인하실 수
                있습니다.
              </p>
            </div>
          </div>
          <div>
            <div onClick={() => changeHide(3)}>
              <p className={style.content}>
                좋아요 / 즐겨찾기 한 동영상은 어디서 보나요?
              </p>
            </div>
            <div id='q3' style={{ display: visible3 ? 'block' : 'none' }}>
              <p
                style={{
                  color: 'white',
                  backgroundColor: '#333333',
                  padding: '8px 15px',
                  borderRadius: '5px',
                }}
              >
                페이지 상단 MyPage 버튼을 누르시면 내가 좋아요 / 즐겨찾기 한
                동영상을 찾아볼 수 있습니다.
              </p>
            </div>
          </div>
          <div>
            <div onClick={() => changeHide(4)}>
              <p className={style.content}>
                {' '}
                동영상 한줄게시판에 글이 안써져요.
              </p>
            </div>
            <div id='q4' style={{ display: visible4 ? 'block' : 'none' }}>
              <p
                style={{
                  color: 'white',
                  backgroundColor: '#333333',
                  padding: '8px 15px',
                  borderRadius: '5px',
                }}
              >
                동영상 한줄게시판은 아이디당 하나의 글만 작성 가능합니다. 기존
                글을 삭제하거나 수정해주세요.
              </p>
            </div>
          </div>
          <div>
            <div onClick={() => changeHide(5)}>
              <p className={style.content}>
                나의 팀 / 리그는 어디서 수정하나요?
              </p>
            </div>
            <div id='q5' style={{ display: visible5 ? 'block' : 'none' }}>
              <p
                style={{
                  color: 'white',
                  backgroundColor: '#333333',
                  padding: '8px 15px',
                  borderRadius: '5px',
                }}
              >
                페이지 상단 MyPage 버튼을 누르시면 회원님의 선호에 따라 팀과
                리그를 지정할 수 있습니다.
              </p>
            </div>
          </div>
          <div>
            <div onClick={() => changeHide(6)}>
              <p className={style.content}>회원정보 수정은 어디서 하나요?</p>
            </div>
            <div id='q6' style={{ display: visible6 ? 'block' : 'none' }}>
              <p
                style={{
                  color: 'white',
                  backgroundColor: '#333333',
                  padding: '8px 15px',
                  borderRadius: '5px',
                }}
              >
                Mypage 회원정보 탭에 들어가면 기존의 정보를 수정할 수 있습니다.
              </p>
            </div>
          </div>
          <div>
            <div onClick={() => changeHide(7)}>
              <p className={style.content}>집에 가고 싶으신가요?</p>
            </div>
            <div id='q7' style={{ display: visible7 ? 'block' : 'none' }}>
              <p
                style={{
                  color: 'white',
                  backgroundColor: '#333333',
                  padding: '8px 15px',
                  borderRadius: '5px',
                }}
              >
                네.
              </p>
            </div>
          </div>
          <div>
            <div onClick={() => changeHide(8)}>
              <p className={style.content}>회원탈퇴는 어디서 하나요?</p>
            </div>
            <div id='q8' style={{ display: visible8 ? 'block' : 'none' }}>
              <p
                style={{
                  color: 'white',
                  backgroundColor: '#333333',
                  padding: '8px 15px',
                  borderRadius: '5px',
                }}
              >
                Mypage 회원정보 탭에 들어가면 회원 탈퇴를 할 수 있습니다.
                서비스를 이용해주셔서 감사합니다.{' '}
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Qna;
