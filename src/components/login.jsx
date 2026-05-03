import { useState } from "react";
import "../css/Login/login.css";
import MessageAlert from "../components/MessageAlert";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopbarLogin";

const usuarios = [
  {
    id: 1,
    nome: "grupo",
    email: "grupoulbra@gmail.com",
    senha: "Ulbra123@",
    cargo: "bibliotecario",
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [manterConectado, setManterConectado] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setType("");

    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (!usuarioEncontrado) {
      setMessage("E-mail ou senha inválidos.");
      setType("error");
      setLoading(false);
      return;
    }

    const user = {
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
      cargo: usuarioEncontrado.cargo,
    };

    localStorage.setItem("token", "token-fake-123456");
    localStorage.setItem("user", JSON.stringify(user));

    setMessage("");
    setType("success");

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 700);
  };

  return (
    <div className="login-page">
      <TopBar />

      <MessageAlert message={message} type={type} />

      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>
            <img
              src="https://img.freepik.com/vetores-premium/pilha-de-livros-para-estudantes-icon-ilustracao-em-fundo-branco_134830-290.jpg"
              width={55}
              alt="logo"
            />
          </h2>

          <h1>BiblioGest</h1>
          <h3>Sistema de gestão bibliotecária</h3>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-field">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-field">
              <input
                id="senha"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          <div className="remember-me">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={manterConectado}
                onChange={(e) => setManterConectado(e.target.checked)}
              />
              <span>Manter conectado</span>
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar no sistema"}
          </button>

          <p>Sistema de uso exclusivo para funcionários autorizados</p>
        </form>
      </div>
    </div>
  );
};

export default Login;