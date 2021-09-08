import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './SideNavigation.module.css';

const SideNavigation: React.FC<{ onSideMenuToggle: () => void }> = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes['side-navigation']}>
      <nav className={classes['side-navigation__nav']}>
        <ul className={classes['side-navigation__items']}>
          <li className={classes['side-navigation__item']}>
            <NavLink
              to='/search'
              className={classes['side-navigation__link']}
              activeClassName={classes['side-navigation__link--active']}
              onClick={props.onSideMenuToggle}
            >
              Search
            </NavLink>
          </li>
          <li className={classes['side-navigation__item']}>
            <NavLink
              to='/chats'
              className={classes['side-navigation__link']}
              activeClassName={classes['side-navigation__link--active']}
              onClick={props.onSideMenuToggle}
            >
              Chats
            </NavLink>
          </li>
          <li className={classes['side-navigation__item']}>
            <NavLink
              to='/home'
              className={classes['side-navigation__link']}
              activeClassName={classes['side-navigation__link--active']}
              onClick={props.onSideMenuToggle}
            >
              Home
            </NavLink>
          </li>
          <li className={classes['side-navigation__item']}>
            <NavLink
              to='/login'
              className={classes['side-navigation__link']}
              activeClassName={classes['side-navigation__link--active']}
              onClick={props.onSideMenuToggle}
            >
              Sign out
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;
