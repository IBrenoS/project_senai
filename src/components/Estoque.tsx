import React, { useEffect, useState } from "react";

interface StockItem {
  id: number;
  name: string;
  quantity: number;
  lastUpdated: string;
  expirationDate: string;
}

interface Movement {
  id: number;
  itemName: string;
  type: string;
  quantity: number;
  date: string;
}

const Estoque: React.FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [expiredItemsCount, setExpiredItemsCount] = useState<number>(0); // Contador de itens vencidos
  const [movementHistory, setMovementHistory] = useState<Movement[]>([]);

  useEffect(() => {
    const sampleStockItems: StockItem[] = [
      {
        id: 1,
        name: "Amoxicilina",
        quantity: 100,
        lastUpdated: "18/03/2024",
        expirationDate: "20/12/2024",
      },
      {
        id: 2,
        name: "Neosaldina",
        quantity: 50,
        lastUpdated: "17/03/2024",
        expirationDate: "01/07/2024",
      },
    ];

    const sampleMovementHistory: Movement[] = [
      {
        id: 1,
        itemName: "Amoxicilina",
        type: "Entrada",
        quantity: 50,
        date: "20-03-2024",
      },
      {
        id: 2,
        itemName: "Neosaldina",
        type: "Saída",
        quantity: 20,
        date: "22-03-2024",
      },
    ];

    // Atualizar o contador de itens vencidos
    const now = new Date();
    const expiredItems = sampleStockItems.filter(
      (item) => new Date(item.expirationDate) < now
    );
    setExpiredItemsCount(expiredItems.length);

    setStockItems(sampleStockItems);
    setMovementHistory(sampleMovementHistory);
  }, []);

  const getTotalStock = () => {
    return stockItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="estoque-container">
      <h2>Gestão da Clínica</h2>
      <h3>Controle de Estoque</h3>
      <div className="estoque-summary">
        <p>
          Total de Itens em Estoque: <span>{getTotalStock()}</span>
        </p>
        <p>
          Itens Vencidos: <span>{expiredItemsCount}</span>
        </p>
      </div>
      <table className="estoque-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantidade</th>
            <th>Última Atualização</th>
            <th>Data de Validade</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item) => (
            <tr
              key={item.id}
              className={
                new Date(item.expirationDate) < new Date() ? "expired" : ""
              }
            >
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.lastUpdated}</td>
              <td>{item.expirationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Histórico de Movimentações</h3>
      <table className="movements-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Item</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {movementHistory.map((movement) => (
            <tr key={movement.id}>
              <td>{movement.type}</td>
              <td>{movement.itemName}</td>
              <td>{movement.quantity}</td>
              <td>{movement.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estoque;
