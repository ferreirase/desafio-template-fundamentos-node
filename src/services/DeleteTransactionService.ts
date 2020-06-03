import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(id: string): Transaction {
    try {
      return this.transactionsRepository.delete(id);
    } catch (error) {
      throw Error(`${error.message}`);
    }
  }
}

export default DeleteTransactionService;
