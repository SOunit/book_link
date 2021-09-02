import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './FooterNav.module.css';

const FooterNav: FC = () => {
  return (
    <footer className={classes['footer']}>
      <nav className={classes['footer-nav']}>
        <ul className={classes['nav-items']}>
          <li className={classes['nav-item']}>
            <NavLink
              to='/search'
              className={classes['nav__link']}
              activeClassName={classes['nav__link--active']}
            >
              <div className={classes['nav__icon-box']}>
                <i className={`fas fa-search ${classes['nav__icon']}`}></i>
                <p className={classes['nav__text']}>Serach</p>
              </div>
            </NavLink>
          </li>
          <li className={classes['nav-item']}>
            <NavLink
              to='/chat'
              className={classes['nav__link']}
              activeClassName={classes['nav__link--active']}
            >
              <div className={classes['nav__icon-box']}>
                <i className={`far fa-comments ${classes['nav__icon']}`}></i>
                <p className={classes['nav__text']}>Chat</p>
              </div>
            </NavLink>
          </li>
          <li className={classes['nav-item']}>
            <NavLink
              to='/home'
              className={classes['nav__link']}
              activeClassName={classes['nav__link--active']}
            >
              <div className={classes['nav__icon-box']}>
                <i className={`fas fa-home ${classes['nav__icon']}`}></i>
                <p className={classes['nav__text']}>Home</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default FooterNav;
