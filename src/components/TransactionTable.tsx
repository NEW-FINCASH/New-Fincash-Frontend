import React from 'react';

interface Transaction {
  id: number;
  type: 'Receita' | 'Despesa';
  value: number;
  date: string;
  description: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  title?: string;
}

function TransactionTable({ transactions, title }: TransactionTableProps) {
  return (
    <div className="bg-dark rounded text-white p-3 shadow-sm">
      {title && <h2 className="text-white fw-light fs-4 mb-3 text-center">{title}</h2>}
      <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}> {/* Adicionei scroll na tabela se for muito grande */}
        <table className="table table-dark table-hover mb-0"> {/* mb-0 para remover margem inferior extra */}
          <thead>
            <tr>
              <th scope="col">Tipo</th>
              <th scope="col">Valor</th>
              <th scope="col">Data</th>
              <th scope="col">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted">Nenhuma transação encontrada.</td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <th scope="row" className={transaction.type === 'Receita' ? 'text-success' : 'text-danger'}>
                    {transaction.type}
                  </th>
                  <td>
                    R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td>{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                  <td>{transaction.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;