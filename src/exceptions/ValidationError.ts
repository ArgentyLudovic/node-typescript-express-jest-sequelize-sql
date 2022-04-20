import ApiError from './ApiError';

export default class ValidationError extends ApiError {
  status = 400;

  name = 'ValidationError';

  fields = null;

  constructor(message, fields) {
    super(message);
    this.fields = fields;
  }
}
