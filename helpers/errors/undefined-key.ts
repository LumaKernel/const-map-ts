/**
 * Error thrown when a supplied key is not found in the ConstMap.
 */
export class ConstMapUndefinedKeyError extends Error {
  constructor(key: string, options?: ErrorOptions) {
    super(`Key ${JSON.stringify(key)} not found in the map`, options);
  }
  static {
    this.prototype.name = "ConstMapUndefinedKeyError";
  }
}
