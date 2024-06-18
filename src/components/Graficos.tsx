import React from "react";
import { Chart } from "react-google-charts";

const Graficos: React.FC = () => {
  // Dados de exemplo para o gráfico de pacientes por convênio
  const patientsByInsuranceData = [
    ["Convênio", "Quantidade"],
    ["Convênio A", 30],
    ["Convênio B", 20],
    ["Convênio C", 50],
  ];

  // Dados de exemplo para o gráfico de perfil dos pacientes
  const patientsProfileData = [
    ["Faixa Etária", "Quantidade"],
    ["Crianças", 40],
    ["Adultos", 50],
    ["Idosos", 30],
  ];

  // Dados de exemplo para o gráfico de pacientes por sexo
  const patientsByGenderData = [
    ["Sexo", "Quantidade"],
    ["Homem", 60],
    ["Mulher", 70],
  ];

  return (
    <div>
      <h2>Gráficos</h2>
      <div>
        <h3>Pacientes por Convênio</h3>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Carregando Gráfico</div>}
          data={patientsByInsuranceData}
          options={{
            title: "Pacientes por Convênio",
            colors: ["#FF6384", "#36A2EB", "#FFCE56"], // Personalize as cores aqui
          }}
        />
      </div>
      <div>
        <h3>Perfil dos Pacientes</h3>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Carregando Gráfico</div>}
          data={patientsProfileData}
          options={{
            title: "Perfil dos Pacientes",
            colors: ["#FF6384", "#36A2EB", "#FFCE56"], // Personalize as cores aqui
          }}
        />
      </div>
      <div>
        <h3>Pacientes por Sexo</h3>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Carregando Gráfico</div>}
          data={patientsByGenderData}
          options={{
            title: "Pacientes por Sexo",
            colors: ["#FF6384", "#36A2EB"],
          }}
        />
      </div>
    </div>
  );
};

export default Graficos;
