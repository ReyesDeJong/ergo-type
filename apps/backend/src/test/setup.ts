import { Keyboard } from '../models';
import { beforeAll } from '@jest/globals';

beforeAll(async () => {
  if (process.env['NODE_ENV'] !== 'test') {
    throw new Error('Test setup should only run in test environment');
  }

  await Keyboard.destroy({ where: {} });
});
