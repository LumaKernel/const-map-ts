/**
 * Error thrown when a key supplied to a ConstMap is not a string.
 */
export class ConstMapNotStringKeyError extends Error {
  readonly message = "Key must be a string";
  static {
    this.prototype.name = "ConstMapNotStringKeyError";
  }
}
