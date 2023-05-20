import axios from 'axios';
import { useState } from 'react';
import { baseUrl } from '../../apiurl';
import { Link } from 'react-router-dom';
import style from './login.module.css';

const Login = () => {
  const [inputs, setInputs] = useState({ memberEmail: '', memberPass: '' });

  function handleSignupClick() {
    window.location.replace('/signup');
  }

  const { memberEmail, memberPass } = inputs;
  const [errorMessage, setErrorMessage] = useState('');

  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const config = { headers: { 'Content-type': 'application/json' } };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${baseUrl}/login`, inputs, config)
      .then((Response) => {
        console.log(Response.data);
        let jwtToken = Response.headers.get('Authorization');
        console.log(jwtToken);

        let jwtMemberProfile = Response.data.memberProfile;
        let jwtMemberEmail = Response.data.memberEmail;
        let jwtAuthRole = Response.data.authRole;
        let jwtMemberNum = Response.data.memberNum;

        localStorage.setItem('Authorization', jwtToken);
        localStorage.setItem('memberEmail', jwtMemberEmail);
        localStorage.setItem('memberProfile', jwtMemberProfile);
        localStorage.setItem('authRole', jwtAuthRole);
        localStorage.setItem('memberNum', jwtMemberNum);
        localStorage.setItem('isLogin', 'true');

        setInputs({ memberEmail: '', memberPass: '' });
      })
      .then(() => {
        window.location.replace('/main');
      })
      .catch((err) => {
        console.error(err.message);
        setErrorMessage('아이디와 비밀번호를 확인해주세요.');
      });
  };
  return (
    <div className={style.wrap}>
      <div className={style.logo}>
        <img src='images/logo.png' />
      </div>
      <div className={style.container}>
        <form onSubmit={onSubmit}>
          <div style={{ width: '100%', height: '100%' }}>
            <div style={{ margin: 'auto', width: 'fit-content' }}>
              <div className={style.item}>
                <input
                  type='email'
                  name='memberEmail'
                  className={style.email}
                  id='memberEmail'
                  value={memberEmail}
                  placeholder='이메일'
                  maxLength='20'
                  onChange={handleValueChange}
                />
              </div>
              <div className={style.item}>
                <input
                  type='password'
                  className={style.password}
                  name='memberPass'
                  id='memberPass'
                  value={memberPass}
                  placeholder='비밀번호'
                  maxLength='20'
                  onChange={handleValueChange}
                />
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button type='submit' className={style.loginbtn}>
                로그인
              </button>

              <button onClick={handleSignupClick} className={style.loginbtn}>
                회원가입
              </button>
            </div>

            {/* <div className={style.joinbtnbox}>
          <Link className={style.joinbtn} >
            회원가입
          </Link>
          </div>
           */}
            <div style={{ width: '100%', height: '250px' }}>
              <div className={style.logo2}>
                <img src='images/logo.png' />
              </div>
            </div>
          </div>
          {/* 알림 메시지 표시 */}
          {errorMessage && (
            <div className={style.errorMessage}>{errorMessage}</div>
          )}
        </form>
      </div>
      <div className={style.copyrightbox}>
        <div style={{ marginTop: '12px' }}>
          <div>
            <span> 회사명 : SPORTSLIGHT</span>
            <span> 사업자등록번호 : 0000-000-11-1111</span>
          </div>
          <div>
            <span>고객센터 : 1670-1525 (평일/주말 09시~18시, 공휴일 휴무)</span>
          </div>
          <div>
            <span>
              사업장 : 서울특별시 강남구 강남대로 34, 이젠컴퓨터아카데미
              14층(서초동)
            </span>
          </div>
          <p className='copyright'>
            Copyright © 주식회사 스포츠라이트 All right reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
