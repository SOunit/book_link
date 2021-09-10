import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation: React.FC<{ onSideMenuToggle: () => void }> = (props) => {
  const authCtx = useContext(AuthContext);

  const headerNav = (
    <nav className={classes['main-header__nav']}>
      <ul className={classes['main-header__nav-items']}>
        <li className={classes['main-header__nav-item']}>
          <NavLink
            to='/search'
            className={classes['main-header__nav-link']}
            activeClassName={classes['main-header__nav-link--active']}
          >
            Search
          </NavLink>
        </li>
        <li className={classes['main-header__nav-item']}>
          <NavLink
            to='/chats'
            className={classes['main-header__nav-link']}
            activeClassName={classes['main-header__nav-link--active']}
          >
            Chats
          </NavLink>
        </li>
        <li className={classes['main-header__nav-item']}>
          <NavLink
            to='/home'
            className={classes['main-header__nav-link']}
            activeClassName={classes['main-header__nav-link--active']}
          >
            Home
          </NavLink>
        </li>
        <li className={classes['main-header__nav-item']}>
          <NavLink
            to='/login'
            className={classes['main-header__nav-link']}
            activeClassName={classes['main-header__nav-link--active']}
          >
            Sign out
          </NavLink>
        </li>
      </ul>
    </nav>
  );

  const sideNavButton = (
    <div
      className={classes['side-nav-button']}
      onClick={props.onSideMenuToggle}
    >
      <div className={classes['side-nav-button__bar']}></div>
      <div className={classes['side-nav-button__bar']}></div>
      <div className={classes['side-nav-button__bar']}></div>
    </div>
  );

  return (
    <header className={classes['main-header']}>
      <h1 className={classes['main-header__title']}>
        <NavLink to='/' className={classes['main-header__title-link']}>
          book-link
        </NavLink>
      </h1>
      {authCtx.isLoggedIn && headerNav}
      {authCtx.isLoggedIn && sideNavButton}
    </header>
  );
};

export default MainNavigation;
