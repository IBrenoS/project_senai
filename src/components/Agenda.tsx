import React, { useState } from "react";

const Agenda: React.FC = () => {
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      medico: "Dr. Silva",
      paciente: "João",
      data: "08/02/2023",
      hora: "10:00",
    },
    {
      id: 2,
      medico: "Dra. Lucas",
      paciente: "Ana",
      data: "10/02/2023",
      hora: "11:00",
    },
    {
      id: 3,
      medico: "Dr. Breno",
      paciente: "Isabella",
      data: "17/08/2023",
      hora: "13:00",
    },
  ]);

  const adicionarConsulta = () => {
    const novaConsulta = {
      id: consultas.length + 1,
      medico: "Dr. Novo",
      paciente: "Novo Paciente",
      data: "15/06/2024",
      hora: "14:00",
    };
    setConsultas([...consultas, novaConsulta]);
  };

  const removerConsulta = (id: number) => {
    setConsultas(consultas.filter((consulta) => consulta.id !== id));
  };

  return (
    <div className="agenda-container">
      <div className="agenda-header">
        <h1>Agenda</h1>
        <button className="add-button" onClick={adicionarConsulta}>
          Adicionar Consulta
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Médico</th>
            <th>Paciente</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.id}>
              <td>{consulta.medico}</td>
              <td>{consulta.paciente}</td>
              <td>{consulta.data}</td>
              <td>{consulta.hora}</td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => removerConsulta(consulta.id)}
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

export default Agenda;
