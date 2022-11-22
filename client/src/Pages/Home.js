import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts" + cat);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [cat]);

  const concate = (string, n) => {
    return string.replace(/(<([^>]+)>)/gi, "").slice(0, n) + "...";
  };

  return (
    <div className="posts">
      <>{posts.length === 0 && <h1>No posts to show</h1>}</>

      {posts
        .sort((a, b) => parseInt(b.date) - parseInt(a.date))
        .map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="img">
                <a href={`/posts/${post.id}`}>
                  <img src={`./uploads/${post.img}`} alt="postimage" />
                </a>
              </div>

              <div className="detail">
                <a href={`/posts/${post.id}`} className="link">
                  <h2>{post.title}</h2>
                </a>
                <div
                  dangerouslySetInnerHTML={{ __html: concate(post.desc, 200) }}
                />

                <a href={`/posts/${post.id}`} className="link">
                  <button>Read Post</button>
                </a>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
