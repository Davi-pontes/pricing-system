export class ValidationErrorProduct extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ValidationError";
    }
  }