import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ cat }) => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("/posts");
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  const filter_Posts = posts?.filter((post) => post?.cat === cat);
  const restOfPosts = posts?.filter((post) => post?.cat !== cat);

  const allposts = [...filter_Posts, ...restOfPosts];
  console.log();

  return (
    <>
      {allposts.slice(0, 4).map((post) => {
        return (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`} className="link">
              <img src={`../uploads/${post.img}`} alt="postIMG" />
              <h2>{post.title}</h2>
              <button>Read More</button>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Sidebar;
