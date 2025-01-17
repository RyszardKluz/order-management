const errorHandler = (err, req, res) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: true,
    message: message,
  });
};

export default errorHandler;
