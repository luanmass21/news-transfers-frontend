import express from "express";

const router = express.Router();

/*
  Usuários
  Só para estudo.
  Depois o certo é usar banco de dados + senha criptografada.
*/
const usuarios = [
  {
    id: 1,
    nome: "Luan",
    email: "luanmassuda21@gmail.com",
    senha: "Solemar3@",
    cargo: "bibliotecario"
  },
  {
    id: 2,
    nome: "Maria",
    email: "maria@bibliogest.com",
    senha: "SenhaForte123@",
    cargo: "atendente"
  },
  {
    id: 3,
    nome: "Joao",
    email: "joao@bibliogest.com",
    senha: "Joao@2026",
    cargo: "admin"
  },

  {
    id: 4,
    nome: "grupo",
    email: "grupoulbra@gmail.com",
    senha: "Ulbra123@",
    cargo: "bibliotecario"
  },
];

router.post("/login", (req, res) => {
  const { email, senha, manterConectado } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      message: "E-mail e senha são obrigatórios."
    });
  }

  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email === email
  );

  if (!usuarioEncontrado) {
    return res.status(401).json({
      message: "E-mail ou senha inválidos."
    });
  }

  if (usuarioEncontrado.senha !== senha) {
    return res.status(401).json({
      message: "E-mail ou senha inválidos."
    });
  }

  return res.status(200).json({
    message: "",
    token: "token-fake-123456",
    manterConectado: !!manterConectado,
    user: {
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
      cargo: usuarioEncontrado.cargo
    }
  });
});

export default router;