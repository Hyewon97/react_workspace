import { Route, Routes } from 'react-router-dom';
import './App.css';
import BaseLayout from './components/layout/BaseLayout';
import Login from './components/memberz/login';
import Signup from './components/memberz/signup';
import EditInfo from './components/memberz/eidtinfo';
import Withdraw from './components/memberz/withdraw';
import Main from './components/main/main';
import Myteam from './components/mymy/myteam';
import Notice from './components/mymy/notice';
import Qna from './components/mymy/qna';
import TalkCreate from './components/community/footballtalk/talkCreate';
import TalkRead from './components/community/footballtalk/talkRead';
import TalkUpdate from './components/community/footballtalk/talkUpdate';
import TalkList from './components/community/footballtalk/talkList';
import Category from './components/search/category';
import Search from './components/search/search';
import Schedule from './components/schedule/schedule';
import MyPage from './components/memberz/mypage';
import LogOut from './components/memberz/logout';
import MyHeart from './components/mymy/myHeart';
import MyFavorite from './components/mymy/myFavorite';
import NoticeView from './components/mymy/noticeview';
import View from './components/video/view';
import PrivateRoute from './access/PrivateRoute';

function App() {
  return (
    <div className='pageboder'>
      <Routes>
        <Route index element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route
          path='editinfo'
          element={<PrivateRoute isAuth={true} RouteComponent={EditInfo} />}
        />
        <Route path='logout' element={<LogOut />} />
        <Route
          path='withdraw'
          element={<PrivateRoute isAuth={true} RouteComponent={Withdraw} />}
        />
        <Route path='/' element={<BaseLayout />}>
          <Route path='mypage' element={<MyPage />} />

          {/* <Route path='withdraw' element={<Withdraw />} /> */}
          <Route
            path='main'
            element={<PrivateRoute isAuth={true} RouteComponent={Main} />}
          />
          <Route
            path='view/:videoNum'
            element={<PrivateRoute isAuth={true} RouteComponent={View} />}
          />

          {/* mypage 하위에 myteam/myheart/myfavorite 정렬 */}
          <Route
            path='mypage'
            element={<PrivateRoute isAuth={true} RouteComponent={MyPage} />}
          >
            <Route
              path='myteam'
              element={<PrivateRoute isAuth={true} RouteComponent={Myteam} />}
            />
            <Route
              path='myheart'
              element={<PrivateRoute isAuth={true} RouteComponent={MyHeart} />}
            />
            <Route
              path='myfavorite'
              element={
                <PrivateRoute isAuth={true} RouteComponent={MyFavorite} />
              }
            />
          </Route>

          <Route
            path='notice'
            element={<PrivateRoute isAuth={true} RouteComponent={Notice} />}
          />
          <Route
            path='noticeview/:noticeNum'
            element={<PrivateRoute isAuth={true} RouteComponent={NoticeView} />}
          />
          <Route
            path='qna'
            element={<PrivateRoute isAuth={true} RouteComponent={Qna} />}
          />

          <Route
            path='footballtalk/list/:currentPage'
            element={<PrivateRoute isAuth={true} RouteComponent={TalkList} />}
          />
          <Route
            path='footballtalk/create'
            element={<PrivateRoute isAuth={true} RouteComponent={TalkCreate} />}
          />
          <Route
            path='footballtalk/read/:talkNum'
            element={<PrivateRoute isAuth={true} RouteComponent={TalkRead} />}
          />
          <Route
            path='footballtalk/update/:talkNum'
            element={<PrivateRoute isAuth={true} RouteComponent={TalkUpdate} />}
          />

          <Route
            path='category'
            element={<PrivateRoute isAuth={true} RouteComponent={Category} />}
          />
          <Route
            path='search/:searchWord2'
            element={<PrivateRoute isAuth={true} RouteComponent={Search} />}
          />

          <Route
            path='schedule'
            element={<PrivateRoute isAuth={true} RouteComponent={Schedule} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
