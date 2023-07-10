const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "CRUD",
});

app.get("/demo", (req, res) => {
  //   res.json("balaji");
  const sql = "SELECT * FROM crud_table";
  db.query(sql, (err, data) => {
    if (err) return res.json("error");
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const values = [req.body.name, req.body.email];
  console.log(values);
  const sql = "INSERT INTO crud_table (name, email) VALUES (?)";

  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/read/:id", (req, res) => {
  //   res.json("balaji");
  const sql = "SELECT * FROM crud_table WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) return res.json("error");
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE `crud_table` SET `name`=? , `email`=? WHERE `crud_table`.`id`=?";
  const id = req.params.id;
  db.query(sql, [req.body.name, req.body.email, id], (err, data) => {
    if (err) return res.json("error");
    return res.json(data);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM `crud_table` WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) return res.json("error");
    return res.json(data);
  });
});
app.listen(8000, () => {
  console.log("Listen");
});
