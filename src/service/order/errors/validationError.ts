export class ValidationErrorOrder extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ValidationError";
    }
  }