import { db } from "../db.js";

export const getUser = (req, res) => {
  const userID = req.params.id;
  const q = "SELECT * FROM users WHERE id=?";
  db.query(q, [userID], (err, data) => {
    if (err) return console.log(err);

    const { password, ...others } = data[0];
    res.status(200).json(others);
  });
};
