export class FetchError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "FetchError";
    this.status = status;
  }
}

export function isUnauthorizedError(error: unknown) {
  return error instanceof FetchError && error.status === 401;
}
