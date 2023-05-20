import './modalmyteam.css';
import ReactModal from 'react-modal';

// 내 선호 팀 / 리그 고르기 모달
const ModalPopTeam = ({
  isOpen,
  Confirm,
  data,
  arrayTeam,
  arrayLeague,
  changeFavor,
}) => {
  // 취소버튼 이벤트
  const handleClickConfirm = () => {
    Confirm();
  };

  // 선택된 데이터 전송
  const setFormData = (teamNum, leagueNum, data) => {
    if (teamNum === null) {
      return changeFavor(data, leagueNum);
    } else {
      return changeFavor(data, teamNum);
    }
  };

  return (
    <ReactModal isOpen={isOpen} className='cccc'>
      <div className='dddd'>
        <div>
          {typeof data !== 'string' ? (
            data === 1 || data === 2 || data === 3 ? (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <p className='choose'>팀을 선택하세요.</p>
                <ul className='chooseTL'>
                  {arrayTeam.map((item) => (
                    <li key={item.teamNum} className='choose'>
                      <button
                        onClick={() => setFormData(item.teamNum, null, data)}
                      >
                        {item.teamName}
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={handleClickConfirm} id='modalCloseBtn'>
                  취소
                </button>
              </div>
            ) : (
              <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
                <p className='choose'>리그를 선택하세요.</p>
                <ul>
                  {arrayLeague.map((item) => (
                    <li key={item.leagueNum} className='choose'>
                      <button
                        onClick={() => setFormData(null, item.leagueNum, data)}
                      >
                        {item.leagueName}
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={handleClickConfirm} id='modalCloseBtn'>
                  취소
                </button>
              </div>
            )
          ) : (
            <div>
              <p className='choose'>{data}</p>
              <button onClick={handleClickConfirm} id='modalCloseBtn'>
                확인
              </button>
            </div>
          )}
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalPopTeam;
