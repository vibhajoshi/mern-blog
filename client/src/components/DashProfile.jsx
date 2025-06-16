import { Alert, TextInput } from 'flowbite-react';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();

    // Initialize form data with current user info
    useEffect(() => {
        if (currentUser) {
            setFormData({
                username: currentUser.username,
                email: currentUser.email,
                profilePicture: currentUser.profilePicture
            });
        }
    }, [currentUser]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setImageFileUploadError('File must be less than 2MB');
                return;
            }
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
            setImageFileUploadError(null);
        }
    };

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Image upload failed');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData(prev => ({ ...prev, profilePicture: downloadURL }));
                    setImageFileUploading(false);
                    setImageFileUploadProgress(null);
                });
            }
        );
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    
    // Check if any changes were made
    const hasChanges = Object.keys(formData).some(key => {
        return formData[key] !== currentUser[key];
    });

    if (!hasChanges) {
        setUpdateUserError('No changes made');
        return;
    }

    if (imageFileUploading) {
        setUpdateUserError('Please wait for image to upload');
        return;
    }

    try {
        dispatch(updateStart());
        
        // Include credentials to send cookies
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // This is crucial for cookie-based auth
            body: JSON.stringify(formData),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || 'Failed to update profile');
        }
        
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully");
        
    } catch (error) {
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
        
        // Handle unauthorized errors specifically
        if (error.message.includes('Unauthorized')) {
            // Optionally redirect to login or refresh token
        }
    }
};

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                <TextInput 
                    type='text' 
                    id='username' 
                    placeholder='username' 
                    value={formData.username || ''}
                    onChange={handleChange}
                />
                <TextInput 
                    type='email' 
                    id='email' 
                    placeholder='email' 
                    value={formData.email || ''}
                    onChange={handleChange}
                />
                <TextInput 
                    type='password' 
                    id='password' 
                    placeholder='password' 
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-blue-600 transition duration-300"
                    disabled={imageFileUploading}
                >
                    {imageFileUploading ? 'Uploading...' : 'Update'}
                </button>
            </form>
            
            {updateUserSuccess && (
                <Alert color="success" className='mt-5' onDismiss={() => setUpdateUserSuccess(null)}>
                    {updateUserSuccess}
                </Alert>
            )}
            {updateUserError && (
                <Alert color="failure" className='mt-5' onDismiss={() => setUpdateUserError(null)}>
                    {updateUserError}
                </Alert>
            )}
            
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