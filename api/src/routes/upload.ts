import express from 'express';
import { upload } from '../controller/upload';

export const router = express.Router();

router.get('/', upload);
