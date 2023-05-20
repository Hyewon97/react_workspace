import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../apiurl';
import style from './eidtinfo.module.css';

const EditInfo = () => {
  const [depul, setdepul] = useState('');
  const navigator = useNavigate();
  const [memberz, setMemberz] = useState({
    memberEmail: localStorage.getItem('memberEmail'),
    memberPass: '',
    memberProfile: '',
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
  };
  // 탈퇴
  const memberWithdraw = async () => {
    console.log(localStorage.memberEmail);

    // await axios.post(
    //   `${baseUrl}/memberz/memberWithdraw/${localStorage.memberEmail}`,
    //   config
    // );
    try {
      await axios.post(
        `${baseUrl}/memberz/memberWithdraw/${localStorage.memberEmail}`,
        config
      );
      alert('회원 탈퇴 완료');
      navigator('/logout');
    } catch (error) {
      console.log(error);
      alert('회원 탈퇴 실패');
    }
  };
  const { memberProfile, memberPass, memberEmail } = memberz;
  console.log(memberEmail);

  const info = async () => {
    return await axios
      .get(
        `${baseUrl}/memberz/editinfo/${localStorage.getItem('memberEmail')}`,
        config
      )
      .then((Response) => setMemberz(Response.data, { memberPass: '' }));
  };

  const [passwordCheck, setPasswordCheck] = useState('');

  const passChange = (e) => {
    e.preventDefault();
    if (memberPass !== e.target.value) {
      setPasswordCheck('비밀번호 불일치');
    } else {
      setPasswordCheck('비밀번호 일치');
    }
  };

  const handleValueChange = (e) => {
    e.preventDefault();

    setMemberz({ ...memberz, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    info();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!memberPass) {
      alert('비밀번호를 입력하세요.');
      return;
    }

    await axios
      .post(`${baseUrl}/memberz/update`, memberz, config)
      .then((response) => {
        console.log(response.data);
        if (response.data === 'fail') {
          localStorage.setItem('memberProfile', memberProfile);
          console.log(response.data);
          alert(response.data);
        } else {
          localStorage.setItem('memberProfile', memberProfile);
          window.location.replace('/');
        }
      });
  };

  return (
    <>
      <div className={style.logo2}>
        <img
          style={{ display: 'flex', justifyContent: 'center' }}
          src='images/champions.png'
        />
      </div>
      <div className={style.wrap}>
        <div className={style.control}>
          <div style={{ width: '100%', height: '100%' }}>
            <form onSubmit={onSubmit}>
              <div>
                <div style={{ textAlign: 'center', fontSize: '10px' }}>
                  <h1 className={style.editinfotitle}>회원 정보수정</h1>
                </div>

                <div className={style.container}>
                  <div style={{ width: '150px' }}>
                    <h1>프로필 정보</h1>
                  </div>
                  <div className={style.control}>
                    <input
                      type='email'
                      className={style.email}
                      name='memberEmail'
                      placeholder='이메일'
                      value={localStorage.getItem('memberEmail')} // 로컬 스토리지의 멤버 이메일
                      readOnly
                    />
                  </div>
                  <div className={style.control}>
                    <input
                      type='password'
                      className={style.password}
                      name='memberPass'
                      placeholder='비밀번호'
                      onChange={handleValueChange}
                    />
                  </div>
                  <div className={style.control}>
                    <input
                      type='password'
                      className={style.passche}
                      name='memberPass2'
                      placeholder='비밀번호확인'
                      onChange={passChange}
                    />
                    <span>{passwordCheck}</span>
                  </div>
                  <div className={style.control}>
                    <input
                      type='text'
                      className={style.profile}
                      name='memberProfile'
                      placeholder='이름'
                      value={memberProfile}
                      onChange={handleValueChange}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ marginRight: '10px' }}>
                    <button
                      onSubmit={info}
                      type='submit'
                      className={style.button}
                    >
                      회원정보 수정
                    </button>
                  </div>
                  <div className={style.button2} onClick={memberWithdraw}>
                    회원탈퇴
                  </div>
                </div>
                {/* 탈퇴 */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInfo;
