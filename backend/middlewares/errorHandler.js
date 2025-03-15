import { processAndFormatError } from "../controllers/errorController.js";

export async function errorHandler(err, req, res, next) {
  const stackTrace = err.stack;

  try {
    await processAndFormatError(stackTrace);
  } catch (error) {
    console.error("Server is Busy!!");
  }
}
