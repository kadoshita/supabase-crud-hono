import fastify from 'fastify';
import cors from '@fastify/cors';

import { registerRoutes } from './routes';
import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config({ path: '.env.local' });
} else {
  config({ path: '.env.production' });
}

const app = fastify({
  logger: true,
});
app.register(cors);

registerRoutes(app);

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  app.log.info(`Server listening on ${address}`);
});
