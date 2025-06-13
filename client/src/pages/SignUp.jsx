import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const { username, email, password } = formData;

    if (username.length < 3) {
      return 'Username must be at least 3 characters.';
    }

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
    setErrorMessages(null); // clear error as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      return setErrorMessages(validationError);
    }

    try {
      setLoading(true);
      setErrorMessages(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        return setErrorMessages(data.message || 'Signup failed.');
      }
      setLoading(false);
      // Handle success (redirect or show success message)
      if (res.ok){
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessages(error.message || 'Something went wrong. Please try again.');
      setLoading(false);
    } finally {
      setLoading(false);
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
            This is a Blogging Platform. You can sign up with your email and password or with Google.
          </p>
        </div>

        {/* Right Side */}
        <div className='flex-1'>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <Label htmlFor="username" className="text-sm font-medium text-gray-900 dark:text-white">
                Your username
              </Label>
              <TextInput
                id="username"
                placeholder="Username"
                type="text"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
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
                placeholder="Password"
                type="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <Button
              type="submit"
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
              isProcessing={loading}
              disabled={loading}
            >
             {
              loading ? (
                <> 
                  <Spinner size='sm'/>
                  <span className='pl-3'> Loading... </span>
                </>
              ) : 'Sign Up'
             }
            </Button>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
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
