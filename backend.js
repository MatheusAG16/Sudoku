const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "sudokuarte",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar ao banco de dados: ", err);
  } else {
    console.log("Conectado ao banco de dados!");
  }
});

app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.log("Erro ao inserir dados: ", err);
      res.status(500).send("Erro ao cadastrar usuário.");
    } else {
      res.send("Usuário cadastrado com sucesso!");
    }
  });
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
