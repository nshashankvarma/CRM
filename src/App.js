import { BrowserRouter, Route,Routes} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}>
      </Route>
      <Route path="/home" element={<Home/>}>
      </Route>
      <Route path="/profile/:name" element={<Profile/>}>
      </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
