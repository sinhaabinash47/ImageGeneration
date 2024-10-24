import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/users/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export const OAuth = () => {
    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/v1/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            toast.success('Sign In successfully..!', {
                position: 'top-right',
                autoClose: 2000,
                style: { backgroundColor: 'black', color: 'white' },
            });
            setTimeout(() => {
                dispatch(signInSuccess(data));
                // window.location.href = "http://localhost:3000/";
                navigate('/home');
            }, 2000);
        } catch (error) {
            dispatch(signInFailure(error));
        }
    }

    // const handleGoogle = async () => {
    //     try {
    //         const provider = new GoogleAuthProvider();
    //         const auth = getAuth(app);
    //         const result = await signInWithPopup(auth, provider);
    //         const res = await fetch('/api/v1/auth/google', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 name: result.user.displayName,
    //                 email: result.user.email,
    //                 photo: result.user.photoURL,
    //             })
    //         })
    //         const data = res.json();
    //         if (data.success === false) {
    //             setTimeout(() => {
    //                 dispatch(signInFailure(data.message));
    //                 toast.success(data.message ? data.message || 'Something went wrong !' : '', {
    //                     position: 'top-right',
    //                     autoClose: 2000,
    //                     style: { backgroundColor: 'black', color: 'white' }
    //                 });
    //             }, 2000)
    //             return;
    //         };
    //         toast.success('Sign In successfully..!', {
    //             position: 'top-right',
    //             autoClose: 2000,
    //             style: { backgroundColor: 'black', color: 'white' },
    //         });
    //         setTimeout(() => {
    //             dispatch(signInSuccess(data));
    //             navigate('/home');
    //         }, 2000);
    //     } catch (error) {
    //         dispatch(signInFailure(error));
    //     }
    // }
    return (
        <>
            <button type='button'
                onClick={handleGoogle}
                className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                Continue With Google
            </button>
            <ToastContainer />
        </>
    )
}
