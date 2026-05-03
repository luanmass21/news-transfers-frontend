import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";
import { useState, useEffect } from "react";
import "../css/usuarios.css";


const leitoresIniciais = [
  { id: "001", nome: "Ana Paula Souza", cpf: "123.456.789-00", telefone: "(51) 99999-0001", email: "ana@email.com", emprestimos: 0, status: "Ativo" },
  { id: "002", nome: "Carlos Ferreira", cpf: "987.654.321-00", telefone: "(51) 99999-0002", email: "carlos@email.com", emprestimos: 2, status: "Ativo" },
  { id: "003", nome: "Beatriz Moura", cpf: "111.222.333-00", telefone: "(51) 99999-0003", email: "bea@email.com", emprestimos: 3, status: "Bloqueado" },
  { id: "004", nome: "Diego Nascimento", cpf: "444.555.666-00", telefone: "(51) 99999-0004", email: "diego@email.com", emprestimos: 1, status: "Ativo" },
  { id: "005", nome: "Elisa Trindade", cpf: "777.888.999-00", telefone: "(51) 99999-0005", email: "elisa@email.com", emprestimos: 0, status: "Ativo" },
  { id: "006", nome: "Felipe Rodrigues", cpf: "321.654.987-00", telefone: "(51) 99999-0006", email: "felipe@email.com", emprestimos: 1, status: "Ativo" },
  { id: "007", nome: "Gabriela Pinto", cpf: "654.321.123-00", telefone: "(51) 99999-0007", email: "gabi@email.com", emprestimos: 0, status: "Inativo" },
];

