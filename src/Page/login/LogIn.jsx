import React, { useContext, useState } from 'react';
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Authentication/AuthProvider';
import SocialMediaLogin from '../../Layout/Share/SocialMediaLogin';

const LogIn = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const { signIn } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(result => {
        const user = result.user;
        form.reset();
        setSuccess("Login successful!");
        navigate(from, { replace: true });
      })
      .catch(err => setError(err.message));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-6">Log In</h2>

        <Form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full rounded-lg px-4 py-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full rounded-lg px-4 py-2"
            required
          />

          <p className="text-sm text-right text-purple-600 hover:underline">
            <Link to="/forget">Forgot Password?</Link>
          </p>

          <button className="btn w-full bg-gradient-to-r from-purple-600 to-pink-400 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-500 transition-all duration-300">
            Login
          </button>

          <div className="my-4 flex justify-center">
            <SocialMediaLogin />
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-600 font-semibold hover:underline">
              Register
            </Link>
          </p>

          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-center mt-2">{success}</p>}
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
