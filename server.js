const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Usuários em memória (simples, depois conectamos no MongoDB)
const usuarios = [];

// Página inicial (login)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Página de cadastro
app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});

// Página “Esqueceu a senha?”
app.get("/esqueci", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "esqueci.html"));
});

// Cadastro de novo usuário
app.post("/criar-conta", (req, res) => {
  const { usuario, senha } = req.body;
  usuarios.push({ usuario, senha });
  res.sendFile(path.join(__dirname, "public", "sucesso.html"));
});

// Login
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  const user = usuarios.find(u => u.usuario === usuario && u.senha === senha);

  if (user) {
    res.send(`
      <html>
        <head>
          <link rel="stylesheet" href="/style.css">
          <title>Bem-vindo</title>
        </head>
        <body>
          <div class="container">
            <h1>Bem-vindo, ${usuario}!</h1>
            <a href="/">Sair</a>
          </div>
        </body>
      </html>
    `);
  } else {
    res.send("<h1>Usuário ou senha incorretos.</h1><a href='/'>Voltar</a>");
  }
});

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
