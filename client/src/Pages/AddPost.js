import React, { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Addpost = () => {
  const state = useLocation().state;

  const [title, setTitle] = useState(state?.title || "");
  const [desc, setDesc] = useState(state?.desc || "");
  const [img, setImg] = useState(null);
  const [cat, SetCat] = useState(state?.cat || "");

  const navigate = useNavigate();

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

    const date = parseInt(Date.now());

    const values = !imgURL
      ? { title, desc, img: state.img, cat, date }
      : { title, desc, img: imgURL, cat, date };

    if (title === "" || desc === "" || img === null || cat === "") {
      if (!state) {
        return toast.error("Please enter all required values");
      }
    }

    try {
      state
        ? await axios.put("/posts/" + state.id, values)
        : await axios.post("/posts/addpost", values);

      toast.success(state ? "post updated" : "post successfully added");
      setTimeout(() => {
        navigate("/");
        window.location.reload(false);
      }, 1000);
    } catch (error) {
      return toast.error(error.response.data);
    }
  };

  return (
    <div className="addpost">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
        }}
      />
      <div className="left">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor">
          <ReactQuill
            className="quiledit"
            theme="snow"
            value={desc}
            onChange={setDesc}
          />
        </div>
      </div>
      <div className="right">
        <div className="top">
          <h3>Publish</h3>
          <span>
            <p>
              <b>Status:</b> draft
            </p>
            <p>
              <b>Visibility:</b> Public
            </p>
          </span>
          <input
            type="file"
            style={{ display: "none" }}
            id="postIMGupload"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="postIMGupload">upload images</label>
          <div className="buttons">
            <button>save as a draft </button>
            <button onClick={handleSubmit}>
              {state ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        <div className="bottom">
          <h3>Category</h3>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art"
              onChange={(e) => SetCat(e.target.value)}
              checked={cat === "art"}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="sciente"
              id="sciente"
              onChange={(e) => SetCat(e.target.value)}
              checked={cat === "sciente"}
            />
            <label htmlFor="sciente">Sciente</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => SetCat(e.target.value)}
              checked={cat === "technology"}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => SetCat(e.target.value)}
              checked={cat === "cinema"}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="food"
              id="food"
              onChange={(e) => SetCat(e.target.value)}
              checked={cat === "food"}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addpost;
