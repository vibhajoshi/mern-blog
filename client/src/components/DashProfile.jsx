import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile () {
    const {currentUser} = useSelector((state) => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };
   useEffect (()=> {
    if(imageFile){
        uploadImage();
    }
   }, [imageFile]);

   
   const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    setImageFileUploadError(null);
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
                setImageFileUploadError('Could not upload image (File must be less than 2 MB)');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setImageFileUrl(downloadURL);
            })
        }
    )
   };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className="flex flex-col gap-4">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center gap-4">
          <div className='relative w-32 h-32'>
            {imageFileUploadProgress && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: '100%',
                      height: '100%',
                    },
                    path: {
                      stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                    },
                  }}
                />
              </div>
            )}
            <img 
              src={imageFileUrl || currentUser.profilePicture} 
              alt="user"
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] cursor-pointer ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
              onClick={() => filePickerRef.current.click()}
            />
          </div>
          <label className="text-center text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 cursor-pointer py-2 px-4 rounded-md transition duration-300">
            Choose Profile Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={filePickerRef}
            />
          </label>
        </div>
        
        {imageFileUploadError && (
          <Alert color="failure" onDismiss={() => setImageFileUploadError(null)}>
            {imageFileUploadError}
          </Alert>
        )}

        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-blue-600 transition duration-300"
        >
          Update
        </button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer hover:underline'>
            Delete Account
        </span>
        <span className='cursor-pointer hover:underline'>
            Sign Out
        </span>
      </div>
    </div>
  )
}