import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cadastro: React.FC = () => {
  const [dadosCadastro, setDadosCadastro] = useState({
    nome: "",
    sobrenome: "",
    dataNascimento: "",
    sexo: "",
    telefone: "",
    cpf: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDadosCadastro((prevDados) => ({
      ...prevDados,
      [name]: name === "telefone" ? Number(value) : value,
    }));
  };

  const handleCadastro = async () => {
    // Lógica de validação aqui antes de enviar os dados para a API
    if (
      !dadosCadastro.nome ||
      !dadosCadastro.sobrenome ||
      !dadosCadastro.email ||
      !dadosCadastro.cpf ||
      !dadosCadastro.telefone
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validar o campo nome //
    if (!dadosCadastro.nome) {
      alert("Por favor, preencha o campo Nome.");
      return;
    }

    // Validar o campo sobrenome //
    if (!dadosCadastro.sobrenome) {
      alert("Por favor, preencha o campo Sobrenome.");
      return;
    }

    // Validar o campo email //
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!dadosCadastro.email.match(emailPattern)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    // Validar o campo CPF //
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!dadosCadastro.cpf.match(cpfPattern)) {
      alert("Por favor, insira um CPF válido (11 dígitos numéricos).");
      return;
    }

    // Validar o campo telefone
    const telefonePattern = /^\d{8,}$/;
    const telefoneString = String(dadosCadastro.telefone);
    if (!telefoneString.match(telefonePattern)) {
      setError(
        "Por favor, insira um número de telefone válido com pelo menos 8 dígitos."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCadastro),
      });

      const data = await response.json();

      if (response.ok) {
        // Redireciona para a tela de login o cadastro for bem-sucedido
        navigate("/login");
      } else {
        // Exibe mensagem de erro se o cadastro falhar
        setError(data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar realizar seu cadastro:", error);
      setError("Erro ao tentar realizar seu cadastro");
    }
  };

   return (
     <div className="cadastro-container">
       <div className="cadastro-form">
         <h1>Cadastro</h1>
         <label htmlFor="nome">Nome:</label>
         <input
           type="text"
           id="nome"
           name="nome"
           value={dadosCadastro.nome}
           onChange={handleChange}
         />
         <label htmlFor="sobrenome">Sobrenome:</label>
         <input
           type="text"
           id="sobrenome"
           name="sobrenome"
           value={dadosCadastro.sobrenome}
           onChange={handleChange}
         />
         <label htmlFor="dataNascimento">Data de Nascimento:</label>
         <input
           type="date"
           id="dataNascimento"
           name="dataNascimento"
           value={dadosCadastro.dataNascimento}
           max="9999-12-31"
           onChange={handleChange}
         />
         <label htmlFor="sexo">Sexo:</label>
         <select
           id="sexo"
           name="sexo"
           value={dadosCadastro.sexo}
           onChange={handleChange}
         >
           <option value="">Selecione</option>
           <option value="Masculino">Masculino</option>
           <option value="Feminino">Feminino</option>
         </select>
         <label htmlFor="telefone">Telefone:</label>
         <input
           type="text"
           id="telefone"
           name="telefone"
           value={dadosCadastro.telefone}
           onChange={handleChange}
         />
         <label htmlFor="cpf">CPF:</label>
         <input
           type="text"
           id="cpf"
           name="cpf"
           value={dadosCadastro.cpf}
           onChange={handleChange}
         />
         <label htmlFor="email">E-mail:</label>
         <input
           type="email"
           id="email"
           name="email"
           value={dadosCadastro.email}
           onChange={handleChange}
         />
         <label htmlFor="senha">Senha:</label>
         <input
           type="password"
           id="senha"
           name="senha"
           value={dadosCadastro.senha}
           onChange={handleChange}
         />
         <label htmlFor="confirmacaoSenha">Confirme a Senha:</label>
         <input
           type="password"
           id="confirmacaoSenha"
           name="confirmacaoSenha"
           value={dadosCadastro.confirmacaoSenha}
           onChange={handleChange}
         />
         {error && <p className="error">{error}</p>}
         <button onClick={handleCadastro}>Cadastrar</button>
         <p>
           Já possui uma conta? <Link to="/login">Faça login aqui.</Link>
         </p>
       </div>
     </div>
   );
};

export default Cadastro;
