import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    try {
      const newTransaction = new Transaction({ title, value, type });
      this.transactionsRepository.create(newTransaction);

      return newTransaction;
    } catch (error) {
      throw Error(`${error.message}`);
    }
  }
}

export default CreateTransactionService;
