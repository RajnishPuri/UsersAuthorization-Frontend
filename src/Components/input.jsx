import React from 'react';

const Input = ({ type, label, options, value, onChange, autoComplete = "on" }) => {
    return (
        <div className='flex p-2 w-full justify-between gap-5 text-white'>
            <label>
                {label}
            </label>
            {type === 'option' ? (
                <select
                    className='bg-gray-700 text-white border p-1'
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    className='bg-gray-700 text-white border p-1'
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                />
            )}
        </div>
    );
};

export default Input;
