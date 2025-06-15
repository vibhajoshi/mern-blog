import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const {loading, error: errorMessages} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const validateForm = () => {
    const { email, password } = formData;

  

    // Simple email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    return null; // no errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.email || !formData.password) 
    {
      return dispatch(signInFailure('Please fill all the fields'));
    }

    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
    
      // Handle success (redirect or show success message)
      if (res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    } 
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8'>

        {/* Left Side */}
        <div className='flex-1'>
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Vibha's
            </span>{' '}
            <span className="text-black dark:text-white">Blog</span>
          </Link>
          <p className='text-sm mt-5'>
            This is a Blogging Platform. You can sign in with your email and password or with Google.
          </p>
        </div>

        {/* Right Side */}
        <div className='flex-1'>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </Label>
              <TextInput
                id="email"
                placeholder="name@company.com"
                type="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="text-sm font-medium text-gray-900 dark:text-white">
                Your password
              </Label>
              <TextInput
                id="password"
                placeholder="***************"
                type="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <Button
              type="submit"
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
              //isprocessing={loading}
              disabled={loading}
            >
             {
              loading ? (
                <> 
                  <Spinner size='sm'/>
                  <span className='pl-3'> Loading... </span>
                </>
              ) : 'Sign In'
             }
            </Button>
            <OAuth />
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>

          {/* Error Message */}
          {errorMessages && (
            <Alert className='mt-5' color='failure'>
              {errorMessages}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
