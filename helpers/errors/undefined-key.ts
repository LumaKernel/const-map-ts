export class ConstMapUndefinedKeyError extends Error {
  constructor(key: string, options?: ErrorOptions) {
    super(`Key ${JSON.stringify(key)} not found in the map`, options);
  }
  static {
    this.prototype.name = "ConstMapUndefinedKeyError";
  }
}
