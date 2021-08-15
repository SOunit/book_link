import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
  return (
    <header className={classes['main-header']}>
      <h1 className={classes['main-header__title']}>
        <NavLink to='/search' className={classes['main-header__title-link']}>
          book-link
        </NavLink>
      </h1>
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
        </ul>
      </nav>
      <div className={classes['side-nav-button']}>
        <div className={classes['side-nav-button__bar']}></div>
        <div className={classes['side-nav-button__bar']}></div>
        <div className={classes['side-nav-button__bar']}></div>
      </div>
    </header>
  );
};

export default MainNavigation;
