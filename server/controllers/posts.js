import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts ";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return console.log(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id,`title`,`desc`,`date`, p.img , u.img userIMG,`uid`,`cat`,`username` FROM posts as p JOIN users as u ON p.uid=u.id WHERE p.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return console.log(err);
    return res.status(200).json(data);
  });
};

export const getUserPosts = (req, res) => {
  const q = "SELECT * FROM posts WHERE uid=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return console.log(err);
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;

  const { title, desc, img, cat, date } = req.body;

  jwt.verify(token, "MySecretKey", (err, user) => {
    if (err) return res.status(403).json("user is not authorized");

    if (!user) {
      return res.status(401).json("Token is invalid");
    }

    const q =
      "INSERT INTO posts (`uid`, `title`, `desc`, `img` , `cat`, `date`) VALUES (?)";
    const uid = user.id;

    db.query(q, [[uid, title, desc, img, cat, date]], (err, data) => {
      if (err) return console.log(err);
      res.status(200).json("Post successfully added");
    });
  });
};

export const deletePost = (req, res) => {
  const q = "SELECT * FROM posts WHERE id=?";

  const token = req.cookies.accessToken;

  jwt.verify(token, "MySecretKey", (err, user) => {
    if (err) return res.status(403).json("user is not authorized");

    db.query(q, [req.params.id], (err, data) => {
      if (err) return console.log(err);

      if (data[0].uid !== user.id) {
        return res
          .status(403)
          .json("You have not permition to delete this post");
      }

      const q = "DELETE FROM posts WHERE id=? AND uid=?";

      db.query(q, [req.params.id, user.id], (err, data) => {
        if (err) return console.log(err);
        res.status(200).json("post deleted successfully");
      });
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.accessToken;

  const { title, desc, img, cat, date } = req.body;

  jwt.verify(token, "MySecretKey", (err, user) => {
    if (err) return res.status(403).json("user is not authorized");

    if (!user) {
      return res.status(401).json("Token is invalid");
    }

    const q =
      "UPDATE posts SET `title`=?, `desc`=?,  `img`=?,  `cat`=?,  `date`=? WHERE id=? AND uid=?";

    const uid = user.id;
    db.query(
      q,
      [title, desc, img, cat, date, req.params.id, uid],
      (err, data) => {
        if (err) return console.log(err);
        res.status(200).json("Post successfully Updated");
      }
    );
  });
};
