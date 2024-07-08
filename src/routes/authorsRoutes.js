import express from 'express';
import AuthorController from '../controllers/authorController.js';

const routes = express.Router()

routes.get('/authors', AuthorController.getAll)
routes.get('/authors/:id', AuthorController.get)
routes.post('/authors', AuthorController.register)
routes.put('/authors/:id', AuthorController.update)
routes.delete('/authors/:id', AuthorController.delete)

export default routes