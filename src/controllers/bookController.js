import { Author } from '../models/Author.js';
import Book from '../models/Book.js';

class BookController {
  static async getAll(req, res) {
    try {
      const books = await Book.find({});
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const id = req.params.id;
      const book = await Book.findById(id);
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getByPublishingCompany(req, res) {
    const publishingCompany = req.query.publishing_company;
    try {
      const booksByPublishingCompany = await Book.find({ publishing_company: publishingCompany });
      res.json(booksByPublishingCompany);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async register(req, res) {
    const book = req.body
    try {
      const authorFound = await Author.findById(book.author)
      const fullBook = { ...book, author: { ...authorFound._doc }}
      const createdBook = await Book.create(fullBook)
      res.status(201).json({
        message: 'Book registered successfully',
        book: createdBook
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      await Book.findByIdAndUpdate(id, req.body);
      res.json({ message: 'Updated'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      await Book.findByIdAndDelete(id);
      res.json({ message: 'Deleted'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default BookController;