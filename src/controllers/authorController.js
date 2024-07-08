import { Author } from '../models/Author.js';

class AuthorController {
  static async getAll(req, res) {
    try {
      const authors = await Author.find({});
      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const id = req.params.id;
      const author = await a.findById(id);
      res.json(author);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async register(req, res) {
    try {
      const author = await Author.create(req.body)
      res.status(201).json({
        message: 'Author registered successfully',
        author
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      await Author.findByIdAndUpdate(id, req.body);
      res.json({ message: 'Updated'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      await Author.findByIdAndDelete(id);
      res.json({ message: 'Deleted'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default AuthorController;