class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number,
  ) {
    super(message);
    this.status = status || 500;
  }
}

export default AppError;
