import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    if (data.length) {
      return res.status(409).json({ error: "User already exists!" });
    }

    // If user does not exist, proceed to hash the password and create user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q2 = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q2, [values], (err, data) => {
      if (err) {
        console.error("Error inserting into the database:", err);
        return res.status(500).json({ error: "Database insert error" });
      }
      return res.status(200).json("User has been created");
    });
  });
};

// export const login = (req, res) => {
//     //CHECK USER

//     const q = "SELECT * FROM users WHERE username = ?";

//     db.query(q, [req.body.username], (err, data) => {
//         if (err) {
//             console.error("Error querying the database:", err);
//             return res.status(500).json({ error: "Database query error" });
//         }
//         if (data.length === 0) return res.status(404).json("User not found!");

//         //CHECK PASSWORD
//         const isCorrectPassword = bcrypt.compareSync(req.body.password, data[0].password);

//         if (!isCorrectPassword) return res.status(400).json("Wrong username or password!")

//         const token = jwt.sign({ id: data[0].id }, "jwtkey");
//         const { password, ...other } = data[0];

//         // console.log(token)

//         res.status(200).cookie("access_token", token, {
//             httpOnly: "true",
//             secure:"true", // Set to true if you're using HTTPS
//             sameSite: "none",
//         }).json(other);

//     });
// };

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check password
    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isCorrectPassword)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    const isProduction = process.env.NODE_ENV === "production";

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: false,
        secure: true, // Set to true if you're using HTTPS
        sameSite: isProduction ? "strict" : "lax",
      })
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: "true",
      sameSite: "none",
      secure: "true",
    })
    .status(200)
    .json("User has been logged out.");
};
