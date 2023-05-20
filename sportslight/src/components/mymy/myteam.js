import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import ModalPopTeam from '../modal/modalmyteam';
import Style from './myTHF.module.css';

const Myteam = () => {
  // 회원 선호도 useState
  const [memberFavor, setMemberFavor] = useState({
    memberNum: localStorage.getItem('memberNum') * 1,
    teamNum1: 0,
    teamNum2: 0,
    teamNum3: 0,
    leagueNum1: 0,
    leagueNum2: 0,
    leagueNum3: 0,
    teamName1: '',
    teamName2: '',
    teamName3: '',
    leagueName1: '',
    leagueName2: '',
    leagueName3: '',
  });
  // 팀 , 리그용 배열
  const [arrayTeam, setArrayTeam] = useState([]);
  const [arrayLeague, setArrayLeague] = useState([]);

  // modalPop용 useState
  const [isOpen, setisOpen] = useState(false);
  const [data, setData] = useState(0);

  // config
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem('Authorization'),
    },
  };

  // 선호 팀 요청
  const getMemberFavor = async () => {
    const formData = new FormData();
    formData.append('memberNum', memberFavor.memberNum);
    const response = await axios.post(
      `http://localhost:8090/myteam`,
      formData,
      config
    );
    setMemberFavor(response.data.memberFavor);
    setArrayTeam(response.data.team);
    setArrayLeague(response.data.league);
  };

  // modal 정보 가공
  const modalData = (number) => {
    if (number === 1 || number === 2 || number === 3) {
      setisOpen(true);
      return setData(number);
    } else if (number === 4 || number === 5 || number === 6) {
      setisOpen(true);
      return setData(number);
    }
  };

  // 수정 요청
  const changeFavor = async (number, selectNum) => {
    setisOpen(false);
    const newMemberFavor = { ...memberFavor };

    if (number === 1) {
      newMemberFavor.teamNum1 = selectNum;
    } else if (number === 2) {
      newMemberFavor.teamNum2 = selectNum;
    } else if (number === 3) {
      newMemberFavor.teamNum3 = selectNum;
    } else if (number === 4) {
      newMemberFavor.leagueNum1 = selectNum;
    } else if (number === 5) {
      newMemberFavor.leagueNum2 = selectNum;
    } else if (number === 6) {
      newMemberFavor.leagueNum3 = selectNum;
    }

    const formData = new FormData();
    formData.append('memberNum', newMemberFavor.memberNum);
    formData.append('teamNum1', newMemberFavor.teamNum1);
    formData.append('teamNum2', newMemberFavor.teamNum2);
    formData.append('teamNum3', newMemberFavor.teamNum3);
    formData.append('leagueNum1', newMemberFavor.leagueNum1);
    formData.append('leagueNum2', newMemberFavor.leagueNum2);
    formData.append('leagueNum3', newMemberFavor.leagueNum3);
    await axios
      .post(`http://localhost:8090/myteam/update`, formData, config)
      .then((response) => {
        setData(response.data);
        setisOpen(true);
        getMemberFavor();
      });
  };

  // useEffect
  useEffect(() => {
    getMemberFavor();
  }, []);

  return (
    <div className={Style.myTHF}>
      <div className={Style.myTL}>
        <p>MY 팀</p>
        <div className={Style.myTeam}>
          <div id='setteam1'>
            <p>{memberFavor.teamName1}</p>
            <button onClick={() => modalData(1)}>
              <img
                src='/images/change6.png'
                alt='editTeam'
                style={{ width: '30px', backgroundColor: 'transparent' }}
              />
            </button>
          </div>
          <div id='setteam2'>
            <p>{memberFavor.teamName2}</p>
            <button onClick={() => modalData(2)}>
              <img
                src='/images/change6.png'
                alt='editTeam'
                style={{ width: '30px' }}
              />
            </button>
          </div>
          <div id='setteam3'>
            <p>{memberFavor.teamName3}</p>
            <button onClick={() => modalData(3)}>
              <img
                src='/images/change6.png'
                alt='editTeam'
                style={{ width: '30px' }}
              />
            </button>
          </div>
        </div>
      </div>

      <div className={Style.myTL}>
        <p>MY 리그</p>
        <div className={Style.myTeam}>
          <div id='setleague1'>
            <p>{memberFavor.leagueName1}</p>
            <button onClick={() => modalData(4)}>
              <img
                src='/images/change6.png'
                alt='editLeague'
                style={{ width: '30px' }}
              />
            </button>
          </div>
          <div id='setleague2'>
            <p>{memberFavor.leagueName2}</p>
            <button onClick={() => modalData(5)}>
              <img
                src='/images/change6.png'
                alt='editLeague'
                style={{ width: '30px' }}
              />
            </button>
          </div>
          <div id='setleague3'>
            <p>{memberFavor.leagueName3}</p>
            <button onClick={() => modalData(6)}>
              <img
                src='/images/change6.png'
                alt='editLeague'
                style={{ width: '30px' }}
              />
            </button>
          </div>
        </div>
      </div>

      <ModalPopTeam
        changeFavor={changeFavor}
        isOpen={isOpen}
        data={data}
        Confirm={() => {
          setisOpen(false);
          setData(0);
        }}
        arrayTeam={arrayTeam}
        arrayLeague={arrayLeague}
        memberFavor={memberFavor}
      />
    </div>
  );
};

export default Myteam;
