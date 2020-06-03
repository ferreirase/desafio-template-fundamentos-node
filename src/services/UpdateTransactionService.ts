import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class UpdateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ id, title, value, type }: Request): Transaction {
    try {
      return this.transactionsRepository.update({
        id,
        title,
        value,
        type,
      });
    } catch (error) {
      throw Error(`${error.message}`);
    }
  }
}

export default UpdateTransactionService;
