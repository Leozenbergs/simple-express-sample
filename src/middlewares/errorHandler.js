import mongoose from "mongoose";
import { BaseError, WrongRequestError, ValidationError } from "../errors/index.js";

// eslint-disable-next-line no-unused-vars
export default function errorHandler (err, req, res, next) {
  if(err instanceof mongoose.Error.CastError) {
    new WrongRequestError().sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res)
  } else if (err instanceof BaseError) {
    err.sendResponse(res);
  } else {
    new BaseError().sendResponse(res)
  }
  
}