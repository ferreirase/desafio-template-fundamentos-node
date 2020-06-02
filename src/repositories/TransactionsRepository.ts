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

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    /*
    if (this.transactions.length === 0) {
      throw Error('No transactions registered');
    } */

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
}

export default TransactionsRepository;
