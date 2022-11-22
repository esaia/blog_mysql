import axios from "axios";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authcontext } from "../context/authContext";

const EditUser = () => {
  const { currentUser, updateUser, updateUserPassword } =
    useContext(authcontext);

  const [values, setValues] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: "",
    repeatPassword: "",
    img: currentUser.img || "",
  });

  const [img, setImg] = useState(null);

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
    if (values.username === "" || values.email === "" || values.img === "") {
      return toast.error("please enter values");
    }

    try {
      const res = await updateUser(imgURL, values);
      if (res) {
        return toast.success("user updated successfully");
      }

      // navigate("/login");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (values.password === "" || values.repeatPassword === "") {
      return toast.error("please enter values");
    }

    try {
      const res = await updateUserPassword(values);
      if (res) {
        setValues((prev) => ({ ...prev, password: "", repeatPassword: "" }));
        return toast.success("user password updated successfully");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <div className="edituser">
      {/* username */}
      <div className="editEmailUsername">
        <form>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
            }}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={values.username}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />

          <input
            type="file"
            style={{ display: "none" }}
            id="uploadIMG"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="uploadIMG">upload profile image</label>

          <button onClick={handleSubmit}>Update</button>
        </form>
      </div>

      {/* password */}
      <div className="editEmailUsername">
        <form>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          <input
            type="password"
            placeholder="Repeat Password"
            name="repeatPassword"
            onChange={handleChange}
            value={values.repeatPassword}
          />

          <button onClick={handleSubmitPassword}>Update password</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
