import { nanoid } from 'nanoid';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { originalUrl } = req.body;
      if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
      }
      const id = nanoid(8);

      const { data, error } = await supabase
        .from('urls')
        .insert([{ id, original_url: originalUrl }])
        .select()
        .single();
      if (error) {
        return res.status(500).json({ error: 'Failed to create short URL' });
      }

      const shortUrl = `${req.headers.host}/${data.id}`;
      res.status(201).json({ shortUrl });
    } catch (error) {
      console.error('Unexpected Error:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
