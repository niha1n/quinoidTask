import React, { useState } from 'react';
import signupBg from '../assets/signupBg.jpeg';
import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/loginBg.jpeg';
import logo from '../assets/logo.png';
import { loginHandler, signupHandler } from '../utils/authService';

function Landing() {
  const navigate = useNavigate();

  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [category, setCategory] = useState('');

  const handleLogin = () => {
    setLogin(true);
    // Clear the states when switching forms
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCategory('');
  };

  const handleSignup = () => {
    setLogin(false);
    // Clear the states when switching forms
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCategory('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (email && password && category) {
      const isLoggedIn = await loginHandler(email, password);
      if (isLoggedIn) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isTestCompleted', 'false');

        navigate('/test', { state: { category } });
        // Clear the form fields
        setEmail('');
        setPassword('');
        setCategory('');
      } else {
        console.log('Login failed');
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (email && password === confirmPassword) {
      console.log('Password matching');
      await signupHandler(email, password);
      handleLogin();
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="h-screen w-full flex font-roboto">
      <div className="relative w-1/2 h-full flex justify-center items-center">
        <img
          src={logo}
          className="absolute top-[45vh] z-20 w-[50%]"
          alt="Logo"
        />
        <img
          src={login ? loginBg : signupBg}
          className="object-cover h-full w-full"
          alt=""
        />
        <div className="absolute inset-0 bg-black opacity-[50%] z-10"></div>
      </div>
      <div className="w-1/2 h-full bg-white flex items-center justify-center">
        <div className="flex items-center justify-center w-[60%]">
          <div className="bg-white p-8 pt-6 rounded-3xl shadow-custom max-w-sm w-full">
            {login ? (
              <>
                <h2 className="text-[32px] font-bold mt-6 mb-4">User Login</h2>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-grey1 text-sm font-medium"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-input w-full px-2 py-2 border-b text-gray-700 focus:outline-none focus:border-gray-400"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Email"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-grey1 text-sm font-medium"
                    >
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-input w-full px-2 py-2 border-b text-gray-700 focus:outline-none focus:border-gray-400"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="category"
                      className="block text-grey1 text-sm font-medium"
                    >
                      Select Category *
                    </label>
                    <select
                      id="category"
                      className="w-full px-2 py-2 border-b text-gray-700 focus:outline-none focus:border-gray-400"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="" className="text-gray-600">
                        Select a category
                      </option>
                      <option value="sports" className="text-gray-600">
                        Sports
                      </option>
                      <option value="arts" className="text-gray-600">
                        Arts
                      </option>
                      <option value="history" className="text-gray-600">
                        History
                      </option>
                      <option value="physics" className="text-gray-600">
                        Physics
                      </option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    onClick={handleLoginSubmit}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Login
                  </button>
                  <p className="text-gray-600 text-xs text-center mt-4">
                    Don't have an account?
                    <span
                      onClick={handleSignup}
                      className="pl-1 text-blue-500 hover:underline cursor-pointer"
                    >
                      Sign Up
                    </span>
                    .
                  </p>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-[32px] font-bold mt-6 mb-4">
                  User Sign up
                </h2>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-grey1 text-sm font-medium"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-input w-full px-2 py-2 border-b text-gray-700 focus:outline-none focus:border-gray-400"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Email"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-grey1 text-sm font-medium"
                    >
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-input w-full px-2 py-2 border-b text-gray-700 focus:outline-none focus:border-gray-400"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="confirm-password"
                      className="block text-grey1 text-sm font-medium"
                    >
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="form-input w-full px-2 py-2 border-b text-gray-700 focus:outline-none focus:border-gray-400"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleSignupSubmit}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Register
                  </button>
                  <p className="text-gray-600 text-xs text-center mt-4">
                    Already have an account?
                    <span
                      onClick={handleLogin}
                      className="pl-1 text-blue-500 hover:underline cursor-pointer"
                    >
                      Sign in
                    </span>
                    .
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
