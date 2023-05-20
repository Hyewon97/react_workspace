import React, { useState, useEffect } from 'react';
import './header.css';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import DropDown from './dropDown';
import { useSelector, useDispatch } from 'react-redux';
import { videoActions } from '../../reduxs/actions/videoActions';

const Header = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [searchWord2, setSearchWord2] = useState('');
  const navigate = useNavigate();
  const { searchWord } = useParams();
  const { pathname } = useLocation();

  const searchList = useSelector((state) => state.video.searchList);

  function handleSearchWordChange(e) {
    setSearchWord2(e.target.value);
    // console.log(searchWord2);
  }

  const getSearchList = (searchWord) => {
    dispatch(videoActions.getSearchList(searchWord));
  };

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      onSubmit();
    }
  }

  const onSubmit = async (e) => {
    // console.log(searchList);
    const searchUrl = `/search/${searchWord2}`;
    getSearchList(searchWord2);
    navigate(searchUrl);
    //window.location.href = searchUrl;
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    const slicePathName = pathname.slice(
      pathname.lastIndexOf('/') + 1,
      pathname.length
    );
    if (slicePathName) {
      getSearchList(decodeURI(slicePathName));
    }

    return () => {
      console.log('return');
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <nav className={`nav ${show && 'nav__black'} `}>
      <img
        alt='logo'
        src='/images/logowhite.png'
        className='nav__logo'
        onClick={() => (window.location.href = '/main')}
      />

      <div className='nav_li'>
        <ul style={{ marginBlockStart: 'unset' }}>
          <li>
            <Link to='/category'>리그영상</Link>
          </li>
          <li>
            <Link to='/schedule'>경기일정</Link>
          </li>
          <li>
            <Link to='/footballtalk/list/1'>커뮤니티</Link>
          </li>
        </ul>
      </div>

      <div className='searchInput'>
        <input
          type='text'
          className='searchBar'
          value={searchWord2}
          onChange={handleSearchWordChange}
          onKeyDown={handleKeyDown}
          placeholder='검색어를 입력하세요.'
        />
        <img
          className='searchIcon'
          src='/images/free-icon-search-4347487.png'
          alt='search-icon'
          style={{ width: '20px', float: 'right' }}
          onClick={onSubmit}
        />
      </div>

      <DropDown />
    </nav>
  );
};

export default Header;

// <div className="searchIcon"
//   onClick={onSubmit}
// style={{width:"20px"}}></div>
