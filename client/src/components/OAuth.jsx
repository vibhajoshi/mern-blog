import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from '../firebase';
import { Await } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        try {
          const resultsFromGoogle = await signInWithPopup(auth , provider)
          const res = await fetch('/api/auth/google',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify ({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL,

            }),
          })
          const data = await res.json()
          if(res.ok){
            dispatch(signInSuccess(data))
            navigate('/')
          }
        } catch (error) {
              console.log(error);
        }
    }
  return (
    <button
      type="button"
      className="flex items-center justify-center w-full text-white font-medium py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition duration-300"
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </button>
  );
}
