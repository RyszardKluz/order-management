import { ControllerFunction } from '../types/ControllerFunction';

const index: ControllerFunction = (req, res): void => {
  res.send('Hello world!');
};

const homeController = {
  index,
};

export { homeController };
