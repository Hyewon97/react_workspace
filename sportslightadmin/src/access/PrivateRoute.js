import { Navigate } from "react-router-dom";

// 로그인을 해야만 접근할 수 있음
const PrivateRoute = ({ isAuth, RouteComponent }) => {
  const isLogin = localStorage.getItem("isLogin");
  console.log(isAuth, isLogin);
  // 인증이 반드시 필요한 페이지이고 인증이 된 페이지
  if (isAuth && isLogin) {
    return <RouteComponent />;
  }

  // 인증이 반드시 필요한 페이지이고 인증이 안된 페이지
  // 인증이 안된상태에서 접근했을 때 보내지는 주소
  else if (isAuth && !isLogin) {
    return <Navigate to="/admin/login" />;
  }

  //인증이 필요하지 않은 페이지
  else {
    return <RouteComponent />;
  }
};

export default PrivateRoute;
