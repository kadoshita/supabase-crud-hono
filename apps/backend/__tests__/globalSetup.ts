import { config } from 'dotenv';

export const setup = () => {
  config({
    path: '.env.local',
  });
};

export const teardown = () => {};
