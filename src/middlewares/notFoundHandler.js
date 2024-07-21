import { NotFoundError } from "../errors/index.js"

export default function notFoundHandler(req, res, next) {
  const error = new NotFoundError()
  next(error)
}