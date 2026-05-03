import { FaBook, FaUsers, FaExchangeAlt, FaClock } from "react-icons/fa";
import "../css/dashboard.css";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {
    nome: "Usuário",
    email: "email@exemplo.com",
  };

  const livros =
    JSON.parse(localStorage.getItem("acervo")) ||
    JSON.parse(localStorage.getItem("livros")) ||
    [];

  const leitores = JSON.parse(localStorage.getItem("leitores")) || [];
  const emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];
  const devolucoes = JSON.parse(localStorage.getItem("devolucoes")) || [];

  const hoje = new Date();

  // 🔥 FORMATA DATA
  const formatarData = (data) => {
    if (!data) return null;
    const partes = data.split("/");
    return new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
  };

  // 🔥 STATUS PADRÃO DO SISTEMA
  const calcularStatus = (vencimento) => {
    const dataVenc = formatarData(vencimento);
    if (!dataVenc) return "Em dia";

    const diff = Math.ceil((dataVenc - hoje) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "Atrasado";
    if (diff <= 3) return "A vencer";
    return "Em dia";
  };

  // 📊 KPIs
  const emprestimosAtivos = emprestimos.length;

  const devolucoesAtrasadas = emprestimos.filter(
    (item) => calcularStatus(item.vencimento) === "Atrasado"
  ).length;

  const ultimosEmprestimos = [...emprestimos].slice(0, 4);

  const livrosSemCategoria = livros.filter(
    (livro) => !livro.categoria || livro.categoria.trim() === ""
  ).length;

  const livroMaisEmprestado =
    emprestimos.length > 0 ? emprestimos[0].livro : "Nenhum";

  return (
    <div className="dashboard-layout">
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
          <div className="sidebar-user-circle">
            {user?.nome?.charAt(0) || "U"}
          </div>
          <div>
            <strong>{user?.nome}</strong>
            <p>{user?.email}</p>
          </div>
        </div>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-topo">
          <h1>Painel de Controle</h1>

          <span className="data-info">
            📅 {hoje.toLocaleDateString("pt-BR")}
          </span>
        </header>

        {/* CARDS */}
        <section className="cards-grid">
          <div className="card summary-card">
            <div className="card-icon blue">
              <FaBook />
            </div>
            <div>
              <h3>{livros.length}</h3>
              <p>Total de livros</p>
            </div>
          </div>

          <div className="card summary-card">
            <div className="card-icon green">
              <FaUsers />
            </div>
            <div>
              <h3>{leitores.length}</h3>
              <p>Leitores cadastrados</p>
            </div>
          </div>

          <div className="card summary-card">
            <div className="card-icon purple">
              <FaExchangeAlt />
            </div>
            <div>
              <h3>{emprestimosAtivos}</h3>
              <p>Empréstimos ativos</p>
            </div>
          </div>

          <div className="card summary-card">
            <div className="card-icon red">
              <FaClock />
            </div>
            <div>
              <h3>{devolucoesAtrasadas}</h3>
              <p>Devoluções em atraso</p>
            </div>
          </div>
        </section>

        {/* TABELA */}
        <section className="dashboard-main-grid">
          <div className="card table-card">
            <div className="section-title">
              <h2>Últimos empréstimos</h2>
              <span>Atualizado hoje</span>
            </div>

            <table className="custom-table">
              <thead>
                <tr>
                  <th>Leitor</th>
                  <th>Livro</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {ultimosEmprestimos.length === 0 ? (
                  <tr>
                    <td colSpan="4">Nenhum empréstimo cadastrado.</td>
                  </tr>
                ) : (
                  ultimosEmprestimos.map((item) => {
                    const status = calcularStatus(item.vencimento);

                    return (
                      <tr key={item.id}>
                        <td>{item.leitor}</td>
                        <td>{item.livro}</td>
                        <td>{item.emprestimo}</td>
                        <td>
                          <span
                            className={`badge ${
                              status === "Atrasado"
                                ? "danger"
                                : status === "A vencer"
                                ? "warning"
                                : "success"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* LATERAIS */}
          <div className="side-panels">
            <div className="card info-card">
              <div className="section-title">
                <h2>Alertas</h2>
              </div>
              <ul>
                <li>{devolucoesAtrasadas} empréstimos em atraso</li>
                <li>{livrosSemCategoria} livros sem categoria</li>
                <li>{leitores.length} leitores cadastrados</li>
              </ul>
            </div>

            <div className="card info-card">
              <div className="section-title">
                <h2>Resumo rápido</h2>
              </div>
              <p><strong>Livro mais emprestado:</strong> {livroMaisEmprestado}</p>
              <p><strong>Total de devoluções:</strong> {devolucoes.length}</p>
              <p><strong>Movimento do sistema:</strong> {emprestimos.length + devolucoes.length} registros</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;