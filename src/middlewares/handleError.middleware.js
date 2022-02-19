const handleError = (error, _request, response, _next) => {
  const {
    code = 'UNKNOWN',
    statusCode = 500,
    message = 'Unknown Server Error',
  } = error;

  response.status(statusCode).json({
    error: { code, message },
  });
}

export default handleError;
