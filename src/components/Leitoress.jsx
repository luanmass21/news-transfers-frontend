// const Leitores = () => {
//   return <h1>Leitores</h1>;
// };

// export default Leitores;

import { Link, useLocation } from "react-router-dom";
import "../css/usuarios.css";

const leitores = [
  {
    id: "001",
    nome: "Ana Paula Souza",
    cpf: "123.456.789-00",
    telefone: "(51) 99999-0001",
    email: "ana@email.com",
    emprestimos: 0,
    status: "Ativo",
  },
  {
    id: "002",
    nome: "Carlos Ferreira",
    cpf: "987.654.321-00",
    telefone: "(51) 99999-0002",
    email: "carlos@email.com",
    emprestimos: 2,
    status: "Ativo",
  },
  {
    id: "003",
    nome: "Beatriz Moura",
    cpf: "111.222.333-00",
    telefone: "(51) 99999-0003",
    email: "bea@email.com",
    emprestimos: 3,
    status: "Bloqueado",
  },
  {
    id: "004",
    nome: "Diego Nascimento",
    cpf: "444.555.666-00",
    telefone: "(51) 99999-0004",
    email: "diego@email.com",
    emprestimos: 1,
    status: "Ativo",
  },
  {
    id: "005",
    nome: "Elisa Trindade",
    cpf: "777.888.999-00",
    telefone: "(51) 99999-0005",
    email: "elisa@email.com",
    emprestimos: 0,
    status: "Ativo",
  },
  {
    id: "006",
    nome: "Felipe Rodrigues",
    cpf: "321.654.987-00",
    telefone: "(51) 99999-0006",
    email: "felipe@email.com",
    emprestimos: 1,
    status: "Ativo",
  },
  {
    id: "007",
    nome: "Gabriela Pinto",
    cpf: "654.321.123-00",
    telefone: "(51) 99999-0007",
    email: "gabi@email.com",
    emprestimos: 0,
    status: "Inativo",
  },
];

const Leitores = () => {
  const location = useLocation();

  return (
    <div className="leitores-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>BiblioGest</h2>
          <p>Painel administrativo</p>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}
          >
            Dashboard
          </Link>

          <Link
            to="/leitores"
            className={`nav-item ${location.pathname === "/leitores" ? "active" : ""}`}
          >
            Leitores
          </Link>

          <Link
            to="/acervo"
            className={`nav-item ${location.pathname === "/acervo" ? "active" : ""}`}
          >
            Acervo
          </Link>

          <Link
            to="/emprestimos"
            className={`nav-item ${location.pathname === "/emprestimos" ? "active" : ""}`}
          >
            Empréstimos
          </Link>

          <Link
            to="/devolucoes"
            className={`nav-item ${location.pathname === "/devolucoes" ? "active" : ""}`}
          >
            Devoluções
          </Link>
        </nav>
      </aside>

      <main className="leitores-content">
        {/* <header className="leitores-header">
          <h1>Gerenciar Leitores</h1>
          <button className="novo-leitor-btn">+ Novo Leitor</button>
        </header> */}
        
        <header className="leitores-topo">
  <h1>Gerenciar Leitores</h1>

  <button className="btn-novo-leitor">
    + Novo Leitor
  </button>
</header>

        <div className="leitores-card">
          <div className="leitores-toolbar">
            <input
              type="text"
              placeholder="🔍 Buscar por nome, CPF ou e-mail..."
              className="search-input"
            />

            <select className="status-select" defaultValue="todos">
              <option value="todos">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="bloqueado">Bloqueado</option>
              <option value="inativo">Inativo</option>
            </select>

            <button className="filtrar-btn">Filtrar</button>
          </div>

          <div className="table-wrapper">
            <table className="leitores-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                  <th>Empréstimos</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {leitores.map((leitor) => (
                  <tr key={leitor.id}>
                    <td>{leitor.id}</td>
                    <td className="nome-coluna">{leitor.nome}</td>
                    <td>{leitor.cpf}</td>
                    <td>{leitor.telefone}</td>
                    <td>{leitor.email}</td>
                    <td>{leitor.emprestimos}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          leitor.status === "Ativo"
                            ? "ativo"
                            : leitor.status === "Bloqueado"
                            ? "bloqueado"
                            : "inativo"
                        }`}
                      >
                        {leitor.status}
                      </span>
                    </td>
                    <td>
                      <div className="acoes">
                        <button className="acao-btn editar">✏️</button>
                        <button className="acao-btn excluir">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="leitores-footer">
            <span>Exibindo 7 de 312 leitores cadastrados</span>

            <div className="paginacao">
              <button>{"‹"}</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>{"›"}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leitores;
