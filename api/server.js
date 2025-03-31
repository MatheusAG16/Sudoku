const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware para processar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectando ao MongoDB Atlas
const uri = process.env.MONGODB_URI;
mongoose
  .connect(
    uri ||
      "mongodb+srv://matheusandradegermano:YiodjGltvLzLo1b9@cluster0.dcrm1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Conectado ao MongoDB com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB.", err));

// Definindo o Schema e o Model para os usuários
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

// Rota para processar o cadastro
app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();
    res.status(201).send("Usuário cadastrado com sucesso");
  } catch (err) {
    console.error("Erro ao salvar usuário: ", err);
    res.status(500).send("Erro ao cadastrar usuário.");
  }
});

//Exportando para vercel
module.exports = app;

/*ISSO AQUI É TESTE \/ \/*/

// db.connect((err) => {
//   if (err) {
//     console.log("Erro ao conectar ao banco de dados: ", err);
//   } else {
//     console.log("Conectado ao banco de dados!");
//   }
// });

// app.post("/cadastro", (req, res) => {
//   const { nome, email, senha } = req.body;
//   const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

//   db.query(sql, [nome, email, senha], (err, result) => {
//     if (err) {
//       console.log("Erro ao inserir dados: ", err);
//       res.status(500).send("Erro ao cadastrar usuário.");
//     } else {
//       res.send("Usuário cadastrado com sucesso!");
//     }
//   });
// });

// app.listen(3000, () => {
//   console.log("servidor rodando na porta 3000");
// });
