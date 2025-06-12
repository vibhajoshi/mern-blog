import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8'>
        {/* left */}
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

        {/* right */}
        <div className='flex-1'>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="username" className="text-sm font-medium text-gray-900 dark:text-white">
                Your username
              </Label>
              <TextInput
                id="username"
                placeholder="Username"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="username" className="text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </Label>
              <TextInput
                id="email"
                placeholder="name@company.com"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="username" className="text-sm font-medium text-gray-900 dark:text-white">
                Your password
              </Label>
              <TextInput
                id="password"
                placeholder="Password"
                type="text"
                required
              />
            </div>
            <Button type="submit" className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account? </span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
