import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import Signup from "./Pages/signup";
import Login from "./Pages/login";
import Home from "./Pages/Home";
import Success from "./Pages/success";
import Otppage from "./Pages/otppage";
import Admin from "./Pages/Admin";
import Teacher from "./Pages/Teacher";
import Student from "./Pages/Student";
import ProtectedRoute from './Pages/ProtectedRoute';

function App() {

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('Token');
    navigate('/');
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-green-500 to-emerald-700 flex items-center p-3 flex-col gap-8">
      <h1 className="text-3xl font-bold text-white">Welcome to Razz Web!</h1>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path='/confirm-user' element={<Otppage />} />
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
          <Route path="/student" element={<Student />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Teacher']} />}>
          <Route path="/teacher" element={<Teacher />} />
        </Route>

        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
      </Routes>
    </div>
  );
}

export default App;
