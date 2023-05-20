import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuth, RouteComponent }) => {
  const isLogin = localStorage.getItem('isLogin') || false;
  console.log(isAuth, isLogin);
  // 전부 true 여야 페이지 로드
  if (isAuth && isLogin) {
    return <RouteComponent />;
  }

  // 하나라도 부적합하면 로그인으로 보냄
  else if (isAuth && !isLogin) {
    // return <Navigate to='/' />;
    return (window.location.href = '/');
  }

  //인증이 필요하지 않은 페이지
  else {
    return <RouteComponent />;
  }
};

export default PrivateRoute;
