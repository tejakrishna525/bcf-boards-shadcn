// pages/api/items.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await fetch('https://demo6396395.mockable.io/bcf-boards');
    const promptsResult = await fetch('https://demo6396395.mockable.io/prompts');
    const data = await result.json();
    const promptData = await promptsResult.json();

    const boards = Array.isArray(data.boards) ? data.boards : [];
    const prompts = Array.isArray(promptData) ? promptData : [];

    res.status(200).json({ boards, prompts });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
