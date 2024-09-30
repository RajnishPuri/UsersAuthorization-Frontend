import React from 'react';
import { useNavigate } from "react-router-dom";
const Home = () => {

    const navigate = useNavigate();

    function signupHandler() {
        navigate('/signup');
    }

    function loginHandler() {
        navigate('/login');
    }
    return (
        <div className="border-2 border-gray-700 w-1/3 h-1/3 flex flex-col gap-6 justify-center items-center">
            <button
                className="border-2 w-1/2 font-semibold text-white hover:text-black hover:border-black transition duration-100"
                onClick={signupHandler}
            >
                Sign Up
            </button>
            <button
                className="border-2 w-1/2 font-semibold text-white hover:text-black hover:border-black transition duration-100"
                onClick={loginHandler}
            >
                Login
            </button>
        </div>
    )
}

export default Home;
