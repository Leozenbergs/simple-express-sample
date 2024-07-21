import WrongRequestError from "./wrongRequestError.js";

class ValidationError extends WrongRequestError {
  constructor(err) {
    const errorMessages = Object.values(err?.errors).map(error => error?.message).join('; ');
    super(`Error(s): ${errorMessages}`);
  }
}

export default ValidationError;