import React, { useContext, useEffect, useState } from "react";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaTwitterSquare,
  FaFacebookMessenger,
  FaRegEdit,
} from "react-icons/fa";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { authcontext } from "../context/authContext";
import moment from "moment";

const Profile = () => {
  const [isCurrentUser, setisCurrentUser] = useState(true);
  const { currentUser } = useContext(authcontext);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const location = useLocation();
  useEffect(() => {
    const fetch = async () => {
      try {
        const resPost = await axios.get(
          `http://localhost:8800/api/posts/userposts/${
            location.pathname.split("/")[2]
          }`
        );
        const resUser = await axios.get(
          `http://localhost:8800/api/users/${location.pathname.split("/")[2]}`
        );
        setUser(resUser.data);
        setPosts(resPost.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [location.pathname.split("/")[2]]);
  return (
    <div className="profile">
      <div className="userInfo">
        <div className="profileimage">
          <img src={`/uploads/${user?.img || "149071.png"}`} alt="Profile" />

          {isCurrentUser && (
            <Link to={"/edituser"} className="link">
              {currentUser.id === user.id && <FaRegEdit className="icon" />}
            </Link>
          )}
        </div>

        <h1>{user.username}</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ac
          vehicula leo. Donec urna lacus gravida ac vulputate sagittis tristique
          vitae lectus. Nullam rhoncus tortor at dignissim vehicula.
        </p>

        <div className="socialicons">
          <FaFacebookSquare className="icon" />
          <FaGithubSquare className="icon" />
          <FaFacebookMessenger className="icon" />
          <FaTwitterSquare className="icon" />
        </div>
      </div>

      <div className="userposts">
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`} className="link">
                <div className="imgdiv">
                  <img src={`../uploads/${post.img}`} alt="" />
                  <span>{post.cat}</span>
                </div>

                <h2>{post.title}</h2>
                <div className="author-date">
                  <span>{user.username} -</span>

                  <span>
                    {moment(parseInt(post.date)).format("MMMM Do YYYY")}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
