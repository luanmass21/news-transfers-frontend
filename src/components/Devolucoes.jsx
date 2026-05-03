import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/devolucoes.css";

const Devolucoes = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {
    nome: "Usuário",
    email: "email@exemplo.com",
  };

  const [emprestimos, setEmprestimos] = useState(() => {
    const salvos = localStorage.getItem("emprestimos");
    return salvos ? JSON.parse(salvos) : [];
  });

  const [devolucoes, setDevolucoes] = useState(() => {
    const salvos = localStorage.getItem("devolucoes");
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
  }, [emprestimos]);

  useEffect(() => {
    localStorage.setItem("devolucoes", JSON.stringify(devolucoes));
  }, [devolucoes]);

  const calcularDados = (vencimento) => {
    const hoje = new Date();
    const venc = new Date(vencimento.split("/").reverse().join("-"));

    const atrasoDias = Math.max(
      0,
      Math.ceil((hoje - venc) / (1000 * 60 * 60 * 24))
    );

    const multa = atrasoDias * 0.5;

    return {
      status: atrasoDias > 0 ? "Atrasado" : "Em dia",
      multa: multa.toFixed(2),
    };
  };

  const handleDevolver = (id) => {
    const confirmar = window.confirm("Confirmar devolução?");
    if (!confirmar) return;

    const item = emprestimos.find((e) => e.id === id);
    if (!item) return;

    const dados = calcularDados(item.vencimento);

    const devolucaoFinalizada = {
      ...item,
      dataDevolucao: new Date().toLocaleDateString("pt-BR"),
      status: dados.status,
      multa: dados.multa,
    };

    setDevolucoes([devolucaoFinalizada, ...devolucoes]);
    setEmprestimos(emprestimos.filter((e) => e.id !== id));

    alert(`Devolução registrada! Multa: R$ ${dados.multa}`);
  };

  return (
    <div className="devolucoes-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>BiblioGest</h2>
          <p>Painel administrativo</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}>Dashboard</Link>
          <Link to="/leitores" className={`nav-item ${location.pathname === "/leitores" ? "active" : ""}`}>Leitores</Link>
          <Link to="/acervo" className={`nav-item ${location.pathname === "/acervo" ? "active" : ""}`}>Acervo</Link>
          <Link to="/emprestimos" className={`nav-item ${location.pathname === "/emprestimos" ? "active" : ""}`}>Empréstimos</Link>
          <Link to="/devolucoes" className={`nav-item ${location.pathname === "/devolucoes" ? "active" : ""}`}>Devoluções</Link>
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-user-circle">
            {user?.nome?.charAt(0) || "U"}
          </div>
          <div>
            <strong>{user?.nome || "Usuário"}</strong>
            <p>{user?.email || "email@exemplo.com"}</p>
          </div>
        </div>
      </aside>

      <main className="devolucoes-content">
        <header className="devolucoes-topbar">
          <h3>Devoluções</h3>
        </header>

        <section className="card devolucao-form-card">
          <h2>Registrar Devolução</h2>
          <p>
            Selecione abaixo um empréstimo ativo para registrar a devolução.
            A multa será calculada automaticamente.
          </p>
        </section>

        <section className="card pendencias-card">
          <h2>Devoluções Pendentes</h2>

          <table className="devolucoes-table">
            <thead>
              <tr>
                <th>Leitor</th>
                <th>Livro</th>
                <th>Empréstimo</th>
                <th>Vencimento</th>
                <th>Status</th>
                <th>Multa</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {emprestimos.length === 0 ? (
                <tr>
                  <td colSpan="7">Nenhuma devolução pendente.</td>
                </tr>
              ) : (
                emprestimos.map((item) => {
                  const dados = calcularDados(item.vencimento);

                  return (
                    <tr key={item.id}>
                      <td>{item.leitor}</td>
                      <td>{item.livro}</td>
                      <td>{item.emprestimo}</td>
                      <td>{item.vencimento}</td>
                      <td>
                        <span className={`badge ${dados.status === "Atrasado" ? "danger" : "success"}`}>
                          {dados.status}
                        </span>
                      </td>
                      <td>R$ {dados.multa}</td>
                      <td>
                        <button className="acao-btn" onClick={() => handleDevolver(item.id)}>
                          ↩ Devolver
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Devolucoes;