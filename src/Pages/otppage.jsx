import React, { useState } from 'react'
import Input from '../Components/input'
import { useLocation, useNavigate } from 'react-router-dom';
const Otppage = () => {
    const Navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const email = location.state?.email;

    function clickHandler(e) {
        e.preventDefault();
        fetch('http://localhost:3000/api/v1/confirm-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp, email }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then((data) => {
                console.log('Success:', data);
                Navigate('/login')
            })
            .catch((error) => {
                alert(error)
            });
    }

    return (
        <div className='min-w-fit min-h-fit border p-4 flex justify-center items-center'>
            <Input
                label="Otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <div className='flex justify-center p-2'>
                <button className='border text-white bg-black p-2 hover:bg-white hover:text-black transition duration-100 font-medium' onClick={clickHandler}>Submit</button>
            </div>
        </div>
    )
}

export default Otppage
