import TopBar from './TopBar';
import Footer from './Footer';
import '../estilos/index.css';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <TopBar />
      <Outlet />
      <Footer />
    </>
  );
}
