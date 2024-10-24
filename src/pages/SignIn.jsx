import React, { useState } from 'react'
import { FormField } from '../components'
import { Link, useNavigate } from 'react-router-dom';
import '../style/LoadingSpinner.css'
import { signInStart, signInSuccess, signInFailure } from '../redux/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OAuth } from '../components/OAuth';

export const SignIn = () => {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/v1/auth/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        setTimeout(() => {
          dispatch(signInFailure(data.message));
          toast.success(data.message ? data.message || 'Something went wrong !' : '', {
            position: 'top-right',
            autoClose: 2000,
            style: { backgroundColor: 'black', color: 'white' }
          });
        }, 2000)
        return;
      };
      toast.success('Sign In successfully..!', {
        position: 'top-right',
        autoClose: 2000,
        style: { backgroundColor: 'black', color: 'white' },
      });
      setTimeout(() => {
        dispatch(signInSuccess(data));
        navigate('/home');
      }, 2000);
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'> Sign In</h1>
      <ToastContainer />
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}
      <form className='max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
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
            Sign In
          </button>
          <OAuth/>
          <div className='flex gap-2 '>
            <p>Don't Have an account?</p>
            <Link to="/"><p className='text-blue-500'>Sing Up</p></Link>
          </div>
        </div>
      </form>
    </div>
  )
}
