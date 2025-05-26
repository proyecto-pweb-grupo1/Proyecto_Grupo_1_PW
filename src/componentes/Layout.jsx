import TopBar from './TopBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <TopBar />
      <Outlet />
      <Footer />
    </>
  );
}
