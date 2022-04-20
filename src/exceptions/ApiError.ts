export default class ApiError extends Error {
  status = 500;

  name = 'ApiError';

  message = '';

  constructor(message) {
    super(message);
    this.message = message;
  }
}
