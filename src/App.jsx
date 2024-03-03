import React from 'react';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import { logo } from './assets';
import './App.css'
import { Home } from './pages';
import { CreatePost } from './pages';
import { SignIn } from './pages/SignIn';
import { About } from './pages/About';
import { Header } from './components/Header';
import { SignUp } from './pages/SignUp';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        {/* <header className='w-full flex justify-between item-center bg-gray-300 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
          <Link to="/">
            <img src={logo} alt='logo' className='w-28 object-contain' />
          </Link>
          <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create</Link>
          <Link to="/about" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>About</Link>
        </header> */}
        <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
          <Routes>
            <Route path='sign-in' element={<SignIn />} />
            <Route path='about' element={<About />} />
            <Route path='home' element={<Home />} />
            <Route path='/' element={<SignUp />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
