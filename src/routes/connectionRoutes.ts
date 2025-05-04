import express from 'express';
import { handleSendConnectionRequest } from '../controllers/connectionController';

const router = express.Router();

// POST /api/connections/:accountId
// @ts-ignore
router.post('/:accountId', handleSendConnectionRequest);

export default router;
