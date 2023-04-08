import { Navigate } from "react-router-dom";

// 로그인을 해야만 접근할 수 있고, 정상적으로 로그인 되면 가는 컴포넌트?
const PrivateRoute = ({ isAuth, RouteComponent }) => {
  const isLogin = localStorage.getItem("isLogin");
  console.log(isAuth, isLogin);
  // 인증이 반드시 필요한 페이지이고 인증이 된 페이지
  if (isAuth && isLogin) {
    return <RouteComponent />;
  }

  // 인증이 반드시 필요한 페이지이고 인증이 안된 페이지
  else if (isAuth && !isLogin) {
    return <Navigate to="/login" />;
  }

  //인증이 필요하지 않은 페이지
  else {
    return <RouteComponent />;
  }

  // return <Navigate to='/' />;
};

export default PrivateRoute;
