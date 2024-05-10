declare const IsStaticConstMapError: unique symbol;
export type ConstMapStaticError<Message extends string> = {
  [IsStaticConstMapError]: Message;
};
