import React from "react";
import { Chart } from "react-google-charts";

const Relatorios: React.FC = () => {
  // Dados de exemplo para os gráficos
  const receitaMensalData = [
    ["Mês", "Receita"],
    ["Janeiro", 30000],
    ["Fevereiro", 40000],
    ["Março", 35000],
    ["Abril", 45000],
    ["Maio", 50000],
  ];

  const pacientesPorFaixaEtariaData = [
    ["Faixa Etária", "Quantidade"],
    ["0-18", 20],
    ["19-35", 45],
    ["36-50", 30],
    ["51+", 25],
  ];

  const consultasPorMesData = [
    ["Mês", "Consultas"],
    ["Janeiro", 80],
    ["Fevereiro", 120],
    ["Março", 150],
    ["Abril", 180],
    ["Maio", 200],
  ];

  return (
    <div className="relatorios-container">
      <h1>Relatórios</h1>
      <div className="relatorio">
        <h3>Receita Mensal</h3>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="ColumnChart"
          loader={<div>Carregando Gráfico</div>}
          data={receitaMensalData}
          options={{
            title: "Receita Mensal",
            hAxis: {
              title: "Mês",
            },
            vAxis: {
              title: "Receita (R$)",
            },
            colors: ["#4a90e2"],
          }}
        />
      </div>
      <div className="relatorio">
        <h3>Pacientes por Faixa Etária</h3>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Carregando Gráfico</div>}
          data={pacientesPorFaixaEtariaData}
          options={{
            title: "Pacientes por Faixa Etária",
            colors: ["#ff6384", "#36a2eb", "#ffce56", "#cc65fe"],
          }}
        />
      </div>
      <div className="relatorio">
        <h3>Consultas por Mês</h3>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="LineChart"
          loader={<div>Carregando Gráfico</div>}
          data={consultasPorMesData}
          options={{
            title: "Consultas por Mês",
            hAxis: {
              title: "Mês",
            },
            vAxis: {
              title: "Consultas",
            },
            colors: ["#4a90e2"],
          }}
        />
      </div>
    </div>
  );
};

export default Relatorios;
