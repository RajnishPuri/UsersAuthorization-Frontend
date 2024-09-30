import React, { useState, useEffect } from 'react';
import Input from '../Components/input';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('Token');
        console.log("Token to decode:", token);

        if (typeof token === 'string' && token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);

                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp < currentTime) {
                    console.warn("Token has expired");
                    return;
                }

                const role = decodedToken.role;
                console.log("Role in:", role);
                if (role) {
                    if (role === 'Admin') {
                        navigate('/admin');
                    } else if (role === 'Student') {
                        navigate('/student');
                    } else if (role === 'Teacher') {
                        navigate('/teacher');
                    }
                }
            } catch (error) {
                console.error("Failed to decode token:", error.message);
            }
        } else {
            console.warn("No valid token found");
        }
    }, [navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        };

        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then((data) => {
                if (data.success && data.Token) {
                    Cookies.set('Token', data.Token);
                    const decodedToken = jwtDecode(data.Token);
                    const role = decodedToken.role;
                    console.log(role);
                    if (role === 'Admin') {
                        navigate('/admin');
                    } else if (role === 'Student') {
                        navigate('/student');
                    } else if (role === 'Teacher') {
                        navigate('/teacher');
                    }
                } else {
                    console.error('Login failed:', data.msg);
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <div className='min-w-fit min-h-fit border p-4'>
            <form onSubmit={submitHandler} autoComplete="off">
                <Input
                    type="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                />
                <Input
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                />
                <div className='flex justify-center p-2'>
                    <button className='border text-white bg-black p-2 hover:bg-white hover:text-black transition duration-100 font-medium'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
