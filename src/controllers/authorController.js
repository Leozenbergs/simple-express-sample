import { Author } from '../models/Author.js';
import { NotFoundError } from '../errors/index.js';

class AuthorController {
  static async getAll(req, res, next) {
    try {
      const authors = await Author.find({});
      res.json(authors);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const id = req.params.id;
      const author = await Author.findById(id);

      if(author !== null) {
        res.status(200).json(author);
      } else {
        next(new NotFoundError("Id not found"));
      }
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const author = await Author.create(req.body)
      res.status(201).json({
        message: 'Author registered successfully',
        author
      });
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const author = await Author.findByIdAndUpdate(id, req.body);

      if(author !== null) {
        res.json({ message: 'Updated'});
      } else {
        next(new NotFoundError("Author not found"));
      }
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      await Author.findByIdAndDelete(id);
      res.json({ message: 'Deleted'});
    } catch (error) {
      next(error)
    }
  }
}

export default AuthorController;