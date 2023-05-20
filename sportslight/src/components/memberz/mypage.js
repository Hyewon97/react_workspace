import { NavLink, Outlet } from 'react-router-dom';
import Style from '../mymy/myTHF.module.css';

const memberName = localStorage.getItem('memberProfile');

const MyPage = () => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        paddingTop: '120px',
        paddingBottom: '1px',
      }}
    >
      <div className={Style.myNav}>
        <div className={Style.mySize}>
          <div className={Style.userName}>
            <img
              src='/images/userSL.png'
              alt='userLogoSL'
              style={{ width: '100px' }}
            />
            <span style={{ marginRight: '5px' }}>{memberName}</span>
            <span>님</span>
            <div
              style={{
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                className={Style.userEI}
                onClick={() => {
                  window.location.href = '/editinfo';
                }}
              >
                <img
                  src='/images/userEditInfo.png'
                  alt='userEditInfo'
                  style={{ width: '15px', marginRight: '3px' }}
                />
                회원정보 수정
              </div>
            </div>
          </div>
          <div>
            <ul className='myTeamHF'>
              <li className='separateLine'>
                <NavLink className='nav-link' to='/mypage/myteam'>
                  MY 팀 / 리그
                </NavLink>
              </li>

              <li className='separateLine'>
                <NavLink className='nav-link' to='/mypage/myheart'>
                  좋아요
                </NavLink>
              </li>

              <li>
                <NavLink className='nav-link' to='/mypage/myfavorite'>
                  즐겨찾기
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MyPage;
