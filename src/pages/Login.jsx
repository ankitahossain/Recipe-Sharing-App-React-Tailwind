import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { memo } from 'react';
import { toast, Bounce } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set,push } from "firebase/database";
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const auth = getAuth();
  const db = getDatabase();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginInfo, setloginInfo] = useState({ email: "", password: "" });
  const [loginInfoerr, setloginInfoerr] = useState({ emailerr: "", passworderr: "" });

  const handleInput = (event) => {
    const { id, value } = event.target;
    setloginInfo({ ...loginInfo, [id]: value });
  };

  const handleSignin = (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email) {
      setloginInfoerr({ ...loginInfoerr, emailerr: "Email is missing" });
    } else if (!password) {
      setloginInfoerr({ ...loginInfoerr, passworderr: "Password is missing" });
    } else {
      setloginInfoerr({ emailerr: "", passworderr: "" });

      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/home");
          toast.success(`🚀 Login Successful!`, {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
          });
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
          toast.error("Invalid email or password.", {
            position: "top-right",
            autoClose: 6000,
          });
        });
    }
  };

  const continuewithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userInfo) => {
        console.log("Log in with Google successfully", userInfo);
        const user = userInfo.user;

       
        const userRef = ref(db, "users/");

       set(userRef, {
          username: user.displayName,
          email: user.email,
          profile_picture: user.photoURL || `https://images.pexels.com/photos/1129413/pexels-photo-1129413.jpeg?auto=compress&cs=tinysrgb&w=600`,
          userUid: user.uid,
        });
      })
      .then(() => {
        navigate('/home');
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  console.log("user", user);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Log In
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                onChange={handleInput}
                value={loginInfo.email}
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
              {loginInfoerr.emailerr && (
                <p className="text-red-500 text-xs mt-1">{loginInfoerr.emailerr}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                onChange={handleInput}
                value={loginInfo.password}
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
              {loginInfoerr.passworderr && (
                <p className="text-red-500 text-xs mt-1">{loginInfoerr.passworderr}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSignin}
              className="flex w-full justify-center rounded-md bg-primary_color px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-hover_color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4">
          <button
            type="button"
            className="w-full px-4 py-2.5 flex items-center justify-center rounded-md text-white text-sm font-medium tracking-wider cursor-pointer border-0 outline-0 bg-slate-800 hover:bg-slate-900"
            onClick={continuewithGoogle}
          >
            <FcGoogle className="mr-4" size={22} />
            Continue with Google
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/registration"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default memo(Login);
