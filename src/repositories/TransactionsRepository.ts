/* eslint-disable @typescript-eslint/no-explicit-any */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface UpdateTransaction {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((actual, transaction) => actual + transaction.value, 0);

    const totalOutcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((actual, transaction) => actual + transaction.value, 0);

    const balance = {
      income: totalIncomes,
      outcome: totalOutcomes,
      total: totalIncomes - totalOutcomes,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    if (type === 'outcome' && value > this.getBalance().total) {
      throw Error('Insufficient funds');
    }

    this.transactions.push(newTransaction);

    return newTransaction;
  }

  public update({ id, title, value, type }: UpdateTransaction): Transaction {
    const [transactionFound] = this.transactions.filter(
      transaction => transaction.id === id,
    );

    const indexTransactionFound = this.transactions.indexOf(transactionFound);

    if (indexTransactionFound < 0) {
      throw Error('Transaction not found');
    }

    this.transactions[indexTransactionFound] = { id, title, value, type };

    return this.transactions[indexTransactionFound];
  }

  public delete(id: string): Transaction {
    const [transactionFound] = this.transactions.filter(
      transaction => transaction.id === id,
    );

    const indexTransactionFound = this.transactions.indexOf(transactionFound);

    if (indexTransactionFound < 0) {
      throw Error('Transaction not found');
    }

    this.transactions.splice(indexTransactionFound, 1);

    return transactionFound;
  }
}

export default TransactionsRepository;
