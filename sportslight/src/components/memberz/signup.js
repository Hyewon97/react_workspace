import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../apiurl';
import style from './signup.module.css';

const Signup = () => {
  const navigator = useNavigate();
  const [memberz, setMemberz] = useState({
    memberEmail: '',
    memberPass: '',
    memberProfile: '',
    leagueNum1: '',
    leagueNum2: '',
    leagueNum3: '',
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const selectClick = (e) => {
    console.log(e);
  };
  const config = { headers: { 'Content-Type': 'application/json' } };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사 조건문 추가
    if (!memberz.memberEmail || !memberz.memberPass || !memberz.memberProfile) {
      alert('입력되지 않은 값이 있습니다.');
      return;
    }

    // 이메일 유효성 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(memberz.memberEmail)) {
      alert('이메일 형식이 유효하지 않습니다.');
      return;
    }

    // 비밀번호 유효성 검사
    if (memberz.memberPass.length < 6) {
      alert('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }

    // 닉네임 유효성 검사
    if (memberz.memberProfile.length < 2 || memberz.memberProfile.length > 20) {
      alert('닉네임은 2자 이상, 20자 이하로 입력해주세요.');
      return;
    }

    if (
      memberz.leagueNum1 === '' ||
      memberz.leagueNum2 === '' ||
      memberz.leagueNum3 === ''
    ) {
      alert('리그를 모두 선택해주세요.');
      return;
    }

    if (
      memberz.leagueNum1 === memberz.leagueNum2 ||
      memberz.leagueNum2 === memberz.leagueNum3 ||
      memberz.leagueNum3 === memberz.leagueNum1
    ) {
      alert('서로 다른 리그를 선택해주세요.');
      return;
    }

    await axios
      .post(`${baseUrl}/signup`, memberz, config)
      .then((response) => {
        if (response.data === 'DUPLICATE_PROFILE_PROFILE') {
          alert('이미 사용 중인 이메일과 닉네임입니다.');
        } else if (response.data === 'DUPLICATE_EMAIL') {
          alert('이미 사용 중인 이메일입니다.');
        } else if (response.data === 'DUPLICATE_PROFILE') {
          alert('이미 사용 중인 닉네임입니다.');
        } else if (response.data === 'SUCCESS') {
          alert('회원가입 성공. 로그인해주세요');
          setMemberz({
            memberEmail: '',
            memberPass: '',
            memberProfile: '',
            leagueNum1: '',
            leagueNum2: '',
            leagueNum3: '',
          });
          navigator('/'); //회원가입 성공시 main
        }
      })

      .catch((err) => {
        console.error(err.message);
      });
  };
  const handleValueChange = (e) => {
    setMemberz({ ...memberz, [e.target.name]: e.target.value });
  };
  const [passwordCheck, setPasswordCheck] = useState('');

  const passChange = (e) => {
    e.preventDefault();
    if (memberz.memberPass !== e.target.value) {
      setPasswordCheck('비밀번호 불일치');
    } else {
      setPasswordCheck('비밀번호 일치');
    }
  };

  return (
    <div className={style.wrap}>
      <div style={{ backgroundColor: 'black' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <div className={style.logo}>
            <img src='images/logo.png' />
          </div>
          <form onSubmit={onSubmit}>
            <div>
              <div style={{ textAlign: 'center', fontSize: '10px' }}>
                <h1 style={{ color: '#888888' }} className={style.signuptitle}>
                  회원가입
                </h1>
              </div>

              <div className={style.container}>
                {/* <div className="contaniner" > */}

                <div className={style.control}>
                  <input
                    type='email'
                    className={style.email}
                    name='memberEmail'
                    placeholder='이메일'
                    onChange={handleValueChange}
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
                    className={style.passcheck}
                    name='memberPass2'
                    placeholder='비밀번호확인'
                    onChange={passChange}
                  />
                  <span>{passwordCheck}</span>
                </div>
                <div className={style.control}>
                  <input
                    type='text'
                    className={style.nick}
                    name='memberProfile'
                    placeholder='닉네임'
                    onChange={handleValueChange}
                  />
                </div>
                {/* </div> */}
                <div></div>
                <div className={style.memberinfo}>
                  <button className={style.button2} onClick={toggleMenu}>
                    <p>선호하는 리그</p>
                  </button>

                  {isMenuOpen && (
                    <div
                      className='member-info__menu'
                      style={{ position: 'absolute' }}
                    >
                      <select
                        onChange={handleValueChange}
                        name='leagueNum1'
                        className={style.dropMenu}
                      >
                        <option value=''>리그 이름</option>
                        <option value='1'>프리미어리그</option>
                        <option value='2'>라리가</option>
                        <option value='3'>분데스리가</option>{' '}
                        {/*submit 했을 때 value값이 넘어간다. */}
                        <option value='4'>세리에A</option>
                        <option value='5'>리그1</option>
                        <option value='6'>챔피언스리그</option>
                        <option value='7'>유로파리그</option>
                        <option value='8'>k리그1</option>
                        <option value='9'>k리그2</option>
                      </select>

                      <select
                        onChange={handleValueChange}
                        name='leagueNum2'
                        className={style.dropMenu}
                      >
                        <option value=''>리그 이름</option>
                        <option value='1'>프리미어리그</option>
                        <option value='2'>라리가</option>
                        <option value='3'>분데스리가</option>
                        <option value='4'>세리에A</option>
                        <option value='5'>리그1</option>
                        <option value='6'>챔피언스리그</option>
                        <option value='7'>유로파리그</option>
                        <option value='8'>k리그1</option>
                        <option value='9'>k리그2</option>
                      </select>

                      <select
                        onChange={handleValueChange}
                        name='leagueNum3'
                        className={style.dropMenu}
                      >
                        <option value=''>리그 이름</option>
                        <option value='1'>프리미어리그</option>
                        <option value='2'>라리가</option>
                        <option value='3'>분데스리가</option>
                        <option value='4'>세리에A</option>
                        <option value='5'>리그1</option>
                        <option value='6'>챔피언스리그</option>
                        <option value='7'>유로파리그</option>
                        <option value='8'>k리그1</option>
                        <option value='9'>k리그2</option>
                      </select>
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button
                    type='submit'
                    className={style.button}
                    style={{ marginTop: '100px', marginBottom: '100px' }}
                  >
                    가입 완료
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div>
            <div className={style.logo2}>
              <img src='images/premier.png' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
