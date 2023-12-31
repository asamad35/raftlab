import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import ProtectedRoute from './utils/ProtectedRoute';
import AuthRoute from './utils/AuthRoute';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserProfile from './components/UserProfile/UserProfile';

function App() {

  return (
    <BrowserRouter >
      <Routes>

        <Route element={<AuthRoute />}>
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Home />} path="/" />
          <Route element={<UserProfile />} path="/user/:id" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
