import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const authcontext = createContext();

export const AuthContectProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = async (inputs) => {
    const res = await axios.post("auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");

    setCurrentUser(null);
  };

  const updateUser = async (imgURL, values) => {
    console.log(imgURL);
    try {
      const res = await axios.put("auth/updateprofile", {
        username: values.username,
        email: values.email,
        img: imgURL || currentUser.img,
      });

      setCurrentUser((prev) => ({ ...prev, ...res.data }));
      return res;
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const updateUserPassword = async (values) => {
    try {
      const res = await axios.put("auth/updateuserPassword", {
        password: values.password,
        repeatPassword: values.repeatPassword,
      });

      setCurrentUser((prev) => ({ ...prev, ...res.data }));
      return res;
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <authcontext.Provider
      value={{ currentUser, login, logout, updateUser, updateUserPassword }}
    >
      {children}
    </authcontext.Provider>
  );
};
