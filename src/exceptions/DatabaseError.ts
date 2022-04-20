import ApiError from './ApiError';

export default class DatabaseError extends ApiError {
  status = 503;

  name = 'DatabaseError';

  sql = null;

  // TODO revoir types sql (types string | null)
  constructor(message: string, sql: any) {
    super(message);
    this.sql = sql;
  }
}
