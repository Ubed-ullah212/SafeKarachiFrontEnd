const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true, methods: ["POST", "GET"], credentials: true }));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "test",
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM USERS";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.post("/signup", (req, res) => {
  console.log("chala ");
  const sql =
    "INSERT INTO `test`.`users` (`name`,`email`, `password`) VALUES (?,?,?)";

  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }

    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

app.post("/login", (req, res) => {
  const sql =
    "SELECT * FROM `test`.`users` WHERE `email` = ? AND `password` = ?";

  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      return err;
    }
    if (data.length > 0) {
      return res.json("success");
    } else {
      return res.json("failed");
    }
  });
});

app.listen(8800, () => {
  console.log("listening");
});
