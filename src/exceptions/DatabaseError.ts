import ApiError from './ApiError';

export default class DatabaseError extends ApiError {
  status = 503;

  name = 'DatabaseError';

  sql = null || '';

  constructor(message: string, sql: string | null) {
    super(message);
    if (sql !== null) {
      this.sql = sql;
    }
  }
}
