import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
  });
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const upload = async () => {
    try {
      const formdata = new FormData();
      formdata.append("file", img);
      const res = await axios.post(
        "http://localhost:8800/api/upload",
        formdata
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgURL = await upload();

    console.log(imgURL);

    if (
      values.username === "" ||
      values.email === "" ||
      values.password === "" ||
      imgURL === ""
    ) {
      return toast.error("please enter values");
    }

    toast.success("user registered successfully");

    try {
      await axios.post("auth/register", { ...values, img: imgURL });
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
          }}
        />
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="file"
          style={{ display: "none" }}
          id="uploadIMG"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="uploadIMG">upload profile image</label>

        <button onClick={handleSubmit}>Register</button>

        <p>
          have a account?{" "}
          <Link to="/login" className="link">
            <b>Sign in</b>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
