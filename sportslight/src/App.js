import { Route, Routes } from "react-router-dom";
import "./App.css";
import BaseLayout from "./components/layout/BaseLayout";
import Login from "./components/memberz/login";
import Signup from "./components/memberz/signup";
import EditInfo from "./components/memberz/eidtinfo";
import Withdraw from "./components/memberz/withdraw";
import Main from "./components/main/main";
import Myteam from "./components/mymy/myteam";
import Myvideo from "./components/mymy/myvideo";
import Notice from "./components/mymy/notice";
import Qna from "./components/mymy/qna";
import Talklist from "./components/community/talklist";
import Updatetalk from "./components/community/updatetalk";
import Viewtalk from "./components/community/viewtalk";
import Writetalk from "./components/community/writetalk";
import Category from "./components/search/category";
import Search from "./components/search/search";
import Schedule from "./components/schedule/schedule";
import Prediction from "./components/schedule/prediction";
import MyPage from "./components/memberz/mypage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Login />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="editinfo" element={<EditInfo />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="main" element={<Main />} />

          <Route path="myteam" element={<Myteam />} />
          <Route path="myvideo" element={<Myvideo />} />
          <Route path="notice" element={<Notice />} />
          <Route path="qna" element={<Qna />} />

          <Route path="talklist" element={<Talklist />} />
          <Route path="updatetalk" element={<Updatetalk />} />
          <Route path="viewtalk" element={<Viewtalk />} />
          <Route path="writetalk" element={<Writetalk />} />

          <Route path="category" element={<Category />} />
          <Route path="search" element={<Search />} />

          <Route path="schedule" element={<Schedule />} />
          <Route path="prediction" element={<Prediction />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
