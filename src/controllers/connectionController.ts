import { Request, Response } from 'express';
import { sendConnectionRequest } from '../services/connectionService';

export const handleSendConnectionRequest = async (req: Request, res: Response) => {
  const { lead_url } = req.body;
  const { accountId } = req.params;

  if (!lead_url || !accountId) {
    return res.status(400).json({ error: 'Missing leadUrl or accountId' });
  }

  try {
    const result = await sendConnectionRequest(accountId, lead_url);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(400).json({ error: result.message });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
