import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Graficos from "../../components/Graficos";
import Financeiro from "../../components/Financeiro";


const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      
      navigate("/login");
    };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Gestão Clínica</div>
        <nav className="nav">
          <Link to="/agenda">Agenda</Link>
          <Link to="/pacientes">Pacientes</Link>
          <Link to="/financeiro">Financeiro</Link>
          <Link to="/estoque">Estoque</Link>
          <Link to="/perfil">Perfil</Link>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="main-content">
        <section className="dashboard">
          <div className="card">
            <h2>Pacientes</h2>
            <p>150</p>
          </div>
          <div className="card">
            <h2>Consultas Hoje</h2>
            <p>20</p>
          </div>
          <div className="card">
            <h2>Receita Mensal</h2>
            <p>R$ 25,000</p>
          </div>
        </section>

        <section className="charts">
          <div className="chart">
            <h2>Consultas por Semana</h2>
            <Graficos />
          </div>
        </section>

        <section className="financeiros">
          <h2>Gestão Financeira</h2>
          <Financeiro />
        </section>

        <section className="notifications">
          <h2>Notificações</h2>
          <ul>
            <li>Consulta com Dr. Silva às 10:00</li>
            <li>Pagamento pendente do paciente João</li>
            <li>Nova mensagem do Dr. Lucas</li>
          </ul>
        </section>

        <section className="quick-access">
          <h2>Acesso Rápido</h2>
          <div className="quick-links">
            <Link to="/pacientes">Adicionar Paciente</Link>
            <Link to="/agenda">Agendar Consulta</Link>
            <Link to="/relatorios">Ver Relatórios</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
