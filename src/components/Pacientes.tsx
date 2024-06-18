import React, { useState } from "react";


interface Paciente {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  telefone: string;
}

const Pacientes: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([
    {
      id: 1,
      nome: "João Silva",
      idade: 30,
      sexo: "Masculino",
      telefone: "923456789",
    },
    {
      id: 2,
      nome: "Ana Julia",
      idade: 25,
      sexo: "Feminino",
      telefone: "987654321",
    },
    {
      id: 3,
      nome: "Carlos Batista",
      idade: 22,
      sexo: "Masculino",
      telefone: "956789123",
    },
  ]);

  const adicionarPaciente = () => {
    const novoPaciente: Paciente = {
      id: pacientes.length + 1,
      nome: "Novo Paciente",
      idade: 0,
      sexo: "Não Informado",
      telefone: "000000000",
    };
    setPacientes([...pacientes, novoPaciente]);
  };

  const removerPaciente = (id: number) => {
    setPacientes(pacientes.filter((paciente) => paciente.id !== id));
  };

  return (
    <div className="pacientes-container">
      <div className="pacientes-header">
        <h1>Pacientes</h1>
        <button className="add-button" onClick={adicionarPaciente}>
          Adicionar Paciente
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Sexo</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.nome}</td>
              <td>{paciente.idade}</td>
              <td>{paciente.sexo}</td>
              <td>{paciente.telefone}</td>
              <td>
                <button className="edit-button">Editar</button>
                <button
                  className="remove-button"
                  onClick={() => removerPaciente(paciente.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pacientes;
