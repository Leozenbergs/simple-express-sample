import BaseError from "./baseError.js";

class WrongRequestError extends BaseError {
  constructor(message = "Invalid request data") {
    super(message, 400)
  }
}

export default WrongRequestError;