const Leitores = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {
    nome: "Usuário",
    email: "email@exemplo.com",
  };

  // const [leitores, setLeitores] = useState(leitoresIniciais);
  const [leitores, setLeitores] = useState(() => {
  const salvos = localStorage.getItem("leitores");
  return salvos ? JSON.parse(salvos) : leitoresIniciais;
});
useEffect(() => {
  localStorage.setItem("leitores", JSON.stringify(leitores));
}, [leitores]);

  const [busca, setBusca] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("todos");
  const [statusFiltrado, setStatusFiltrado] = useState("todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [mostrarForm, setMostrarForm] = useState(false);

  

  const [novoLeitor, setNovoLeitor] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    status: "Ativo",
  });

  const itensPorPagina = 4;

  const leitoresFiltrados = leitores.filter((leitor) => {
    const textoBusca = busca.toLowerCase();

    const bateBusca =
      leitor.nome.toLowerCase().includes(textoBusca) ||
      leitor.cpf.toLowerCase().includes(textoBusca) ||
      leitor.email.toLowerCase().includes(textoBusca);

    const bateStatus =
      statusFiltrado === "todos" ||
      leitor.status.toLowerCase() === statusFiltrado;

    return bateBusca && bateStatus;
  });

  const totalPaginas = Math.ceil(leitoresFiltrados.length / itensPorPagina);

  const leitoresPaginados = leitoresFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const handleFiltrar = () => {
    setStatusFiltrado(statusSelecionado);
    setPaginaAtual(1);
  };

  const handleAdicionarLeitor = () => {
    if (!novoLeitor.nome || !novoLeitor.cpf || !novoLeitor.telefone || !novoLeitor.email) {
      alert("Preencha todos os campos do novo leitor.");
      return;
    }

    const novo = {
      id: String(leitores.length + 1).padStart(3, "0"),
      ...novoLeitor,
      emprestimos: 0,
    };

    setLeitores([...leitores, novo]);
    setNovoLeitor({
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      status: "Ativo",
    });
    setMostrarForm(false);
    setPaginaAtual(1);
    alert("Leitor cadastrado com sucesso!");
  };

  return (
    <div className="leitores-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>BiblioGest</h2>
          <p>Painel administrativo</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}>
            Dashboard
          </Link>

          <Link to="/leitores" className={`nav-item ${location.pathname === "/leitores" ? "active" : ""}`}>
            Leitores
          </Link>

          <Link to="/acervo" className={`nav-item ${location.pathname === "/acervo" ? "active" : ""}`}>
            Acervo
          </Link>

          <Link to="/emprestimos" className={`nav-item ${location.pathname === "/emprestimos" ? "active" : ""}`}>
            Empréstimos
          </Link>

          <Link to="/devolucoes" className={`nav-item ${location.pathname === "/devolucoes" ? "active" : ""}`}>
            Devoluções
          </Link>
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-user-circle">{user?.nome?.charAt(0) || "U"}</div>
          <div>
            <strong>{user?.nome || "Usuário"}</strong>
            <p>{user?.email || "email@exemplo.com"}</p>
          </div>
        </div>
      </aside>

      <main className="leitores-content">
        <header className="leitores-topo">
          <h1>Gerenciar Leitores</h1>

          <button
            className="btn-novo-leitor"
            onClick={() => setMostrarForm(!mostrarForm)}
          >
            + Novo Leitor
          </button>
        </header>

        {mostrarForm && (
          <div className="leitores-card novo-leitor-card">
            <h2>Novo Leitor</h2>

            <div className="novo-leitor-grid">
              <input
                type="text"
                placeholder="Nome"
                value={novoLeitor.nome}
                onChange={(e) => setNovoLeitor({ ...novoLeitor, nome: e.target.value })}
              />

              <input
                type="text"
                placeholder="CPF"
                value={novoLeitor.cpf}
                onChange={(e) => setNovoLeitor({ ...novoLeitor, cpf: e.target.value })}
              />

              <input
                type="text"
                placeholder="Telefone"
                value={novoLeitor.telefone}
                onChange={(e) => setNovoLeitor({ ...novoLeitor, telefone: e.target.value })}
              />

              <input
                type="email"
                placeholder="E-mail"
                value={novoLeitor.email}
                onChange={(e) => setNovoLeitor({ ...novoLeitor, email: e.target.value })}
              />

              <select
                value={novoLeitor.status}
                onChange={(e) => setNovoLeitor({ ...novoLeitor, status: e.target.value })}
              >
                <option value="Ativo">Ativo</option>
                <option value="Bloqueado">Bloqueado</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            <div className="novo-leitor-actions">
              <button onClick={() => setMostrarForm(false)}>Cancelar</button>
              <button onClick={handleAdicionarLeitor}>Salvar Leitor</button>
            </div>
          </div>
        )}

        <div className="leitores-card">
          <div className="leitores-toolbar">
            <input
              type="text"
              placeholder="🔍 Buscar por nome, CPF ou e-mail..."
              className="search-input"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPaginaAtual(1);
              }}
            />

            <select
              className="status-select"
              value={statusSelecionado}
              onChange={(e) => setStatusSelecionado(e.target.value)}
            >
              <option value="todos">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="bloqueado">Bloqueado</option>
              <option value="inativo">Inativo</option>
            </select>

            <button className="filtrar-btn" onClick={handleFiltrar}>
              Filtrar
            </button>
          </div>

          <div className="table-wrapper fade-table">
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
                {leitoresPaginados.length > 0 ? (
                  leitoresPaginados.map((leitor) => (
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


                          {/* <button
                            className="acao-btn editar"
                            onClick={() => alert("Permitido apenas para administradores do sistema")}
                          >
                            ✏️
                          </button>

                          <button
                            className="acao-btn excluir"
                            onClick={() => alert("Permitido apenas para administradores do sistema")}
                          >
                            🗑️
                          </button> */}
                          <button
  className="acao-btn editar"
  onClick={() => {
    const novoNome = prompt("Editar nome do leitor:", leitor.nome);

    if (novoNome && novoNome.trim()) {
      setLeitores(
        leitores.map((item) =>
          item.id === leitor.id
            ? { ...item, nome: novoNome }
            : item
        )
      );
    }
  }}
>
  ✏️
</button>

<button
  className="acao-btn excluir"
  onClick={() => {
    const confirmar = window.confirm(
      `Deseja excluir o leitor ${leitor.nome}?`
    );

    if (confirmar) {
      setLeitores(
        leitores.filter((item) => item.id !== leitor.id)
      );
    }
  }}
>
  🗑️
</button>


                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "30px" }}>
                      Nenhum leitor encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="leitores-footer">
            <span>
              Exibindo {leitoresFiltrados.length} de {leitores.length} leitores cadastrados
            </span>

            <div className="paginacao">
              <button
                disabled={paginaAtual === 1}
                onClick={() => setPaginaAtual(paginaAtual - 1)}
              >
                {"‹"}
              </button>

              {Array.from({ length: totalPaginas }, (_, index) => (
                <button
                  key={index + 1}
                  className={paginaAtual === index + 1 ? "active" : ""}
                  onClick={() => setPaginaAtual(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={paginaAtual === totalPaginas || totalPaginas === 0}
                onClick={() => setPaginaAtual(paginaAtual + 1)}
              >
                {"›"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leitores;