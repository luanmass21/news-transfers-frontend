import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/emprestimos.css";

const emprestimosIniciais = [
  {
    id: 1,
    leitor: "Ana Paula Souza",
    livro: "Dom Casmurro",
    emprestimo: "25/03/2026",
    vencimento: "08/04/2026",
  },
];

const Emprestimos = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {
    nome: "Usuário",
    email: "email@exemplo.com",
  };

  const [abaAtiva, setAbaAtiva] = useState("novo");

  const [emprestimos, setEmprestimos] = useState(() => {
    const salvos = localStorage.getItem("emprestimos");
    return salvos ? JSON.parse(salvos) : emprestimosIniciais;
  });

  useEffect(() => {
    localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
  }, [emprestimos]);

  const [form, setForm] = useState({
    leitor: "",
    livro: "",
    dataEmprestimo: "",
    dataDevolucao: "",
  });

  const isFormValid =
    form.leitor.trim() &&
    form.livro.trim() &&
    form.dataEmprestimo.trim() &&
    form.dataDevolucao.trim();

  // 🔥 CALCULAR STATUS DINÂMICO
  const calcularStatus = (vencimento) => {
    const hoje = new Date();
    const venc = new Date(vencimento.split("/").reverse().join("-"));

    const diff = Math.ceil((venc - hoje) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "Atrasado";
    if (diff <= 3) return "A vencer";
    return "Em dia";
  };

  // 🔥 REGISTRAR EMPRÉSTIMO
  const handleRegistrarEmprestimo = () => {
    if (!isFormValid) return;

    const novoEmprestimo = {
      id: Date.now(),
      leitor: form.leitor,
      livro: form.livro,
      emprestimo: form.dataEmprestimo,
      vencimento: form.dataDevolucao,
    };

    setEmprestimos([novoEmprestimo, ...emprestimos]);

    setForm({
      leitor: "",
      livro: "",
      dataEmprestimo: "",
      dataDevolucao: "",
    });

    alert("Empréstimo registrado com sucesso!");
  };

  return (
    <div className="emprestimos-layout">
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

      <main className="emprestimos-content">
        <header className="emprestimos-topbar">
          <h1>Empréstimos</h1>
        </header>

        <div className="emprestimos-tabs">
          <button className={`tab ${abaAtiva === "novo" ? "active" : ""}`} onClick={() => setAbaAtiva("novo")}>
            + Novo Empréstimo
          </button>

          <button className={`tab ${abaAtiva === "ativos" ? "active" : ""}`} onClick={() => setAbaAtiva("ativos")}>
            📜 Ativos ({emprestimos.length})
          </button>

          <button className={`tab ${abaAtiva === "historico" ? "active" : ""}`} onClick={() => setAbaAtiva("historico")}>
            🧾 Histórico
          </button>
        </div>

        <div key={abaAtiva} className="aba-transicao">
          {abaAtiva === "novo" && (
            <>
              <section className="card emprestimo-form-card">
                <h2>Registrar Novo Empréstimo</h2>

                <div className="form-row two-columns">
                  <div className="form-group">
                    <label>Leitor <span>*</span></label>
                    <input
                      type="text"
                      value={form.leitor}
                      onChange={(e) => setForm({ ...form, leitor: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Livro <span>*</span></label>
                    <input
                      type="text"
                      value={form.livro}
                      onChange={(e) => setForm({ ...form, livro: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row three-columns">
                  <div className="form-group">
                    <label>Data do Empréstimo <span>*</span></label>
                    <input
                      type="text"
                      value={form.dataEmprestimo}
                      onChange={(e) => setForm({ ...form, dataEmprestimo: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Data de Devolução <span>*</span></label>
                    <input
                      type="text"
                      value={form.dataDevolucao}
                      onChange={(e) => setForm({ ...form, dataDevolucao: e.target.value })}
                    />
                  </div>
                </div>

                <span className="required-text">* Campos obrigatórios</span>

                <div className="form-actions">
                  <button
                    className="btn-secondary"
                    type="button"
                    onClick={() =>
                      setForm({
                        leitor: "",
                        livro: "",
                        dataEmprestimo: "",
                        dataDevolucao: "",
                      })
                    }
                  >
                    Cancelar
                  </button>

                  <button
                    className="btn-success"
                    type="button"
                    disabled={!isFormValid}
                    onClick={handleRegistrarEmprestimo}
                  >
                    ✅ Registrar Empréstimo
                  </button>
                </div>
              </section>

              <section className="card resumo-card">
                <h2>Empréstimos Ativos — Resumo Recente</h2>

                <div className="table-wrapper">
                  <table className="emprestimos-table">
                    <thead>
                      <tr>
                        <th>Leitor</th>
                        <th>Livro</th>
                        <th>Empréstimo</th>
                        <th>Vencimento</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {emprestimos.map((item) => {
                        const status = calcularStatus(item.vencimento);

                        return (
                          <tr key={item.id}>
                            <td>{item.leitor}</td>
                            <td>{item.livro}</td>
                            <td>{item.emprestimo}</td>
                            <td>{item.vencimento}</td>
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
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {abaAtiva === "ativos" && (
            <section className="card aba-vazia-card">
              <h2>Empréstimos Ativos</h2>
              <p>Total de empréstimos ativos: {emprestimos.length}</p>
            </section>
          )}

          {abaAtiva === "historico" && (
            <section className="card aba-vazia-card">
              <h2>Histórico de Empréstimos</h2>
              <p>Em breve...</p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Emprestimos;