import AppError from '../errors/AppError';

const checkIfPriceIsNumber = (price: number | string): number => {
  if (typeof price === 'number') {
    return price;
  } else if (typeof price === 'string') {
    const parsed = parseFloat(price);
    if (isNaN(parsed)) {
      throw new Error(`Invalid price string: "${price}"`);
    }
    return parsed;
  }

  throw new AppError('Price must be a number or a string', 400);
};

export default checkIfPriceIsNumber;
