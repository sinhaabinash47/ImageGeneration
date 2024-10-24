import React, { useState } from 'react'
import { FormField } from '../components'
import { Link, useNavigate } from 'react-router-dom';
import '../style/LoadingSpinner.css'
import { OAuth } from '../components/OAuth';

export const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(false);
            setLoading(true);
            const response = await fetch('/api/v1/auth/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setLoading(true);
            if (data.success === false) {
                setError(true);
                return;
            }
            setTimeout(() => {
                navigate('/sign-in');
                setError(false);
            }, 2000)
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className='max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-8'> Sign Up</h1>
            {loading && (
                <div className='loader-overlay'>
                    <div className='loader'></div>
                </div>
            )}
            <form className='max-w-3xl' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <FormField
                        type="text"
                        name="userName"
                        placeholder="Username"
                        id="userName"
                        handleChange={handleChange}
                    />
                    <FormField
                        type="email"
                        name="email"
                        placeholder="email"
                        id="email"
                        handleChange={handleChange}
                    />
                    <FormField
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        handleChange={handleChange}
                    />
                    <button disabled={loading} type='submit'
                        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                        {loading ? 'loading...!' : 'Sign Up'}
                    </button>
                    <OAuth/>
                    <div className='flex gap-2 '>
                        <p>Have an account?</p>
                        <Link to="/sign-in"><p className='text-blue-500'>Sing In</p></Link>
                    </div>
                    <p className='text-red-700 '>{error && 'Something went wrong !'}</p>
                </div>
            </form>
        </div>
    )
}
