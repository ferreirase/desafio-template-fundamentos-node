import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import UpdateTransactionService from '../services/UpdateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    return response.status(200).json({
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.delete('/:id', (request, response) => {
  try {
    const deleteTransactionService = new DeleteTransactionService(
      transactionsRepository,
    );

    return response
      .status(200)
      .json(deleteTransactionService.execute(request.params.id));
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

transactionRouter.put('/:id', (request, response) => {
  try {
    const updateTransactionService = new UpdateTransactionService(
      transactionsRepository,
    );

    const updateTransaction = updateTransactionService.execute({
      id: request.params.id,
      title: request.body.title,
      value: request.body.value,
      type: request.body.type,
    });

    return response.status(201).json(updateTransaction);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const newTransaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.status(201).json(newTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
