import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Services';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './pages/user-routes/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import './App.css';
import PostPage from './pages/PostPage';
function App() {
  return (
    <div>
    <BrowserRouter>
    <ToastContainer position='bottom-center'/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/posts/:postId' element={<PostPage/>}/>
        <Route path='/user' element={<PrivateRoute/>}>
            <Route path='dashboard' element={<UserDashboard/>}/>
            <Route path='profile-info' element={<ProfileInfo/>}/>
        </Route>
    </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
