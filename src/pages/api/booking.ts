import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.headers['x-auth-key'] !== 'EsjanIsAMountainInIceland') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.status(200).json({
    status: 'success',
    timestamp: new Date().toISOString(),
    bookingId: Math.random().toString(36).substring(2, 10),
  });
}