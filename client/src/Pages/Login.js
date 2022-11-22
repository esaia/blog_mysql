import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../context/authContext";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const authContext = useContext(authcontext);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.username === "" || values.password === "") {
      return toast.error("please enter values");
    }

    try {
      await authContext.login(values);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="login">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
        }}
      />
      <div className="container">
        <h1>Sign In</h1>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Sign In</button>

        <p>
          Do not have account?{" "}
          <Link to="/register" className="link">
            <b>Register</b>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
