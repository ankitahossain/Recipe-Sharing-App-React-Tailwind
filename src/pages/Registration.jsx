import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth, sendEmailVerification, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
  const auth = getAuth();
  const database = getDatabase();
  // Use the AuthContext
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Setup form with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const SignupForm = (data) => {
    console.log(data);
    setUser(() => {
      return data;
    });

    // navigate('/login');

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userinfo) => {

        console.log('User created successfully', userinfo);
        updateProfile(auth.currentUser, {
          displayName: data.username || "Jane Q. User",
          photoURL: "https://images.pexels.com/photos/31720604/pexels-photo-31720604/free-photo-of-soft-pink-roses-in-gentle-bloom.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        })
      }).then(() => {
          return sendEmailVerification(auth.currentUser)
        }).then(() => {
          const userRef = push(ref(database, 'users/'))
          set(userRef, {
            username: auth.currentUser.displayName || username,
            email: auth.currentUser.email || email,
            userUid: auth.currentUser.uid,
            profile_picture: "https://images.pexels.com/photos/31720604/pexels-photo-31720604/free-photo-of-soft-pink-roses-in-gentle-bloom.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          })
        }).then(() => {
            alert("Verification email sent");
            navigate('/login');
          }).catch((error) => {
            console.log(`error from createUserwithEmailAndPassword function ${error.code}`)
          });

        
          
      }


       return (
    <div>
      <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[180px] sm:p-6 p-4">
        <h4 className="sm:text-3xl text-2xl text-white font-medium mt-3">Create your free account</h4>
      </div>

      <div className="mx-4 mb-4 -mt-20">
        <form
          className="max-w-4xl mx-auto bg-white [box-shadow:0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md"
          onSubmit={handleSubmit(SignupForm)}
        >
          <div className="grid sm:grid-cols-2 gap-6">
            

          </div>


          <div className="grid gap-8">
            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">UserName</label>
              <input
                {...register("name", { required: "Name is required" })}
                name="name"
                type="text"
                className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-800 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                placeholder="Enter name"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">Email Id</label>
              <input
                {...register("email", { required: "Email is required" })}
                name="email"
                type="text"
                className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-800 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                placeholder="Enter email"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-slate-800 text-sm font-medium mb-2 block">Password</label>
              <input
                {...register("password", { required: "Password is required" })}
                name="password"
                type="password"
                className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-800 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                placeholder="Enter password"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="py-2.5 px-5 text-sm font-medium tracking-wider rounded-sm cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:outline-0"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
      
  }



 



export default Registration;