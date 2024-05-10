export class ConstMapNotStringKeyError extends Error {
  readonly message = "Key must be a string";
  static {
    this.prototype.name = "ConstMapNotStringKeyError";
  }
}
