import express from 'express';
import BooksRoutes from "./booksRoutes.js"
import AuthorsRoutes from "./authorsRoutes.js"

// centering routes
const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Curso de Nodejs"))
  app.use(express.json(), BooksRoutes, AuthorsRoutes);
}

export default routes;