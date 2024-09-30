import React, { useState } from 'react';
import Input from '../Components/input';
import { Route, Routes, useNavigate } from "react-router-dom";

const Signup = () => {
    const roleOptions = ['Admin', 'Student', 'Teacher'];

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState(roleOptions[0]);
    const Navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();

        const userData = {
            email,
            password,
            name,
            role,
        };

        fetch('http://127.0.0.1:3000/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                Navigate('/confirm-user', { state: { email } });
            })
            .catch((error) => {
                alert(error)
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
                <Input
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                />
                <Input
                    type="option"
                    label="Roles"
                    options={roleOptions}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <div className='flex justify-center p-2'>
                    <button className='border text-white bg-black p-2 hover:bg-white hover:text-black transition duration-100 font-medium'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
