import { Author } from '../models/Author.js';
import Book from '../models/Book.js';
import { NotFoundError, WrongRequestError } from '../errors/index.js';

class BookController {
  static async getAll(req, res, next) {
    try {
      let { limit = 5, page = 1, orderedField = "_id", order = 1 } = req.query

      limit = parseInt(limit)
      page = parseInt(page)

      if (limit > 0 && page > 0) {
        const books = await Book.find()
          .sort({ [orderedField]: order }) // order by
            .skip((page - 1) * limit) // pagination page items
              .limit(limit) // pagination limit
                .populate("author")
                  .exec();
        res.status(200).json(books);
      } else {
        next(new WrongRequestError());
      }

    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const id = req.params.id;
      const book = await Book.findById(id);
      res.json(book);
      if(book !== null) {
        res.status(200).json(book);
      } else {
        next(new NotFoundError("Id not found"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async getByFilter(req, res, next) {
    const search = {}
    const { title, publisher } = req.query;

    if(title) search.title = { $regex: title, $options: "i" };
    if(publisher) search.publishing_company = { $regex: publisher, $options: "i"};

    try {
      const booksByPublishingCompany = await Book.find(search);
      if(booksByPublishingCompany !== null) {
        res.json(booksByPublishingCompany);
      } else {
        next(new NotFoundError("Publishing company not found"));
      }
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    const book = req.body
    try {
      const authorFound = await Author.findById(book.author)
      const fullBook = { ...book, author: { ...authorFound?._doc }}
      const createdBook = await Book.create(fullBook)
      res.status(201).json({
        message: 'Book registered successfully',
        book: createdBook
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const book = await Book.findByIdAndUpdate(id, req.body);

      if(book !== null) {
        res.json({ message: 'Updated'});
      } else {
        next(new NotFoundError("Book not found"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      await Book.findByIdAndDelete(id);
      res.json({ message: 'Deleted'});
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;