import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import classes from './FooterNav.module.css';

const FooterNav: FC = () => {
  const location = useLocation();
  const [isFooterShown, setIsFooterShown] = useState(true);

  useEffect(() => {
    const reg = /chats\/\d/;
    const match = reg.test(location.pathname);
    match ? setIsFooterShown(false) : setIsFooterShown(true);
  }, [location.pathname]);

  let footerNav = null;
  if (isFooterShown) {
    footerNav = (
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
              to='/chats'
              className={classes['nav__link']}
              activeClassName={classes['nav__link--active']}
            >
              <div className={classes['nav__icon-box']}>
                <i className={`far fa-comments ${classes['nav__icon']}`}></i>
                <p className={classes['nav__text']}>Chats</p>
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
    );
  }

  return <footer className={classes['footer']}>{footerNav}</footer>;
};

export default FooterNav;
