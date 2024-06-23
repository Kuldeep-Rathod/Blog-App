import { db } from "../db.js";
import bcrypt from "bcryptjs";

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
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ];

        db.query(q2, [values], (err, data) => {
            if (err) {
                console.error("Error inserting into the database:", err);
                return res.status(500).json({ error: "Database insert error" });
            }
            return res.status(200).json("User has been created");
        });
    });
};


export const login = (req, res) => {

}

export const logout = (req, res) => {
    
}