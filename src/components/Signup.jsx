import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";



const Signup = () => {
const navigate = useNavigate();
const [namecount, setName] = useState('');
  const [passwordCount, setPassword] = useState('')
  const [toastMessage, setToastMessage] = useState("");
  ;

  const [formSign, setFormDataSign] = useState({
    name: '',
    email: '',
    password: ''
  });


  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataSign({
      ...formSign,
      [name]: value
    });
  };



  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formSign.email)) {
      setError('Invalid email format');
      return;
    }
    if (formSign.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!formSign.name) {
      setError('name is required');
      return;
    }

    setError('');
    try {
      const response = await axios.post('https://6685d19983c983911b0019b4.mockapi.io/users', formSign);
      setToastMessage("User Sign Up Successfully");

  
    } catch (error) {
      console.error(error);
      setError('Sign up failed');
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
 

    try {
    const response = await axios.get('https://6685d19983c983911b0019b4.mockapi.io/users');
      const User = response.data.find(user => user.name === namecount && user.password === passwordCount  );
      if (User) {
      localStorage.setItem('isLoggedIn',  JSON.stringify(User));
      navigate("/Home");
      }
    } catch (error) {
      console.error(error);
      setError('Sign in failed');
    }
  
};
  return (
    <>
    <div className='contaner flex'>
    <div className='flex justify-center items-center min-h-screen'>
  <div className='w-[50%] max-sm:hidden'>
    <div className="flex justify-end items-center">
   
      <FaYoutube className=" fill-red-600  "  style={{ width: "50vw", height: "50vh"}} />

    </div>
  </div>
</div>

        <div className=' bg-base w-[50%] h-[100vh]  max-sm:w-[100%] '>
<div className='flex flex-col max-sm:flex-col max-sm:items-center  mt-20  '>
    <p className='text-white max-sm:text-center text-left font-extrabold text-6xl mb-2 mt-20'>Watch Videos</p>
    <p className='text-white  max-sm:text-center text-left font-extrabold text-3xl mb-6 mt-5'>Join today.</p>



      <button
        onClick={() => document.getElementById('my_modal_1').showModal()}
        className="flex max-sm:w-[50%] items-center max-sm:mt-4 justify-center bg-primary hover:bg-purple-600 rounded-lg shadow-md max-w-xs max-sm:mb-10 px-6 py-2 text-sm font-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <span>Create Account</span>
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center text-white">Sign Up</h3>
          
            <div className="my-4">
            <label className="block text-sm font-medium text-white">
            Name
              </label>
              <input
                type="text"
                name="name"
                value={formSign.name}
                onChange={handleChange}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='Name'
              />
            </div>
            <div className="my-4">
            <label className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formSign.email}
                onChange={handleChange}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='Name@gmail.com'

              />
            </div>

            <div className="my-4">
            <label className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formSign.password}
                onChange={handleChange}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='******'
              />
                    {toastMessage && (
            <div className="alert alert-info p-4 mt-4 bg-blue-100 rounded-lg shadow-lg text-blue-700">
              <span>{toastMessage}</span>
            </div>
        )}
            </div>
            <div className="modal-action">
              <button type="submit" onClick={handleSubmit} className="btn bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-4 py-2">
                Sign Up
              </button>
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </div>
      </dialog>
      <h1 className="text-left max-sm:hidden overflow-hidden before:h-[1px] after:h-[1px] after:bg-slate-200 
           after:inline-block after:relative after:align-middle after:w-1/4 
           before:bg-slate-200 before:inline-block before:relative before:align-middle 
           before:w-1/4 before:right-1 after:left-1 text-xl p-4">or
</h1><button
    onClick={() => document.getElementById('my_modal_2').showModal()}
    className="flex max-sm:w-[50%] items-center justify-center border border-gray-200 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
    <span>Sign in</span>
</button>
<dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center text-white">Sign in</h3>

            <div className="my-4">
            <label className="block text-sm font-medium text-white">
                name
              </label>
              <input
                type="text"
                name="name"
                value={namecount}
                onChange={(e) => setName(e.target.value)}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='Name'

              />
            </div>
            <div className="my-4">
            <label className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={passwordCount}
                onChange={(e) => setPassword(e.target.value)}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='******'
              />
            </div>
            <div className="modal-action">
              <button type="submit" onClick={handleSubmit2} className="btn bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-4 py-2">
                Sign in
              </button>
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </div>
      </dialog>

</div>


</div>




    </div>
    
    
    </>
  )
}

export default Signup