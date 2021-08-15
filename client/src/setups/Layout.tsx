import { Route, NavLink, Redirect } from 'react-router-dom';
import Setup from './Setup';
import OtherPage from './OtherPage';
import classes from './Layout.module.css';

function Layout() {
  return (
    <section>
      <div className={classes.layout}>
        <header className={classes.header}>
          <NavLink
            to='/home'
            className={classes.header__item}
            activeClassName={classes['header__item--active']}
          >
            Home
          </NavLink>
          <NavLink
            to='/otherpage'
            className={classes.header__item}
            activeClassName={classes['header__item--active']}
          >
            Other Page
          </NavLink>
        </header>
        <main>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
          <Route path='/home' component={Setup} />
          <Route path='/otherpage' component={OtherPage} />
        </main>
      </div>
    </section>
  );
}

export default Layout;
