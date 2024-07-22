import express from 'express';
import BookController from '../controllers/bookController.js';

const routes = express.Router()

routes.get('/books', BookController.getAll)
routes.get('/books/search', BookController.getByFilter)
routes.get('/books/:id', BookController.get)
routes.post('/books', BookController.register)
routes.put('/books/:id', BookController.update)
routes.delete('/books/:id', BookController.delete)

export default routes