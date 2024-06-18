import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Signin/login";
import Cadastro from "./pages/Signup/cadastro";
import TelaInicial from "./pages/Home/main";
import Agenda from "./components/Agenda";
import Financeiro from "./components/Financeiro";
import Pacientes from "./components/Pacientes";
import Relatorios from "./components/Relatorios";
import Estoque from "./components/Estoque";


const App: React.FC = () => {
  const [token, setToken] = useState("");
  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/tela-inicial" element={<TelaInicial />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} /> {}
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/estoque" element={<Estoque />} />
      </Routes>
    </Router>
  );
};

export default App;
