import React, { useEffect, useState } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import { getDatabase, ref, update, onValue, off } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState('');
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const db = getDatabase();

  // Load Cloudinary script
  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/latest/global/all.js';
      script.async = true;
      script.onload = () => console.log('Cloudinary widget loaded');
      document.body.appendChild(script);
    }
  }, []);

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null); // Not logged in
      }
    });

    return () => unsubscribe();
  }, [auth]);

  //  Fetch profilePic from database if user is authenticated
  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      const listener = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.profilePic) {
          setProfilePic(data.profilePic);
        } else {
          setProfilePic(''); // fallback if no profilePic found
        }
      });

      return () => off(userRef, 'value', listener);
    }
  }, [user, db]);

  //  Upload image to Cloudinary and update profilePic in database
  const uploadImage = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: 'davegoals',
          uploadPreset: 'Recipe-Sharing-App',
          sources: ['local', 'url', 'camera', 'dropbox', 'unsplash'],
        },
        (error, result) => {
          if (error) {
            console.error('Upload error:', error);
            return;
          }
          if (result && result.event === 'success') {
            const newUrl = result.info.secure_url;
            console.log('Upload successful:', newUrl);

            // Update in database
            update(ref(db, `users/${user.uid}`), {
              profilePic: newUrl,
            })
              .then(() => {
                setProfilePic(newUrl); // Immediate UI update
              })
              .catch((err) => {
                console.error('Database update failed:', err);
              });
          }
        }
      );
    } else {
      alert('Upload widget not ready. Please wait...');
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 ml-[92%]">
      {user ? (
        <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-300 group cursor-pointer">
          <img
            src={
              profilePic ||
              'https://via.placeholder.com/100x100.png?text=Profile'
            }
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <span
            onClick={uploadImage}
            className="absolute bottom-0 right-0 p-2  bg-opacity-50 rounded-full text-white text-xl cursor-pointer block"
          >
            <IoMdCloudUpload />
          </span>
        </div>
      ) : (
        <p>Please login to upload your profile picture</p>
      )}
    </div>
  );
};

export default UserProfile