import express from 'express';
import * as user from './user.routes';

const router = express.Router({ mergeParams: true });

router.use('/users', user.router);

export default router;
