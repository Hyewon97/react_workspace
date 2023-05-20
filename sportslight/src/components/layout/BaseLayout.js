import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

function BaseLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default BaseLayout;
