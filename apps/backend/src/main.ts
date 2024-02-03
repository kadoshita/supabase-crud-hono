import { serve } from '@hono/node-server';

import { config } from 'dotenv';
import app from './routes';

if (process.env.NODE_ENV !== 'production') {
  config({ path: '.env.local' });
} else {
  config({ path: '.env.production' });
}

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
