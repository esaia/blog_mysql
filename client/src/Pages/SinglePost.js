import React, { useContext, useEffect, useState } from "react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import moment from "moment";
import axios from "axios";
import { authcontext } from "../context/authContext";
import toast, { Toaster } from "react-hot-toast";

const SinglePost = () => {
  const { currentUser } = useContext(authcontext);

  const [post, setPost] = useState({
    img: "",
    userIMG: "",
    date: "",
    title: "",
    desc: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postID = location.pathname.split("/")[2];
        const res = await axios.get("/posts/" + postID);

        setPost(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [location.pathname]);
  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + post.id);
      toast.success("post deleted");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlepage">
      <div className="post">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
          }}
        />
        <div className="img">
          <img src={`../uploads/${post.img}`} alt="CoverImage" />

          <div className="profileSingle">
            <div className="leftSection">
              <Link to={`/profile/${post.uid}`} className="link">
                <img src={`../uploads/${post.userIMG}`} alt="profile" />
              </Link>
              <div>
                <h3>{post?.username}</h3>
                <p>Posted {moment(parseInt(post.date)).fromNow()}</p>
              </div>

              {post?.uid === currentUser?.id && (
                <>
                  <FaTrashAlt className="icon" onClick={handleDelete} />
                  <Link to={"/edit?=" + post.id} state={post} className="link">
                    <FaRegEdit className="icon" />
                  </Link>
                </>
              )}
            </div>

            <h5>{post.cat}</h5>
          </div>

          <h1>{post?.title}</h1>

          <div dangerouslySetInnerHTML={{ __html: post.desc }} />
        </div>
      </div>
      <div className="sidebar">
        <h4>Other posts you may like</h4>
        <Sidebar cat={post.cat} />
      </div>
    </div>
  );
};

export default SinglePost;
