import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Style from './dropDown.module.css';

const DropDown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const memberName = localStorage.getItem('memberProfile');
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='member-info' style={{ position: 'relative' }}>
      <div
        className='member-info__avatar'
        style={{ width: '40px', paddingRight: '70px', paddingBottom: '30px' }}
        onClick={toggleMenu}
      >
        <img className='userImg' src='/images/userSL.png' alt='User' />
      </div>
      {isMenuOpen && (
        <div ref={menuRef} className={Style.menu}>
          <li
            style={{
              listStyle: 'none',
              top: '0',
              left: '50%',
              fontSize: 'x-large',
              padding: '10px',
            }}
          >
            <span>{memberName}</span>
            <span>님 반갑습니다!</span>
          </li>
          <ul className={Style.dropMenu}>
            <li style={{ color: 'darkgray' }}>
              <Link to='/mypage/myteam' onClick={handleMenuClick}>
                {' '}
                MY{' '}
              </Link>
            </li>
            <li>
              <Link to='/notice' onClick={handleMenuClick}>
                고객센터
              </Link>
            </li>
            <li>
              <Link to='/qna' onClick={handleMenuClick}>
                자주묻는질문
              </Link>
            </li>
            <li>
              <Link to='/logout' onClick={handleMenuClick}>
                로그아웃
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
