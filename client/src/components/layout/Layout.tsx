import { Fragment, useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import MainNavigation from './MainNavigation';
import SideNavigation from './SideNavigation';
import FooterNav from './FooterNav';
import Backdrop from '../ui/Backdrop';
import classes from './Layout.module.css';

const Layout: React.FC = (props) => {
  const authCtx = useContext(AuthContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const sideMenuToggleHandler = () => {
    setIsSideMenuOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <Fragment>
      <MainNavigation onSideMenuToggle={sideMenuToggleHandler} />
      {isSideMenuOpen && <Backdrop onSideMenuToggle={sideMenuToggleHandler} />}
      {isSideMenuOpen && (
        <SideNavigation onSideMenuToggle={sideMenuToggleHandler} />
      )}
      <main className={classes.main}>{props.children}</main>
      {authCtx.isLoggedIn && <FooterNav />}
    </Fragment>
  );
};

export default Layout;
