import { Keyboard } from '../models';
import { beforeAll } from '@jest/globals';

beforeAll(async () => {
  await Keyboard.destroy({ where: {} });
});
