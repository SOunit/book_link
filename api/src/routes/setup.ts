import express from 'express';

import { getHi, getValues, postValue } from '../controllers/setup';

const router = express.Router();

router.get('/', getHi);

router.get('/values/all', getValues);

router.post('/values', postValue);

export default router;
