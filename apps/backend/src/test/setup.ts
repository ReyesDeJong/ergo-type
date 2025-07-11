import { Keyboard } from '../models';

beforeAll(async () => {
  await Keyboard.destroy({ where: {} });
});
