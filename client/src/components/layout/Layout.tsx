import { Fragment, useState } from 'react';

import MainNavigation from './MainNavigation';
import SideNavigation from './SideNavigation';
import FooterNav from './FooterNav';

import classes from './Layout.module.css';
import Backdrop from '../ui/Backdrop';

const Layout: React.FC = (props) => {
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
      <FooterNav />
    </Fragment>
  );
};

export default Layout;
