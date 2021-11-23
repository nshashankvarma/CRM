import { BrowserRouter, Route,Routes} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Analytics from './components/Analytics';
import Intro from './components/Intro';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Intro/>}>
      </Route>
      <Route path="/login" element={<Login/>}>
      </Route>
      <Route path="/home" element={<Home/>}>
      </Route>
      <Route path="/profile/:name" element={<Profile/>}>
      </Route>
      <Route path="/analytics" element={<Analytics/>}>
      </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
