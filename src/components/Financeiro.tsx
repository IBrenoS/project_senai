import React from "react";
import { Chart } from "react-google-charts";

const Financeiro: React.FC = () => {
  const receitasDespesasData = [
    ["Mês", "Receitas", "Despesas"],
    ["Janeiro", 30000, 22000],
    ["Fevereiro", 40000, 25000],
    ["Março", 35000, 27000],
    ["Abril", 45000, 30000],
    ["Maio", 50000, 32000],
  ];

  const distribuicaoDespesasData = [
    ["Categoria", "Valor"],
    ["Salários", 20000],
    ["Equipamentos", 10000],
    ["Manutenção", 7000],
    ["Outros", 5000],
  ];

  return (
    <div className="financeiro-container">
      <h1>Financeiro</h1>

      <section className="resumo-financeiro">
        <div className="card">
          <h2>Total de Receitas</h2>
          <p>R$ 8.800</p>
        </div>
        <div className="card">
          <h2>Total de Despesas</h2>
          <p>R$ 12.000</p>
        </div>
        <div className="card">
          <h2>Lucro Líquido</h2>
          <p>R$ 530.690,00</p>
        </div>
      </section>

      <section className="graficos-financeiros">
        <div className="grafico">
          <h3>Receitas e Despesas Mensais</h3>
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="LineChart"
            loader={<div>Carregando Gráfico</div>}
            data={receitasDespesasData}
            options={{
              title: "Receitas e Despesas Mensais",
              hAxis: {
                title: "Mês",
              },
              vAxis: {
                title: "Valor (R$)",
              },
              colors: ["#4a90e2", "#ff0000"],
            }}
          />
        </div>
        <div className="grafico">
          <h3>Distribuição de Despesas</h3>
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Carregando Gráfico</div>}
            data={distribuicaoDespesasData}
            options={{
              title: "Distribuição de Despesas",
              colors: ["#ff6384", "#36a2eb", "#ffce56", "#cc65fe"],
            }}
          />
        </div>
      </section>

      <section className="transacoes-recentes">
        <h3>Transações Recentes</h3>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>22/05/2024</td>
              <td>Consulta</td>
              <td>Receita</td>
              <td>R$ 300</td>
            </tr>
            <tr>
              <td>29/05/2024</td>
              <td>Compra de Equipamento</td>
              <td>Despesa</td>
              <td>R$ 1500</td>
            </tr>
            <tr>
              <td>08/06/2024</td>
              <td>Pagamento de Salário</td>
              <td>Despesa</td>
              <td>R$ 5000</td>
            </tr>
            <tr>
              <td>10/06/2024</td>
              <td>Manutenção</td>
              <td>Despesa</td>
              <td>R$ 700</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Financeiro;
