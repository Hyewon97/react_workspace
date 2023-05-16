import { Route, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // 부트 스트랩 임포트

import React from "react";

import BaseLayout from "./components/layout/BaseLayout";

import Home from "./components/home";
import JoinAdd from "./components/adminz/join_add";
import LoginPage from "./components/adminz/login";
import LogOut from "./components/adminz/logout";
import PrivateRoute from "./access/PrivateRoute";
import Update from "./components/adminz/update";
import NoticeList from "./components/notice/notice_list";
import NoticeWrite from "./components/notice/notice_write";
import NoticeView from "./components/notice/notice_view";
import NoticeUpdate from "./components/notice/notice_update";
import memberzList from "./components/memberz/memberz_list";
import VideoList from "./components/video/video_list";
import VideoUpdate from "./components/video/video_update";
import VideoView from "./components/video/video_view";
import VideoBoardList from "./components/videoBoard/videoBoard_list";
import FootballTalklist from "./components/footballTalk/talk_list";
import FootballTalkReplyList from "./components/footballTalkReply/talkReply_list";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route
            path="admin/update"
            element={<PrivateRoute isAuth={true} RouteComponent={Update} />}
          />

          <Route
            path="admin/logout"
            element={<PrivateRoute isAuth={true} RouteComponent={LogOut} />}
          />
          <Route
            path="admin/login"
            element={<PrivateRoute isAuth={false} RouteComponent={LoginPage} />}
          />
          <Route
            path="admin/signup"
            element={<PrivateRoute isAuth={false} RouteComponent={JoinAdd} />}
          />

          {/* 공지사항 */}
          <Route
            path="admin/notice/list/:currentPage"
            element={
              <PrivateRoute isAuth={false} RouteComponent={NoticeList} />
            }
          />

          <Route
            path="/admin/notice/view/:num"
            element={<PrivateRoute isAuth={true} RouteComponent={NoticeView} />}
          />

          <Route
            path="/admin/notice/update/:noticeNum"
            element={
              <PrivateRoute isAuth={true} RouteComponent={NoticeUpdate} />
            }
          />

          <Route
            path="/admin/notice/write"
            element={
              <PrivateRoute isAuth={true} RouteComponent={NoticeWrite} />
            }
          />

          {/*  토크 게시판*/}
          <Route
            path="/admin/footballTalk/list/:currentPage"
            element={
              <PrivateRoute isAuth={false} RouteComponent={FootballTalklist} />
            }
          />

          {/* 공사중 */}
          <Route
            path="/admin/footballTalkReply/list/:currentTalkNum/:currentPage"
            element={
              <PrivateRoute
                isAuth={false}
                RouteComponent={FootballTalkReplyList}
              />
            }
          />

          {/*  회원 정보 관리*/}
          <Route
            path="/admin/member/list/:currentPage"
            element={
              <PrivateRoute isAuth={false} RouteComponent={memberzList} />
            }
          />

          {/*  비디오 관련 관리*/}
          <Route
            path="/admin/video/list/:currentPage"
            element={<PrivateRoute isAuth={false} RouteComponent={VideoList} />}
          />

          <Route
            path="/admin/video/view/:videoNum"
            element={<PrivateRoute isAuth={false} RouteComponent={VideoView} />}
          />

          <Route
            path="/admin/video/update/:videoNum"
            element={
              <PrivateRoute isAuth={false} RouteComponent={VideoUpdate} />
            }
          />

          <Route
            path="/admin/videoBoard/list/:currentVideoNum/:currentPage"
            element={
              <PrivateRoute isAuth={false} RouteComponent={VideoBoardList} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
