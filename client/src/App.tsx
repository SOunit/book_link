import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Setup from './setups/Setup';
import OtherPage from './setups/OtherPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Link to='/'>Home</Link>
        <Link to='/otherpage'>Other Page</Link>
        <Route exact path='/' component={Setup} />
        <Route path='/otherpage' component={OtherPage} />
      </div>
    </Router>
  );
}

export default App;
