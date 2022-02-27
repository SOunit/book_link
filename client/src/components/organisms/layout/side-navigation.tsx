import { NavLink } from 'react-router-dom';
import classes from './side-navigation.module.css';

type Props = { onSideMenuToggle: () => void; className: string };

const SideNavigation: React.FC<Props> = ({ onSideMenuToggle, className }) => {
  return (
    <div className={`${classes['side-navigation']} ${className}`}>
      <nav className={classes['side-navigation__nav']}>
        <ul className={classes['side-navigation__items']}>
          <li className={classes['side-navigation__item']}>
            <NavLink
              to="/search"
              className={classes['side-navigation__link']}
              activeClassName={classes['side-navigation__link--active']}
              onClick={onSideMenuToggle}>
              Search
            </NavLink>
          </li>
          <li className={classes['side-navigation__item']}>
            <NavLink
              to="/chats"
              className={classes['side-navigation__link']}
              activeClassName={classes['side-navigation__link--active']}
              onClick={onSideMenuToggle}>
              Chats
            </NavLink>
          </li>
          <li className={classes['side-navigation__item']}>
            <NavLink
              to="/home"
              className={classes['side-navigation__link']}
              activeClassName={classes['side-navigation__link--active']}
              onClick={onSideMenuToggle}>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;