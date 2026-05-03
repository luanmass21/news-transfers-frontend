import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../css/acervo.css";

const AcervoPage = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {
    nome: "Usuário",
    email: "email@exemplo.com",
  };

  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    situacao: "Disponível",
  });

  const isFormValid =
    form.titulo.trim() &&
    form.autor.trim() &&
    form.categoria.trim() &&
    form.situacao.trim();

  return (
    <div className="acervo-layout">
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
            <strong>{user?.nome || "Usuário"}</strong>
            <p>{user?.email || "email@exemplo.com"}</p>
          </div>
        </div>
      </aside>

      <main className="acervo-content">
        <header className="acervo-header">
          <div className="acervo-header-left">
            <h1>Cadastrar Livro</h1>
          </div>
        </header>

        <div className="acervo-card">
          <section className="acervo-section">
            <h2>📖 Informações Principais</h2>

            <div className="acervo-grid acervo-grid-3">
              <div className="form-group span-2">
                <label>Título <span>*</span></label>
                <input
                  type="text"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Autor <span>*</span></label>
                <input
                  type="text"
                  value={form.autor}
                  onChange={(e) => setForm({ ...form, autor: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>ISBN</label>
                <input type="text" defaultValue="" />
              </div>
            </div>

            <div className="acervo-grid acervo-grid-4">
              <div className="form-group">
                <label>Categoria <span>*</span></label>
                <input
                  type="text"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Editora</label>
                <input type="text" defaultValue="" />
              </div>

              <div className="form-group">
                <label>Ano de Publicação</label>
                <input type="text" defaultValue="" />
              </div>

              <div className="form-group">
                <label>Idioma</label>
                <input type="text" defaultValue="Português" />
              </div>
            </div>

            <div className="acervo-grid acervo-grid-3">
              <div className="form-group">
                <label>Nº de Páginas</label>
                <input type="text" defaultValue="" />
              </div>

              <div className="form-group">
                <label>Edição</label>
                <input type="text" defaultValue="" />
              </div>

              <div className="form-group">
                <label>Sinopse</label>
                <input type="text" defaultValue="" />
              </div>
            </div>
          </section>

          <section className="acervo-section">
            <h2>📍 Localização e Status</h2>

            <div className="acervo-grid acervo-grid-4">
              <div className="form-group">
                <label>Situação <span>*</span></label>
                <input
                  type="text"
                  value={form.situacao}
                  onChange={(e) => setForm({ ...form, situacao: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Estante</label>
                <input type="text" defaultValue="A" />
              </div>

              <div className="form-group">
                <label>Prateleira</label>
                <input type="text" defaultValue="3" />
              </div>

              <div className="form-group">
                <label>Posição</label>
                <input type="text" defaultValue="12" />
              </div>
            </div>
          </section>

          <section className="acervo-section">
            <div className="form-group">
              <label>Observações Adicionais</label>
              <textarea
                rows="4"
                defaultValue="Exemplar em bom estado de conservação. Adquirido por doação em 2021."
              />
            </div>
          </section>

          <div className="acervo-footer">
            <span className="required-text">* Campos obrigatórios</span>

            <div className="acervo-actions">
              <button className="btn-secondary" type="button">
                Cancelar
              </button>

              <button
                className="btn-primary"
                type="button"
                disabled={!isFormValid}
                onClick={() => alert("Livro salvo com sucesso!")}
              >
                💾 Salvar Livro
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcervoPage;