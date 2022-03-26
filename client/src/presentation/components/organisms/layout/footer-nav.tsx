import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavShown } from '../../../hooks/';
import { isPathMatch } from '../../../../services/util';
import classes from './footer-nav.module.scss';

const FooterNav: FC = () => {
  const { isNavShown } = useNavShown();
  const { pathname } = useLocation();

  let footerNav = null;
  if (isNavShown) {
    footerNav = (
      <nav className={classes['footer-nav']}>
        <ul className={classes['nav-items']}>
          <li className={classes['nav-item']}>
            <NavLink
              to="/search"
              className={`${classes['nav__link']} ${
                pathname === '/' && classes['nav__link--active']
              }`}
              activeClassName={classes['nav__link--active']}>
              <div className={classes['nav__icon-box']}>
                <i className={`fas fa-search ${classes['nav__icon']}`}></i>
                <p className={classes['nav__text']}>Search</p>
              </div>
            </NavLink>
          </li>
          <li className={classes['nav-item']}>
            <NavLink
              to="/chats"
              className={classes['nav__link']}
              activeClassName={classes['nav__link--active']}>
              <div className={classes['nav__icon-box']}>
                <i className={`far fa-comments ${classes['nav__icon']}`}></i>
                <p className={classes['nav__text']}>Chats</p>
              </div>
            </NavLink>
          </li>
          <li className={classes['nav-item']}>
            <NavLink
              to="/home"
              className={`${classes['nav__link']} ${
                isPathMatch(pathname) && classes['nav__link--active']
              }`}
              activeClassName={classes['nav__link--active']}>
              <div className={classes['nav__icon-box']}>
                <i className={`fas fa-home ${classes['nav__icon']}`}></i>
                <p className={classes['nav__text']}>Home</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }

  return <footer className={classes['footer']}>{footerNav}</footer>;
};

export default FooterNav;
