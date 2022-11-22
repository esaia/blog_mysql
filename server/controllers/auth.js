import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT username email FROM users WHERE username=? OR email=?";

  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return register.status(401).json("something went wrong");
    if (data.length > 0) {
      return res.status(401).json("username already exists");
    }
    const q =
      "INSERT INTO users (`username`, `email`, `password`, `img`) VALUES (?)";

    const { username, email, password, img } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    db.query(q, [[username, email, hash, img]], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User successfully created");
    });
  });
};

export const login = (req, res) => {
  //check if user exests or not
  const q = "SELECT * FROM users WHERE username=?";

  db.query(q, [[req.body.username]], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("user not exests");

    const isPassworCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPassworCorrect) {
      return res.status(401).json("username or password is incorrect");
    }

    const { password, ...others } = data[0];
    const accessToken = jwt.sign(others, "MySecretKey");
    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  return res.clearCookie("accessToken").json("user has been logged out");
};

export const updateprofile = (req, res) => {
  // JWT verify
  if (!req.cookies.accessToken)
    return res.status(403).json("user not authenticated");

  jwt.verify(req.cookies.accessToken, "MySecretKey", (err, user) => {
    if (err) return console.log(err);

    const q = "SELECT * FROM users WHERE username=? AND email=? AND img=?";

    db.query(
      q,
      [req.body.username, req.body.email, req.body.img],
      (err, data) => {
        if (err) return console.log(err);

        if (data.length > 0)
          return res
            .status(401)
            .json("A user already exists with this name or email");

        const q =
          "UPDATE users SET `username`=?, `email`=?, `img`=?  WHERE id=?";

        const { username, email, img } = req.body;

        db.query(q, [username, email, img, user.id], (err, data) => {
          if (err) return res.status(400).json("Update profile not working");

          res.status(200).json({
            username,
            email,
            img,
          });
        });
      }
    );
  });
};

export const updateprofilepassword = (req, res) => {
  if (!req.cookies.accessToken)
    return res.status(403).json("user not authenticated");

  jwt.verify(req.cookies.accessToken, "MySecretKey", (err, user) => {
    if (err) return console.log(err);

    const { password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      return res.status(401).json("Password do not match");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q = "UPDATE users SET `password`=? WHERE id=?";

    db.query(q, [hash, user.id], (err, data) => {
      if (err) return res.status(400).json("Update profile not working");
      res.status(200).json("User password updated");
    });
  });
};
