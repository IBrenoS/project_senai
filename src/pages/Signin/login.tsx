import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, senha }),
      });

      const data = await response.json();
      onLogin(data.token);

      if (response.ok) {
        // Redireciona para a tela inicial se a autenticação for bem-sucedida
        navigate("/tela-inicial");
      } else {
        // Exibe mensagem de erro se a autenticação falhar
        setError(data.message);
      }
    } catch (error) {
      console.error("Você não possui uma conta no nosso sistema:", error);
      setError("Você não possui uma conta no nosso sistema");
    }
  };

   return (
     <div className="login-container">
       <div className="login-form">
         <h1>Login</h1>
         <label htmlFor="cpf">CPF:</label>
         <input
           type="text"
           id="cpf"
           value={cpf}
           onChange={(e) => setCpf(e.target.value)}
         />
         <label htmlFor="senha">Senha:</label>
         <input
           type="password"
           id="senha"
           value={senha}
           onChange={(e) => setSenha(e.target.value)}
         />
         {error && <p className="error">{error}</p>}
         <button onClick={handleLoginClick}>Entrar</button>
         <p>
           Ainda não tem cadastro?{" "}
           <Link to="/cadastro">Crie uma conta aqui.</Link>
         </p>
       </div>
     </div>
   );
};

export default Login;
